import axios from 'axios';

export default async function api(path) {
    return await axios.get(path);
}