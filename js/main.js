//Lesson-3
//Вывести товары корзины из JSON
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const catalogData = 'catalogData.json'
const getBasket = 'getBasket.json'

class BasketList {
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this.totalPrice = 0;
        this._getProducts()
            .then(data => {
                this.goods = data.contents;//запишем полученные данные в массив
                this.render();//вывод товаров на страницу
                this.getButton();
            });
        this.showBasket();
    }
    _getProducts() {
        return fetch(`${API}/${getBasket}`)
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
    showBasket() {
        let buttonBasket = document.querySelector('.btn-basket');
        buttonBasket.addEventListener("click", () => {
            document.querySelector(this.container).classList.toggle('hidden');
        });
    }
    addProduct(id) {
        let product = document.querySelector(`[data-id="${id}"]`);
        let element = product.querySelector('.basket-item__volume').querySelector('span');
        element.innerText = +element.innerText + 1;
        this.changesProduct(product);
    }
    deleteProduct(id) {
        let product = document.querySelector(`[data-id="${id}"]`);
        let element = product.querySelector('.basket-item__volume').querySelector('span');
        if (+element.innerText > 0) {
            element.innerText = +element.innerText - 1;
            this.changesProduct(product);
        }
    }
    getButton() {
        document.querySelectorAll(".btn-delete").forEach(button => {
            button.addEventListener('click', function (event) {
                basketList.deleteProduct(event.target.dataset.id);
            });
        });
    }
    changesProduct(product) {
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
        this._getProducts()//рекомендация, чтобы метод был вызван в текущем классе
            .then(data => {
                this.goods = data;//запишем полученные данные в массив
                this.render();//вывод товаров на страницу
                this.сalcuAllPriceGoods(); //общая цена товара на странице
                this.getButton();
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

    getButton() {
        document.querySelectorAll(".product-item__btn").forEach(button => {
            button.addEventListener('click', function (event) {
                basketList.addProduct(event.target.dataset.id)
            });
        });
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
        return `<div class="product-item">
                    <h3 class="product-item__title">${this.title}</h3>
                    <img src="${this.img}" alt="${this.title}" height="300px">
                    <p class="product-item__text">${this.text}</p>
                    <p class="product-item__price">${this.price} $</p>
                    <button data-id="${this.id}" class="product-item__btn btn-cart" type="button">Купить</button>
                </div>`
    }
}

let list = new ProductList();
let basketList = new BasketList();

// Lesson-2

// class BasketList{
//     constructor(container = '.basket') {
//         this.container = container;
//         this.goods = [];
//         this.totalPrice = 0;
//     }
//     render(){}
//     addProduct(){}
//     deleteProduct(){}
//     clearBasket(){}
//     calcuTotalPrice(){}
// }

// class BasketItem{
//     constructor(product) {
//         this.id = product.id;
//         this.title = product.title;
//         this.price = product.price;
//         this.volume;
//         this.totalPrice;
//     }
//     render(){}
//     addFavorites(){}
//     deleteFavorites(){}
//     increaseVolume(){}
//     reduceVolume(){}
//     calcuTotalPrice(){}
// }

// class ProductList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = [];
//         this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
//         this.render();//вывод товаров на страницу
//         this.сalcuAllPriceGoods(); // Второе задание с подсчетом цены на весь товар.
//     }
//     _fetchProducts() {
//         this.goods = [
//             {
//                 id: 1,
//                 title: 'Notebook',
//                 price: 2000,
//                 text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?',
//                 img: "./img/product1.jpg"
//             },
//             {
//                 id: 2,
//                 title: 'Mouse',
//                 price: 20,
//                 text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?'
//             },
//             {
//                 id: 3,
//                 title: 'Keyboard',
//                 price: 200,
//                 text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?'
//             },
//             {
//                 id: 4,
//                 title: 'Gamepad',
//                 price: 50,
//                 text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?',
//                 img: "./img/product4.png"
//             },
//         ];
//     }
//     сalcuAllPriceGoods(){
//         let sumPrice = 0;
//         this.goods.forEach(item => {
//             sumPrice += item.price;
//         });
//         alert(`Общая цена товаров на странице = ${sumPrice}.`);
//     }

//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const item = new ProductItem(product);
//             block.insertAdjacentHTML("beforeend", item.render());
//             //              block.innerHTML += item.render();
//         }
//     }
// }

// class ProductItem {
//     constructor(product, img = 'https://via.placeholder.com/400x300') {
//         this.title = product.title;
//         this.id = product.id;
//         this.text = product.text;
//         this.price = product.price;
//         if (product.img == undefined) {
//             this.img = img;
//         } else {
//             this.img = product.img;
//         };
//     }
//     render() {
//         return `<div class="product-item">
//                     <h3 class="product-item__title">${this.title}</h3>
//                     <img src="${this.img}" alt="${this.title}" height="300px">
//                     <p class="product-item__text">${this.text}</p>
//                     <p class="product-item__price">${this.price} $</p>
//                     <button class="product-item__btn btn-cart" type="button">Купить</button>
//                 </div>`
//     }
// }

// let list = new ProductList();

// Lesson-1

// const products = [
//     {id: 1, title: 'Notebook', price: 2000, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?', img: "./img/product1.jpg"},
//     {id: 2, title: 'Mouse', price: 20, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?'},
//     {id: 3, title: 'Keyboard', price: 200, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?'},
//     {id: 4, title: 'Gamepad', price: 50, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?', img: "./img/product4.png"},
// ];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
// const renderProduct = (item) => {
//     if (item.img == undefined) {
//         item.img = "https://via.placeholder.com/400x300";
//     };
//     return `<div class="product-item">
//                 <h3 class="product-item__title">${item.title}</h3>
//                 <img src="${item.img}" alt="${item.title}" height="300px">
//                 <p class="product-item__text">${item.text}</p>
//                 <p class="product-item__price">${item.price} $</p>
//                 <button class="product-item__btn btn-cart" type="button">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     const productsList = list.map(listItem => renderProduct(listItem));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList.join('');
// };

// renderPage(products);