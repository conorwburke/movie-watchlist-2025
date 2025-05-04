const moviesToWatchEl = document.getElementById('movies-to-watch')
let moviesToWatchArr = JSON.parse(localStorage.getItem('moviesToWatchArr'))
let movieDataArr = []
let moviesToWatchHtml = ''

//To use locally stored arr imdbIDs to asycnhronously call the OMDB API for data on each film added to the watchlist
async function getMovieData(){
    movieDataArr = []
    await Promise.all(moviesToWatchArr.map(async function(movie){
        const response = await fetch (`https://omdbapi.com/?apikey=ca546780&i=${movie}`)
        const data = await response.json()
        movieDataArr.push(data)
    }))
}

//To generate HTML from the watchlist data genereated by getMovieData()
function getMoviesToWatchHtml() {
    moviesToWatchHtml = ''
    movieDataArr.map(function(movie){
        moviesToWatchHtml += `
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
                        <button class="add-watch-btn" data-add="${movie.imdbID}" id="${movie.imdbID}">- Remove</button>
                    </div>
                    <p class="plot">${movie.Plot}</p
                </div>
            </div>
        </div>
        <hr />
        `
    })
    return moviesToWatchHtml
}

//To handle clicks on '- Remove' buttons and delete movie block from Watchlist
document.addEventListener('click', function(event){
    if (event.target.dataset.add){
        let deletedMovie = moviesToWatchArr.indexOf(event.target.dataset.add)
        moviesToWatchArr.splice(deletedMovie, 1)
        localStorage.setItem('moviesToWatchArr', JSON.stringify(moviesToWatchArr))
        render()
    }
}) 

//Calling functions sequentially and then pushing HTML to proper element
async function render() {
    await getMovieData()
    getMoviesToWatchHtml()
    moviesToWatchEl.innerHTML = moviesToWatchHtml
}

render()











