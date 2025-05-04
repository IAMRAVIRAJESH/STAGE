# STAGE

This project is built using Node.JS, Express.JS, TypeScript, PostgreSQL and deployed on render. CI/CD pipeline is implemented using github actions where I have added all the linting and neccessary checks for code quality to make sure this application/feature is production grade.

This project is running on https://stage-u8ep.onrender.com
APIs include:
a. Get my list for user
b. Add an item to my list
c. Delete an item from my list

I have added a postman collection where all the APIs with payload and headers are present so you can import that file and test the APIs.


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

iv. add these lines to your databse.ts file 
     a. import { sequelize } from './config/database';
     b. add await sequelize.sync({ alter: true }); at line no 27 after associateModels(models); line.
     This lines will synchronise your local database and create all the necessary tables with required columns, associations, indexes and relationships declared in the model file so you don't have to create schema or anything for that explicitly (after performing the till step vi.).

v. I have added an query.sql file in sql folder under src, after performing all the above steps copy the whole
   database script from there and run in the Stage database, this will create data for the tables and that will help in testing our APIs.

vi. We have setup our app and database also created all the necessary database connections and tables in it, now
    we are good to go. Open terminal/bash and run the command npm run dev. It will start the server and database will be synchronised.

vii. To test the APIs you have to just replace this base url https://stage-u8ep.onrender.com in every postman
     request with http://localhost:3000 and you can test the app on your local.