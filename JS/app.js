$(document).ready(()=>{
	$("#searchForm").submit(function(event){
		let searchText= $("#searchText").val()
		getMovies(searchText)
		getGames(searchText)
		getBooks(searchText)
		event.preventDefault()
		
	})
})