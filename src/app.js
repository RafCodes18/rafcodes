"use strict"

//hamburger nav
const hamburgerButton = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

function toggleButton(){
    navList.classList.toggle('show');
}

hamburgerButton.addEventListener('click', toggleButton);



//animate signature on scroll
let footer = document.getElementById("contact");
var svg = document.getElementById("svg");
let sig=document.getElementById('sig');

window.addEventListener("scroll", function(){
    if(isInViewport(footer)){
        if(!svg.classList.contains('animate')){
            svg.classList.add("animate");
        }
    }else{
        svg.classList.remove("animate");
    }
});

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || html.clientHeight) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
}