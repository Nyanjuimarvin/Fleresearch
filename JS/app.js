const searchQuery = document.querySelector("#userquery");
const searchButton = document.querySelector("#searchbutton");
const movieBox = document.querySelector("#moviecheck");
const gameBox = document.querySelector("#gamecheck");
const bookBox = document.querySelector("#bookcheck");

async function getGameData() {
  if (movieBox.checked !== false) {
    const searchTerm = searchQuery.value;
    const res = await axios.get(
      `https://api.rawg.io/api/games?key=94b30e61ab464d5391dad2327cbde848&page_size=60&search=${searchTerm}`
    );
    console.log(res.data.results);
  } else {
    alert("ERROR!!!");
  }
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getGameData();
  searchQuery.value = "";
});
