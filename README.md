
I'm using the Ionic blank template as a start. This project is for holding info on my build process as well as hooks and Node packages. I'll be refining this to make it usable by others as well as myself.

The mobile app itself doesn't do anything. It builds and it runs, but it's just a blank Ionic app. The meat is in the build process and what it does.

## I've tested this on Windows (for Android). Would love feedback/info regarding iOS.

# So far what I've done
* Prepped the package.json with npm dependencies
* Hardcoded Cordova plugin versions
* Added several hooks
  * Change app ID in config.xml from DEV to PROD and back when necessary
  * Increment package.json version then use that in the config.xml

---
# Merging this to your project
### The following files can be dropped into your new Ionic project:
* **hooks** directory
* .gitignore
* gulpfile.js

### These files will need to be merged:
* package.json -> dependencies and devDependencies is about it for a new build

---
## Steps to try this build and deploy process

1. **Manual** Set the app id in config.xml. Change it from id="com.ionicframework.ldmpackage877612"
    to something meaningful for your app: com.mycompanyname.myapp

1. **Manual** Set the version number in package.json to your apps version number! Start at 0.0.1 or whatever you would like

1. **Manual** Modify the following Variables in in *package.json*

```
"name": "My App Name",
"version": "0.0.1",
"appId": "com.mycompanyname.myapp",

```

  Why are we doing this? Because I want to be able to install the PROD and DEV version of my apps. I need a different package name.

  When using "ionic run" I will use a DEV version for my package name. The DEV version will get installed on my phone under **com.mycompanyname.myapp1234**

  The App Name (the icon name after being installed), will contain DEV at the end so I know which is which

  When doing a build and releasing the app to App Stores, I will have a different package name (my production ready app id) so I can install my release version as well.

## Next Steps
1. Install NPM dependencies found in package.json

    npm install   

1. Look in the package.json and restore the Plugins  listed there.

    ionic state restore --plugins  

1. Add the platform you are working on

    ionic platform add [[android | ios]]

1. Make sure icon and splash screen resources are built

    ionic resources  

1. Test the app on the device

    ionic run   

   *Hooks will make sure App id is changed to DEV before deploying to the device*

1. Build It - **Make it ready for release or packaging for an external Build tool ** (Ionic Package, PhoneGap Build)
```
ionic build
```
  * Before Build hooks
    * Make sure we are using the PROD App ID
    * Use cordova-version to update config.xml version number to what is in package.json
      * At this point, package.json has the version number from the last SUCCESSFUL build_number
    * Create version.js and copy it to www/js -> This will allow you to show the version number in your app
  * build happens...
  * After Build
    * Increment PATCH version in package.json by 1
      * package.json is incremented LAST in case the build fails. If we did this first then we could increment the version number for failed builds.

1. Commit changes and tag

    All files are now ready for packaging and release, so
    * Commit changes
    * Tag with latest version number (from config.xml - TODO Get this version # and output to command line)
    * Push to Git

1. Use Ionic to Package and build
```
ionic package build android
ionic package build ios --release --profile dev
```
  (for PROD, use **--profile prod**)

1. Determine build number(s) from the package command

    ionic package list

1. Download build to **builds** directory (entry is in .gitignore already; Rememeber to MKDIR builds)

    ionic package download [build_number] -d builds

1. Upload build to App Distribution:
   * DEV Builds - HockeyApp, AppBlade, TestFlight, etc.
   * PROD Builds - iTunes Connect or Google Play        

---

# Major and Minor versions
If you are performing a release for a MAJOR or MINOR version:

    run:
        gulp bump-minor
        or
        gulp bump-major

* 0.0.**123** becomes 0.**1**.0
* **0**.1.123 becomes **1**.0 (test this: should it be 1.0.0?)
