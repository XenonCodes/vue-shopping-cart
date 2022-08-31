//Lesson-4
//Добавить поиск + отработать регулярные выражения(отдельный файл text.html)
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalogData = 'catalogData.json'

class BasketList {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this.totalPrice = 0;
        this._getProducts()
            .then(data => {
                this.goods = data.contents;//запишем полученные данные в массив
                this.render();//вывод товаров на страницу
                this._init();
            });
        this._showBasket();
    }
    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new BasketItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
    _showBasket() {
        document.querySelector('.btn-basket').addEventListener("click", () => {
            document.querySelector(this.container).classList.toggle('hidden');
        });
    }
    addProduct(id) {
        // let find = this.goods.find(product => product.id_product == id);
        // console.dir(document.querySelector('.products').querySelector(`[data-id="${id}"]`).querySelector('.product-item__price'));
        // if (find) {
        //     find.quantity++;
        //     this._changesProduct(find);
        // } else {
        //     let product = {
        //         id_product: id,
        //         price: document.querySelector(`[data-id="${id}"]`).querySelector('.product-item__price'),
        //         product_name: element.dataset['name'],
        //         quantity: 1
        //     };
        //     this.goods = [product];
        //     this.render();
        // }

        let product = document.querySelector(`[data-id="${id}"]`);
        let element = product.querySelector('.basket-item__volume').querySelector('span');
        element.innerText = +element.innerText + 1;
        this._changesProduct(product);
    }
    _deleteProduct(id) {
        let product = document.querySelector(`[data-id="${id}"]`);
        let element = product.querySelector('.basket-item__volume').querySelector('span');
        if (+element.innerText > 0) {
            element.innerText = +element.innerText - 1;
            this._changesProduct(product);
        }
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('btn-delete')) {
                basketList._deleteProduct(event.target.dataset.id);
            }
        });
    }
    _changesProduct(product) {
        let volume = product.querySelector('.basket-item__volume').querySelector('span');
        let totalPrice = product.querySelector('.basket-item__totalPrice').querySelector('span');
        let price = product.querySelector('.basket-item__price').querySelector('span');
        totalPrice.innerText = +price.innerText * +volume.innerText;
    }
    clearBasket() { }
    calcuTotalPrice() { }
}

class BasketItem {
    constructor(product, img = 'https://via.placeholder.com/400x300') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.volume = product.quantity;
        this.totalPrice = this.price * this.volume;
        if (!product.img) {
            this.img = img;
        } else {
            this.img = product.img;
        };
    }
    render() {
        return `<div data-id="${this.id}" class="basket__basket-item basket-item">
                    <img class="basket-item__img" src="${this.img}" alt="${this.title}" height="100px">
                    <div class="basket-item__wrp">
                        <h3 class="basket-item__title">${this.title}</h3>
                        <p class="basket-item__price">Цена за шт.: <span>${this.price}</span> $</p>
                        <p class="basket-item__volume">Количество: <span>${this.volume}</span> шт.</p>
                        <p class="basket-item__totalPrice">Общая цена: <span>${this.totalPrice}</span> $</p>
                    </div>
                    <button data-id="${this.id}" class="basket-item__btn btn-delete" type="button">X</button>
                </div>`
    }
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = []; //массив товаров, заполнится из JSON документа
        this.filtered = []; //массив для фильтра
        this._getProducts()//рекомендация, чтобы метод был вызван в текущем классе
            .then(data => {
                this.goods = data;//запишем полученные данные в массив
                this.render();//вывод товаров на страницу
                this.сalcuAllPriceGoods(); //общая цена товара на странице
                this._init();
            });
    }
    _getProducts() {
        return fetch(`${API}/${catalogData}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    сalcuAllPriceGoods() {
        let sumPrice = 0;
        this.goods.forEach(item => {
            sumPrice += item.price;
        });
        console.log(`Общая цена товаров на странице = ${sumPrice}.`);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }
    _init() {
        document.querySelector(this.container).addEventListener("click", event => {
            if (event.target.classList.contains('product-item__btn')) {
                basketList.addProduct(event.target.dataset.id)
            }
        });
        document.querySelector('.search-form').addEventListener('submit', elem => {
            elem.preventDefault();
            this.filterProducts(document.querySelector('.search-field').value)
        })
    }
    filterProducts(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.goods.filter(product => regexp.test(product.product_name));
        this.goods.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('hidden');
            } else {
                block.classList.remove('hidden');
            }
        })
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/400x300') {
        let text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rem aliquid, natus aspernatur eum expedita magnam quod? Accusamus architecto, maiores totam ea expedita omnis a perspiciatis, qui cumque repellendus similique."
        this.title = product.product_name;
        this.id = product.id_product;
        this.text = product.text;
        this.price = product.price;
        if (!product.img) {
            this.img = img;
        } else {
            this.img = product.img;
        };
        if (!product.text) {
            this.text = text;
        } else {
            this.text = product.text;
        };
    }
    render() {
        return `<div data-id="${this.id}" class="product-item">
                    <h3 class="product-item__title">${this.title}</h3>
                    <img class="product-item__img" src="${this.img}" alt="${this.title}" height="300px">
                    <p class="product-item__text">${this.text}</p>
                    <p class="product-item__price">${this.price} $</p>
                    <button data-id="${this.id}" class="product-item__btn btn-cart" type="button">Купить</button>
                </div>`
    }
}

let list = new ProductList();
let basketList = new BasketList();