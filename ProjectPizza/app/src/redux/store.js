import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import mySlice from "./slices/mySlice";

//* создаем хранилище
export const store = configureStore({
    reducer: {
        //* помещаем слайс в хранилище (склад)
        filter,
        cart,
        mySlice,
    },
});
//!Это редьюсер
