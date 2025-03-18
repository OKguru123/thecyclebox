import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Make sure to set this in your .env file
  timeout: 10000, // Set a timeout of 10 seconds
});

export const signupApi = async (formData: any) => {
  try {
    const response = await api.post('/register', formData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.error || 'An error occurred during signup.');
    } else if (error.request) {
      // No response received from the server
      console.error('Error request:', error.request);
      throw new Error('No response from the server. Please try again later.');
    } else {
      // Other errors
      console.error('Error message:', error.message);
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const loginApi = async (formData: any) => {
  try {
    const response = await api.post('/login', formData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.error || 'An error occurred during signup.');
    } else if (error.request) {
      // No response received from the server
      console.error('Error request:', error.request);
      throw new Error('No response from the server. Please try again later.');
    } else {
      // Other errors
      console.error('Error message:', error.message);
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const loginWithPasswordApi = async (formData: any) => {
  try {
    const response = await api.post('/login-with-password', formData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.error || 'An error occurred during signup.');
    } else if (error.request) {
      // No response received from the server
      console.error('Error request:', error.request);
      throw new Error('No response from the server. Please try again later.');
    } else {
      // Other errors
      console.error('Error message:', error.message);
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const otpVerify = async (formData: any) => {
  try {
    const response = await api.post('/otp-verify', formData);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.error || 'An error occurred during signup.');
    } else if (error.request) {
      // No response received from the server
      console.error('Error request:', error.request);
      throw new Error('No response from the server. Please try again later.');
    } else {
      // Other errors
      console.error('Error message:', error.message);
      throw new Error('An error occurred. Please try again.');
    }
  }
};

export const axiosPost = async (endpoint: string, payload: any) => {
  const isFormData = payload instanceof FormData;

  const authToken = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
    }
  };
  return await axios.post(endpoint, payload, config)
}

export const axiosPut = async (endpoint: string, payload: any) => {
  const isFormData = payload instanceof FormData;

  const authToken = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
    }
  };
  return await axios.put(endpoint, payload, config)
}

export const axiosGet = async (endpoint: string) => {
  const authToken = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  };
  return await axios.get(`${endpoint}`, config)
}
export const axiosDelete = async (endpoint: string) => {
  const authToken = localStorage.getItem('token');
  const config = {
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  };
  return await axios.delete(`${endpoint}`, config)
}