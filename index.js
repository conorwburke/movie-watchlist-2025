const form = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const searchBarVal = document.getElementById('search-bar')
const searchResultsEl = document.getElementById('search-results')
let searchText = ''
let searchResults
let movieDetailsData = []
let searchResultsHtml = ''

form.addEventListener('submit', function(event){
    event.preventDefault()
})

searchBtn.addEventListener('click', function() {
    searchText = searchBarVal.value
    searchBarVal.value = ''
    movieDetailsData = []
    searchResultsHtml = ''
    getData()
})
    
async function getData() {
    const url = `https://omdbapi.com/?apikey=ca546780&s=${searchText}&type=movie`
    try {
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }
    const data = await response.json()
    searchResults = data
    await getMovieDetails()
    getSearchResultsHtml()
    renderSearchResults()
    } catch (error) {
    console.error(error.message)
    }
}

async function getMovieDetails(){
    await Promise.all(searchResults.Search.map(async function(result){
      const response = await fetch(`https://omdbapi.com/?apikey=ca546780&i=${result.imdbID}`)
      const data = await response.json()
      movieDetailsData.push(data) 
    }))
    return movieDetailsData
}

function getSearchResultsHtml() {
    movieDetailsData.map(function(movie){
        searchResultsHtml += `
        <div class="results-container"
            <div class="movie-result">
                <img class="poster" src="${movie.Poster}" />
                <div class="movie-title">
                    <div class="title-rating">
                        <h2>${movie.Title}</h2>
                        <p>⭐️ ${movie.imdbRating}</p>
                    </div>
                    <div class="movie-runtime">
                        <p>${movie.Runtime}</p>
                        <p>${movie.Genre}</p>
                        <button class="add-watch-btn" id="${movie.imdbID}">+ Watchlist</button>
                    </div>
                    <p class="plot">${movie.Plot}</p
                </div>
            </div>
        </div>
        <hr />
        `
    })
    return searchResultsHtml
}

function renderSearchResults() {
  searchResultsEl.innerHTML = searchResultsHtml
}



// {
//     "Title": "Blade Runner",
//     "Year": "1982",
//     "Rated": "R",
//     "Released": "25 Jun 1982",
//     "Runtime": "117 min",
//     "Genre": "Action, Drama, Sci-Fi",
//     "Director": "Ridley Scott",
//     "Writer": "Hampton Fancher, David Webb Peoples, Philip K. Dick",
//     "Actors": "Harrison Ford, Rutger Hauer, Sean Young",
//     "Plot": "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
//     "Language": "English, German, Cantonese, Japanese, Hungarian, Arabic, Korean",
//     "Country": "United States, United Kingdom",
//     "Awards": "Nominated for 2 Oscars. 13 wins & 22 nominations total",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg",
//     "Ratings": [
//       {
//         "Source": "Internet Movie Database",
//         "Value": "8.1/10"
//       },
//       {
//         "Source": "Rotten Tomatoes",
//         "Value": "89%"
//       },
//       {
//         "Source": "Metacritic",
//         "Value": "84/100"
//       }
//     ],
//     "Metascore": "84",
//     "imdbRating": "8.1",
//     "imdbVotes": "842,743",
//     "imdbID": "tt0083658",
//     "Type": "movie",
//     "DVD": "N/A",
//     "BoxOffice": "$32,914,489",
//     "Production": "N/A",
//     "Website": "N/A",
//     "Response": "True"
//   }
