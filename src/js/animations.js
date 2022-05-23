import { getRandomMovie } from "..";
import nodes from './nodes';

const slider = document.querySelector('.trending-movies-container');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
//   console.log(walk);
});



nodes.arrow_next_movie.addEventListener('click', ()=>{
    nodes.imgHeader.classList.remove('active');
    nodes.imgHeader.classList.add('inactive');
    getRandomMovie();
});

