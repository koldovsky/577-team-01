class ToursList {
    constructor() {
        this.container = document.querySelector('.hot-tours');
        this.toursService = new ToursService();
        this.currencyService = new CurrencyService;
        this.option = document.querySelector('.select-value');
        this.sortDirection = 'ascending';
        this.toursService.getTours().then(()=>this.renderTours()).then(()=>this.addEventListeners());

    }
    async renderTours() {
        let toursListDomString = '';
        const tours = await this.toursService.getTours();
        const currTo = this.option.value;
        const rate = await this.currencyService.getCurrencyRate(currTo);
        function changeCurrIcon () {
          if(currTo === "NOK"){
            return "NKr";
          }else if(currTo === "UAH"){
            return "₴";
          }else if(currTo === "USD"){
            return "$";
          }else if(currTo === "EUR"){
            return "€";
          }
        }
        [...tours].sort((a,b)=>this.sortDirection === 'ascending' ? a.price - b.price : b.price - a.price).forEach(tour=>{
          toursListDomString +=  ` <article>
          <img class="card-img-top" src="img/${tour.imageURL}" alt="${tour.title}">
          <h2 class="card-title">${tour.title}</h2>
          <p class="card-text">${tour.description}</p>
             <div class="button-container">
                   <button class="info-btn   btn-info "  data-bs-toggle="modal" data-bs-target="#productInfoModal" data-id='${tour.id}'><span class=" " data-bs-toggle="modal" data-bs-target="#productInfoModal" data-id='${tour.id}'>Info</span></button>
                   <button class="info-btn buy"><a href="#contacts"><span>${(tour.price*rate).toFixed(2)} ${changeCurrIcon()}</span></a></button>
             </div>
     </article>`
  });
  this.container.innerHTML = toursListDomString;
}
   async addEventListeners() {

    document
    .querySelectorAll('.button-container .btn-info')
    .forEach(button =>
      button.addEventListener('click', event =>
        this.handleProductInfoClick(event)
      )
    );


      document
        .querySelector('#show-option').addEventListener('click', async () => {
        this.option.value ;
        await this.renderTours();
        this.addEventListeners();
      });

      const sortAscendingButton = document.querySelector('.sort-asc');
      sortAscendingButton.addEventListener('click', async () => {
      this.sortDirection = 'ascending';
      sortDescendingButton.classList.remove('active-sort');
      sortAscendingButton.classList.add('active-sort');
      await this.renderTours();
      this.addEventListeners();
  });
  const sortDescendingButton =  document.querySelector('.sort-dsc');
  sortDescendingButton.addEventListener('click', async () => {
      this.sortDirection = 'descending';
    sortDescendingButton.classList.add('active-sort');
    sortAscendingButton.classList.remove('active-sort');
      await this.renderTours();
      this.addEventListeners();
  });

}
async handleProductInfoClick(event) {
  const button = event.target; 
  const id = button.dataset.id; 
  const tour = await this.toursService.getToursById(id);
  const modal = document.querySelector('#productInfoModal');
  const tourImg = modal.querySelector('.card-img-top');
  tourImg.setAttribute('src','img/' + tour.imageURL);
  tourImg.setAttribute('alt', tour.title);
  modal.querySelector('.modal-body .card-title').innerText = tour.title;
  modal.querySelector('.modal-body .card-text').innerText =
    tour.description;
  const btnBuy = modal.querySelector('.buy');
  btnBuy.innerText = tour.price + " NOK";
  btnBuy.dataset.id = id;
}
}

