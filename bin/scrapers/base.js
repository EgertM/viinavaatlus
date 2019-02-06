const volRegex = /[\D](\d[\d.,]*)[%]/;
const mlRegex = /[\D](\d+)\s?[mM][lL]?/;
const clRegex = /[\D](\d+)\s?[cC][lL]/;
const lRegex = /[\D](\d[\d,.]*)\s?[lL]/;
const priceRegex = /€([\d,.]*)/;

class Scraper {
    constructor(name) {
        this.name = name;

    }

    shallowScrape() {
        console.info(`Starting shallow scrape for ${this.name}`);
    }

    deepScrape() {
        console.info(`Starting deep scrape for ${this.name}`);
    }

    static getVol(name) {
        if (!name) {
            return name
        }
        const volResult = volRegex.exec(name);

        if (volResult) {
            const parsed = parseFloat(volResult[1].replace(",", '.'));
            if (isNaN(parsed)) {
                console.error(`Could not parse vol float from ${name}`);
                return null
            } else {
                return parsed
            }
        }
        else {
            console.error(`Could not parse vol float from ${name}`);
            return null;
        }
    }

    static getMl(name) {
        if (!name) {
            return null
        }

        const mlResult = mlRegex.exec(name);

        if (mlResult) {
            const parsed = parseInt(mlResult[1]);
            if (isNaN(parsed)) {
                console.error(`Could not parse ml integer from ${name}`);
                return null
            } else {
                return parsed
            }
        }

        const clResult = clRegex.exec(name);

        if (clResult) {
            const parsed = parseInt(clResult[1]);
            if (isNaN(parsed)) {
                console.error(`Could not parse cl integer from ${name}`);
                return null
            } else {
                return parsed * 10
            }
        }

        const lResult = lRegex.exec(name);

        if (lResult) {
            const parsed = parseFloat(lResult[1].replace(",", "."));
            if (isNaN(parsed)) {
                console.error(`Could not parse liter float from ${name}`);
                return null
            } else {
                return parsed * 1000
            }
        } else {
            console.error(`Could not parse volume from ${name}`);
            return null;
        }
    }

    static getPrice(priceString) {
        if (!priceString) {
            return null;
        }

        const priceResult = priceRegex.exec(priceString);
        if (priceResult) {
            const parsed = parseFloat(priceResult[1].replace(",", "."));
            if (isNaN(parsed)) {
                console.error(`Could not parse price float from ${priceString}`)
            } else {
                return parsed
            }
        } else {
            console.error(`Could not parse price from ${priceString}`);
            return null;
        }
    }
}

module.exports = Scraper;
