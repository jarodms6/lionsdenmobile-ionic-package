
I'm using the Ionic blank template as a start. This project is for holding info on my build process as well as hooks and Node packages.

The mobile app itself doesn't do anything. It builds and it runs, but it's just a blank Ionic app. The meat is in the build process and what it does.



1. Set the app id in config.xml. Change it from id="com.ionicframework.ldmpackage877612"
    to something meaningful for your app: com.mycompanyname.myapp

1. Set the version number in package.json to your apps version number! Start at 0.0.1

1. Modify gulpfile.js tasks with your app id
   use-dev-apid
        regex: "com.mycompanyname.myapp",
        replacement: "com.mycompanyname.myapp1234",

   non-dev-apid
        regex: "com.mycompanyname.myapp1234",
        replacement: "com.mycompanyname.myapp",

   Why are we doing this?
   When using "ionic run" I will use a DEV version for my package name. The DEV version will get installed on my phone under **com.mycompanyname.myapp1234**

   When doing a build and releasing the app to App Stores, I will have a different package name (my production ready app id) so I can my release version as well.

1. npm install

   Install dependencies found in package.json

1. ionic platform add android

1. ionic run

   App id is changed to DEV and then back to PROD version

1. ionic build
    * Before Build
        * Make sure we are using the PROD App ID
        * Use cordova-version to update config.xml version number to what is in package.json
            * At this point, package.json has the version number from the last SUCCESSFUL build_number
    * build happens...
    * After Build
        * Increment PATCH version in package.json by 1
            * package.json is incremented LAST in case the build fails. Doing this first means we would increment the version number for failed builds.

1. Commit changes and tag

    All files are now ready for packaging and release, so
    * Commit changes
    * Tag with latest version number (from config.xml - TODO Get this version # and output to command line)
    * Push to Git

1. DEV Build
        ionic package build android
        ionic package build ios --release --profile dev

    (for PROD, use **--profile prod**)

1. Determine build number(s)
       ionic package list

1. Download build to "builds" directory (entry is in .gitignore already)

       ionic package download [build_number] -d builds

1. Upload build to App Distribution:
   * DEV Builds - HockeyApp, AppBlade, TestFlight, etc.
   * PROD Builds - iTunes Connect or Google Play        




# Major and Minor versions
If you are performing a release for a MAJOR or MINOR version:

    run:
        gulp bump-minor
        or
        gulp bump-major

* 0.0.1234 becomes 0.1.0
* 0.1.1234 becomes 1.0
