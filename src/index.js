import './styles.css';
import './js/animations';
import './js/navigation';
import secrets from './js/secrets'
import nodes, { imgHeader, info_movie_container, movieById_container, titleHeader, trending_categories } from './js/nodes';
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

async function createMovies(movies, container,categoryName) {
    container.innerHTML = '';
    const headerCategoryTitle = document.createElement('h1');
    headerCategoryTitle.classList.add('title-movie-list')
    headerCategoryTitle.innerHTML = categoryName;
    container.appendChild(headerCategoryTitle);
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
        item_movie.style.background = `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`;
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
    const movieImgUrl = 'https://image.tmdb.org/t/p/w1280' + randomMovie.backdrop_path;
    nodes.imgHeader.style.backgroundImage = `linear-gradient(90deg, rgba(255,255,255,0) 70%, rgba(11, 11, 11, 0.542) 100%), url(${movieImgUrl})`;
    nodes.imgHeader.classList.add('fade-in');
    nodes.titleHeader.innerHTML  = randomMovie.original_title;
    nodes.descriptionHeader.innerHTML = randomMovie.overview;
    nodes.spinner.classList.add('inactive');

    nodes.featured_whatch_button.addEventListener('click', () => {
        location.hash = `#movie=${randomMovie.id}`
    })

    console.log(randomMovie.id);

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

    const movieImgUrl = 'https://image.tmdb.org/t/p/w1280' + movie.backdrop_path;
    nodes.movieById_container.style.background =  `linear-gradient(90deg, rgba(255,255,255,0) 70%, rgba(11, 11, 11, 0.542) 100%),url(${movieImgUrl})`;
    nodes.movieById_container.style.backgroundRepeat = "no-repeat";
    nodes.movieById_container.style.backgroundSize = "cover";
    nodes.movieById_container.style.backgroundPosition = "center";
    nodes.movieById_container.classList.add('fade-in');

    const info_movieById_container = document.createElement('div');
    info_movieById_container.classList.add('info-movieById-container')
    movieById_container.appendChild(info_movieById_container);
    const movieById_img = document.createElement('img');
    movieById_img.classList.add('movieById-img');
    movieById_img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    const title_movieById = document.createElement('h1');
    title_movieById.classList.add('.title-movieById');
    title_movieById.innerHTML = `${movie.original_title}`;
    const description_movieById = document.createElement('p');
    description_movieById.classList.add('description-movieById');
    description_movieById.innerHTML = `${movie.overview}`;
    const categories_flex_container = document.createElement('div');
    categories_flex_container.classList.add('container-flex-movieById');

    info_movieById_container.appendChild(movieById_img);
    info_movieById_container.appendChild(categories_flex_container);
    info_movieById_container.appendChild(title_movieById);
    info_movieById_container.appendChild(description_movieById);

    // movieDetailTitle.textContent = movie.title;
    // movieDetailDescription.textContent = movie.overview;
    // movieDetailScore.textContent = movie.vote_average;
    // createCategories(movie.genres, movieDetailCategoriesList);
    // getRelatedMoviesId(id);

    createCategories(movie.genres, categories_flex_container);
    getRelatedMoviesId(movie.id,info_movieById_container);
}

async function getRelatedMoviesId(id,container) {
    const { data } = await api(`movie/${id}/similar`);
    const relatedMovies = data.results;
    // const relations_Movies = document.createElement('div');
    // relations_Movies.classList.add('relation-movies-container');
    container.appendChild(nodes.trending_movies_container);

    console.log(relatedMovies);
    createMovies(relatedMovies, nodes.trending_movies_container);
}

export async function getMoviesByCategory(id,categoryName) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    createMovies(movies, nodes.movies_list_container,categoryName);

}

export async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query: query,
        },
    });
    const movies = data.results;
    createMovies(movies, nodes.movies_list_container)
}
getRandomMovie();
getTrendingMoviesPreview();
getCategoriesPreview();



