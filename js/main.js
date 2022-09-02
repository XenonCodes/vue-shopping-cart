//Lesson-5
//Добавить поиск, корзину, добавление/удаление корзины - с помощью Vue.js

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//Создаю константу и присваиваю новый объект Vue
const app = new Vue({
    //Свойство которое связывает Vue через id в HTML.(встроенное)
    el: '#app',
    //Свойство в котором хранятся наш объект со всеми свойствами.(встроенное)
    data: {
        //Свойство хранящее URL корзины
        basketUrl: '/getBasket.json',
        //Свойство хранящее URL каталога
        catalogUrl: '/catalogData.json',
        //Свойство(массив) карточек товара корзины(пока пустой)
        basketGoods: [],
        //Свойство(массив) продуктов каталога(пока пустой)
        products: [],
        //Свойство(массив) продуктов каталога отфильтрованных(пока пустой)
        filtered: [],
        //Заглушка для текста товара
        stubText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rem aliquid, natus aspernatur eum expedita magnam quod? Accusamus architecto, maiores totam ea expedita omnis a perspiciatis, qui cumque repellendus similique.',
        //Заглушка для img товара
        stubImg: 'https://via.placeholder.com/400x300',
        //Свойство принимающее значения введенное пользователем в строку input поиска(изначально пусто)
        userSearch: '',
        //Свойство для показа/скрытия корзины.(изначально скрыто)
        showBasket: false
    },
    //Объект хранящий наши методы(встроенное)
    methods: {
        //Метод фильтрации товара на странице
        filter() {
            //Создается рег.выр. которое принимает за правило значение из свойства userSearch
            const regexp = new RegExp(this.userSearch, 'i');
            //Текущий массив filtered перезаписываем на фильтрованный массив products, где каждый элемент массива сравнивается по рег.выр методом .test (true/false).           Если .product_name элемента массива products совпадает с рег.выр., то записываем в массив filtered.
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
        },
        //Метод получения исх.файла от json
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        //Метод добавления товара в корзину.
        addProduct(product) {
            //Создаем переменную find в которую присваиваем объект полученный с помощью метода find из массива basketGoods. Метод find перебирает массив basketGoods и сравнивает .id_product переданного параметра функции addProduct(объект product каталога товара) и .id_product каждого товара в корзине basketGoods. Если такой товар имеется то find принимает этот товар как объект и записывает в find.
            let find = this.basketGoods.find(item => product.id_product == item.id_product);
            //Если такой объект есть то это true
            if (find) {
                //Увеличиваем свойство quantity(количество) на 1
                find.quantity++;
            } else { //А если нет то...
                //Добавляем новое свойство quantity для объекта product(переданного в параметре функции addProduct) и ставим ему значение 1
                this.$set(product, 'quantity', 1);
                //Добавляем объект product(переданного в параметре функции addProduct) в массив корзины basketGoods методом .push
                this.basketGoods.push(product);
            }
        },
        //Метод удаления товара из корзины
        deleteProduct(cart) {
            //Создаем переменную find в которую присваиваем объект полученный с помощью метода find из массива basketGoods. Метод find перебирает массив basketGoods и сравнивает свойство .id_product переданного параметра функции deleteProduct(объект cart списка корзины) и .id_product каждого товара в корзине basketGoods. Если такой товар имеется то find принимает этот товар как объект и записывает в find.
            let find = this.basketGoods.find(item => cart.id_product == item.id_product);
            //Если у объекта find свойство quantity имеет значение > 0 то...
            if (find.quantity > 0) {
                //Свойство quantity уменьшается на 1
                find.quantity--;
            };
            //Если у объекта find свойство quantity имеет значение == 0 то...
            if (find.quantity == 0) {
                //Массив basketGoods перезаписывается на фильтрованный массив basketGoods. Метод filter перебирает массив basketGoods и сравнивает свойство .id_product переданного параметра функции deleteProduct(объект cart списка корзины) и .id_product каждого товара в корзине basketGoods. Если они не похожи, то товар перезаписывается в basketGoods, а если они одинаковы, то такой объект не попадает в отфильтрованный массив basketGoods, тем самым удаляясь из корзины.
                this.basketGoods = this.basketGoods.filter(el => el.id_product !== cart.id_product);
            }
        },
        //Метод полной очистки товара из корзины
        clearBasket() {
            //бнуляем массив
            this.basketGoods = [];
        }
    },
    //Встроенный метод который исполняется сразу же после инициализации свойства data. В него записываем методы которые нужно сразу выполнить после прогрузки.
    mounted() {
        //Получаем данные из json и заносим в массив products(удаленный)
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        //Получаем данные из json и заносим в массив basketGoods
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketGoods.push(el);
                }
            });
        //Получаем данные из json и заносим в массив products(локальный)
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            })
    }
})

// Вариант ООП

// class BasketList {
//     constructor(container = '.basket') {
//         this.container = container;
//         this.goods = [];
//         this.totalPrice = 0;
//         this._getProducts()
//             .then(data => {
//                 this.goods = data.contents;//запишем полученные данные в массив
//                 this.render();//вывод товаров на страницу
//                 this._init();
//             });
//         this._showBasket();
//     }
//     _getProducts() {
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             });
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const item = new BasketItem(product);
//             block.insertAdjacentHTML("beforeend", item.render());
//         }
//     }
//     _showBasket() {
//         document.querySelector('.btn-basket').addEventListener("click", () => {
//             document.querySelector(this.container).classList.toggle('hidden');
//         });
//     }
//     addProduct(id) {
//         // let find = this.goods.find(product => product.id_product == id);
//         // console.dir(document.querySelector('.products').querySelector(`[data-id="${id}"]`).querySelector('.product-item__price'));
//         // if (find) {
//         //     find.quantity++;
//         //     this._changesProduct(find);
//         // } else {
//         //     let product = {
//         //         id_product: id,
//         //         price: document.querySelector(`[data-id="${id}"]`).querySelector('.product-item__price'),
//         //         product_name: element.dataset['name'],
//         //         quantity: 1
//         //     };
//         //     this.goods = [product];
//         //     this.render();
//         // }

//         let product = document.querySelector(`[data-id="${id}"]`);
//         let element = product.querySelector('.basket-item__volume').querySelector('span');
//         element.innerText = +element.innerText + 1;
//         this._changesProduct(product);
//     }
//     _deleteProduct(id) {
//         let product = document.querySelector(`[data-id="${id}"]`);
//         let element = product.querySelector('.basket-item__volume').querySelector('span');
//         if (+element.innerText > 0) {
//             element.innerText = +element.innerText - 1;
//             this._changesProduct(product);
//         }
//     }
//     _init() {
//         document.querySelector(this.container).addEventListener('click', event => {
//             if (event.target.classList.contains('btn-delete')) {
//                 basketList._deleteProduct(event.target.dataset.id);
//             }
//         });
//     }
//     _changesProduct(product) {
//         let volume = product.querySelector('.basket-item__volume').querySelector('span');
//         let totalPrice = product.querySelector('.basket-item__totalPrice').querySelector('span');
//         let price = product.querySelector('.basket-item__price').querySelector('span');
//         totalPrice.innerText = +price.innerText * +volume.innerText;
//     }
//     clearBasket() { }
//     calcuTotalPrice() { }
// }

// class BasketItem {
//     constructor(product, img = 'https://via.placeholder.com/400x300') {
//         this.id = product.id_product;
//         this.title = product.product_name;
//         this.price = product.price;
//         this.volume = product.quantity;
//         this.totalPrice = this.price * this.volume;
//         if (!product.img) {
//             this.img = img;
//         } else {
//             this.img = product.img;
//         };
//     }
//     render() {
//         return `<div data-id="${this.id}" class="basket__basket-item basket-item">
//                     <img class="basket-item__img" src="${this.img}" alt="${this.title}" height="100px">
//                     <div class="basket-item__wrp">
//                         <h3 class="basket-item__title">${this.title}</h3>
//                         <p class="basket-item__price">Цена за шт.: <span>${this.price}</span> $</p>
//                         <p class="basket-item__volume">Количество: <span>${this.volume}</span> шт.</p>
//                         <p class="basket-item__totalPrice">Общая цена: <span>${this.totalPrice}</span> $</p>
//                     </div>
//                     <button data-id="${this.id}" class="basket-item__btn btn-delete" type="button">X</button>
//                 </div>`
//     }
// }

// class ProductList {
//     constructor(container = '.products') {
//         this.container = container;
//         this.goods = []; //массив товаров, заполнится из JSON документа
//         this.filtered = []; //массив для фильтра
//         this._getProducts()//рекомендация, чтобы метод был вызван в текущем классе
//             .then(data => {
//                 this.goods = data;//запишем полученные данные в массив
//                 this.render();//вывод товаров на страницу
//                 this.сalcuAllPriceGoods(); //общая цена товара на странице
//                 this._init();
//             });
//     }
//     _getProducts() {
//         return fetch(`${API}/${catalogData}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             });
//     }
//     сalcuAllPriceGoods() {
//         let sumPrice = 0;
//         this.goods.forEach(item => {
//             sumPrice += item.price;
//         });
//         console.log(`Общая цена товаров на странице = ${sumPrice}.`);
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const item = new ProductItem(product);
//             block.insertAdjacentHTML("beforeend", item.render());
//         }
//     }
//     _init() {
//         document.querySelector(this.container).addEventListener("click", event => {
//             if (event.target.classList.contains('product-item__btn')) {
//                 basketList.addProduct(event.target.dataset.id)
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', elem => {
//             elem.preventDefault();
//             this.filterProducts(document.querySelector('.search-field').value)
//         })
//     }
//     filterProducts(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.goods.filter(product => regexp.test(product.product_name));
//         this.goods.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if (!this.filtered.includes(el)) {
//                 block.classList.add('hidden');
//             } else {
//                 block.classList.remove('hidden');
//             }
//         })
//     }
// }

// class ProductItem {
//     constructor(product, img = 'https://via.placeholder.com/400x300') {
//         let text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rem aliquid, natus aspernatur eum expedita magnam quod? Accusamus architecto, maiores totam ea expedita omnis a perspiciatis, qui cumque repellendus similique."
//         this.title = product.product_name;
//         this.id = product.id_product;
//         this.text = product.text;
//         this.price = product.price;
//         if (!product.img) {
//             this.img = img;
//         } else {
//             this.img = product.img;
//         };
//         if (!product.text) {
//             this.text = text;
//         } else {
//             this.text = product.text;
//         };
//     }
//     render() {
//         return `<div data-id="${this.id}" class="product-item">
//                     <h3 class="product-item__title">${this.title}</h3>
//                     <img class="product-item__img" src="${this.img}" alt="${this.title}" height="300px">
//                     <p class="product-item__text">${this.text}</p>
//                     <p class="product-item__price">${this.price} $</p>
//                     <button data-id="${this.id}" class="product-item__btn btn-cart" type="button">Купить</button>
//                 </div>`
//     }
// }

// let list = new ProductList();
// let basketList = new BasketList();