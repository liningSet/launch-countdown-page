const numbers = document.querySelectorAll(".number");
const days = document.querySelector(".days");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const upPages = document.querySelectorAll(".up-page");
const secs = document.querySelector(".secs");
const mins = document.querySelector(".mins");
const hrs = document.querySelector(".hrs");
const dys = document.querySelector(".dys");

//some of the html elements that have animation unless stopAnimations() runs
const animated = [
  numbers,
  document.querySelectorAll(".time"),
  document.querySelectorAll(".circle-left"),
  document.querySelectorAll(".circle-right"),
];

//stops the whole chain of animations belonging to day-night cycle

function stopAnimations() {
  animated.forEach((elem) => {
    elem.forEach((child) => {
      child.style.animation = "none";
    });
  });

  document.querySelector(".hills").style.animation = "none";
  document.querySelector(".cycle-of-day-night").style.animation = "none";
  document.querySelector(".cycle-of-day-night").style.display = "none";
  document.querySelector("main").style.animation = "none";
  document.querySelector(".down-page").style.animation = "none";
  document.querySelector(".stars").style.animation =
    "rotate-partly 50s ease-in-out infinite alternate";
}

//just a blueprint to avoid repetitive code :)

function addAnimation(elem, animElem, elem2, animElem2, num) {
  elem.textContent = num;
  animElem.style.animation = "slide 0.5s ease-out forwards";

  elem2.textContent--;
  animElem2.style.animation = "slide 0.5s ease-out forwards";
}

// the function that runs every 1 second to make sure the counter is working correctly

function secondPass() {
  seconds.textContent = Number(seconds.textContent);
  minutes.textContent = Number(minutes.textContent);
  hours.textContent = Number(hours.textContent);
  days.textContent = Number(days.textContent);

  if (seconds.textContent == 0) {
    /*
    if days & hours & minutes are zero basically the counter
     ends after seconds reach zero
    */
    if (
      days.textContent == 0 &&
      hours.textContent == 0 &&
      minutes.textContent == 0
    ) {
      seconds.textContent = 0;
    } else {
      addAnimation(seconds, secs, minutes, mins, 59);

      if (minutes.textContent < 0) {
        addAnimation(minutes, mins, hours, hrs, 59);

        if (hours.textContent < 0) {
          addAnimation(hours, hrs, days, dys, 23);
        }
      }
    }
  } else {
    seconds.textContent--;
    secs.style.animation = "slide 0.5s ease-out forwards";
  }
  upPages.forEach((up) => {
    up.addEventListener("animationend", () => {
      up.style.animation = "none";
    });
  });
}

//this line basically repeats the above function every 1000ms or 1sec

setInterval(secondPass, 1000);
