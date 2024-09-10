// src/services/api.js

const API_URL = 'https://6425e156d24d7e0de4659c86.mockapi.io';

export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/ga4`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/ga4`);
  return response.json();
};

export const getUserById = async (id) => {
  const response = await fetch(`${API_URL}/ga4/${id}`);
  return response.json();
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${API_URL}/ga4/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/ga4/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
