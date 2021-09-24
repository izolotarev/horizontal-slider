const slider = document.querySelector('.slider');
const sliderList = document.querySelector('.slider__list');
const nextBtn = document.querySelector('.slider__next-btn');
const prevBtn = document.querySelector('.slider__prev-btn');
const interval = 3000;

let slides = document.querySelectorAll('.slider__image');
let index = 1;
let slideId;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

sliderList.append(firstClone);
sliderList.prepend(lastClone);

const slideWidth = slides[index].clientWidth;

sliderList.style.transform = `translateX(${-slideWidth * index}px)`;

const startSlide = () => {
  slideId = setInterval(() => {
    moveToNextSlide();
  }, interval);
};

const getSlides = () => document.querySelectorAll('.slider__image');

sliderList.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    sliderList.style.transition = 'none';
    index = 1;
    sliderList.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    sliderList.style.transition = 'none';
    index = slides.length - 2;
    sliderList.style.transform = `translateX(${-slideWidth * index}px)`;
  }
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;
  sliderList.style.transition = '.7s ease-out';
  sliderList.style.transform = `translateX(${-slideWidth * index}px)`;
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  sliderList.style.transition = '.7s ease-out';
  sliderList.style.transform = `translateX(${-slideWidth * index}px)`;
};

// slider.addEventListener('mouseenter', () => {
//   clearInterval(slideId);
// });

//slider.addEventListener('mouseleave', startSlide);
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);

//startSlide();
