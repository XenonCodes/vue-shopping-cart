//Lesson-6
//Добавить поиск, корзину, каталог товаров - с помощью компонентов Vue.js. Добавить error если не получилось получить json

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

window.addEventListener("load", () => {
    document.body.classList.toggle('hidden');
});

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
        showBasket: false,
        error: false
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
                    this.error = true;
                })
        },
        //Метод добавления товара в корзину.
        addProduct(product) {
            //Получаем данные с удаленного сервера(Есть ли доступ к добавлению товара)
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    //Если result === 1, то доступ разрешен
                    if (data.result === 1) {
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
                    }
                })
        },
        //Метод удаления товара из корзины
        deleteProduct(cart) {
            //Получаем данные с удаленного сервера(Есть ли доступ к удалению товара)
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    //Если result === 1, то доступ разрешен
                    if (data.result === 1) {
                        //Если у объекта cart свойство quantity имеет значение > 1 то...
                        if (cart.quantity > 1) {
                            //Свойство quantity уменьшается на 1
                            cart.quantity--;
                        } else { //А если нет то...
                            //Используя метод splice мы удаляем из массива переданный в качестве параметра функции объект cart. Splice принимает первым параметром index с которого надо удалить из массива, а вторым параметром количество удалений(последовательно). Метод .indexOf возвращает нам index для объекта cart который дальше мы используем в splice.
                            this.basketGoods.splice(this.basketGoods.indexOf(cart), 1);
                        }
                    }
                })
        },
        //Метод полной очистки товара из корзины
        clearBasket() {
            //бнуляем массив
            this.basketGoods = [];
        }
    },
    //Встроенный метод который исполняется сразу же после инициализации свойства data. В него записываем методы которые нужно сразу выполнить после прогрузки.
    mounted() {
        //Получаем данные из json(удаленный) и заносим в массив products и filtered
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        //Получаем данные из json и заносим в массив basketGoods
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basketGoods.push(el);
                }
            });
        //Получаем данные из json(локальный) и заносим в массив products и filtered
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    }
});