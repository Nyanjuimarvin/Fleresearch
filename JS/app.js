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
const movieApiKey = "80c2c0f8c85114414c562a7c20f011c6";

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

//assign images if none

const insertMovieImage = (movieImage) => {
  if (movieImage.backdrop_path !== null) {
    return requiredImageUrl + movieImage.backdrop_path;
  } else {
    return "../images/moviealt.jpg";
  }
};

const insertGameImage = (gameImage) => {
  if (gameImage.background_image !== null) {
    return gameImage.background_image;
  } else {
    return "../images/gamealt.jpg";
  }
};

const insertBookImage = (bookImage) => {
  if (bookImage.volumeInfo.imageLinks.thumbnail !== null) {
    return bookImage.volumeInfo.imageLinks.thumbnail;
  } else if (bookImage.volumeInfo.imageLinks.thumbnail !== "") {
    return "../images/booksalt.jpg";
  } else {
    return "../images/booksalt.jpg";
  }
};

//return rating
const returnRating = (bookData) => {
  if (bookData.volumeInfo.averageRating !== undefined) {
    return bookData.volumeInfo.averageRating;
  } else {
    return "X";
  }
};

//Return tags
const returnTags = (tagsArray) => {
  let tagsStore = [];

  for (let tag of tagsArray) {
    if (tag.language === "eng") {
      tagsStore.push(tag.name);
    }
  }
  return tagsStore.toString();
};

//Return Platforms

const returnPlatforms = (platformArray) => {
  let platStore = [];
  for (let plat of platformArray) {
    if (plat.platform !== null) {
      platStore.push(plat.platform.name);
    }
  }
  return platStore.toString();
};

//return genres
const returnGenres = (genreArray) => {
  let genreStore = [];
  for (let genre of genreArray) {
    if (genre.name !== null) {
      genreStore.push(genre.name);
    }
  }
  return genreStore.toString();
};

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
        `<img class="image mb-3" src="${insertGameImage(element)}">`,
        `<h3 class="ps-3 text-decoration-underline text-warning">${element.name}</h3>`,
        `<h6 class="text-decoration-underline text-info text-start ps-3">Genre(s)</h6>`,
        `<p class="text-start ps-3 fs-5">${returnGenres(element.genres)}</p>`,
        `<p class="text-start ps-3">Released:${element.released}</p>`,
        `<p class="text-decoration-underline text-warning text-start ps-3">Review</p>`,
        `<p class="text-start ps-3">Suggested by:${element.suggestions_count}</p>`,
        `<p class="text-start ps-3 pb-2">Rated:${gameRating(
          element.metacritic
        )}</p>`,
        `<p class="text-decoration-underline text-warning fs-4">Tags</p>`,
        `<p class="text-success text-start ps-3 pb-2">${returnTags(
          element.tags
        )}</p>`,
        `<h6 class="text-decoration-underline text-warning fs-4">Platforms</h6>`,
        `<p class="text-start ps-3">${returnPlatforms(element.platforms)}</p>`,
      ].join("");
      gamesDiv.append(gameContainer);
    });
  } catch (error) {
    console.log("Caught Error:", error);
  }
};

const requiredImageUrl = `https://image.tmdb.org/t/p/original/`;

//Get movies/shows and append

const getMovieData = async () => {
  const tvSearchTerm = searchQuery.value;

  try {
    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${movieApiKey}&language=en-US&query=${tvSearchTerm}&page=1&include_adult=false`
    );
    const movieResponseArray = movieRes.data.results;

    movieResults.innerHTML = movieResponseArray.length;
    console.log(movieResponseArray);

    movieResponseArray.forEach((movieResponse) => {
      const movieContainer = document.createElement("div");
      movieContainer.className += "renderresult";
      movieContainer.innerHTML += [
        `<img class="image mb-3" src="${insertMovieImage(movieResponse)}">`,
        `<h3 class="text-decoration-underline text-warning">${extractTitles(
          movieResponse
        )}</h3>`,
        `<h5>Type:${movieResponse.media_type}</h5>`,
        `<p class="pb-3">Rated:${movieResponse.vote_average}</p>`,
        `<h6 class="text-decoration-underline text-warning">Summary</h6>`,
        `<p class="text-start ps-3">${movieResponse.overview}</p>`,
      ].join("");
      moviesDiv.append(movieContainer);
    });
  } catch (error) {
    console.log("OH NO!:", error);
  }
};

const getBooksData = async () => {
  const bookSearchTerm = searchQuery.value;

  try {
    const bookRes = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${bookSearchTerm}&key=${booksApiKey}`
    );
    const booksResponseArray = bookRes.data.items;
    bookResults.innerText = booksResponseArray.length;

    console.log(booksResponseArray);

    booksResponseArray.forEach((bookResponse) => {
      const booksContainer = document.createElement("div");
      booksContainer.className += "renderresult";
      booksContainer.innerHTML += [
        `<img class="image mb-3" src="${insertBookImage(bookResponse)}">`,
        `<h3 class="text-decoration-underline text-warning">${bookResponse.volumeInfo.title}</h3>`,
        `<p class="text-start ps-3">Author(s):${bookResponse.volumeInfo.authors.toString()}</p>`,
        `<p class="text-start ps-3">Publisher:${bookResponse.volumeInfo.publisher}</p>`,
        `<p class="text-start ps-3">Published:${bookResponse.volumeInfo.publishedDate}</p>`,
        `<p class="text-start ps-3">Rating:${returnRating(bookResponse)}/5</p>`,
      ].join("");
      booksDiv.append(booksContainer);
    });
  } catch (error) {
    console.log("What Now:", error);
  }
};


//Get Books and append

searchButton.addEventListener("click",  (e) => {
  e.preventDefault();
  if(searchQuery.value === ""){
    swal({
      title: `Hello There`,
      text: "Please enter a Search Term",
      imageUrl: "../images/alertimg.jpg",
      imageHeight: 350,
      imageWidth: 450,
      footer: "Enter your search term and you'll be good to go",
    });
  }else if (bookBox.checked !== false) {
    getBooksData();
    searchQuery.value = "";
  } else if (movieBox.checked !== false) {
    getMovieData();
    searchQuery.value = "";
  } else if (gameBox.checked !== false) {
    getGameData();
    searchQuery.value = "";
  } else if (bookBox.checked !== false && movieBox.checked !== false) {
    getBooksData();
    getMovieData();
    searchQuery.value = "";
  } else if (movieBox.checked !== false && gameBox.checked !== false) {
    getMovieData();
    getGameData();
    searchQuery.value = "";
  } else {
    getBooksData();
    getGameData();
    getMovieData();
    searchQuery.value = "";
  }
});

$(document).ready(() => {
  //Empty divs when making a new search
  $("#userquery").click(() => {
    $("#booksdiv").empty();
    $("#gamesdiv").empty();
    $("#moviesdiv").empty();
    $(bookResults).text("");
    $(gameResults).text("");
    $(movieResults).text("");
  });
});

