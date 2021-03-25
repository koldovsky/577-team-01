//CLOCK

setInterval(updateClock, 1000);
function updateClock(){
    const clockConteiner = document.querySelector(".clock");
    clockConteiner.innerText = new Date().toLocaleString();
}

//CLOCK