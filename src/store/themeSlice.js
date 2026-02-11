import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    return savedTheme
  }
  return 'dark'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: getInitialTheme()
  },
  reducers: {
    setTheme: (state, action) => {
      state.value = action.payload
      localStorage.setItem('theme', action.payload)
    }
  }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
