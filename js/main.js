// Lesson-2

class BasketList{
    constructor(container = '.basket') {
        this.container = container;
        this.goods = [];
        this.totalPrice = 0;
    }
    render(){}
    addProduct(){}
    deleteProduct(){}
    clearBasket(){}
    calcuTotalPrice(){}
}

class BasketItem{
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.volume;
        this.totalPrice;
    }
    render(){}
    addFavorites(){}
    deleteFavorites(){}
    increaseVolume(){}
    reduceVolume(){}
    calcuTotalPrice(){}
}

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this.render();//вывод товаров на страницу
        this.сalcuAllPriceGoods(); // Второе задание с подсчетом цены на весь товар.
    }
    _fetchProducts() {
        this.goods = [
            {
                id: 1,
                title: 'Notebook',
                price: 2000,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?',
                img: "./img/product1.jpg"
            },
            {
                id: 2,
                title: 'Mouse',
                price: 20,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?'
            },
            {
                id: 3,
                title: 'Keyboard',
                price: 200,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?'
            },
            {
                id: 4,
                title: 'Gamepad',
                price: 50,
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?',
                img: "./img/product4.png"
            },
        ];
    }
    сalcuAllPriceGoods(){
        let sumPrice = 0;
        this.goods.forEach(item => {
            sumPrice += item.price;
        });
        alert(`Общая цена товаров на странице = ${sumPrice}.`);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
            //              block.innerHTML += item.render();
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/400x300') {
        this.title = product.title;
        this.id = product.id;
        this.text = product.text;
        this.price = product.price;
        if (product.img == undefined) {
            this.img = img;
        } else {
            this.img = product.img;
        };
    }
    render() {
        return `<div class="product-item">
                    <h3 class="product-item__title">${this.title}</h3>
                    <img src="${this.img}" alt="${this.title}" height="300px">
                    <p class="product-item__text">${this.text}</p>
                    <p class="product-item__price">${this.price} $</p>
                    <button class="product-item__btn btn-cart" type="button">Купить</button>
                </div>`
    }
}

let list = new ProductList();

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