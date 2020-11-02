The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

(___TODO__: your project name_) √

#  How To Spend A Day!

## Overview

(___TODO__: a brief one or two paragraph, high-level description of your project_) √

Sometimes, we get bored of our mundane day. Have you ever ran into an issue planning for a day-out? Have you ever wished someone else planned your day for you? Let "How To Spend A Day!" help you!

"How To Spend A Day!" is a web app that will allow users to share their day-out plans and experiences. Users can register and login. Once they're logged in, they can create their day-out courses. They will be able to locate places on the map and upload photos and tag descriptions.

## Data Model

(___TODO__: a description of your application's data and their relationships to each other_) √

The application will store Users, Courses, Locations, Photos, Descriptions, and Ratings. 

* users can have multiple courses (via references)
* each course will have one Rating (via references)
* each courses can have multiple locations (by embedding)
* each locations can have multiple photos and descriptions (by embedding)

(___TODO__: sample documents_) √

An Example User:

```javascript
{
  username: "Chrissy",
  hash: // a password hash,
  lists: // an array of references to Courses documents
}
```

An Example Course with Embedded Locations, Photos, and descriptions:

```javascript
{
  user: // a reference to a User object
  Course Name: "Summer Date",
  Locations: [
    { name: "Restaurant", Photo: {link/uploaded path to photos}, Description: "Nice food!"},
    { name: "Amusement Park", Photo: {link/uploaded path to photos}, Description: "Fun Rides"},
  ],
  Rating : Number
}
```


## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/browse - page to browse all shared courses

![list create](documentation/list-create.png)

/browse/summer_date - page for showing specific date course

![list](documentation/list.png)

/add - page for add a course

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_) √

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new course
4. as a user, I can view all the shared courses
5. as a user, I can add courses
6. as a user, I can choose to view only my courses

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_) √

* (3 points) Integrate user authentication
    * I'm going to be using passport.js for user authentication
    * It is authentication middleware for Node.js. It supports authentication using a username and password, Facebook, Twitter, and more. 
    * It is extremely flexible and can be dropped into any Express-based web application
* (3 points) External API
    * I will be using Google Map API for map incorporation.
    * It lets us to customize maps with our own content and imagery for display on web pages.
    * It is the most familiar Map API so that users on the website can use it without learning them. 
* (2 points) CSS Framework
    * I will be using Bootstrap for the framework.
    * It is the most popular HTML, CSS, and JS library in the world. 
    * It can be used to quickly design and customize responsibe sites.

8 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_) √


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_) √

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [Google Map API](https://developers.google.com/maps/documentation/javascript/overview) - (add link to source code that was based on this)
3. [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
