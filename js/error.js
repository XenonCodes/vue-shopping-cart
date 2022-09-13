Vue.component ("error", {

    template:`
            <div class="error" v-show="$root.error">
                <h2>Ошибка соеденения с удаленным сервером</h2>
                <p>Не все товары загружены!</p>
                <button @click="$root.error = !$root.error">OК</button>
            </div>`
}); 