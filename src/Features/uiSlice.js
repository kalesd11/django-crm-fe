import { createSlice } from '@reduxjs/toolkit';

 

const uiSlice = createSlice({
  name: 'ui',
  initialState:{
    isSidebarExpanded: true,
  } ,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarExpanded = !state.isSidebarExpanded;
    },
    setSidebarExpanded(state, action) {
      state.isSidebarExpanded = action.payload;
    },
  },
});


// const login = createSlice({
//   name: 'login',
//   initialState:{
//     isUserIsLogedIn: false,
//   } ,
//   reducers: {
//     setUserLogin(state) {
//       state.isUserIsLogedIn = !state.isSidebarExpanded;
//     },
//     setSidebarExpanded(state, action) {
//       state.isUserIsLogedIn = action.payload;
//     },
//   },
// });

 

export const { toggleSidebar, setSidebarExpanded } = uiSlice.actions;
export default uiSlice.reducer;
