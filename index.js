const form = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const searchBarVal = document.getElementById('search-bar')
const searchResultsEl = document.getElementById('search-results')

let searchText = ''
let searchResults
let movieDetailsData = []
let searchResultsHtml = ''
let moviesToWatchArr = []

form.addEventListener('submit', function(event){
    event.preventDefault()
})

//To handle clicks on Search button and populate search results, also clears variables in anticipation of subsequent searches
searchBtn.addEventListener('click', function() {
    searchText = searchBarVal.value
    searchBarVal.value = ''
    movieDetailsData = []
    searchResultsHtml = ''
    getData()
})

//To handle clicks on '+ Watchlist' buttons, push imdbID to array, and save to localStorage
document.addEventListener('click', function(event){
    if (event.target.dataset.add){
        if(!moviesToWatchArr.includes(event.target.dataset.add)){
            moviesToWatchArr.push(event.target.dataset.add)
            localStorage.setItem('moviesToWatchArr', JSON.stringify(moviesToWatchArr))
            console.log(moviesToWatchArr)
        } else {
            console.log('Already added!')
        }
    }
}) 

//To get initial search data from OMDB API; also triggers subsequent functions
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

//Because the search query call to OMDB API triggered by getData() does not return complete data on individual titles, this iterates over the base data returned and runs a series of API imdbID query calls for each individual movie, then pushes the complete data objects into the movieDetailsData array
async function getMovieDetails(){
    await Promise.all(searchResults.Search.map(async function(result){
      const response = await fetch(`https://omdbapi.com/?apikey=ca546780&i=${result.imdbID}`)
      const data = await response.json()
      movieDetailsData.push(data) 
    }))
    return movieDetailsData
}

//This function generates an html blocks for each movie object pushed by getMovieDetails() into the movieDetailsData array
function getSearchResultsHtml() {
    movieDetailsData.map(function(movie){
        searchResultsHtml += `
        <div class="results-container">
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
                        <button class="add-watch-btn" data-add="${movie.imdbID}">+ Watchlist</button>
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

//This function simply renders the searchResultsHtml into the proper element
function renderSearchResults() {
  searchResultsEl.innerHTML = searchResultsHtml
}
