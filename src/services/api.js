import axios from 'axios';

const API_BASE_URL = 'https://dummyjson.com/users';

export const fetchUsers = async (skip = 0, search = '') => {
  try {
    const url = search
      ? `${API_BASE_URL}/search?q=${search}&limit=10&skip=${skip}`
      : `${API_BASE_URL}?limit=10&skip=${skip}`;
    
    const response = await axios.get(url);
    return {
      users: response.data.users,
      total: response.data.total
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
