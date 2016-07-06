// change require to es6 import style
import $ from 'jquery';
import './style.scss';

function* InfiniteCounter(start, interval) {
  let i = start;

  while (true) {
    yield i;
    i += interval;
  }
}

function* RandomGenerator() {
  while (true)
    yield Math.floor(Math.random() * 255);
}

let ArrayIterator = (array) => {
  let j = 0;

  return {
    next: () => {
      return j < array.length ?
        { value: array[j++], done: false } :
        { done: true };
    },
  };
};

let num = 0;
let countdownArray = [5, 4, 3, 2, 1];

let changes = InfiniteCounter(0, 1), transform = InfiniteCounter(5, 5), random = RandomGenerator(),
  countdown = ArrayIterator(countdownArray);

$('p#main ~ p').html(`The color has changed ${changes.next().value} times`);

setInterval(() => {
  let timesChanged, currentCount = countdown.next();

  if (currentCount.done) {
    timesChanged = changes.next().value;

    $('body').css('background-color', `rgb(${random.next().value},${random.next().value},${random.next().value})`);
    $('p#main ~ p').html(`The color has changed ${timesChanged} times`);

    countdown = ArrayIterator(countdownArray);
    currentCount = countdown.next();

    if (timesChanged % 5 == 0 && timesChanged > 0) {
      $('div#main').css('transform', `translate(0px,${transform.next().value}px)`);
    }
  }

  $('p#main').html(`You've been on this page for ${num} seconds.`);
  $('p#main + p').html(`The color will change in ${currentCount.value} seconds`);

  num++;
}, 1000);
