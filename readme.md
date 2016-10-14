# Daylight

Daylight is the common header and footer for Vivint Solar.  Daylight starts with `sunrise` (the header) and ends with `sunset` (the footer). There is also `dawn` which contains a reference to the `.css` file which should go in the `head` (dawn is before sunrise.... get it?).

To run the project 

## Installation

```
npm install --save @slr/daylight
```

or add the following to your `package.json`

```
"@slr/daylight": "^0.0",
```

## Usage
Within the project that wants to include daylight, you should include the .html files 

## Development

To start the project run:
```
gulp
```

Daylight uses `.jade` files, combined with `.json` files in the same directory to generate `.html` files which can then be included in your projects templates.  The `gulp` process watches for changes and will republish the files in the `public` folder, which are what you should include in your template. For some reason the gulp process isn't running correctly and seems to only generate the output files the first save after you start gulp. If you aren't seeing your changes, try running gulp again.


### Daylight "service"
We provide a `daylight.js` file which has a JSONP response for third parties to use as a header and footer in their system. investors.vivintsolar.com uses this.

The `daylight.js` file is automatically generated with other changes, but you can also run `gulp makeJSON` to create it again.

## Deployment
All daylight files are hosted on amazon s3. You need to manually upload the files from the `public` folder which is where gulp puts the rendered files.  They should be uploaded into `com.vivintsolar.sites/daylight`

The JSONP `daylight.js` goes in the daylight root folder

The `daylight.css` file goes in the `css` folder

The `daylight.min.js` file (used for the menu functionality) goes in the `js` folder.

### IMPORTANT
Make sure you set the permissions to public after any upload.  It does not remember the settings even when overwriting something with the same name.  During the upload click `Set Details >` in the lower right corner of the dialog. Then click `Set Permissions >` in the same location. Up in the content area of the dialog, check the `Make everything public` checkbox to ensure permissions are set during upload.  

If you forget this step the file will become inaccessible. You can click box next to the file in the file view, click the `Actions` dropdown in the top left, and then click `Make Public`.

## Versioning
Daylight is an npm module and so needs to be versioned.  When you are ready to create a new version run `npm version patch` (or minor/major as needed) and `npm publish` to get into our private npm repo.