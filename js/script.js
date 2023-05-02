const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.VITE_API_URL

const global = {
    currentPage: window.location.pathname
}

async function fetchApiData(enpoint) {
    showSpinner()
    const response = await fetch(`${API_URL}/${enpoint}?api_key=${API_KEY}&language=fr-FR`)
    const data = await response.json()
    hideSpinner()
    return data
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

async function displayMovieDetails() {
    const movieId = window.location.search.split('=')[1]
    const movie = await fetchApiData(`movie/${movieId}`)

    displayBackgroundImage('movie', movie.backdrop_path)

    const div = document.createElement('div')
    div.innerHTML = `
    <div class="details-top">
        <div>
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
                    alt="Pas d’image"
                />`
            }
        </div>
        <div>
            <h2>${movie.title}</h2>
            <p>
                <i class="fas fa-star text-primary"></i>
                ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Date de sortie : ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visiter la page web du film</a>
        </div>
  </div>
  <div class="details-bottom">
    <h2>Infos</h2>
    <ul>
        <li><span class="text-secondary">Budget :</span> ${formatNumber(movie.budget)} $</li>
        <li><span class="text-secondary">Revenus :</span> ${formatNumber(movie.revenue)} $</li>
        <li><span class="text-secondary">Durée :</span> ${movie.runtime} minutes</li>
    </ul>
    <h4>Compagnies de production</h4>
    <div class="list-group">
        ${movie.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}
    </div>
  </div>
    `
    document.getElementById('movie-details').appendChild(div)
}

async function displayShowDetails() {
    const showId = window.location.search.split('=')[1]
    const show = await fetchApiData(`tv/${showId}`)

    displayBackgroundImage('show', show.backdrop_path)

    const div = document.createElement('div')
    div.innerHTML = `
    <div class="details-top">
        <div>
            ${
                show.poster_path ? 
                `<img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
                />` 
                :
                `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="Pas d’image"
                />`
            }
        </div>
        <div>
            <h2>${show.name}</h2>
            <p>
                <i class="fas fa-star text-primary"></i>
                ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Dernier épisode : ${show.last_air_date}</p>
            <p>${show.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
                ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visiter la page web de la série</a>
        </div>
  </div>
  <div class="details-bottom">
    <h2>Infos</h2>
    <ul>
        <li><span class="text-secondary">Nombre d’épisodes :</span> ${show.number_of_episodes}</li>
        <li><span class="text-secondary">Dernier épisode :</span> ${show.last_episode_to_air.name}</li>
    </ul>
    <h4>Compagnies de production</h4>
    <div class="list-group">
        ${show.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}
    </div>
  </div>
    `
    document.getElementById('show-details').appendChild(div)
}

function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';
  
    if (type === 'movie') {
      document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
      document.querySelector('#show-details').appendChild(overlayDiv);
    }
  }

async function displayPopularShows() {
    const { results } = await fetchApiData('tv/popular')
    results.forEach(show => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
        <a href="tv-details.html?id=${show.id}">
            ${
                show.poster_path ? 
                `<img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
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
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
                <small class="text-muted">Date de sortie : ${show.first_air_date}</small>
            </p>
        </div>
        `
        document.getElementById('popular-shows').appendChild(div)
    })
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function highlightActiveLink() {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}

function initApp() {
    switch(global.currentPage) {
        case '/': 
        case '/index.html': 
            displayPopularMovies()
            break
        case '/shows.html':
            displayPopularShows()
            break
        case '/movie-details.html':
            displayMovieDetails()
            break
        case '/tv-details.html':
            displayShowDetails()
            break
        case '/search.html':
            console.log('Search')
            break
    }
    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', initApp)
