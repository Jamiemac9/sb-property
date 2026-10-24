---
name: React DOM priority attributes
description: Compatibility note for nonstandard HTML image priority attributes in the installed React runtime.
---

Use the lowercase `fetchpriority` DOM attribute rather than camel-case `fetchPriority` for image elements when adding request priority in this project.

**Why:** The installed React 18 runtime warns on the camel-case prop. In the Replit Vite development setup, that console error can be promoted into a Vite failure and stop the running app.

**How to apply:** When JSX type definitions accept a prop that the React runtime does not, pass the lowercase attribute through a spread object and verify the browser console after the change.
