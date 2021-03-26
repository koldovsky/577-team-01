

function renderTours(tours, sortOder = "ascending"){
    const toursContainer = document.querySelector('.hot-tours');
    const sortedTours = tours.slice().sort( (a, b) => sortOder === "ascending"? a.price - b.price : b.price - a.price);
    toursContainer.innerHTML = " ";
    for(const tour of sortedTours)
    toursContainer.innerHTML +=
   ` <article>
        <img src="img/${tour.imageURL}" alt="${tour.title}">
        <h2>${tour.title}</h2>
        <p>${tour.description}</p>
           <div class="button-container">
                 <button class="info-btn"><span>Info</span></button>
                 <button class="info-btn"><span>${tour.price} NOK </span></button>
           </div>
   </article>`
}



async function fetchTours(order){
    const response = await fetch('hotTours.json');
    const tours = await response.json();
    renderTours(tours, order);
}

fetchTours("ascending");

const sortToursAscendingButtons = document.querySelector('.sort-asc');
const sortToursDescendingButton = document.querySelector('.sort-dsc');

sortToursAscendingButtons.addEventListener('click', sortToursAscending);
sortToursDescendingButton.addEventListener('click', sortToursDescending);

function sortToursAscending() {
    sortToursDescendingButton.classList.remove('active-sort');
    sortToursAscendingButtons.classList.add('active-sort');
    fetchTours("ascending");
};

function sortToursDescending() {
    sortToursDescendingButton.classList.add('active-sort');
    sortToursAscendingButtons.classList.remove('active-sort');
    fetchTours("descending");
};

