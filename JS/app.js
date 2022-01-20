const searchQuery = document.querySelector("#userquery");
const searchButton = document.querySelector("#searchbutton");
const movieBox = document.querySelector("#moviecheck");
const gameBox = document.querySelector("#gamecheck");
const bookBox = document.querySelector("#bookcheck");
const gamesDiv = document.querySelector("#gamesdiv");
const gameResults = document.querySelector(".gameresults");

//Api keys
const gamesApiKey = "94b30e61ab464d5391dad2327cbde848";
const tvShowsApiKey = "91f5042a";

const gameRating = (rated) =>{
  if( rated !== null ){
    return rated;
  }else{
    return "NOT RATED";
  }
}

//Async function to get data from RAWG with axios
const getGameData = async () => {
  const gameSearchTerm = searchQuery.value;

  
  const res = await axios.get(
    `https://api.rawg.io/api/games?key=${gamesApiKey}&page_size=60&search=${gameSearchTerm}`
  );
  const gameResponseArray = res.data.results;

  gameResults.innerText = gameResponseArray.length;

  
  gameResponseArray.forEach((element) => {
    const gameContainer = document.createElement("div");
    gameContainer.className += "renderresult";
    gameContainer.innerHTML += [
      `<img class="image mb-3" src="${element.background_image}">`,
      `<h5>${element.name}</h5>`,
      `<p>Suggested by:${element.suggestions_count}</p>`,
      `<p>Rated:${ gameRating( element.metacritic )}</p>`,
    ].join("");
    gamesDiv.append(gameContainer);
  });
};


const getMovieData = async () => {
  const tvSearchTerm = searchQuery.value;
  const res = await axios.get(`http://www.omdbapi.com/?s=${tvSearchTerm}&type=series&apikey=${tvShowsApiKey}`);
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getGameData();
  searchQuery.value = "";
  gameResults.innerText = "";
});
