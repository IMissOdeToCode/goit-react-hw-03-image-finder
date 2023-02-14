import axios from 'axios';
import { PER_PAGE } from './constants';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31997042-894b50945f52065251b1ba68b',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
  },
});

const searchImages = async (query, page) => {
  const { data } = await instance.get('/', {
    params: { q: query, page: page },
  });
  return data;
};

export default searchImages;
