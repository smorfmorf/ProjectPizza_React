import { createSlice } from "@reduxjs/toolkit";

//первое состояние (state)
const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

//логика которая будет обрабатывать наш state
export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    //*Когда будем вызывать эту функцию в компоненте каком-то, она тут вызовится, но когда вызовится она получит свое состояние state
    //?Когда будем передавать в dispatch нашу функцию setCategoryId то мы можем сделать так dispatch(setCategoryId(5)) и это 5 будет хранится в action.payload

    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

//достаем нашу функцию которая будет менять стейт из экшенов
export const { setCategoryId, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

// reducer делает обработку нашего стейта (изменяет его) в него передаем наши экшены
export default filterSlice.reducer;
