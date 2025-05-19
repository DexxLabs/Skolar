import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,

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
}));

