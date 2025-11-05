import axios from 'axios';

const API_URL = 'http://localhost:3001';

// 🔄 Função para enviar imagem e retornar a URL
export const uploadImage = async (file) => {
  const formData = new FormData();
formData.append('imagem', file); // 👈 nome precisa bater com upload.single('imagem')

const response = await axios.post('http://localhost:3001/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
  return response.data;
};

// 🔄 Criar um post no backend
export const createPost = async ({ legend, local, data, urls }) => {
  return await axios.post(`${API_URL}/posts`, { legend, local, data, urls });
};

// 🔄 Buscar todos os posts
export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data.posts;
};

export const fetchPostId = async (id) => {
  const response = await axios.get(`${API_URL}/post/${id}`);
  return response.data.post;
};

export const deletePost = async (id) => {
  const response = await axios.delete(`${API_URL}/post/${id}`);
  return response.data;
};
