import axios from "axios";

const instance = axios.create({
    baseURL: "https://jealous-chalk-goat.glitch.me/"
});

export default instance;