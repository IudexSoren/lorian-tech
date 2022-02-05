import STORE from '@/store';
import API from './API';

export const getImage = async (FOLDER, path) => {
  try {
    const response = await API.post('/content/image', {
      FOLDER,
      path
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getFile = async (FOLDER, path) => {
  try {
    const response = await API.post('/content/file', {
      FOLDER,
      path
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}