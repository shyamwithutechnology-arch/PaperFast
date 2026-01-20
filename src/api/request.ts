import api from './axios';

export const GET = async <T>(url: string, params?: object): Promise<T> => {
  const res = await api.get(url, { params });
  return res.data;
};

export const POST = async <T>(url: string, body?: any): Promise<T> => {
  const res = await api.post(url, body);
  console.log('eeeeeeeerrrrrrrrrr', body);
  
  return res.data;
};

export const PUT = async <T>(url: string, body?: any): Promise<T> => {
  const res = await api.put(url, body);
  return res.data;
};

export const DELETE = async <T>(url: string): Promise<T> => {
  const res = await api.delete(url);
  return res.data;
};

export const POST_FORM = async <T>(url: string, formData: FormData): Promise<T> => {
  const res = await api.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });  
  return res.data;
};