import { getMovieById, getTrendingMoviesPreview, getMoviesByCategory, getMoviesBySearch } from "..";
import {getCategoriesPreview} from '..';
import nodes, { header_arrow } from './nodes';
nodes.searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${nodes.searchFormInput.value}`;
});

// input.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//       event.preventDefault();
   
//     }
//   });

// trendingBtn.addEventListener('click', () => {
//     location.hash = '#trends';
// });

 header_arrow.addEventListener('click', () => {
    history.back();
    // location.hash = '#home';
    const stateLoad = window.history.state ? window.history.state.loadUrl : '';
    if (stateLoad.includes('#')) {
        window.location.hash = '';
    } else {
        window.history.back();
    }
});

// header_arrow.addEventListener('click', ()=>{
//     // console.log('hey');
//     // history.back();
//     location.hash = '#home';
// })




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
    nodes.imgHeader.style.display = "block";
    nodes.imgHeader.classList.remove('inactive');
    nodes.imgHeader.classList.add('active');
    nodes.header_container.classList.remove('inactive');
    // nodes.spinner.classList.remove('inactive');
    nodes.info_movie_container.classList.remove('inactive');
    nodes.profile_container.classList.remove('inactive');
    nodes.header_arrow.classList.add('inactive');
    nodes.movieById_container.classList.remove('active');
    nodes.movieById_container.classList.add('inactive');
    nodes.trending_categories.classList.add('active');
    nodes.trending_categories.classList.remove('inactive');
    const mainContent = document.getElementsByTagName('main');
    mainContent[0].appendChild(nodes.trending_categories);
    mainContent[0].appendChild(nodes.categories_container);
    mainContent[0].style.height = "100vh"; 
    // nodes.info_movieById_container.classList.add('inactive');
    // nodes.info_movieById_container.classList.remove('active');
    // nodes.movieById_img.classList.add('inactive');
    // nodes.movieById_img.classList.remove('active');
    nodes.categories_container.classList.add('active');
    nodes.categories_container.classList.remove('inactive');
    nodes.header_container.style.position = "relative";
    nodes.header_container.style.zIndex = "1";
    nodes.profile_container.classList.add('active');
    nodes.movies_list_container.classList.add('inactive');
    nodes.header_searchForm.style.position = "relative";
    nodes.header_searchForm.style.width = "none";
    nodes.header_container.style.position = "fixed"



    nodes.movieById_container.classList.add('inactive');
    nodes.movieById_container.innerHTML = '';
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('categories!!');
    nodes.header_container.style.position = "absolute";
    nodes.header_container.style.zIndex = "2";
    nodes.profile_container.classList.add('inactive');
    nodes.imgHeader.style.display = "none";
    nodes.movieById_container.classList.add('inactive');
    nodes.categories_container.classList.add('inactive');
    nodes.trending_movies_container.classList.add('inactive');
    nodes.header_arrow.classList.remove('inactive');
    nodes.header_arrow.style.left = "14%";
    const mainContent = document.getElementsByTagName('main');
    mainContent[0].style.height = "auto";
    nodes.movies_list_container.classList.remove('inactive');
    nodes.header_container.style.position = "fixed";
    nodes.header_searchForm.style.position = "fixed";
    nodes.header_searchForm.style.width = "100%";

    nodes.movies_list_container.innerHTML = '';

    // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');



    getMoviesByCategory(categoryId,categoryName);
}

function movieDetailsPage() {
    console.log('Movie!!');
    nodes.imgHeader.style.display = "none";
    nodes.imgHeader.classList.add('inactive');
    nodes.spinner.classList.add('inactive');
    nodes.info_movie_container.classList.add('inactive');
    nodes.header_container.classList.add('inactive');
    nodes.profile_container.classList.add('inactive');
    nodes.header_arrow.classList.remove('inactive');
    nodes.movieById_container.classList.remove('inactive');
    nodes.movieById_container.classList.add('active');
    nodes.trending_categories.classList.add('active');
    nodes.trending_categories.classList.add('fade-in');
    nodes.categories_container.classList.add('inactive');
    nodes.movies_list_container.classList.add('inactive');
    nodes.trending_movies_container.classList.add('active');
    nodes.trending_movies_container.classList.remove('inactive');
    // nodes.info_movieById_container.classList.add('active');
    // nodes.info_movieById_container.classList.remove('inactive');

    nodes.movieById_container.innerHTML = '';
    // ['#movie', '234567']
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function searchPage() {
    console.log('Search!!');
    nodes.header_container.style.position = "absolute";
    nodes.header_container.style.zIndex = "2";
    nodes.profile_container.classList.add('inactive');
    nodes.imgHeader.style.display = "none";
    nodes.movieById_container.classList.add('inactive');
    nodes.categories_container.classList.add('inactive');
    nodes.trending_movies_container.classList.add('inactive');
    nodes.header_arrow.classList.remove('inactive');
    nodes.header_arrow.style.left = "14%";
    const mainContent = document.getElementsByTagName('main');
    mainContent[0].style.height = "auto";
    nodes.movies_list_container.classList.remove('inactive');
    nodes.header_container.style.position = "fixed";
    nodes.header_searchForm.style.position = "fixed";
    nodes.header_searchForm.style.width = "100%";

    nodes.movies_list_container.innerHTML = '';

    // ['#search', 'buscador']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}

function trendsPage() {
    console.log('TRENDS!!');
    nodes.header_container.style.position = "absolute";
    nodes.header_container.style.zIndex = "2";
    nodes.profile_container.classList.add('inactive');
    nodes.imgHeader.style.display = "none";
    nodes.movieById_container.classList.add('inactive');
    nodes.categories_container.classList.add('inactive');
    nodes.trending_movies_container.classList.add('inactive');
    nodes.header_arrow.classList.remove('inactive');
    nodes.header_arrow.style.left = "14%";
    const mainContent = document.getElementsByTagName('main');
    mainContent[0].style.height = "auto";
    nodes.movies_list_container.classList.remove('inactive');
    nodes.header_container.style.position = "fixed";
    nodes.header_searchForm.style.position = "fixed";
    nodes.header_searchForm.style.width = "100%";

    nodes.movies_list_container.innerHTML = '';


    // getTrendingMovies();
}