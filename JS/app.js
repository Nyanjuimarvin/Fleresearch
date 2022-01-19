$(document).ready(()=>{
	$("#searchForm").submit(function(event){
		let searchText= $("#userquery").val()
		console.log(searchText)
		getGames(searchText)
		getBooks(searchText)
	
		event.preventDefault()
		
	})
})

function getGames(searchText){
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://free-epic-games.p.rapidapi.com/free",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "free-epic-games.p.rapidapi.com",
			"x-rapidapi-key": "1da5882939mshf7a00a599c4e78cp163474jsnd820c1ecaed8"
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log(response);

		movies= response.data
		let output  = ''
		$.each(movies,(index, movie)=>{
			output += `
			<div class="col-md-3">
    			<div class="well-text-center">
        		<img src=${movie.id}>
        		<h5>${movie.title}</h5>


    		</div>
		</div>
			
			`
		})

		$("#movies").html(output)
		


	});
}

function getBooks(searchText){
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://book4.p.rapidapi.com/",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "book4.p.rapidapi.com",
			"x-rapidapi-key": "1da5882939mshf7a00a599c4e78cp163474jsnd820c1ecaed8"
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log(response);
		movies= response.data
		let output  = ''
		$.each(movies,(index, movie)=>{
			output += `
			<div class="col-md-3">
    			<div class="well-text-center">
        		<img src=${movie.id}>
        		<h5>${movie.title}</h5>


    		</div>
		</div>
			
			`
		})

		$("#movies").html(output)
		


	});
}