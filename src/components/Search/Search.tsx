import React, { useRef, useState } from 'react';
import styles from './root.module.scss';
import { setSearchValue } from '../../redux/slices/filters';
import { useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';

//debounce -- выжидает определенное время, чтобы отправить через search 
//запрос на сервер, и за счет него, отправляется 1 гет запрос вместо тыщи 
// debounce -- способ отложенного выполнения кода, что-то вроде setTimeOut 

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(''); 
  const inputRef = useRef<HTMLInputElement>(null); //ссылка на инпут 

//что такое current в useRef? смотри, у хука useRef есть свойство current, прописывая которое ты автоматически 
//передаешь переменной document.querySelector('input').focus() ---- это и есть current 

//focus --- устанавливает фокус на указанный элемент
  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('');
if(inputRef.current){
  inputRef.current.focus();
}
  };

  //useCallBack -- возвращает запомненный братный вызов. передаешь массив заисисимостей в useccalback и он вернет запомненую версию обратного вызова 
  //которая изенится только в том случае, если изименилоась одна из зависимостей. в случае с инпутом, мы сбрасываем лишние рендеры
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 100),
    [],
  );

  //что происходит тут?сверху у нас функция debounce, которая установила время поиска 150 миллисекунды. 
  //напомню, что это нужно для того чтобы не происхожило тысяча гет запросов при наборе текста 
   

  //event.target.value -- это когда у тебя много элементов, события которых нужно обрабатывать одинаковыим способом. 
  //и вместо того чтобы кажлму прописывать событие, мы используем event.target.value (это называется делегирование)
  
  const unChangeInput = (event: any) =>{
setValue(event.target.value); 
updateSearchValue(event.target.value)
  }



  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={unChangeInput}
        className={styles.input}
        placeholder="Поиск ..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
