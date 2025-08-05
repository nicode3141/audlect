![Static Badge](https://img.shields.io/badge/nextjs-%3E%3D%2015.2.3-FFC857.svg) ![Static Badge](https://img.shields.io/badge/license-MIT-428f7e.svg?logo=open%20source%20initiative&logoColor=white&labelColor=555555)

# Audlect - Vote on music with your friends!
With audlect, your guest can participate in song votes to create the perfect playlist for everyone.

### Features
Create Votes: Users can initiate song votes through Spotify search, using a songs name or url.

Voting: Users can express their preferences by liking votes created by others, influencing the overall popularity of a song.

Secure Sign-In: Utilizing Keycloak, the app ensures secure user authentication for a personalized experience.

Vote Management: Users have the ability to delete their votes, particularly those with less than two likes, to prevent fraudulent activities and maintain the integrity of the voting system.

30s Song Previews: Thanks to the use of Spotify API and its' song preview feature, you can listen votes without a spotify account

Vote Report: If a user considers that a vote does not align with the event or violates guidelines, there's an option to formally report it for review -> info@nicodenetworks.com

### Dev Status
currently in early development

### Roadmap
 <b>Migrate to Next.JS:</b>
1. [ ] Set up example voting
2. [ ] Set up DB Structure
3. [ ] From REST to tRPC
4. [ ] Move to Tailwind

<b>Next Steps:</b>
1. [ ] Set up Auth with Clerk
2. [ ] Protected Routes
3. [ ] Voting Management
4. [ ] Home Page