# Project Name

> Bug-Tracker-API

## Table of contents

- [General info](#general-info)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)

## General info

This API has been developed to GET, POST, and AGGREGATE data from a Mongo Database, which has information of comments, issues, projects, and users, where they are correlated to create a Bug-Tracker.

## Screenshots

![Get all issues](./images/issues.jpg)
![Get Comments by Author](./images/commentsByAuthor.jpg)

## Technologies

- Body-Parser - version 5.1.0
- Express - version 4.17.1
- MongoDB - version 3.6.2

## Setup

In order to use this API, you will need to run:

- `npm install`

Also you will need to set your DataBase (See example below)

- `$env:MONGO_URI="mongodb+srv://user:password@cluster0.2rje0.mongodb.net/?retryWrites=true&w=majority"`

Finally run:

- `npm run start:dev`

## Features

List of features ready and TODOs for future development

- Users Functions: get all users,get by ID and add a new user.
- Projects Functions: get all projects, get by ID, get all issues for a project, add project, and add new issues to a project individually.
- Issues Functions: get all issues, get by ID, get all comments for an issue, add new comment to an issue.
- Comments Functions: get all comments, get all comments for an author.

To-do list:

- Add issue linking, due dates, watcher of an issue, and email notifications (December/2020)
- Unit test (December/2020)
- Docker-ise (December/2020)
- Frontend (January/2021)

## Status

Project is: _in progress_

## Inspiration

This project is the result of my Cloud-Based-Web-Application (CBWA) in College.

## Contact

Created by [@Danilo Pereira](https://github.com/danilo0391) - feel free to contact me!
