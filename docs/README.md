# OUTDATED!!!!
# TODO: UPDATE

# Setup Instructions
Setup for local testing  

## Backend
* Create .env in the backend folder (for local testing)
* Create .env.production before publishing the project
* Follow .env.example to setup env files
* `npm start` - runs in production mode (using .env.production file)
* `npm run dev` - runs in dev mode (using .env file)
* `npm run build` - builds the project in the ./build directory using production env vars
* `npm run build_dev` - builds the project in the ./build directory
* `npm run lint` - checks the project for errors using eslint

### Routes
Send requests to: \<Base URL\>/\<API Route\>/\<Reqd Route\>

Base Local Testing URL: http:/localhost:5000/  
Api Route: /api

User:
* `/users/get` - Get the current auth user
* `/users/signup` - Create a new user account
* `/users/login` - Login an existing user
* `/users/logout` - Logout from authenticated user
* `/users/regevnt` - Get all the events the auth user is registered to

Events:
* `/events` - Get all available events to register into

Registrations:
* `/reg/new` - Create a new registration request for auth user
* `/reg/verify` - Verify payment status for registration and update registration

### Set up mongo db for local testing
* In the minimum, install mongo server, mongo shell (follow respective docs)
* Mongo Compass is usefull for visually tracking the database
* Mongod can sometimes run in the background, kill it using task manager (search mongod)
* Run mongod using the command
  ```
  mongod --dppath temp\path\where\db\should\be\stored --logpath \path\to\a\log\file\to\store\logs\mongod.log --port 27017 --auth
  ```
    
    * `--dbpath` - this is the path where databse related files will be stored
    * `--logpath` - this is the path where logs will be stored
    * `--auth` - this makes sure all clients are authenticated before connecting
* Run the mongo shell command `mongosh --port 27017`
* Create user admin by running the following commands in the shell (https://www.mongodb.com/docs/upcoming/tutorial/configure-scram-client-authentication/)  
    
    * ```
      use admin
      ```
    * ```
      db.createUser(user: "admin", pwd: "12345678", roles: [{role:"readWriteAnyDatabase",db:"admin"}, {role:"userAdminAnyDatabase",db:"admin"}])
      ```
    * ```
      db.adminCommand( { shutdown: 1 } )
      ```
    * ```
      exit
      ```  
* Restart mongod using the command 2 steps before (`mongod --port 21...`)
* Now you can connect to the mongodb using mongosh as
   
  ```
  mongosh --port 27017 --authenticationDatabase "admin" -u "admin" -p "12345678"
  ```
* If you are using Mongo Compass instead of monogsh then connect to the uri
  
  ```
  mongodb://admin:12345678@localhost:27017/?authMechanism=DEFAULT&authSource=admin
  ```
    * This is the same uri used in the .env with one change (the database name is added here between `...27017/` and `?authMe...` e.g. `...27017/envisage_db?authMe...`)

### Setup project for local testing
* Go to the backend folder of the project
* Make sure all packages are installed - `npm install`
* Run using `npm run dev`
* Run in productin using `npm start`

## Frontend
* Create .env in the backend folder (for local testing)
* Create .env.production before publishing the project
* Follow .env.example to setup env files
* NOTE: if you keep both, .env.production will override .env (thats how vite works)
* `npm run dev` - run vite server

### Other Docs
* [HERO_ENHANCEMENT_PLAN](./HERO_ENHANCEMENT_PLAN.md)
* [HERO_REDESIGN](./HERO_REDESIGN.md)
* [NEON_ENHANCEMENTS](./NEON_ENHANCEMENTS.md)
* [SCROLLSTORY_ENHANCEMENTS](./SCROLLSTORY_ENHANCEMENTS.md)
