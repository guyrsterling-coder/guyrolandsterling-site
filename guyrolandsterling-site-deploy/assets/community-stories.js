/* Community Stories — "Share Your Story" wall data.
   Submissions arrive via the Netlify form (see share-your-story.html) into Guy's Netlify Forms dashboard/email.
   Nothing here publishes automatically — Guy reads every submission and chooses what to feature.
   To feature one: add an object to the FRONT of the array below (newest first) in this shape:
     { name: "First name or 'Anonymous'", type: "Testimony" | "What a Song Meant to Me" | "Prayer Request" | "Something Else",
       story: "The story text, lightly cleaned up for readability but kept in their own words.", date: "YYYY-MM-DD" }
   Leave the array empty until the first story is ready to feature — the page shows an inviting empty state. */

var COMMUNITY_STORIES = [];

if (typeof module !== "undefined" && module.exports) { module.exports = COMMUNITY_STORIES; }
