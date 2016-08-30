# Daylight

Daylight is the common header and footer for Vivint Solar.  Daylight starts with `sunrise` (the header) and ends with `sunset` (the footer). There is also `dawn` which contains a reference to the `.css` file which should go in the `head`.

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

## Devlopment

To start the project run:
```
gulp
```

Daylight uses `.jade` files, combined with `.json` files in the same directory to generate `.html` files which can then be included in your projects templates.  The `gulp` process watches for changes and will republish the files in the `public` folder, which are what you should include in your template.