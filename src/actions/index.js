import _ from 'lodash';
import jsonPlaceholder from './../apis/jsonPlaceholder';

export const fetchPostAndUsers = () => async (dispatch, getState) => {
  // Busca posts
  await dispatch(fetchPosts());
  // Define quais são os userIds unicos
  const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // Dá dispatch em uma action para cada userId
  userIds.forEach(id => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({
    type: 'FETCH_POSTS',
    payload: response.data,
  });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  return dispatch({
    type: 'FETCH_USER',
    payload: response.data,
  });
};
