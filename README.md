# STAGE

# Design choices
This project is built using Node.JS, Express.JS, TypeScript, PostgreSQL database and deployed on render. CI/CD pipeline is implemented using github actions where I have added all the linting and neccessary checks for code quality to make sure this application/feature is production grade.

To make this extremely performant I have setup a redis server on render an implemented that of find list function in order to maximize the efficiency of the APIs. Howvever the redis server & databsae deployed on render is not as performant as AWS or other cloud service as it's free so have limited options and deploying on cloud is not feasible but I have implemented those on cloud and they are responding exceptional.

Also I have created a junction table that will be connected with user, movies, and tvshows table. With this approach I don't have to create extra columns on user, movies, and tvshows table and I can use the existing data present in them with association & relaions defined in my_list table between user and movies, tvshows. I have also applied indexing for uniqueness in my_list tbale and indexing on user_id column in order to fetch the data from both the tables related with each user.

This project is running on https://stage-u8ep.onrender.com. Please run the server from render dashboard it will shut down after 1 minute of inactivity. https://dashboard.render.com/web/srv-d09gkeggjchc73901t3g
APIs include:
a. Get my list for user
b. Add an item to my list
c. Delete an item from my list

This app also contains test case in tests folder under src

I have added a postman collection where all the APIs with payload and headers are present so you can import that file and test the APIs.

# Setting up the project on local machine
If you want to setup the project on your local then you will need to follow the below steps:
i. Clone the code from https://github.com/IAMRAVIRAJESH/STAGE.git. Take pull from main, code is present there only.
   After that run npm i to install all the packages for the project.

ii. Setup postgresql database on your localhost machine and create a database naming Stage.

iii. Create an .env file and add the environment values
        PORT = 3000
        DB_HOST = localhost
        DB_PASSWORD = (your root paasword)
        DB_USER = (your root username)
        DB_NAME = Stage

iv. add these lines to server.ts file under src directory
     a. import { sequelize, initializeModels, associateModels } from './config/database';
     b. add the below lines inside startServer function at line no. 25
        const models = initializeModels();
        associateModels(models);
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully'); at line no 27 after associateModels(models); line.
     This lines will synchronise your local database and create all the necessary tables with required columns, associations, indexes and relationships declared in the model file so you don't have to create schema or anything for that explicitly (after performing the till step vi.).

v. I have added an query.sql file in sql folder under src, after performing all the above steps copy the whole
   database script from there and run in the Stage database, this will create data for the tables and that will help in testing our APIs.

vi. We have setup our app and database also created all the necessary database connections and tables in it, now
    we are good to go. Open terminal/bash and run the command npm run dev. It will start the server and database will be synchronised.

vii. To test the APIs you have to just replace this base url https://stage-u8ep.onrender.com in every postman
     request with http://localhost:3000 and you can test the app on your local.
