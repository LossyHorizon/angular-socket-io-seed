# Updated Angular Socket.io Seed

This is a fork of the excellent Angular/Socket.io seed developed by Brian Ford
https://github.com/btford/angular-socket-io-seed 
with updates to the components it relies on, code changes where necessary, and 
and a few misc changes to files. 

See Brian's excellent https://github.com/btford/angular-socket-io-seed/blob/master/README.md 
for more info, this readme concentrates mostly on what I have changed.

## Requirements
  * Node.js 0.10.x or higher
  * bower _however bower managed files are part of this repository_
  * socket.io module compiles ?

I have only tested this on Linux, I have no idea if it can be built on Windows.

## Change summary

Changed requirements in packages.json.  Not listed is all the new middle ware entries needed
because of the changes between Express 3.x and 4.x.  I also changed the app name and added a
"scripts" section so "npm start" syntax works.

|  component   |  OLD ver    |   NEW ver    |
|--------------|-------------|--------------|
| socket.io    |  0.9.16     |  1.1.0       |
| Jade.io      |  0.31.2     |  1.6.0       |
| expressJS    |  3.2.6      |  4.8.8       |

Changed Requirements in bower.json

|  component         |  OLD ver    |   NEW ver    |
|--------------------|-------------|--------------|
| angular-socket-io  |  0.3.0      |  0.6.0       |
| angular-route      |  1.2.14     |  1.2.23      |
| angular            |  1.2.14     |  1.2.23      |

In views/layout.jade the first two lines are changed because how the doctype is given has
changed.

Major changes to app.js driven by changed Express major version.  I have also added
code to take the app name and version from packages.json and make it available to the 
Jade template code in views/partials/partial2.jade

## To install

    git clone git://github.com/LossyHorizon/angular-socket-io-seed  myApp
    cd myApp
    npm install
    bower update angular
    npm start

The more classic "node app.js" will also work.

## Handy commands
Some Linux command lines that I found useful while working on this.

    # Display a styled tree of the files, excluding the node_modules tree
    tree -I node_modules

    # Search the tree for 'Bob', but exclude the libs from that search
    find . -name "*" -not -path "./node_modules/*" -not -path "./.git/*" -not -name ".bowerrc" -not -name ".gitignore" -exec grep -H --color "Bob"  {} \;

    # Edit all the .json config files *NOT* in node_modules
    vi `find . -name "*.json" -not -path "./node_modules/*" -not -path "./.git/*"`


