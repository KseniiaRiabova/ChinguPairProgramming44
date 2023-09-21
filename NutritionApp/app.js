const apiKey = "0dd48b926d7cbc5c6120be5c25e9c9b9";
const appId = "94f3ff0e";

function searchRecipes() {
  const query = document.getElementById("searchInput").value;

  const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clearing previous result information

  // Iterating through recipes and display them
  data.hits.forEach((hit) => {
    const recipe = hit.recipe;
    const recipeName = recipe.label;
    const recipeImage = recipe.image;
    const recipeNutrients = recipe.totalNutrients;
    const recipeUrl = recipe.url;
    const recipeSource = recipe.source;
    const recipeIngredients = recipe.ingredientLines;
 
    const recipeCalories = recipe.calories;
    const recipeElement = document.createElement("div");

    // Display the image of the recipe
    recipeElement.innerHTML = `<img src="${recipeImage}" alt="${recipeName}" />`;

    // Display the recipe name as a link to the recipe
    recipeElement.innerHTML += `<h2><a href="${recipeUrl}" target="_blank">${recipeName}</a></h2>`;
    recipeElement.innerHTML += `<p>Source: ${recipeSource}</p>`;

    // Display the list of ingredients with a heading "Ingredients"
    recipeElement.innerHTML += "<h3>Ingredients</h3>";
    recipeElement.innerHTML += "<ul>";
    recipeIngredients.forEach((ingredient) => {
      recipeElement.innerHTML += `<li>${ingredient}</li>`;
    });
    recipeElement.innerHTML += "</ul>";
    
    // Display the calories
    if (recipeCalories) {
      recipeElement.innerHTML += `<p>Calories: ${recipeCalories.toFixed(2)}</p>`;
    }




    // Display the nutrition data
    recipeElement.innerHTML += "<h3>Nutrition Information</h3>";
    recipeElement.innerHTML += "<ul>";
    for (const nutrientLabel in recipeNutrients) {
      if (recipeNutrients.hasOwnProperty(nutrientLabel)) {
        const nutrient = recipeNutrients[nutrientLabel];
        recipeElement.innerHTML += `<li>${nutrient.label}: ${nutrient.quantity} ${nutrient.unit}</li>`;
      }
    }
    recipeElement.innerHTML += "</ul>";

    resultsDiv.appendChild(recipeElement);
  });
}
