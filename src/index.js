import './styles.css';
import './js/animations';
import './js/navigation';
import secrets from './js/secrets'
import nodes, { imgHeader, titleHeader, trending_categories } from './js/nodes';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': secrets.API_KEY,
    },
});


async function createCategories(categories, container){
    container.innerHTML = '';
    await categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-movie-container');
        categoryContainer.innerHTML = category.name;
        //const categoryTitle = document.createElement('h3');
        // categoryTitle.classList.add('category-title');
        // categoryTitle.setAttribute('id', 'id' + category.id);
        categoryContainer.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        // const categoryTitleText = document.createTextNode(category.name);
        // categoryTitle.appendChild(categoryTitleText);
        // categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

async function createMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        const item_movie = document.createElement('div');
        const spinner_categories = document.createElement('div');

        item_movie.classList.add('item-movie');
        spinner_categories.classList.add('spinner-categories');
        item_movie.appendChild(spinner_categories);
        spinner_categories.classList.remove('active');
        spinner_categories.classList.add('inactive');
        // nodes.spinner.classList.remove('inactive');
        // const movieContainer = document.createElement('div');
        // movieContainer.classList.add('movie-container');
        item_movie.addEventListener('click', ()=>{
            location.hash = `#movie=${movie.id}`
            // getMovieById(movie.id);
        });

        // const movieImg = document.createElement('img');
        // movieImg.classList.add('movie-img');
        // movieImg.setAttribute('alt', movie.title);
        // movieImg.setAttribute(
        //     'src',
        //     'https://image.tmdb.org/t/p/w500' + movie.poster_path,
        // );
        item_movie.style.background = `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`;
        item_movie.style.backgroundPosition = "center";
        item_movie.style.backgroundSize = "contain";
        item_movie.style.backgroundRepeat = "no-repeat";
        // background-size: cover;
        // background-repeat: no-repeat;
        // movieContainer.appendChild(movieImg);
        // const category_movie = document.createElement('div');
        // category_movie.classList.add('category-movie-container');
        // item_movie.appendChild(category_movie);
        // console.log(movie);
        container.appendChild(item_movie);

    });
    // createCategories(movies, item_movie)
}

export const getRandomMovie = async () => {
    nodes.spinner.classList.add('active');
    nodes.spinner.classList.remove('inactive');
    const { data } = await api('/movie/popular');
    nodes.imgHeader.classList.remove('inactive');
    nodes.imgHeader.classList.add('active');

    const movie = data.results;
    // console.log('movie',movie);
    const randomMovie = movie[Math.floor(Math.random()*movie.length)];
    // const categories = randomMovie.genre_ids;
    // console.log(categories)
    // console.log(randomMovie);
    const movieImgUrl = 'https://image.tmdb.org/t/p/original' + randomMovie.backdrop_path;
    nodes.imgHeader.style.backgroundImage = `linear-gradient(90deg, rgba(255,255,255,0) 70%, rgba(11, 11, 11, 0.542) 100%), url(${movieImgUrl})`;
    nodes.imgHeader.classList.add('fade-in');
    nodes.titleHeader.innerHTML  = randomMovie.original_title;
    nodes.descriptionHeader.innerHTML = randomMovie.overview;
    nodes.spinner.classList.add('inactive');

    nodes.featured_whatch_button.addEventListener('click', () => {
        location.hash = `#movie=${randomMovie.id}`
    })

    // createCategories(categories, nodes.info_movie_container);
}

export async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    // console.log(categories);
    nodes.categories_container.innerHTML = "";
    const categories_flex_container = document.createElement('div');
    const title_header_categories = document.createElement('h3');
    const categoriesTitleText = document.createTextNode('Categorías');
    title_header_categories.classList.add('title-categories');
    categories_flex_container.classList.add('container-flex-categories');
    title_header_categories.appendChild(categoriesTitleText);
    nodes.categories_container.appendChild(title_header_categories);
    nodes.categories_container.appendChild(categories_flex_container);
    createCategories(categories,categories_flex_container);
}

export async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/days');
    const movies = data.results;
    // console.log('peliculas en tendencia', movies);
    // trending_categories.style.background="linear-gradient(90deg, rgba(255,255,255,0) 82%, rgba(11, 11, 11, 0.542) 100%)";
    createMovies(movies, nodes.trending_categories);
}

export async function getMovieById(id) {
    const { data: movie } = await api(`movie/${id}`);
    console.log(movie)

    const movieImgUrl = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
    nodes.movieById_container.style.background =  `linear-gradient(90deg, rgba(255,255,255,0) 70%, rgba(11, 11, 11, 0.542) 100%),url(${movieImgUrl})`;
    nodes.movieById_container.style.backgroundRepeat = "no-repeat";
    nodes.movieById_container.style.backgroundSize = "cover";
    nodes.movieById_container.style.backgroundPosition = "center";
    nodes.movieById_container.classList.add('fade-in');
    // movieDetailTitle.textContent = movie.title;
    // movieDetailDescription.textContent = movie.overview;
    // movieDetailScore.textContent = movie.vote_average;
    

    // createCategories(movie.genres, movieDetailCategoriesList);
    // getRelatedMoviesId(id);

}

getRandomMovie();
getTrendingMoviesPreview();
getCategoriesPreview();



