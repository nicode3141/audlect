import * as z from "zod";
import type { AuthLocalization } from "~/localization/auth-localization";
import type { PasswordValidation } from "~/types/auth/password-validation";

export function isValidEmail(email: string) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Converts error codes from SNAKE_CASE to camelCase
 * Example: INVALID_TWO_FACTOR_COOKIE -> invalidTwoFactorCookie
 */
export function errorCodeToCamelCase(errorCode: string): string {
	return errorCode.toLowerCase().replace(/_([a-z])/g, (_, char: string) => char.toUpperCase());
}

/**
 * Gets a localized error message from an error object
 */
export function getLocalizedError({
	error,
	localization,
	localizeErrors = true,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: ignore
	error: unknown;
	localization?: Partial<AuthLocalization>;
	localizeErrors: boolean;
}) {
	const DEFAULT_ERROR_MESSAGE = "Request failed";

	// 1. Basic shape guards
	const isRecord = (val: unknown): val is Record<string, unknown> => typeof val === "object" && val !== null;

	// If localization is disabled, return backend error message directly
	if (!localizeErrors) {
		if (isRecord(error) && "message" in error && typeof error.message === "string") {
			return error.message;
		}

		if (
			isRecord(error) &&
			"error" in error &&
			isRecord(error.error) &&
			"message" in error.error &&
			typeof error.error.message === "string"
		) {
			return error.error.message;
		}

		return DEFAULT_ERROR_MESSAGE;
	}

	// 2. Localized error messages
	if (typeof error === "string") {
		const key = error as keyof AuthLocalization;
		return localization?.[key] ?? localization?.REQUEST_FAILED ?? DEFAULT_ERROR_MESSAGE;
	}

	if (isRecord(error) && "error" in error && isRecord(error.error)) {
		const inner = error.error;

		const code = "code" in inner && typeof inner.code === "string" ? (inner.code as keyof AuthLocalization) : undefined;

		const message = "message" in inner && typeof inner.message === "string" ? inner.message : undefined;

		const statusText = "statusText" in inner && typeof inner.statusText === "string" ? inner.statusText : undefined;

		if (code && localization?.[code]) return localization[code];

		return message ?? code ?? statusText ?? localization?.REQUEST_FAILED ?? DEFAULT_ERROR_MESSAGE;
	}

	if (isRecord(error) && "message" in error && typeof error.message === "string") {
		return error.message;
	}

	return localization?.REQUEST_FAILED ?? DEFAULT_ERROR_MESSAGE;
}

export function getSearchParam(paramName: string) {
	return typeof window !== "undefined" ? new URLSearchParams(window.location.search).get(paramName) : null;
}

export function getViewByPath<T extends object>(viewPaths: T, path?: string) {
	for (const key in viewPaths) {
		if (viewPaths[key] === path) {
			return key;
		}
	}
}

export function getKeyByValue<T extends Record<string, unknown>>(object: T, value?: T[keyof T]): keyof T | undefined {
	return (Object.keys(object) as Array<keyof T>).find((key) => object[key] === value);
}

export function getPasswordSchema(passwordValidation?: PasswordValidation, localization?: AuthLocalization) {
	let schema = z.string().min(1, {
		message: localization?.PASSWORD_REQUIRED,
	});
	if (passwordValidation?.minLength) {
		schema = schema.min(passwordValidation.minLength, {
			message: localization?.PASSWORD_TOO_SHORT,
		});
	}
	if (passwordValidation?.maxLength) {
		schema = schema.max(passwordValidation.maxLength, {
			message: localization?.PASSWORD_TOO_LONG,
		});
	}
	if (passwordValidation?.regex) {
		schema = schema.regex(passwordValidation.regex, {
			message: localization?.INVALID_PASSWORD,
		});
	}
	return schema;
}
