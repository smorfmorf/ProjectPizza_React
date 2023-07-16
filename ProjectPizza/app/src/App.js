import React from "react";
// import pizzas from "./assets/pizzas.json";
import Header from "./components/Header";
import Info from "./components/Info";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";
import Oplata from "./components/Oplata";
import ZakazGotov from "./components/Oplata/ZakazGotov";

import "./Theme.scss";

export const SearchContext = React.createContext();

function App() {
    const [searchValue, setSearchValue] = React.useState("");
    // const pathname = window.location.pathname;
    const [isDarkTheme, setIsDarkTheme] = React.useState(false);
    const handleToggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);

        // function toggleTheme() {
        //     toggle.addEventListener("change", function () {
        //         if (toggle.checked) {
        //             body.classList.add("dark-theme");
        //         } else {
        //             body.classList.remove("dark-theme");
        //         }
        //     });
        // }
    };

    return (
        <>
            <div className={`${isDarkTheme ? "BodyStyleBlack" : "BodyStyle"}`}>
                <label className="switch">
                    <input
                        id="themeToggle"
                        type="checkbox"
                        onClick={handleToggleTheme}
                    />
                    <span class="slider"></span>
                </label>
                <div
                    className={`wrapper ${
                        isDarkTheme ? "dark-theme" : "light-theme"
                    }`}
                >
                    <SearchContext.Provider
                        value={{ searchValue, setSearchValue }}
                    >
                        <Header />
                        {/* {isLoading && "Загрузка..."} */}
                        <div className="content" id="add">
                            {/* {pathname === '/' && <Home/>} */}
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/cart" element={<Cart />}></Route>
                                <Route path="*" element={<NotFound />}></Route>
                                <Route
                                    path="/oplata"
                                    element={<Oplata />}
                                ></Route>
                                <Route
                                    path="/oplata/zakaz"
                                    element={<ZakazGotov />}
                                ></Route>
                                <Route path="/info" element={<Info />}></Route>
                            </Routes>
                        </div>
                    </SearchContext.Provider>
                </div>
            </div>
        </>
    );
}

export default App;
