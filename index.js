const form = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
let searchText = ''
const searchBarVal = document.getElementById('search-bar')

form.addEventListener('submit', function(event){
    event.preventDefault()
})

searchBtn.addEventListener('click', function() {
    searchText = searchBarVal.value
    getData()
    searchBarVal.value = ''
})
    
async function getData() {
    const url = `http://www.omdbapi.com/?apikey=ca546780&s=${searchText}`;
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.Search[0].Year);
    } catch (error) {
    console.error(error.message);
    }
}

// {
//     "Search": [
//       {
//         "Title": "Blade Runner",
//         "Year": "1982",
//         "imdbID": "tt0083658",
//         "Type": "movie",
//         "Poster": "https://m.media-amazon.com/images/M/MV5BOWQ4YTBmNTQtMDYxMC00NGFjLTkwOGQtNzdhNmY1Nzc1MzUxXkEyXkFqcGc@._V1_SX300.jpg"
//       }
//   }
