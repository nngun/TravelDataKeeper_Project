# msc-information-technology-project-2021_22-ntuncer0616
msc-information-technology-project-2021_22-ntuncer0616 created by GitHub Classroom

**General Information**

**Project Name** : A Web Application for Creating Customised Travel Maps

**Web Application Name**: Travel Data Keeper

**Author/Project Owner** : Nurten Gun

**Project aim**: to develop a web application which users can sign up and create their customized travel maps. Users choose their customization options and create their categories (such as 'visited', 'would love to visit', 'lived before' and 'already planned to visit') and then assign countries for these categories. Within the web application, users are able to determine
- title of their travel map
- background colour of their travel map
- colour of rest of the map
- name of categories
- colour of the categories
- countries selected for the categories



**Folder/file structure of project code**

1. **ng** : this folder includes code for Angular application/frontend for the project.
- **src**
  - **app** : this folder includes code for Angular components of my application.
      - **home** : landing/main page of my web application
        - home.component.html : includes html code for home page
        - home.component.ts: includes code for business logic of home page
      - **register** : sign up page of my web application. users can sign up for the application by providing firstname, lastname, username and password. 
        - register.component.html : includes html code for sign up page
        - register.component.ts: includes code for business logic of sign up page
      - **login** : sign in page of my web application. after signing up, users can login application by providing username and password
        - login.component.html : includes html code for sign in page
        - login.component.ts: includes code for business logic of sign in page
      - **menu** : the page where users are directed to after logging in. includes 3 options: travel map creation, wish list ceation, blog post creation.
        - menu.component.html : includes html code for menu page
        - menu.component.ts: includes code for business logic of menu page
      - **travel map** : the page where users create customized travel map by providing input for title, map colour, categories (category name, category colour, countries selected for the categories)
        - travelmap.component.html : includes html code for travel map creation page
        - travelmap.component.ts: includes code for business logic of travel map creation page
      - **inspiration** : this page includes travel destination suggestions made by admin. Includes the photos that I personally took before.   
        - inspiration.component.html : includes html code for inspirations page
        - inspiration.component.ts: includes code for business logic of inspirations page
      - **wishlist** : not completed yet. when user goes to this page, warning message is shown as 'this page is under construction'
      - **blogger** : not completed yet. when user goes to this page, warning message is shown as 'this page is under construction'
      - **helpers_**
        - auth.guard.ts : This file has canActivate() function which checks if user logged in or not. If not, user is directed to login page. This file is used by app.routing.module.ts when user navigates around components.
      - **services_**
        - endpoint.service.ts: This file acts like last door of frontend to backend. communicates with backend
      - **app.routing.module.ts** : This file decides which component is shown to user in line with the associated URL path
      - **app.component.html** : This file includes header which changes based on the authentication status of user
      - **app.component.ts** : This file decides which header is shown to user by checking authentication status of user. if user in logged in state, 'sign out' , 'travel' , 'inspiration' buttons are shown to user. if user is not in logged in state, 'sign up', sign in', 'inspiration' buttons are shown to user in header of my application.
      - **app.module.ts** : Main.ts makes this file works and this file includes component declarations and it makes app.component.ts to work
  - **index.html** : Whenever user loaded Travel Data Keeper, the page loaded is index.html. include only app root tag and footer of app. this is the single page of our Angular application.
  - **main.ts** : This file is executed first, and it starts my Angular application in the browser
  - **styles.css** : Main css file to style all Angular components in my application
2. **functions** : this folder includes code for Node.js/express/mongo.db (backend) for the project.
- **src**
  - **config** 
    - mongo.ts: config file for db access
    - routes.ts: security config needed for deployment. helmet and CORS (Cross-origin resource sharing) packages which are recommended as best practices. Using CORS package, I restricted access to express server of my app.
  - **schemes** : Mongoose uses schemas to specify how our data should look like to store and fetch data easily. so below scheme files are created for db collections of my app.
    - counter.ts: created to be used for avoiding id increment conflicts
    - country.ts: According to country.ts, country collection has two documents: id with number type and name with string type
    - user.ts: created to specify documents of user collection with their types. User collection stores information on user details (first name, surname, username, password), map customization options (title, background colour and rest of the map colour) and category customization options (category name, category colour, countries array). All these fields with their types are detailed in this file as CountryScheme, UserScheme, CategoryScheme and MapScheme
  - **routes** : 
    - **APIroutes.routes.ts** : main file for backend of my application where I put API methods. Server side of my application listens requests from client and handles requests by communicating with MongoDB. API methods of the app are explained as follows. 
      - /users: GET request. retrieves registered user to the application. Also retrieves user's saved travel map preferences if there is any in order to populate fields on frontend after logging in the application
      - /countries: GET request. retrieves countries in order to populate country list on travel map creation page
      - /add: POST request. sign up to the application. new user is created in db
      - /look up: POST request. login to the app
      - /edit: POST request. edits user credentials
      - /savemap: POST request. saves travel map preferences associated with the user. updates related user document in db
  - **index.ts** :starts backend of my application with main() function in it

