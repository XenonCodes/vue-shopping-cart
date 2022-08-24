const products = [
    {id: 1, title: 'Notebook', price: 2000, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?', img: "./img/product1.jpg"},
    {id: 2, title: 'Mouse', price: 20, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?'},
    {id: 3, title: 'Keyboard', price: 200, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?'},
    {id: 4, title: 'Gamepad', price: 50, text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error aliquam eius perferendis velit maxime nesciunt illo maiores explicabo dicta cumque enim consectetur, consequuntur autem laudantium. Quaerat explicabo ea odit magni?', img: "./img/product4.png"},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    if (item.img == undefined) {
        item.img = "https://via.placeholder.com/400x300";
    };
    return `<div class="product-item">
                <h3 class="product-item__title">${item.title}</h3>
                <img src="${item.img}" alt="${item.title}" height="300px">
                <p class="product-item__text">${item.text}</p>
                <p class="product-item__price">${item.price} $</p>
                <button class="product-item__btn btn-cart" type="button">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(listItem => renderProduct(listItem));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);