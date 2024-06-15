import { createApp } from "vue";
import App from "./App.vue";
import naive from "naive-ui";
import router from "./router";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import "./style.css";
import * as HIIcons from "oh-vue-icons/icons/hi";
import * as RIcons from "oh-vue-icons/icons/ri";
const Ri = Object.values({ ...RIcons });
const Hi = Object.values({ ...HIIcons });
addIcons(...Hi, ...Ri);

const app = createApp(App);
app.use(naive);
app.component("v-icon", OhVueIcon);
// app.component("downloadExcel", JsonExcel);
app.use(router);
app.mount("#app");
