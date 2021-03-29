const carouselImages = [
    'img/norway_ice.jpg',
    'img/norway_ship.jpg',
    'img/norway_sunset.jpg',
    'img/norway-village.jpg',
    'img/norway-village2.jpg'
]



let currentIdx = 0;

function showCurrImg() {
    const imgContainer = document.querySelector('.landscapes-carousel .curr-img');
    imgContainer.src = carouselImages[currentIdx];
}

document.querySelector('.next').addEventListener('click', next);
function next (){
    currentIdx++;
    if(currentIdx>carouselImages.length - 1) currentIdx = 0;
    showCurrImg();
}

document.querySelector('.prev').addEventListener('click', prev);

function prev (){
    currentIdx--;
    if(currentIdx<0) currentIdx = carouselImages.length - 1;
    showCurrImg();
}

showCurrImg()

setInterval(next, 2000);