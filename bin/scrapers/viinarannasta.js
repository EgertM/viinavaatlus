const Scraper = require('./base');
const rp = require('request-promise');
const cheerio = require('cheerio');

class ViinarannastaScraper extends Scraper {
    constructor() {
        super("SuperAlko EE");
        this.baseUrl = "https://www.viinarannasta.com/";
        this.categoryPages = [
            {url: "https://www.viinarannasta.com/articlesr.php?sid=65&gid=4", category: "absinthe"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=7&gid=4", category: "vodka"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=8&gid=4", category: "vodka"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=6&gid=4", category: "vodka"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=9&gid=5", category: "rum"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=10&gid=6", category: "tequila"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=11&gid=7", category: "cognac"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=12&gid=8", category: "brandy"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=56&gid=9", category: "whiskey"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=58&gid=9", category: "whiskey"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=55&gid=9", category: "whiskey"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=13&gid=9", category: "whiskey"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=14&gid=10", category: "liquor"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=15&gid=11", category: "gin"},
            {url: "https://www.viinarannasta.com/articlesr.php?sid=67&gid=27", category: "other"},
        ];

        super.priceRegex = /([\d,.]*\s€)/;
    }

    shallowScrape(callback) {
        super.shallowScrape();
        for (let i = 0; i < this.categoryPages.length; i++) {
            this.scrapeCategoryPage(this.categoryPages[i], callback);
        }
    }

    scrapeCategoryPage(category, callback) {
        rp(category.url)
            .then((html) => {
                const $ = cheerio.load(html);
                const $products = $("tr[bgcolor='#E6F3FC']").first().parent().children();
                let products = [];

                $products.each((index, value) => {

                    const $name = $(value).find("td[width='420'] > a");
                    const name = $name.text();

                    const product = {
                        name: this.getCleanName(name),
                        sale: $(value).find("td[width='80'] > strong > font").attr("style") === "color:#FF0000",
                        originalName: name,
                        store: this.storeName,
                        url: this.baseUrl + $name.attr("href"),
                        price: this.getPrice($(value).find("td[width='80'] > strong > font").text()),
                        unitPrice: null,
                        vol: this.getVol(name),
                        ml: this.getMl(name),
                        category: category.category,
                        imageUrl: this.baseUrl + $(value).find("td[width='20'] > a > img").attr("src").replace("-thumb-", "-")
                    };
                    products.push(product);
                });
                callback(products);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

module.exports = ViinarannastaScraper;