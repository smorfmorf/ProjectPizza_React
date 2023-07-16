import { createSlice } from "@reduxjs/toolkit";

//первое состояние (state)
const initialState = {
    totalPrice: 0,
    items: [],
};

//логика которая будет обрабатывать наш state
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );
            console.log("AC", action);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            //считаем цену
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },

        plusItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );
            if (findItem) {
                findItem.count++;
            }
        },
        minusItem(state, action) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );
            if (findItem) {
                findItem.count--;
            }

            //подсчет общей цены после изменение кол-во пиц
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        removeItem(state, action) {
            console.log(action);
            state.items = state.items.filter(
                (obj) => obj.id !== action.payload
            );

            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

//достаем нашу функцию которая будет менять стейт из экшенов
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

// reducer делает обработку нашего стейта (изменяет его) в него передаем наши экшены
export default cartSlice.reducer;
