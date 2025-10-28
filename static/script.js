function getRandomMovie(array) {
  return array[Math.floor(Math.random() * array.length)];
}

spinnerContainer = document.getElementById("spinner-container");

function showSpinner() {
  spinnerContainer.style.display = "flex";
}

function hideSpinner() {
  spinnerContainer.style.display = "none";
}

let moviesArray = [];

document.getElementById("get_user").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const result = document.getElementById("result");
  const resultLink = document.getElementById("resultLink");


  showSpinner();

  result.innerText = "";

  try {
    const response = await fetch("/get_movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();
    console.log(data);
    moviesArray = data.movies;
    if (moviesArray && moviesArray.length > 0) {
      const randomMovie = getRandomMovie(moviesArray);
      result.innerText = randomMovie.name;
      resultLink.innerHTML = `<a href="${randomMovie.url}" target="_blank">Check it on letterboxd!</a>`;
    } else {
      result.innerText = "Empty watchlist";
    }
  } finally {
    hideSpinner();
  }
});

document.getElementById("get_movie").addEventListener("click", async () => {
  const result = document.getElementById("result");
  const resultLink = document.getElementById("resultLink");
  if (moviesArray && moviesArray.length > 0) {
    const randomMovie = getRandomMovie(moviesArray);
    result.innerText = randomMovie.name;
    resultLink.innerHTML = `<a href="${randomMovie.url}" target="_blank">Check it on letterboxd!</a>`;
  } else {
    result.innerText = "Empty watchlist";
  }
});