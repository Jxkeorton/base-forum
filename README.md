# Base Forum

The live link can be found here: [Live Site - Base Forum](https://base-forum-630b73fc7bab.herokuapp.com/)

## Table of Contents

* [User Experience Design](#user-experience-design)
  * [Strategy Plane](#strategy-plane)
    * [Site Goals](#site-goals)
    * [Agile Planning](#agile-planning)
      * [Epics](#epics)
      * [User Stories](#user-stories)
  * [Scope Plane](#scope-plane)
  * [Skeleton Plane](#skeleton-plane)
    * [Wireframes](#wireframes)
    * [Database Design](#database-design)
    * [Security](#security)
  * [Structure Plane](#structure-plane)
    * [Features](#features)
    * [Features Left To Implement](#features-left-to-implement)
  * [Surface Plane](#surface-plane)
    * [Design](#design)
    * [Colour Scheme](#colour-scheme)
    * [Typography](#typography)
    * [Imagery](#imagery)
  * [Technologies](#technologies)
  * [Testing](#testing)
  * [Deployment](#deployment)
    * [Version Control](#version-control)
    * [Heroku Deployment](#heroku-deployment)
    * [Run Locally](#run-locally)
    * [Fork Project](#fork-project)
  * [Credits](#credits)

# User-Experience-Design

## The-Strategy-Plane
### Site-Goals

### Agile Planning

Agile planning for the "Base Forum" project was organized into two sprints, each defined by milestones within GitHub. The first sprint focused on backend development, while the second sprint concentrated on frontend development.

#### Epics

Epics are large bodies of work that can be broken down into smaller tasks or user stories. For this project, the following epics were created for each sprint:

### Agile Planning

Agile planning for the "Base Forum" project was organized into two sprints, each defined by milestones within GitHub. The first sprint focused on backend development, while the second sprint concentrated on frontend development.

#### Epics

Epics are large bodies of work that can be broken down into smaller tasks or user stories. For this project, the following epics were created for each sprint:

1. **Sprint 1: Backend Development**

2. **Sprint 2: Frontend Development**



#### User Stories

User stories are smaller, manageable tasks derived from the epics. They define specific requirements from the perspective of the end user. Below are examples of user stories for each epic:

**Epic 1**

## The-Scope-Plane

* CRUD functionality on Profile and User Reviews
* Locations page for browsing base jumping locations
* Ability for users to save locations
* Ability for users to create reviews on locations
* Responsive Design - Devices 320px and up
* Hamburger menu for mobile devices

## The-Skeleton-Plane
### Wireframes
<details>
<summary>Wireframe pages</summary>

</details>

### Database-Design

<details>
<summary>Database diagram</summary>

</details>


### Security

User auth
protected routes
protected api calls / superusers

## The-Structure-Plane
### Features

<details>
<summary>Pages/menus/forms</summary>

</details>

<details>

### Features Left To Implement
In future releases the following features will be implemented...
- Email required on sign up
- Make the app more social allowing users to follow and view others profiles#
- Include a weather API for live weather updates at the locations

## The-Surface-Plane
### Colour-Scheme

### Typography


### Imagery
The logo was created by [@Buzzzy](https://www.fiverr.com/buzzzy?source=order_page_user_message_link) on fiverr, I own the rights to this logo.

The BASE jumping images for the locations are pulled from my friend [@mountainmanbase's](https://www.instagram.com/mountainmanbase/) instagram, with his permission of course.

## Technologies

## Testing 


## Deployment

### Version Control

The site was created using the Visual Studio Code editor and pushed to github to remote repositories ‘base-forum’ for the UI and 'base-locations-api' for the API.

The following git commands were used throughout development to push code to the remote repo:

```git add <file>``` - This command was used to add the file(s) to the staging area before they are committed.

```git commit -m “commit message”``` - This command was used to commit changes to the local repository queue ready for the final step.

```git push``` - This command was used to push all committed code to the remote repository on github.

### Heroku Deployment

The site was deployed to Heroku. The steps to deploy are as follows:

**UI**
To deploy the UI do the same process for the API minus the config vars steps.

**API**
- Navigate to heroku and create an account
- Click the new button in the top right corner
- Select create new app
- Enter app name
- Select region and click create app
- Go to the settings tab and then click reveal config vars
- Add the following config vars to the API app:
  - ALLOWED_HOST: (Your allowed host)
  - CLIENT_ORIGIN: (Your client origin url)
  - SECRET_KEY: (Your secret key)
  - DATABASE_URL: (This should already exist with add on of postgres)
  - CLOUNDINARY_URL: (cloudinary api url)
  - DISABLE_COLLECTSTATIC: 1 

- Click the deploy tab
- Scroll down to Connect to GitHub and sign in / authorize when prompted
- In the search box, find the repository you want to deploy and click connect
- Scroll down to Manual deploy and choose the main branch
- Click deploy

The app should now be deployed.

The live link can be found here: [Live UI](https://base-forum-630b73fc7bab.herokuapp.com/) [Live API](https://base-locations-api-29bf40c34f1d.herokuapp.com/)

### Run Locally

Navigate to the GitHub Repository you want to clone to use locally:

- Click on the code drop down button
- Click on HTTPS
- Copy the repository link to the clipboard
- Open your IDE of choice (git must be installed for the next steps)
- Type git clone copied-git-url into the IDE terminal

The project will now have been cloned on your local machine for use.

### Fork Project

Most commonly, forks are used to either propose changes to someone else's project or to use someone else's project as a starting point for your own idea.

- Navigate to the GitHub Repository you want to fork.

- On the top right of the page under the header, click the fork button.

- This will create a duplicate of the full project in your GitHub Repository.

## Credits

