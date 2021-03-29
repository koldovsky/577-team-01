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
            toursListDomString += 
    ` <article>
            <img src="img/${tour.imageURL}" alt="${tour.title}">
            <h2>${tour.title}</h2>
            <p>${tour.description}</p>
               <div class="button-container">
                     <button class="info-btn"><span>Info</span></button>
                     <button class="info-btn"><span>${(tour.price*rate).toFixed(2)} ${changeCurrIcon()} </span></button>
               </div>
       </article>`
        }
        );
        this.container.innerHTML = toursListDomString;
    }
    async addEventListeners() {
        document.querySelector('#show-option').addEventListener('click', async()=>{
            this.option.value;
            await this.renderTours();
            this.addEventListeners();
        }
        );

        document.querySelector('.sort-asc').addEventListener('click', async()=>{
            this.sortDirection = 'ascending';
            await this.renderTours();
            this.addEventListeners();
        }
        );
        document.querySelector('.sort-dsc').addEventListener('click', async()=>{
            this.sortDirection = 'descending';
            await this.renderTours();
            this.addEventListeners();
        }
        );

    }
}
