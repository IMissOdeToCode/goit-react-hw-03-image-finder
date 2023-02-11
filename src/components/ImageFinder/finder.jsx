import PropTypes from 'prop-types';

const finder = (query, page) => {
  const KEY = '31997042-894b50945f52065251b1ba68b';
  // const KEY = '0';
  const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(URL).then(response => {
    if (response.ok) {
      // console.log('OK', response);
      return response.json();
    }
    // console.log('not OK', response.status);

    return Promise.reject(
      new Error(`status: ${response.status} - Bad Request Error`)
    );
  });
};

export default finder;

finder.propTypes = {
  query: PropTypes.string,
  page: PropTypes.string,
};
