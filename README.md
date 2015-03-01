# SolarPhase

SolarPhase is the personal portfolio and blog of developer __Kimmy Andersson__
and here you can find the complete source-code that powers the website.

## License

This piece of software is licensed under the ISC license which you can read in
the accompanying LICENSE file.

## Installation

### Requirements

 * Node.js
 * NPM
 * Bower
 * A posix-compliant OS. (Linux, OSX, etc)

### Steps

Start out by cloning the repository into a directory on your local drive.

    $ git clone https://github.com/solarphase/app solarphase-app

Next, cd into the directory and run the following commands from the project root
to fetch the third-party components required by the app.

    $ npm install
    $ bower install

Now you will need to copy the third-party components installed by bower into an
accessible location. This is automated by a script so all you have to do is run
the following command from the project root.

    $ ./bin/vendor

You will also have to compile the LESS stylesheets and populate the database
by running the following commands.

    $ ./bin/less
    $ ./bin/force-database

And that's it. The application should now be ready for development/running.

## Common Operations

### Watch

When developing, running the LESS compiler every time you've made a change can
be an annoying chore. That's why I've implemented a watch script that automates
this process for you. It will detect any write performed in the less directory
and will automatically run the LESS compiler.

    $ ./bin/watch

### LESS

The stylesheets of the application are defined in LESS, meaning you will have to
compile the stylesheets into CSS.

    $ ./bin/less

### JavaScript Hinting

Because JavaScript doesn't have any form of preprocessing or compiler, hinting
is an essential part in the toolchain to keep the code as correct as possible.

    $ ./bin/jshint

### Unit Tests

Most relevant moving parts of the app are unit-tested to ensure functionality is
as expected.

    $ ./bin/test

### Console

To interact with the models without having to use the website, I have created a
REPL command-line application that automatically bootstraps the app for you and
gives you a command-line JavaScript interface to interact with the app.

    $ ./bin/console

### Vendor Components

The app relies on a number of third-party (or vendor) components to function.
Bower components are usually required by the client and need to be copied into
the project structure to be enabled.

    $ ./bin/vendor

### Populating the Database

The database by default has no data when you run the application for the first
time. You can populate the database with test data by running the supplied
script.

Note: This will clear the current database and repopulate it with the test data.

    $ ./bin/force-database

### Running the App

The app can be started by running the supplied `www` script.

    $ DEBUG=solarphase ./bin/www

