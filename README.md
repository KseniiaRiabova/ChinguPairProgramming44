## Tasty Journey 

This is a web application for searching and displaying nutrition information for recipes. It utilizes the Edamam API to fetch recipe data and display it to the user.

![demo](https://github.com/KseniiaRiabova/Tasty-Journey/blob/main/TastyJourney/utils/demo.gif)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

## Features

- Search for recipes using keywords.
- Display detailed nutrition information for each recipe.
- Load more results to see additional recipes.
- The web application is designed to be responsive, providing an optimal viewing and interaction experience across a wide range of devices, including mobile phones and tablets.

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine by running the following command in your terminal:

```bash
git clone https://github.com/KseniiaRiabova/ChinguPairProgramming44.git
````

### 2. Create an Edamam Account and Obtain API Credentials
Before you can use this application, you need to create an account on the [Edamam developer portal](https://developer.edamam.com/) if you haven't already. Follow these steps:

* Go to the Edamam developer portal website.

* Sign up for an account or log in if you already have one.

* Once logged in, navigate to the "My Applications" section and create a new application.

* After creating your application, you will receive an **API Key** and an **App ID**. Make note of these credentials as you will need them in the next step.

### 3. Configure API Credentials

Open the `script.js` file in the project directory and add your Edamam API credentials as follows:

```javascript
const apiKey = "YOUR_API_KEY";
const appId = "YOUR_APP_ID";
```

Replace `"YOUR_API_KEY"` and `"YOUR_APP_ID"` with the API Key and App ID you obtained from Edamam.

### 4. Access the Application

Open the `index.html` file in your web browser directly or serve it using a local server. You can use a tool like "Live Server" for Visual Studio Code or any other local development server of your choice.

You're all set! You can now search for recipes and explore nutrition information using this web application

## Usage
1. Enter a recipe keyword in the search input and click "Search" to fetch recipes.

2. Click on a recipe to view its detailed information.

3. Click "Load More" to fetch additional recipes.

## Technologies Used

- **JavaScript, HTML, CSS:** Core web technologies for functionality and styling.
- [Chart.js](https://www.chartjs.org/): Used for interactive chart visualizations.
- [Edamam API](https://developer.edamam.com/): Used to retrieve recipe and nutrition data.
