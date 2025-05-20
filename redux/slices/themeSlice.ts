import { createSlice } from '@reduxjs/toolkit';

// Set safe initial state that works on server and client
const initialState = 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      // This will only run on the client where localStorage is available
      const newTheme = state === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    },
    // Add hydration reducer to load theme from client storage
    hydrateTheme: (state) => {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || state;
      }
      return state;
    }
  },
});

export const { toggleTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;