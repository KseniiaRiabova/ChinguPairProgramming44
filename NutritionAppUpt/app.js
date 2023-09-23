  const apiKey = "4ceeb71112c9b83f1cc0b6ac54b946aa  ";
const appId = "326422bd";




const script = document.createElement('script');
script.src = './chart.js';
document.head.appendChild(script);

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
    const recipeIngredients = recipe.ingredientLines;
    const recipeNutrients = recipe.totalNutrients;
    const recipeCalories = recipe.calories;
    const recipeFat = recipe.digest[0].total;
    const recipeCarb = recipe.digest[1].total;
    const recipeProtein = recipe.digest[2].total;
    
    // const script = document.createElement('script');
    // script.src = './chart.js';
    



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
      <h3>Nutrition Information</h3>
      </div>
      <div class="ulul">
      <ul>
        <li>Sugar: ${recipeNutrients.SUGAR?.quantity || 0}${recipeNutrients.SUGAR?.unit || "g"}</li>
        <li>Cholesterol: ${recipeNutrients.CHOLE?.quantity || 0}${recipeNutrients.CHOLE?.unit || "mg"}</li>
        <li>Fiber: ${recipeNutrients.FIBTG?.quantity || 0}${recipeNutrients.FIBTG?.unit || "g"}</li>
        <li>Iron: ${recipeNutrients.FE?.quantity || 0}${recipeNutrients.FE?.unit || "mg"}</li>
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
      <p>Fat: ${recipeNutrients.FAT?.quantity || 0}${recipeNutrients.FAT?.unit || "g"}</p>
      <p>Protein: ${recipeNutrients.PROCNT?.quantity || 0}${recipeNutrients.PROCNT?.unit || "g"}</p>
      <p>Carbs: ${recipeNutrients.CHOCDF?.quantity || 0}${recipeNutrients.CHOCDF?.unit || "g"}</p>
      </div>
      
    `;

    
    // const column3 = document.createElement("div");
    // column3.classList.add("column");
    // column3.innerHTML = `
    //   <canvas id="doughnut-chart-${hit.recipe.uri}" width="100" height="100"></canvas>
    //   <p>Calories: ${recipeCalories.toFixed(2)} kcal</p>
    //   <p>Fat: ${recipeNutrients.FAT?.quantity || 0}${recipeNutrients.FAT?.unit || "g"}</p>
    //   <p>Protein: ${recipeNutrients.PROCNT?.quantity || 0}${recipeNutrients.PROCNT?.unit || "g"}</p>
    //   <p>Carbs: ${recipeNutrients.CHOCDF?.quantity || 0}${recipeNutrients.CHOCDF?.unit || "g"}</p>
    // `;

    recipeCard.appendChild(recipeNameLine);
    recipeCard.appendChild(column1);
    recipeCard.appendChild(column2);
    const recipeCardContainer = document.createElement("div");
    recipeCardContainer.classList.add("card-container");
    
    // recipeCard.appendChild(column3);
    
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
    var xValues = ["Fat", "Carbs", "Proteines"];
    const yValues = [recipeFat, recipeCarb, recipeProtein];
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797"
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
// function init() {
//   document.getEle)ntBId("searchButton").addEventListener("click", searchRecipes);
// }

// loadChartJs(init);
