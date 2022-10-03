import axios from "axios";

export const get = async (url) => {
    return await axios.get(url);
}
