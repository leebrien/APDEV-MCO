var images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
var i = 0;
var slider_img = document.querySelector('.slideshow img');

function setImg(){
    return slider_img.setAttribute('src', 'images/'+images[i]);
}

function previous() {
    if (i == 0){                     //  img is already at the start of array
        i = images.length;
    }
    i--;
    return setImg();
}

function next(){
    if (i == images.length - 1){    //  img is already at the end of array
        i = -1;
    }
    i++;
    return setImg();
}

//  --------------------------   Logic for 5 star rating   --------------------------
var star1 = document.getElementById("star1");
var star2 = document.getElementById("star2");
var star3 = document.getElementById("star3");
var star4 = document.getElementById("star4");
var star5 = document.getElementById("star5");

star1.addEventListener("click", () => {
    star1.style.opacity = 1;
    star2.style.opacity = 0.5;
    star3.style.opacity = 0.5;
    star4.style.opacity = 0.5;
    star5.style.opacity = 0.5;
});

star2.addEventListener("click", () => {
    star1.style.opacity = 1;
    star2.style.opacity = 1;
    star3.style.opacity = 0.5;
    star4.style.opacity = 0.5;
    star5.style.opacity = 0.5;
});

star3.addEventListener("click", () => {
    star1.style.opacity = 1;
    star2.style.opacity = 1;
    star3.style.opacity = 1;
    star4.style.opacity = 0.5;
    star5.style.opacity = 0.5;
});

star4.addEventListener("click", () => {
    star1.style.opacity = 1;
    star2.style.opacity = 1;
    star3.style.opacity = 1;
    star4.style.opacity = 1;
    star5.style.opacity = 0.5;
});

star5.addEventListener("click", () => {
    star1.style.opacity = 1;
    star2.style.opacity = 1;
    star3.style.opacity = 1;
    star4.style.opacity = 1;
    star5.style.opacity = 1;
});

//  --------------------------   Logic for like/dislike   --------------------------    
var like = document.getElementById("like");
var dislike = document.getElementById("dislike");
var likeCounter = 0;
var dislikeCounter = 0;
var liked = false;
var disliked = false;
var touchedLike = false;
var touchedDislike = false;

var currentLikes = document.getElementById("like-count");
var currentDislikes = document.getElementById("dislike-count");

like.addEventListener("click", () => {
    if (!touchedLike){
        touchedLike = true;
    }
    
    if (!liked){
        liked = true;
        disliked = false;
        like.style.opacity = 1;
        dislike.style.opacity = 0.5;
        likeCounter++;
        currentLikes.textContent = likeCounter;
    }

    if (touchedDislike){
        dislikeCounter--;
        currentDislikes.textContent = dislikeCounter;
    }
});

dislike.addEventListener("click", () => {
    if (!touchedDislike){
        touchedDislike = true;
    }

    if (!disliked){
        disliked = true;
        liked = false;
        dislike.style.opacity = 1;
        like.style.opacity = 0.5;
        dislikeCounter++;
        currentDislikes.textContent = dislikeCounter;
    }

    if (touchedLike){
        likeCounter--;
        currentLikes.textContent = likeCounter;
    }
});