import { getTrendingMoviesPreview } from "..";
import {getCategoriesPreview} from '..';
import nodes from './nodes';
// searchFormBtn.addEventListener('click', () => {
//     location.hash = `#search=${searchFormInput.value}`;
// });

// trendingBtn.addEventListener('click', () => {
//     location.hash = '#trends';
// });

// arrowBtn.addEventListener('click', () => {
//     history.back();
//     // location.hash = '#home';
//     const stateLoad = window.history.state ? window.history.state.loadUrl : '';
//     if (stateLoad.includes('#')) {
//         window.location.hash = '';
//     } else {
//         window.history.back();
//     }
// });


window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}



function homePage() {
    console.log('Home!!');
    nodes.imgHeader.classList.remove('inactive');
    // nodes.spinner.classList.remove('inactive');
    nodes.info_movie_container.classList.remove('inactive');
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('categories!!');


    // ['#category', 'id-name']
    // const [_, categoryData] = location.hash.split('=');
    // const [categoryId, categoryName] = categoryData.split('-');

    // headerCategoryTitle.innerHTML = categoryName;

    // getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    console.log('Movie!!');

    nodes.imgHeader.classList.add('inactive');
    nodes.spinner.classList.add('inactive');
    nodes.info_movie_container.classList.add('inactive');


    // ['#movie', '234567']
    // const [_, movieId] = location.hash.split('=');
    // getMovieById(movieId);
}

function searchPage() {
    console.log('Search!!');

    // ['#search', 'buscador']
    // const [_, query] = location.hash.split('=');
    // getMoviesBySearch(query);
}

function trendsPage() {
    console.log('TRENDS!!');


    // getTrendingMovies();
}