// Recipe Data
const recipes = [
  { title: "Pasta Alfredo", difficulty: "easy", time: 20 },
  { title: "Chicken Curry", difficulty: "medium", time: 45 },
  { title: "Beef Steak", difficulty: "hard", time: 60 },
  { title: "Grilled Sandwich", difficulty: "easy", time: 10 },
  { title: "Veg Biryani", difficulty: "medium", time: 50 },
  { title: "Chocolate Cake", difficulty: "hard", time: 70 },
  { title: "Fruit Salad", difficulty: "easy", time: 15 },
  { title: "Paneer Butter Masala", difficulty: "medium", time: 35 }
];

// State
let currentFilter = "all";
let currentSort = "none";

// DOM Elements
const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// Render Recipes
function renderRecipes(recipeList) {
  recipeContainer.innerHTML = "";

  recipeList.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
      <p><strong>Time:</strong> ${recipe.time} mins</p>
    `;

    recipeContainer.appendChild(card);
  });
}

// Filter Functions (Pure)
function filterRecipes(data, filter) {
  switch (filter) {
    case "easy":
      return data.filter(r => r.difficulty === "easy");
    case "medium":
      return data.filter(r => r.difficulty === "medium");
    case "hard":
      return data.filter(r => r.difficulty === "hard");
    case "quick":
      return data.filter(r => r.time < 30);
    default:
      return data;
  }
}

// Sort Functions (Pure)
function sortRecipes(data, sortType) {
  const copied = [...data];

  switch (sortType) {
    case "name":
      return copied.sort((a, b) => a.title.localeCompare(b.title));
    case "time":
      return copied.sort((a, b) => a.time - b.time);
    default:
      return copied;
  }
}

// Update Display (Main Flow)
function updateDisplay() {
  let result = filterRecipes(recipes, currentFilter);
  result = sortRecipes(result, currentSort);
  renderRecipes(result);
}

// Active Button UI
function updateActiveButtons() {
  filterButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.filter === currentFilter) {
      btn.classList.add("active");
    }
  });

  sortButtons.forEach(btn => {
    btn.classList.remove("active");
    if (btn.dataset.sort === currentSort) {
      btn.classList.add("active");
    }
  });
}

// Event Listeners
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    updateActiveButtons();
    updateDisplay();
  });
});

sortButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentSort = button.dataset.sort;
    updateActiveButtons();
    updateDisplay();
  });
});

// Initial Load
updateDisplay();
updateActiveButtons();
