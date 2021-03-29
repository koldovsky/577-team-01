class ToursService {
    constructor() {
        if (!ToursService._instance)
            ToursService._instance = this;
        return ToursService._instance;
    }
    async getTours() {
        if (!this.tours) {
            this.tours = await (await fetch('hotTours.json')).json();
        }
        return this.tours;
    }
    async getToursById(id) {
        const tours = await this.getTours();
        return tours.find(tour=>tour.id === id);
    }
}
