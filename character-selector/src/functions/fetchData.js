import axios from 'axios';

export default async (url) => {
    try {
        const response = await axios.get(url);
        const results = response.data;
        return results;
    } catch (error) {
        console.log(error);
    }
};