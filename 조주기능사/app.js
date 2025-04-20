// app.js

function loadCocktailData() {
  return fetch("recipe_24.json").then((response) => response.json());
}

function loadMaterialData() {
  return fetch("material.json").then((response) => response.json());
}

function getRandomCocktail(recipes) {
  const cocktailNames = Object.keys(recipes);
  const randomIndex = Math.floor(Math.random() * cocktailNames.length);
  const randomCocktailName = cocktailNames[randomIndex];
  return { name: randomCocktailName, recipe: recipes[randomCocktailName] };
}

function displayCocktail(cocktail, materialData) {
  document.getElementById(
    "cocktail-name"
  ).innerHTML = `${cocktail.name} <sup class="subtitle">#${cocktail.recipe.번호}</sup>`;

  const MethodDiv = document.getElementById("method");
  MethodDiv.innerHTML = materialData.조주법
    .map((method) => {
      return `<label class="card"><input type="checkbox" name="method" value="${method}">${method}</label>`;
    })
    .join("");

  const glassDiv = document.getElementById("glass");
  glassDiv.innerHTML = Object.entries(materialData.글라스)
    .map(([glass, data]) => {
      const img = data.img;
      return `<label class="card">
                <img src="imgs/${img}.png" alt="${glass}" class="glass-image">
                <input type="checkbox" name="glass" value="${glass}">
                <span>${data.name}</span></label>`;
    })
    .join("");

  const garnishDiv = document.getElementById("garnish");
  garnishDiv.innerHTML = Object.entries(materialData.가니쉬)
    .map(([garnish, data]) => {
      const img = data.img;
      return `<label class="card">
                <img src="imgs/${img}.png" alt="${garnish}" class="glass-image">
                <input type="checkbox" name="garnish" value="${garnish}">
                <span>${garnish}</span>
              </label>`;
    })
    .join("");

  const ingredientsDiv = document.getElementById("ingredients");
  ingredientsDiv.innerHTML = materialData.재료
    .map((ingredient) => {
      const isChecked =
        cocktail.recipe.재료 && cocktail.recipe.재료.hasOwnProperty(ingredient);
      return `<label class="card"><input type="checkbox" name="ingredient" value="${ingredient}" ${""}>${ingredient}</label>`;
    })
    .join("");
}

function collectUserAnswer() {
  const method = Array.from(
    document.querySelectorAll('#method input[name="method"]:checked')
  ).map((input) => input.value)[0]; // 단일 선택이므로 첫 번째 값만 가져옴
  const glass = Array.from(
    document.querySelectorAll('#glass input[name="glass"]:checked')
  ).map((input) => input.value)[0]; // 단일 선택이므로 첫 번째 값만 가져옴
  const garnish = Array.from(
    document.querySelectorAll('#garnish input[name="garnish"]:checked')
  ).map((input) => input.value);
  const ingredients = Array.from(
    document.querySelectorAll('#ingredients input[type="checkbox"]:checked')
  ).map((input) => input.value);
  return { method, glass, garnish, ingredients };
}

function checkAnswer(userAnswer, cocktail) {
  const isMethodCorrect = userAnswer.method === cocktail.recipe.조주법;
  const isGlassCorrect = userAnswer.glass === cocktail.recipe.글라스;
  const isGarnishCorrect =
    JSON.stringify(userAnswer.garnish.sort()) ===
    JSON.stringify(Object.keys(cocktail.recipe.가니쉬).sort());
  const isIngredientsCorrect =
    JSON.stringify(userAnswer.ingredients.sort()) ===
    JSON.stringify(Object.keys(cocktail.recipe.재료).sort());

  const isCorrect =
    isMethodCorrect &&
    isGlassCorrect &&
    isGarnishCorrect &&
    isIngredientsCorrect;

  console.table({
    선택지: ["조주법", "글라스", "가니쉬", "재료"],
    선택: [
      userAnswer.method,
      userAnswer.glass,
      userAnswer.garnish.join(", "),
      userAnswer.ingredients.join(", "),
    ],
    정답: [
      cocktail.recipe.조주법,
      cocktail.recipe.글라스,
      Object.keys(cocktail.recipe.가니쉬).join(", "),
      Object.keys(cocktail.recipe.재료).join(", "),
    ],
    "정답 여부": [
      isMethodCorrect,
      isGlassCorrect,
      isGarnishCorrect,
      isIngredientsCorrect,
    ],
  });

  // if (isCorrect) score++;
  return isCorrect;
}

let score = 0; // 점수
let totalQuestions = 0; // 전체 문제 수
let attemptedQuestions = 0; // 풀이한 문제 수

function displayScore() {
  const scoreElement = document.getElementById("score");
  const percentage =
    attemptedQuestions > 0 ? Math.round((score / attemptedQuestions) * 100) : 0;
  scoreElement.textContent = `${percentage}% (${score}/${attemptedQuestions})`;
}

async function initializeQuiz(index) {
  try {
    const [recipeData, materialData] = await Promise.all([
      loadCocktailData(),
      loadMaterialData(),
    ]);
    if (!recipeData || !materialData) {
      throw new Error("Failed to load data");
    }
    const cocktails = recipeData;
    totalQuestions = Object.keys(cocktails).length;
    let cocktail;
    index = index - 1;
    if (index !== undefined && index >= 0 && index < totalQuestions) {
      cocktail = {
        name: Object.keys(cocktails)[index],
        recipe: Object.values(cocktails)[index],
      };
    } else {
      cocktail = getRandomCocktail(cocktails);
    }
    displayCocktail(cocktail, materialData);

    displayScore();
    const newCocktailCheckbox = document.getElementById(
      "new-cocktail-on-submit"
    );
    newCocktailCheckbox.checked = JSON.parse(
      localStorage.getItem("newCocktailOnSubmit") || "false"
    );

    const submitButton = document.getElementById("submit-answer");
    const nextQuestionCheckbox = document.getElementById("next-question");
    const form = document.getElementById("quiz-form");

    submitButton.addEventListener("click", () => {
      const userAnswer = collectUserAnswer();
      const isCorrect = checkAnswer(userAnswer, cocktail);
      if (isCorrect) score++;
      attemptedQuestions++;
      displayScore();
      displayFeedback(isCorrect, userAnswer, cocktail);

      if (document.getElementById("new-cocktail-on-submit").checked)
        initializeQuiz();
      localStorage.setItem(
        "newCocktailOnSubmit",
        JSON.stringify(newCocktailCheckbox.checked)
      );
      if (form) {
        form.querySelectorAll("input:not([type=checkbox])").forEach((input) => {
          input.value = "";
        });
      }
    });

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error initializing quiz:", error);
    document.getElementById("message").textContent =
      "퀴즈를 불러오는 데 실패했습니다.";
  }
}

function displayFeedback(isCorrect, userAnswer, cocktail) {
  const resultDiv = document.getElementById("result");
  const message = isCorrect ? "정답입니다!" : "오답입니다.";
  resultDiv.querySelector("#message").textContent = message;

  const answerTable = resultDiv.querySelector("#answer-table");
  answerTable.innerHTML = ""; // 이전 내용 초기화

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th></th><th>정답</th><th>선택</th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  const createTableRow = (label, correctAnswer, userChoice, isCorrect) => {
    const row = document.createElement("tr");
    const labelCell = document.createElement("td");
    labelCell.textContent = label;
    row.appendChild(labelCell);

    const correctAnswerCell = document.createElement("td");
    correctAnswerCell.textContent = correctAnswer;
    row.appendChild(correctAnswerCell);

    const userChoiceCell = document.createElement("td");
    userChoiceCell.textContent = userChoice;
    row.appendChild(userChoiceCell);

    if (isCorrect) {
      row.classList.add("correct");
    } else {
      row.classList.add("incorrect");
    }
    return row;
  };

  tbody.appendChild(
    createTableRow(
      "조주법",
      cocktail.recipe.조주법,
      userAnswer.method,
      userAnswer.method === cocktail.recipe.조주법
    )
  );
  tbody.appendChild(
    createTableRow(
      "글라스",
      cocktail.recipe.글라스,
      userAnswer.glass,
      userAnswer.glass === cocktail.recipe.글라스
    )
  );

  const ccreateGarnishRow = (userGarnish, correctGarnish) => {
    const row = document.createElement("tr");
    const labelCell = document.createElement("td");
    labelCell.textContent = "가니쉬";
    row.appendChild(labelCell);

    const correctGarnishCell = document.createElement("td");
    correctGarnishCell.textContent = correctGarnish.join(", ");
    row.appendChild(correctGarnishCell);

    const userGarnishCCell = document.createElement("td");
    const userGarnishCText = userGarnish
      .map((garnish) => {
        const isCorrect = correctGarnish.includes(garnish);
        return `<span style="background-color: ${
          isCorrect ? "lightgreen" : "lightcoral"
        }; padding: 2px;">${garnish}</span>`;
      })
      .join(", ");
    userGarnishCCell.innerHTML = userGarnishCText;
    row.appendChild(userGarnishCCell);

    const isGarnishCorrect =
      JSON.stringify(userGarnish.sort()) ===
      JSON.stringify(correctGarnish.sort());
    row.classList.add(isGarnishCorrect ? "correct" : "incorrect");
    return row;
  };

  const userGarnish = userAnswer.garnish;
  const correctGarnish = Object.keys(cocktail.recipe.가니쉬);
  tbody.appendChild(ccreateGarnishRow(userGarnish, correctGarnish));
  table.appendChild(tbody);
  answerTable.appendChild(table);

  const createIngredientsRow = (userIngredients, correctIngredients) => {
    const row = document.createElement("tr");
    const labelCell = document.createElement("td");
    labelCell.textContent = "재료";
    row.appendChild(labelCell);

    const correctIngredientsCell = document.createElement("td");
    correctIngredientsCell.textContent = correctIngredients.join(", ");
    row.appendChild(correctIngredientsCell);

    const userIngredientsCell = document.createElement("td");
    const userIngredientsText = userIngredients
      .map((ingredient) => {
        const isCorrect = correctIngredients.includes(ingredient);
        return `<span style="background-color: ${
          isCorrect ? "lightgreen" : "lightcoral"
        }; padding: 2px;">${ingredient}</span>`;
      })
      .join(", ");
    userIngredientsCell.innerHTML = userIngredientsText;
    row.appendChild(userIngredientsCell);

    const isIngredientsCorrect =
      JSON.stringify(userIngredients.sort()) ===
      JSON.stringify(correctIngredients.sort());
    row.classList.add(isIngredientsCorrect ? "correct" : "incorrect");
    return row;
  };

  const userIngredients = userAnswer.ingredients;
  const correctIngredients = Object.keys(cocktail.recipe.재료);
  tbody.appendChild(createIngredientsRow(userIngredients, correctIngredients));
  table.appendChild(tbody);
  answerTable.appendChild(table);
}

document.addEventListener("DOMContentLoaded", initializeQuiz);
