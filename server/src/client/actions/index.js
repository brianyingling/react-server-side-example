import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
export const URL = 'http://react-ssr-api.herokuapp.com/users';

export const fetchUsers = () => async dispatch => {
    const res = await axios.get(URL);
    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};
