import React from "react";
// import pizzass from "../assets/pizzas.json";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

import { useSelector, useDispatch } from "react-redux";
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/slices/filterSlice";
import axios from "axios";
// TODO
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { categoryId, sort, currentPage } = useSelector(
        (state) => state.filter
    );

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
        // setCategoryId вернет {'filters/setCategoryId', payload:id }
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    const fetchPizzas = async () => {
        setIsLoading(true); // идет запрос - скелетоны true
        //? *-может быть может не быть   !-всегда будут (сортировка)
        //!из свойства удали минус(-) если он будет   1(если есть минус в sortProp значит сортировка по возрастанию и минус убераем и отдаем только название параметра
        const sortBy = sort.sortProperty.replace("-", "");
        //!проверяй если в сортировке минус(-) если есть делай сортировку по возврастанию иначе по убыванию
        //! 2 если есть минус то делаем сортировку по возрастанию иначе по убыванию
        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        //* если нулевая категория тогда хочу все вывести (может быть может нет)
        const category = categoryId > 0 ? `category=${categoryId}` : "";

        const search = searchValue ? `&search=${searchValue}` : "";
        //! асинхроный код
        // axios
        //     .get(
        //         `https://63ebb32b32a0811723906e45.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        //     )
        //     .then((res) => {
        //         setItems(res.data);
        //         // загрузка закончилась скелетоны false
        //         setIsLoading(false);
        //         console.log("Получаем пиццы: ", res.data);
        //     })
        //     .catch((err) => {
        //         setIsLoading(false);
        //         console.error(err, "Ошибка");
        //     });

        try {
            //! синхроный код
            const res = await axios.get(
                `https://63ebb32b32a0811723906e45.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            );
            setItems(res.data);

            console.log("Получаем пиццы: ", res.data);
        } catch (error) {
            alert("Ошибка бэка");
            console.log("err", error);
        } finally {
            // загрузка закончилась скелетоны false
            setIsLoading(false);
        }
    };

    const { searchValue } = React.useContext(SearchContext);

    const [items, setItems] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(true);

    //*ЭТА ХУЙНЯ В filterSlice теперь лежит
    // const [categoryId, setCategoryId] = React.useState(0);
    //? const [currentPage, setCurrentPage] = React.useState(1);
    // const [sortType, setSortType] = React.useState({
    //   name: "популярности",
    //   sortProperty: "rating",
    // });

    //1 Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            // console.log("params", params);
            const sort = list.find(
                (obj) => obj.sortProperty === params.sortProperty
            );
            // console.log("sort: ", sort);
            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            );
            isSearch.current = true;
            console.log("0_0");
        }
    }, []);

    //3 Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0);
        console.log("isSearch: ", isSearch.current);

        if (!isSearch.current) {
            fetchPizzas();
        }
        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    //TODO Если пришли какие-то параметры нужно превратить в 1 целую строчку
    //* Вшиваем адрес в адресную строку
    //2 Если изменили параметры и был уже первый рендер будет проверка if
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });
            // console.log("qs: ", queryString);
            navigate(`?${queryString}`);
            //sortProperty=rating&categoryId=0&currentPage=1
        }
        isMounted.current = true;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    //items pizzass
    const pizzas = items
        // *Фильрация от руки
        // .filter((obj) => {
        //     if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        //         return true;
        //     }
        //     return false;
        // })
        .map((obj) => (
            <PizzaBlock
                key={obj.id}
                {...obj}

                // title={obj.title}
                // price={obj.price}
                // imageUrl={obj.imageUrl}
                // sizes={obj.sizes}
                // types={obj.types}
            />
        ));
    const skeletons = [...new Array(6)].map((_, index) => (
        <Skeleton key={index} />
    ));

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {/* <PizzaBlock title="Мексиканская" price={500} /> */}

                {/* Если идет загрузка isLoading тогда в его state кидаем true,
        Когда загрузка закончилась(получили данные) кидаем в state isLoading - false и рендерятся наши пицы   */}
                {isLoading ? skeletons : pizzas}
                {/* {pizzas} */}
            </div>

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
