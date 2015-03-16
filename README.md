# Pomodoro Time Management App

A web application that helps manage one's time to increase work productivity and quality based on the Pomodoro time management method. Essentially, this method recommends 25 minutes working period divided by 5 minute breaks. This app makes this easy by providing countdown timers, which can be started, paused, and reset at any time by the user. The app also features a task list (in the form of sticky notes); the user can freely add and delete tasks that they plan to get done. To use the task list, be sure to first register and log in via the top-right navigation area.

## The Stack
This app runs on a [MEAN.JS](http://meanjs.org) stack, which contains the following frameworks:
* [AngularJS](https://angularjs.org/) - For the app's frontend functionality
* [MongoDB](http://mongodb.org/) and [Express](http://expressjs.com/) - For user authentication

### Fontend File Structure
The files containing the app's frontend functionality are located in: `/public/modules/core/`
* `views/` - HTML views for each main section of the app, which are connected to the AngularJS controllers
* `controllers/` - AngularJS controllers corresponding to each of these views
* `config/core.client.routes.js` handles all of the frontend routing for the app's single page architecture
* `services/timer.client.service.js` provides functionality for starting, stopping, and resetting the timer
* `filters/timecode.client.filer.js` contains the filter that converts milliseconds into "0:00" format
* `css/core.css` - The CSS file for styling the application

## Installation

### Required Components
* Node.js - Download and install [Node.js](https://nodejs.org/download/), which will also install NPM (Node Package Manager)
* MongoDB - Download and install [MongoDB](http://www.mongodb.org/downloads). For assistance, see [MongoDB's documentation](http://docs.mongodb.org/manual/)
* Bower - Download and install [Bower Package Manager](http://bower.io/). Bower will be used by this app to install frontend packages. To install Bower, ensure that Node.js/NPM is already installed and run the following:
```
$ npm install -g bower
```

### Required Tools
* Grunt - Download and install Grunt:
```
$ npm install -g grunt-cli
```

### Running the App
* Clone this app's repository
```
$ git clone https://github.com/dreLT/pomodoro.git
```
* Now in the project's root directory, install all dependencies:
```
$ npm install
```
* Start up MongoDB, ensuring that it is running on the default port (27017). For assistance, see [MongoDB's documentation](http://docs.mongodb.org/manual/)
* Run `grunt` in the root directory to initiate the local server and Grunt tasks. Then go to `http://localhost:3000` in your browser to see the running app.

## Progress

### To do
* Add a universal "Ping" sound once timer reaches 0:00 so that user knows his/her time is up regardless of where they are on their system.
* Stlying: More styling is needed, especially for the sticky notes, which could look more like sticky notes! (for example, using a black sharpee font for the text on the notes). It would also be great to animate adding, deleting, and hovering over notes using CSS3 animations.