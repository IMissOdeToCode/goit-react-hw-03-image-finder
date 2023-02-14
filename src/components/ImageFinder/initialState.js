import { STATUS_IDLE } from './constants';

const initialState = {
  query: '',
  page: 1,
  images: [],
  isLoadMore: false,
  error: null,
  status: STATUS_IDLE,
};

export default initialState;
