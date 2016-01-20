
I'm using the Ionic blank template as a start. This project is for holding info on my build process as well as hooks and Node packages.

1. Set the app id in config.xml. Change it from id="com.ionicframework.ldmpackage877612"
    to something meaningful for your app: com.mycompanyname.myapp

Set the version number in package.json to your apps version number!


2. Modify gulpfile.js tasks with your app id
   use-dev-apid
        regex: "com.mycompanyname.myapp",
        replacement: "com.mycompanyname.myapp1234",

   non-dev-apid
        regex: "com.mycompanyname.myapp1234",
        replacement: "com.mycompanyname.myapp",

   Why are we doing this?
   When using "ionic run" I will use a DEV version for my package name.
   When doing a build and releasing the app to App Stores, I will have a different package name so I can install DEV and PROD versions.


3. npm install
   Install dependencies found in package.json

4. ionic platform add android

5. ionic run

6. ionic build
    * Uses cordova-version to update config.xml version number to what is in package.json
    * Increments PATCH version in package.json by 1


TODO: Document package and release process
