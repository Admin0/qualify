document.addEventListener("DOMContentLoaded", async () => {
  const recipeList = document.getElementById("recipe-list");
  recipeList.classList.add("card-container");

  // 레시피 목록 생성
  function createRecipeList(recipes) {
    Object.keys(recipes).forEach((cocktailName) => {
      const listItem = document.createElement("li");
      listItem.classList.add("card");
      // listItem.innerHTML = `
      //           <img src="imgs__cocktail/cocktail_${recipes[cocktailName].번호}.png" alt="${cocktailName}" class="glass-image">
      //           <span>${cocktailName} (#${recipes[cocktailName].번호})</span>
      //           `;
      listItem.innerHTML = `
                <div class="glass-image"></div>
                <span>${cocktailName} (#${recipes[cocktailName].번호})</span>
                `;
      // 상세 정보 영역 추가
      const detailDiv = document.createElement("div");
      detailDiv.classList.add("recipe-detail");
      // detailDiv.style.display = "none";

      detailDiv.innerHTML = `
      <h3>#${recipes[cocktailName].번호} ${cocktailName}</h3>
                <p><strong>조주법:</strong> ${recipes[cocktailName].조주법}</p>
                <p><strong>글라스:</strong> ${recipes[cocktailName].글라스}</p>
                <p><strong>가니쉬:</strong> <ul>${Object.entries(recipes[cocktailName].가니쉬)
          .map(
            ([garnish, type]) =>
              `<li>${garnish} ${type}</li>`
          )
          .join("")}</ul></p>
                <p><strong>재료:</strong> <ul>${Object.entries(
            recipes[cocktailName].재료
          )
          .map(
            ([ingredient, amount]) =>
              `<li>${ingredient} (${amount})</li>`
          )
          .join("")}</ul></p>
                <p><strong>도움되는 정보:</strong> <ul>${recipes[cocktailName].TMI
          .map(
            (tmi) =>
              `<li>${tmi}</li>`
          )
          .join("")}</ul></p>
            `;

      listItem.appendChild(detailDiv);

      // listItem.addEventListener("click", () => {
      //   // 상세 정보 표시 토글
      //   detailDiv.style.display =
      //     detailDiv.style.display === "none" ? "block" : "none";
      // });

      recipeList.appendChild(listItem);
    });
  }

  // 레시피 데이터 로드 및 목록 생성
  const response = await fetch("data__recipe_24.json"); // await 추가
  const recipes = await response.json(); // await 추가
  // console.log(recipes);
  createRecipeList(recipes);

});
