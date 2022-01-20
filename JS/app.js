const searchQuery = document.querySelector("#userquery");
const searchButton = document.querySelector("#searchbutton");

//Media Checkboxes
const movieBox = document.querySelector("#moviecheck");
const gameBox = document.querySelector("#gamecheck");
const bookBox = document.querySelector("#bookcheck");

//Divs to append content
const gamesDiv = document.querySelector("#gamesdiv");
const moviesDiv = document.querySelector("#moviesdiv");
const booksDiv = document.querySelector("#booksdiv");

//Spans to show returned results
const gameResults = document.querySelector(".gameresults");
const movieResults = document.querySelector(".movieresults");
const bookResults = document.querySelector(".bookresults");

//Api keys
const gamesApiKey = "94b30e61ab464d5391dad2327cbde848";
const booksApiKey = "AIzaSyB6FaNTehgPfiFglcdcvq6XOl8d_Jsf-r8";
const anotherMovieApiKey = "80c2c0f8c85114414c562a7c20f011c6";
const tvShowsApiKey = "91f5042a";

const gameRating = (rated) => {
  if (rated !== null) {
    return rated;
  } else {
    return "N/A";
  }
};

//Look through all titles and return available one
const extractTitles = (key) => {
  if (typeof key.original_title !== "undefined") {
    return key.original_title;
  } else if (typeof key.title !== "undefined") {
    return key.title;
  } else if (typeof key.name !== "undefined") {
    return key.name;
  } else if (typeof key.original_name !== "undefined") {
    return key.original_name;
  } else {
    return "No Title";
  }
};

//assign alternative image if none

//Get games and append
const getGameData = async () => {
  const gameSearchTerm = searchQuery.value;

  try {
    const gameRes = await axios.get(
      `https://api.rawg.io/api/games?key=${gamesApiKey}&page_size=60&search=${gameSearchTerm}`
    );
    const gameResponseArray = gameRes.data.results;

    gameResults.innerText = gameResponseArray.length;

    gameResponseArray.forEach((element) => {
      const gameContainer = document.createElement("div");
      gameContainer.className += "renderresult";
      gameContainer.innerHTML += [
        `<img class="image mb-3" src="${element.background_image}">`,
        `<h5 class"ps-4">${element.name}</h5>`,
        `<p>Suggested by:${element.suggestions_count}</p>`,
        `<p class="pb-3">Rated:${gameRating(element.metacritic)}</p>`,
      ].join("");
      gamesDiv.append(gameContainer);
    });
  } catch (error) {
    alert("Caught Error:", error);
  }
};

//Get movies/shows and append
const getMovieData = async () => {
  const tvSearchTerm = searchQuery.value;
  const requiredImageUrl = `https://image.tmdb.org/t/p/original/`;

  try {
    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${anotherMovieApiKey}&language=en-US&query=${tvSearchTerm}&page=1&include_adult=false`
    );
    const movieResponseArray = movieRes.data.results;

    movieResults.innerHTML = movieResponseArray.length;
    console.log(movieResponseArray);

    movieResponseArray.forEach((movieResponse) => {
      const movieContainer = document.createElement("div");
      movieContainer.className += "renderresult";
      movieContainer.innerHTML += [
        `<img class="image mb-3" src="${
          requiredImageUrl + movieResponse.backdrop_path
        }">`,
        `<h5 class"ps-4">${extractTitles(movieResponse)}</h5>`,
        `<p>Type:${movieResponse.media_type}</p>`,
        `<p class="pb-3">Rated:${movieResponse.vote_average}</p>`,
        `<h6>Summary</h6>`,
        `<p class"mb-6 lh-2">${movieResponse.overview}</p>`,
      ].join("");
      moviesDiv.append(movieContainer);
    });
  } catch (error) {
    console.log("OH NO!:", error);
  }
};


//Get Books and append


searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getBooksData();
  searchQuery.value = "";
  gameResults.innerText = "";
});
