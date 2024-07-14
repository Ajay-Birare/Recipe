let recipeContainer = document.querySelector(".recipeContainer");
let ingredientList = document.querySelector(".ingredientList");

let recipeForm = document.querySelector(".recipeForm");
let fetchingError = document.querySelector(".fetchingError");
let forNoMeal = document.querySelector(".forNoMeal");
let loader = document.querySelector(".loader");

let check = document.querySelector(".check");
let steps = document.querySelector(".steps");

let load = document.querySelector(".loading");

let recipeDetails = [];
let countRecipe = 0;

recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchIn = document.querySelector(".searchInput").value;

  if (searchIn == "") {
    console.log("no value");
    alert("please Enter Some Recipe in The Search Box");
    steps.style.display = "none";
  } else {
    fetchData(searchIn);
    steps.style.display = "none";
  }
});

async function fetchData(searchIn) {
  loader.style.display = "block";
  recipeContainer.innerHTML = "";
  ingredientList.style.display = "none";
  fetchingError.style.display = "none";

  // let searchIn = document.querySelector(".searchInput").value;

  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchIn}`
    );

    console.log(data);

    if (!data.ok) {
      throw new Error(data.ok);
    }

    const response = await data.json();
    loader.style.display = "none";

    response.meals.forEach((data) => {
      // console.log(data.strInstructions);

      console.log(data);

      // inner Div which has all the recipes---
      let Menu = document.createElement("div");
      Menu.setAttribute("class", "recipe");

      let img = document.createElement("img");
      img.src = data.strMealThumb;

      let strmeal = document.createElement("h2");
      strmeal.innerHTML = data.strMeal;

      let strarea = document.createElement("h3");
      strarea.innerHTML = data.strArea + " Dish";

      let strcategory = document.createElement("h5");
      strcategory.innerHTML = data.strCategory + " Catogory ";

      let viewrecipe = document.createElement("button");
      viewrecipe.classList.add("recipeShow");
      viewrecipe.innerHTML = "View Recipe";

      let details = document.createElement("p");
      steps.innerHTML = data.strInstructions;

      console.log(steps);

      // click on the button to show the recipe
      viewrecipe.onclick = () => {
        // when we want to see recipe steps then there will be ingredient also present so we have to hide it
        ingredientList.style.display = "none";

        console.log("Click the button");
        steps.style.display = "block";
        steps.innerHTML = data.strInstructions;
        let btn = document.createElement("button");
        btn.classList.add("backBtn");
        btn.innerHTML = "<";

        //on click the recipe will be cancel to the main list of recipe items
        btn.onclick = () => {
          steps.style.display = "none";
        };
        steps.prepend(btn);

        let str = data.strInstructions;
        let arr = str.split(".");

        // console.log(arr);

        arr.forEach((data) => {
          let p = document.createElement("p");
          p.innerHTML = data.strInstructions;
          // steps.append(p);
          // console.log(data);
        });
      };

      let ingredient = document.createElement("button");
      ingredient.innerHTML = "Ingredient";

      ingredient.addEventListener("click", () => {
        // ingredient list will open then we have to close the recipe steps
        steps.style.display = "none";
        ingredientList.style.display = "block";

        console.log(data);

        const itemList = [];

        for (let i in data) {
          if (i.includes("strIngredient")) {
            if (data[i] != "") {
              // console.log("ha ingredient hai");
              itemList.push(`<li>${data[i]}</li>`);
            }
          }
        }

        ingredientList.innerHTML = itemList.join("");

        if (!ingredientList.querySelector(".backBtn")) {
          let backBtn = document.createElement("button");
          backBtn.innerHTML = "<";
          backBtn.classList.add("backBtn");
          ingredientList.prepend(backBtn);

          backBtn.onclick = () => {
            ingredientList.style.display = "none";
          };
        }

        // Add logic to populate ingredientList with actual ingredients
      });

      Menu.append(img, strmeal, strarea, strcategory, viewrecipe, ingredient);
      recipeContainer.appendChild(Menu);

      let ins = data.strInstructions;
    });
  } catch (er) {
    fetchingError.style.display = "block";
    console.log("galat ");
  }
}

// fetchData();

//______________________________________________________________________
