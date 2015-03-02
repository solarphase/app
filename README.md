# SolarPhase

SolarPhase is the personal portfolio and blog of __Kimmy Andersson__ and this
repository contains the entire source-code of the application that powers the
website.

## License

This piece of software is licensed under the ISC license which you can read in
the accompanying LICENSE file.

## Installation

### Requirements

 * Node.js
 * NPM
 * Bower
 * A POSIX-compliant OS. (Linux, OSX, etc)

### Steps

Start out by cloning the repository into a directory on your local drive.

    $ git clone https://github.com/solarphase/app solarphase-app
    $ cd solarphase-app

Next, you will have to install the third-party libraries and components that
the application depends on.

    $ npm install
    $ bower install

Then you will have to copy the dependencies into the project by running one of
the supplied scripts.

    $ ./bin/vendor

You will also have to compile the LESS stylesheets and populate the database.

    $ ./bin/less
    $ ./bin/setup-database

That's it! The application is now ready to run.

## Scripts

### bin/watch

This script looks at the `less/` directory and automatically compiles the
stylesheets whenever a file is written.

### bin/less

This script compiles `less/main.less` into `public/css/main.css`.

### bin/jshint

This script takes a look at all JavaScript files in the project and reports back
any potential problems and syntax errors.

### bin/test

This script runs the unit-tests of the application and reports back the results.

### bin/console

This script bootstraps the application and provides a console interface to so
you can interact with the application programmatically and in real-time.

### bin/vendor

This script copies all necessary third-party components into the project.

### bin/setup-database

This script forcefully recreates the database and populates it with data to get
the website up-and-running.

### bin/www

This script bootstraps the application and starts it up as a HTTP service.

#### Debug

Debug mode is enabled by running the script like described below:

    $ DEBUG=solarphase ./bin/www

