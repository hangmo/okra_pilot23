import axios from 'axios'
import { setInterceptors } from '@/api/interceptors'

function createServerInstance() {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
  });
  console.log('~~~~instance : ', instance);
  return setInterceptors(instance);
}

export const serverApi = createServerInstance();