class CurrencyService {
    constructor() {
        if (!CurrencyService._instance)
            CurrencyService._instance = this;
        return CurrencyService._instance;
    }
    async getCurrencies() {
        if (!this.currencies) {
            const url = `https://api.exchangerate-api.com/v4/latest/NOK`;
            this.currencies = await (await fetch(url)).json();
        }
        return this.currencies;
    }
    async getCurrencyRate(currency) {
        const currencies = await this.getCurrencies();
        return currencies.rates[currency];
    }
}
