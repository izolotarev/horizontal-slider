const wrapper = document.querySelector('.wrapper');

const left = document.querySelector('.slider__left');
const right = document.querySelector('.slider__right');

const buttonUp = document.querySelector('.slider__button-up');
const buttonDown = document.querySelector('.slider__button-down');

let rightSlides = document.querySelectorAll('.slider__image');
let leftSlides = document.querySelectorAll('.slider__content');

let rightIndex = 1;
let leftIndex = leftSlides.length;
const sliderHeight = wrapper.clientHeight;

const firstRightClone = rightSlides[0].cloneNode(true);
const lastRightClone = rightSlides[rightSlides.length - 1].cloneNode(true);

const firstLeftClone = leftSlides[0].cloneNode(true);
const lastLeftClone = leftSlides[leftSlides.length - 1].cloneNode(true);

firstRightClone.id = 'first-right-clone';
lastRightClone.id = 'last-right-clone';

firstLeftClone.id = 'first-left-clone';
lastLeftClone.id = 'last-left-clone';

right.append(firstRightClone);
right.prepend(lastRightClone);

left.append(firstLeftClone);
left.prepend(lastLeftClone);

right.style.transform = `translateY(${-sliderHeight * rightIndex}px)`;
left.style.transform = `translateY(${-sliderHeight * leftIndex}px)`;

buttonUp.addEventListener('click', () => {
  nextSlide();
});

buttonDown.addEventListener('click', () => {
  previousSlide();
});

document.addEventListener('wheel', (e) => {
  if (e.deltaY > 0) {
    nextSlide();
  } else {
    previousSlide();
  }
});

const getRightSlides = () => document.querySelectorAll('.slider__image');
const getLeftSlides = () => document.querySelectorAll('.slider__content');

const nextSlide = () => {
  rightSlides = getRightSlides();
  if (rightIndex >= rightSlides.length - 1) return;
  rightIndex++;
  right.style.transition = '.5s ease-out';
  right.style.transform = `translateY(${-sliderHeight * rightIndex}px)`;

  leftSlides = getLeftSlides();
  if (leftIndex <= 0) return;
  leftIndex--;
  left.style.transition = '.5s ease-out';
  left.style.transform = `translateY(${-sliderHeight * leftIndex}px)`;
};

const previousSlide = () => {
  rightSlides = getRightSlides();
  if (rightIndex <= 0) return;
  rightIndex--;
  right.style.transition = '.5s ease-out';
  right.style.transform = `translateY(${-sliderHeight * rightIndex}px)`;

  leftSlides = getLeftSlides();
  if (leftIndex >= leftSlides.length - 1) return;
  leftIndex++;
  left.style.transition = '.5s ease-out';
  left.style.transform = `translateY(${-sliderHeight * leftIndex}px)`;
};

right.addEventListener('transitionend', () => {
  rightSlides = getRightSlides();
  if (rightSlides[rightIndex].id === firstRightClone.id) {
    right.style.transition = 'none';
    rightIndex = 1;
    right.style.transform = `translateY(${-sliderHeight * rightIndex}px)`;
  }

  if (rightSlides[rightIndex].id === lastRightClone.id) {
    right.style.transition = 'none';
    rightIndex = rightSlides.length - 2;
    right.style.transform = `translateY(${-sliderHeight * rightIndex}px)`;
  }

  leftSlides = getLeftSlides();

  if (leftSlides[leftIndex].id === lastLeftClone.id) {
    left.style.transition = 'none';
    leftIndex = leftSlides.length - 2;
    left.style.transform = `translateY(${-sliderHeight * leftIndex}px)`;
  }

  if (leftSlides[leftIndex].id === firstLeftClone.id) {
    left.style.transition = 'none';
    leftIndex = 1;
    left.style.transform = `translateY(${-sliderHeight * leftIndex}px)`;
  }
});
