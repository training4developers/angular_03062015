# Welcome to Introduction to Angular.js!

## Overview

This repository contains a **start** and **completed** folder. The **start** folder is the starting place for the class, while the **completed** folder is a completed application with unit tests.

## Getting Started

To get started, download and extract the zip file or clone the repository to a local folder.

Only [Node.js](https://nodejs.org) needs to be installed to run this code. Please use the LTS version of Node.js. No NPM packages need to be installed.

To run either the **start** or **completed** version of the application, change to the "start" or "completed" folder, and run the following command from the terminal.

```bash
$ node server
```

To access the web application, open a web browser and navigate to [http://localhost:8080](http://localhost:8080).

To run the unit tests, open a web browser and navigate to [http://localhost:8080/tests/](http://localhost:8080/tests/).

## Configuration

The **config.json** file can be modified to change the web server port. This is useful if port 8080 is already being used by another application on your system.

Also, **html5Mode** can be set to true when using HTML5 mode for client side routing in Angular.js. When set to true, "index.html" will **always** be served up, regardless of the url, except for CSS, JavaScript, font, template, and test files.
