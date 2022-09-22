import React, { useEffect, useRef } from 'react';
import Categories from '../pages/filters/Categories';
import {Books} from './Books';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilters } from '../redux/slices/filters';
import { Sort } from '../pages/filters/Sort';
import Footer from '../components/footer/Footer';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { sortList } from '../pages/filters/Sort';
import { fetchBooks, selectBooksData } from '../redux/slices/booksSlice';
import { setCategoryId } from '../redux/slices/filters';
//qs -- это для ссылок, кторые создают специальные ссылки со всеми сортировками, типами и etc

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryId, sort, searchValue } = useSelector(selectFilter);
  const { items } = useSelector(selectBooksData);
  const isMounted = useRef(false);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const getBooks = async () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      //@ts-ignore
      fetchBooks({
        sortBy,
        category,
        order,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
      };

      const queryString = qs.stringify(params, { skipNulls: true });

      navigate(`/?${queryString}`);
    }

    if (!window.location.search) {
      console.log(111);
      fetchBooks();
    }
  }, [categoryId, sort.sortProperty, searchValue]);

  React.useEffect(() => {
    getBooks();
  }, [categoryId, sort.sortProperty, searchValue]);

  //указываем что все будет происходить при первом рендере
  //если тут есть что-то, то мы будем это парсить из параметров которые есть, и превращать их в объект
  //далее с помощью qs мы парсим window.location.search
  //substring -- пишем для того, чтобы в ссылке не было вопросительного знака, который может все поломать

  //если запроса серч нету, то мы делаем фетч запрос.

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj:any) => obj.sortProperty === params.sortProperty);
      if (sort) {
        params.sort = sort;
      }
      dispatch(setFilters(params));
    }
    isMounted.current = true;
  }, []);


  return (
    <div className="main_block">
      <div className="headdd">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value = {sort} />
      </div>

      <h1 className="main_title">books shop</h1>
      <div className="container">
        <div className="blogList-wrap">
          {items.map((obj:any) => (
            <Books key={obj.id} {...obj} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
