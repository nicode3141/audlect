# Security Audit Report

**Date:** 2024  
**Scope:** Full codebase security review  
**Severity Levels:** Critical, High, Medium, Low

---

## 🔴 CRITICAL VULNERABILITIES

### 1. Authorization Bypass in `deleteSong` Endpoint
**Location:** `src/server/api/routers/songs.ts:232-259`

**Issue:** The authorization logic is inverted. The code checks if the user is NOT an owner/moderator, and if so, allows deletion. This means owners/moderators cannot delete songs, while regular users can.

```typescript
if ((memberships?.role !== "owner" && memberships?.role !== "moderator") || !memberships) {
    // This allows deletion for non-owners/moderators - WRONG!
    const [result] = await ctx.db.delete(songsTable)...
}
```

**Impact:** Users without proper permissions can delete songs they shouldn't have access to.

**Fix:** Invert the logic to check for owner/moderator permissions first:
```typescript
const membership = memberships.find(m => m.votingId === input.voting_id);
const isAuthorized = membership?.role === "owner" || membership?.role === "moderator";

if (isAuthorized) {
    // Allow deletion without added_by check
} else {
    // Only allow if user added the song
}
```

---

### 2. Missing Authorization Checks for Voting Operations
**Location:** Multiple files

**Issues:**
- `addSongID` (`src/server/api/routers/songs.ts:147`) - No check if user has permission to add songs to the voting
- `joinVoting` (`src/server/api/routers/votings.ts:35`) - No check if voting is public or if user has invitation
- `fullSearch` (`src/server/api/routers/search/search.ts:21`) - No verification that user has access to the voting
- `votings` query (`src/server/api/routers/votings.ts:15`) - Public endpoint doesn't check if voting is public

**Impact:** Users can:
- Add songs to votings they don't have access to
- Join private votings without permission
- Search and access data from votings they shouldn't see
- View private voting details

**Fix:** Add authorization checks:
```typescript
// Check voting exists and user has access
const voting = await ctx.db.select().from(votingsTable)
    .where(eq(votingsTable.voting_id, input.voting_id))
    .limit(1);

if (!voting[0]) throw new TRPCError({ code: "NOT_FOUND" });
if (!voting[0].public && !hasMembership) {
    throw new TRPCError({ code: "FORBIDDEN" });
}
```

---

### 3. URL Injection / SSRF Vulnerability in Deezer API Calls
**Location:** `src/server/utils/deezer.ts:24-25, 54`

**Issue:** User input is directly interpolated into URLs without proper encoding:
```typescript
`https://api.deezer.com/search?q=${search_string}&limit=${limit}&index=${offset}`
`https://api.deezer.com/track/${track_id}`
```

**Impact:** Potential Server-Side Request Forgery (SSRF) attacks or injection of malicious parameters.

**Fix:** Use URL encoding:
```typescript
const url = new URL('https://api.deezer.com/search');
url.searchParams.set('q', search_string);
url.searchParams.set('limit', limit.toString());
url.searchParams.set('index', offset.toString());
```

---

## 🟠 HIGH SEVERITY VULNERABILITIES

### 4. Missing Environment Variable Validation
**Location:** `src/lib/auth.ts:34-39`, `src/lib/email.tsx:6`

**Issue:** Environment variables are accessed directly without validation:
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_BETTER_AUTH_URL` (in `src/lib/auth-client.ts`)

These are not defined in `src/env.js`, so they won't be validated at startup.

**Impact:** Application may fail at runtime with unclear errors, or use undefined values leading to security issues.

**Fix:** Add to `src/env.js`:
```javascript
server: {
  // ... existing
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
},
client: {
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url().optional(),
}
```

---

### 5. Missing Input Validation for Numeric Parameters
**Location:** Multiple endpoints

**Issues:**
- `limit` and `offset` in `songs`, `fullSearch` endpoints - No validation for negative values, zero, or extremely large numbers
- `id` in `addSongID` - No validation for valid Deezer ID format

**Impact:** 
- Potential DoS through resource exhaustion
- Invalid API calls
- Database performance issues

**Fix:** Add Zod validation:
```typescript
limit: z.number().int().min(1).max(100),
offset: z.number().int().min(0),
id: z.number().int().positive(),
```

---

### 6. Information Disclosure via Console Logs
**Location:** Multiple files

**Issues:**
- `src/server/api/routers/votings.ts:30` - Logs voting name
- `src/server/api/trpc.ts:113` - Logs all tRPC paths and execution times
- `src/lib/auth.ts:29` - Logs password reset events with email

**Impact:** Sensitive information may be logged in production, accessible through logs.

**Fix:** 
- Remove or conditionally log only in development
- Use proper logging library with log levels
- Sanitize logged data

---

## 🟡 MEDIUM SEVERITY VULNERABILITIES

### 7. Missing Rate Limiting
**Location:** All API endpoints

**Issue:** No rate limiting implemented on any endpoints.

**Impact:** Vulnerable to:
- Brute force attacks on authentication
- DoS attacks
- API abuse

**Fix:** Implement rate limiting middleware:
```typescript
import { rateLimit } from '@upstash/ratelimit';
// Or use Next.js middleware with Redis/Upstash
```

---

### 8. Missing Security Headers
**Location:** `next.config.js`

**Issue:** No security headers configured (CSP, HSTS, X-Frame-Options, etc.)

**Impact:** Vulnerable to XSS, clickjacking, and other client-side attacks.

**Fix:** Add headers in `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ];
}
```

---

### 9. Unused/Orphaned Environment Variable
**Location:** `src/env.js:14, 33`

**Issue:** `CLERK_SECRET_KEY` is defined but never used. The project uses `better-auth`, not Clerk.

**Impact:** Confusion, potential security risk if accidentally used.

**Fix:** Remove from `src/env.js` if not needed.

---

### 10. Missing CORS Configuration
**Location:** `next.config.js`, API routes

**Issue:** No explicit CORS configuration.

**Impact:** Potential for unauthorized cross-origin requests (though Next.js has some defaults).

**Fix:** Add explicit CORS configuration if needed for API routes.

---

### 11. Incomplete Error Handling in Authorization Logic
**Location:** `src/server/api/routers/songs.ts:234-237`

**Issue:** The `deleteSong` endpoint queries memberships without filtering by `voting_id`, which could return incorrect results if user has multiple memberships.

**Impact:** Authorization decisions may be made based on wrong membership data.

**Fix:** Filter by voting_id:
```typescript
const [membership] = await ctx.db
    .select()
    .from(voting_membershipsTable)
    .where(
        and(
            eq(voting_membershipsTable.user_id, ctx.auth.session.userId),
            eq(voting_membershipsTable.voting_id, input.voting_id)
        )
    );
```

---

## 🟢 LOW SEVERITY / BEST PRACTICES

### 12. Missing Input Sanitization for Search Strings
**Location:** `src/server/api/routers/search/search.ts:65-66`

**Issue:** Search strings are used directly in `ilike` queries. While Drizzle ORM should handle this safely, it's good practice to validate/sanitize.

**Recommendation:** Add length limits and basic validation:
```typescript
search_string: z.string().min(1).max(200).trim(),
```

---

### 13. Missing Validation for Voting Name/Description
**Location:** `src/server/api/routers/votings.ts:64-65`

**Issue:** While there are min/max length checks, no validation for:
- Special characters
- HTML/script injection (though this may be handled by the framework)

**Recommendation:** Add more specific validation if user input is rendered.

---

### 14. Password Reset Logging
**Location:** `src/lib/auth.ts:29`

**Issue:** Password reset events are logged with user email, which could be a privacy concern.

**Recommendation:** Log only in development or use a proper audit log system.

---

## ✅ POSITIVE FINDINGS

1. **SQL Injection Protection:** Using Drizzle ORM with parameterized queries - ✅ Good
2. **Input Validation:** Using Zod for schema validation - ✅ Good
3. **Authentication:** Using `better-auth` with proper session management - ✅ Good
4. **Type Safety:** TypeScript usage throughout - ✅ Good
5. **No XSS via dangerouslySetInnerHTML:** No instances found - ✅ Good
6. **Environment Variable Validation:** Using `@t3-oss/env-nextjs` for validation - ✅ Good (though incomplete)

---

## 📋 RECOMMENDED ACTIONS (Priority Order)

1. **IMMEDIATE:** Fix authorization bypass in `deleteSong` endpoint
2. **IMMEDIATE:** Add authorization checks for all voting-related operations
3. **HIGH PRIORITY:** Fix URL injection in Deezer API calls
4. **HIGH PRIORITY:** Add missing environment variables to validation schema
5. **HIGH PRIORITY:** Add input validation for numeric parameters
6. **MEDIUM PRIORITY:** Implement rate limiting
7. **MEDIUM PRIORITY:** Add security headers
8. **MEDIUM PRIORITY:** Remove or secure console.log statements
9. **LOW PRIORITY:** Clean up unused environment variables
10. **LOW PRIORITY:** Add CORS configuration if needed

---

## 🔍 ADDITIONAL RECOMMENDATIONS

1. **Security Testing:** Implement automated security testing (OWASP ZAP, Snyk, etc.)
2. **Dependency Scanning:** Regularly scan dependencies for vulnerabilities (`npm audit`)
3. **Code Review:** Establish security-focused code review process
4. **Penetration Testing:** Consider professional penetration testing before production
5. **Security Monitoring:** Implement logging and monitoring for security events
6. **Documentation:** Document security assumptions and threat model

---

**Report Generated:** Automated Security Audit  
**Next Review:** Recommended after fixes are implemented

