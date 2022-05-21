const $ = (id) => document.querySelector(id);


//Section Header
const imgHeader = $('.featured-movie-container');
const spinner = $('.spinner');
const info_movie_container = $('.info-movie-container');
const titleHeader = $('.featured-title-movie');
const descriptionHeader = $('.featured-description-movie');
const category_element = $('.category-movie-container');
const arrow_next_movie = $('.arrow-nextmovie');
const featured_whatch_button = $('.featured-whatch-button');
const header_container = $('.header-container');
const profile_container = $('.profile-container');
// const item_movie_trending = $('.item-movie');

//Section Trending
const trending_categories = $('.trending-movies-container');


//Section Categories
const categories_container = $('.categories-container');


module.exports = {
    imgHeader,
    spinner,
    titleHeader,
    descriptionHeader,
    info_movie_container,
    category_element,
    trending_categories,
    arrow_next_movie,
    featured_whatch_button,
    categories_container,
    header_container,
    profile_container,
}