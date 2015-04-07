# Pomodoro Time Management App

A single-page web application that helps one manage time during the work day and increase productivity and work quality. This app's functionality is based on the Pomodoro time management method, which recommends 25-minutes work periods followed by 5-minute breaks. The app keeps track of these periods with countdown timers, which the user can start, pause, and reset at any time. It also features a task list (in the form of sticky notes); tasks can be added, marked "done", and deleted. 

**The app is live:** [http://pomodoromgmt.herokuapp.com/](http://pomodoromgmt.herokuapp.com/) 

**Important:**  
To see the task list in action, simply login with the following credentials -    
Username: andre   
Password: abcd1234  

To add a task, simply click "Add Task". Hover over a task to see options to edit, delete, and mark a task "complete". Once a task is marked complete, hover over it to see options to undo marking it complete, or delete the task.

## The Stack
This app runs on a [MEAN.JS](http://meanjs.org) stack, which contains the following frameworks:
* [AngularJS](https://angularjs.org/) - For the app's frontend functionality
* [MongoDB](http://mongodb.org/) and [Express](http://expressjs.com/) - For the database and user authentication, respectively

### Fontend File Structure
The app's frontend functionality is located in: `/public/modules/core/`
* `views/` - HTML views for each part of the app, linked up to the AngularJS controllers
* `controllers/` - AngularJS controllers associated with each of these views
* `config/core.client.routes.js` handles frontend routing for single-page architecture
* `services/timer.client.service.js` contains functionality for starting, stopping, and resetting the timers
* `filters/timecode.client.filer.js` contains the filter that converts milliseconds into the timer's "0:00" format
* `css/core.css` - The CSS file containing the app's styles

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

### Still to do
* Add a universal "Ping" sound once timer reaches 0:00 so that user knows his/her time is up regardless of where they are on their system.
* Working on a button that will delete all tasks that have been marked complete by the user ("Clear Completed Tasks")
* Stlying: More styling needs to be added, especially to the sticky notes (a more realistic sticky-note graphic, a "marker" like font for the task name, an "X" overlay on completed tasks, CSS3 animations).