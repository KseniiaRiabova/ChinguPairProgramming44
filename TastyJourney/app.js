const apiKey = "4f6ea0d2c1fa21a49b9dffc66df88af6";
const appId = "94f3ff0e";

let page = 1; // Initialize the page number to 1

const script = document.createElement('script');
script.src = './chart.js';
document.head.appendChild(script);


function searchRecipes() {
  const query = document.getElementById("searchInput").value;
  const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&from=${page}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Update the page variable if there's a next page link
      if (data._links?.next?.href) {
        const nextPageNumber = new URL(data._links.next.href).searchParams.get('from');
        page = parseInt(nextPageNumber, 10);
      } else {
        page++; // Increment the page if there's no next page link
      }

      displayResults(data);
    })
    .catch((error) => {
      console.error(error);
    });
}



function renderChartCanvas(chartCanvasId, yValues) {
  return new Promise((resolve) => {
    
    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
      ];

    // Wait for the next animation frame to ensure DOM update
    new Chart(chartCanvasId, {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: false,
            
          }
        }
      });
      resolve();
    });
  
}

let a = 0;
function displayResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; 
  
  
  
  data.hits.forEach((hit) => {
    a+=1;
    const recipe = hit.recipe;
    const recipeName = recipe.label;
    const recipeImage = recipe.image;
    const servings = recipe.yield;
    const recipeIngredients = recipe.ingredientLines;
    const recipeNutrients = recipe.totalNutrients;
    const recipeCalories = recipe.calories;
    const recipeFat = (recipe.digest[0].total || 0).toFixed(2); 
    const recipeCarb = (recipe.digest[1].total || 0).toFixed(2); 
    const recipeProtein = (recipe.digest[2].total || 0).toFixed(2);
    const recipeUrl = recipe.url; 

    // Create a recipe card container
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

 
    const recipeNameLine = document.createElement("div");
    recipeNameLine.innerHTML = `<h2><a href="${recipeUrl}" target="_blank">${recipeName}</a></h2>`;

    // First Column: Image and Ingredients
    const column1 = document.createElement("div");
    column1.classList.add("panou1");
    column1.innerHTML = `
      <img src="${recipeImage}" alt="${recipeName}" />
      
      
      
      <div class="nutrition">
      <div class="h3ul">
      <p>Number of servings: ${servings}</p>
      <p></p>
      <h3>Nutrition Information</h3>
     
      </div>
      <div class="ulul">
      <ul>
      <li>Sugar: ${(recipeNutrients.SUGAR?.quantity || 0).toFixed(2)}${recipeNutrients.SUGAR?.unit || "g"}</li>
      <li>Cholesterol: ${(recipeNutrients.CHOLE?.quantity || 0).toFixed(2)}${recipeNutrients.CHOLE?.unit || "mg"}</li>
      <li>Fiber: ${(recipeNutrients.FIBTG?.quantity || 0).toFixed(2)}${recipeNutrients.FIBTG?.unit || "g"}</li>
      <li>Iron: ${(recipeNutrients.FE?.quantity || 0).toFixed(2)}${recipeNutrients.FE?.unit || "mg"}</li>
      </ul>
      </div>
      </div>

    `;

    const chartCanvasId = `canvas-${a}`;
    
    
    const chartContainer = document.createElement("div");
    chartContainer.id = `container-${a}`;
    
    chartContainer.classList.add("chart-container");

    column1.appendChild(chartContainer);
    const chartCanvas = document.createElement("canvas");
    chartCanvas.id = chartCanvasId;
    chartContainer.appendChild(chartCanvas);

    // renderChartCanvas(chartCanvasId, yValues)
    // .then(() => {
    // // Do the rest of the code after chartCanvas is rendered
    // console.log('Chart canvas is rendered. Continue with the rest of the code.');
    // })
    // .catch((error) => {
    // console.error('Error rendering chart canvas:', error);
    // });
  const column2 = document.createElement("div");        
    column2.classList.add("panou2");
    column2.innerHTML = `
    <div class="ingredients">
      <h3>Ingredients</h3>
      <ul>
        ${recipeIngredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
      </div>
      <div class="fatCal">
      <p>Calories: ${recipeCalories.toFixed(2)} kcal</p>
      <p>Fat: ${(recipeNutrients.FAT?.quantity || 0).toFixed(2)}${recipeNutrients.FAT?.unit || "g"}</p>
      <p>Protein: ${(recipeNutrients.PROCNT?.quantity || 0).toFixed(2)}${recipeNutrients.PROCNT?.unit || "g"}</p>
      <p>Carbs: ${(recipeNutrients.CHOCDF?.quantity || 0).toFixed(2)}${recipeNutrients.CHOCDF?.unit || "g"}</p>
      </div>
      
    `;
    document.getElementById("loadMoreButton").addEventListener("click", loadMoreResults);
    
   // Append the recipe card to the results container

    recipeCard.appendChild(recipeNameLine);
    recipeCard.appendChild(column1);
    recipeCard.appendChild(column2);
    const recipeCardContainer = document.createElement("div");
    recipeCardContainer.classList.add("card-container");
     // Append the recipe card to the results container
    recipeCardContainer.appendChild(recipeCard);
    resultsDiv.appendChild(recipeCardContainer);
    function delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
    
    async function test() {
      console.log('start timer');
      await delay(1000);
      console.log('after 1 second');
    }
    
    test();
    var xValues = ["Fat", "Carbs", "Protein"];
    const yValues = [recipeFat, recipeCarb, recipeProtein].map(parseFloat);
    var barColors = [
      "#BB2525",
      "#FFCC70",
      "#7CB938"
      ];

    // Wait for the next animation frame to ensure DOM update
    new Chart(chartCanvasId, {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: false,
            
          }
        }
      });

  });
}
function loadMoreResults() {
  if (page > 0) {
    page++; // Increment the page variable
    searchRecipes();
  }
}

// Function to handle Enter key press
function handleEnterKey(event) {
  if (event.key === "Enter") {
    searchRecipes();
  }
}

// Add event listener to the input field
document.getElementById("searchInput").addEventListener("keyup", handleEnterKey);
