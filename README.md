# project-2-give-your-sofa with IRONHACK

CRUD operations - API - EXPRESS - MongoDB.

## Why this App?

we all know that it's always a problem to get rid of your sofa when you move from your home
this application allows you to donate your sofa in your city.

you can place , upload your sofa with photo, update it , delete it.
you can also access the ads of other users with their contact information, Bookmark and save your favorite ads.

## Key features

- We use 3 Models : User = model("User", userSchema) - Sofa = model("Sofa", sofaSchema) - Bookmark = model("Bookmark", bookmarkSchema)
- We use 4 routes : auth.routes.js - user.routes.js - sofa.routes.js - bookmark.routes.js --> index.routes.js
- we use middlewares to handle and secure users'authentification
- we use error-handling to track errors in terminal
- we use cloudinary.com / MongoDB to save data in cloud
- we use render.com to host and deploy the application
