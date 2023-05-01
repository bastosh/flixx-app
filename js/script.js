const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

const global = {
    currentPage: window.location.pathname
}

async function fetchApiData(enpoint) {
    const response = await fetch(`${API_URL}/${enpoint}?api_key=${API_KEY}&language=fr-FR`)
    return await response.json()
}

async function displayPopularMovies() {
    const { results } = await fetchApiData('movie/popular')
    results.forEach(movie => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path ? 
                `<img
                    src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    class="card-img-top"
                    alt="${movie.title}"
                />` 
                :
                `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="No image"
                />`
            }
        </a>
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
                <small class="text-muted">Date de sortie : ${movie.release_date}</small>
            </p>
        </div>
        `
        document.getElementById('popular-movies').appendChild(div)
    })
}

function highlightActiveLink() {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

function initApp() {
    switch(global.currentPage) {
        case '/': 
        case '/index.html': 
            displayPopularMovies()
            break
        case '/shows.html':
            console.log('Shows')
            break
        case '/movie-details.html':
            console.log('Movie details')
            break
        case '/tv-details.html':
            console.log('TV details')
            break
        case '/search.html':
            console.log('Search')
            break
    }
    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', initApp)
