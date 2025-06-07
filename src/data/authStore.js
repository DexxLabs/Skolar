import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  isRegno: false,
  regno: '',
  userData: null,

  login: async (token) => {
    await AsyncStorage.setItem('token', token);
    set({ isLoggedIn: true });
  },

  logout: async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('regno');
    set({ isLoggedIn: false, isRegno: false, regno: '', userData: null });
  },

  checkAuth: async () => {
    const token = await AsyncStorage.getItem('token');
    set({ isLoggedIn: !!token });
  },

  setRegno: async (reg) => {
    await AsyncStorage.setItem('regno', reg);
    set({ isRegno: true, regno: reg });
  },

  fetchRegno: async () => {
    const no = await AsyncStorage.getItem('regno');
    set({ regno: no });
  },

  setUserData: async (data) => {
    try {
      set({ userData: data });
      await AsyncStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to set user data:', error);
    }
  },

  // Unified hydrate: loads token, regno, and userData together
hydrate: async () => {
  try {
    const values = await AsyncStorage.multiGet(['token', 'regno', 'userData']);
    const token = values[0][1];
    const regno = values[1][1];
    const userData = values[2][1];

    set({
      isLoggedIn: !!token,
      isRegno: !!regno,
      regno,
      userData: userData ? JSON.parse(userData) : null,
    });
  } catch (e) {
    console.error('Hydration error:', e);
  }
},
}));
