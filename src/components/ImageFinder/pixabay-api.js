import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '31997042-894b50945f52065251b1ba68b',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  },
});

const searchImages = async (query, page) => {
  const { data } = await instance.get('/', {
    params: { q: query, page: page },
  });
  return data;
};

export default searchImages;
