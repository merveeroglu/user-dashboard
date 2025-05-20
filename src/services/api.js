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
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    // Simulate API call
    const response = await axios.post(`${API_BASE_URL}/add`, userData);
    return {
      ...response.data,
      id: Date.now(), // Generate unique ID for localStorage
    };
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = async (userData) => {
  try {
    // Simulate API call
    const response = await axios.put(`${API_BASE_URL}/${userData.id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}; 