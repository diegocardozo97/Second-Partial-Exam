function $(query) {
  return document.querySelector(query);
}

function submitListener(event) {
  event.preventDefault();
  console.log("Hello");

  const query = $("#query").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}&key=1`)
  .then(status => {
    if (status.ok) {
      return status.json();
    }
    else throw new Error("API error");
  }).then(valu => {
    console.log(valu);
    const value = valu.meals;

    const div = $(".js-search-results");

    if (value.length === 0) {
      div.innerHTML = "Meal not found.";
      return;
    }
    div.innerHTML = "";

    for (const elem of value) {
      const str = "Meal name=" + elem.strMeal + ",<br> Meal area=" + elem.strArea + ",<br> Instructions=" + elem.strInstructions;
      
      const img = "<img src=" + elem.strMealThumb + " heigh=100 width=100>";

      div.innerHTML += str + img + "<hr>";
    }
  }).catch(error => {
    $(".js-search-results").innerHTML = "Meal not found." + error;
    console.log(error);
  });

  return true;
}


(function init() {
  $("#submitButton").addEventListener('click', submitListener);
})();
