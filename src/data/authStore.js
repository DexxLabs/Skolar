import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isRegno:false,
  regno:'',

  login: async (token) => {
    await AsyncStorage.setItem('token', token);
    set({ isLoggedIn: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    set({ isLoggedIn: false });
  },

  checkAuth: async () => {
    const token = await AsyncStorage.getItem('token');
    set({ isLoggedIn: !!token });
  },

  checkRegno: async () => {
    const no = await AsyncStorage.getItem('regno');
    set({isRegno: !!no});
    set({regno:no})

  },

  setRegno: async (reg) => {
    await AsyncStorage.setItem('regno', reg);
    set({isRegno: true})
    set({regno : reg})
  },

  fetchRegno: async () => {
    const no = await AsyncStorage.getItem('regno')
    set({regno:no})
  },

  hydrate: async () => {
    const token = await AsyncStorage.getItem('token');
    const regno = await AsyncStorage.getItem('regno');
  
    set({
      isLoggedIn: !!token,
      isRegno: !!regno,
      regno,
    });
  }
}));

