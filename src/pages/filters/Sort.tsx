import React, { useEffect, useRef } from 'react';
import '../filters/sort.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSort } from '../../redux/slices/filters';
import {Sort as SortType, SortPropertyEnum} from './SortType'; 

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

type SortPopupProps = {
  value: SortType;
};
//типизировали массив 
 export const sortList: SortItem[]= [
  { name: 'popular (descending)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'popular (increase)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'price (descending)', sortProperty:SortPropertyEnum.PRICE_DESC  },
  { name: 'price (increase)', sortProperty:SortPropertyEnum.PRICE_ASC  },

];

export const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
const sortRef = useRef<HTMLDivElement>(null); //либо html тег, либо null

  const sort = useSelector(selectSort);

  
  const onClickListItem = (obj:SortItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };


  //если в event.path есть sortRef.current, то закрыть окно 
  ///вообще, в реакте нельзя испольщовать addEventLisener, но поскольку мы обращаемся 
  //непосредственно к самому первому родителю body, то можно в принципе оставить 
  useEffect(() => {
    const handleClickOutside = (event:MouseEvent) =>{
      const _event = event as PopupClick;
      if(sortRef.current && !_event.path.includes(sortRef.current)){
setOpen(false); 
// console.log('click');
      }
    }; 
    document.body.addEventListener('click', handleClickOutside); //это фунцкция для того чтобы клик а экран закрывал попап
    return () => document.body.removeEventListener('click', handleClickOutside); 
  }, []); 



  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>

        {open && (
          <div className="sort__popup">
            <ul>
              {sortList.map((obj, i) => (
                <li
                  key={i}
                  onClick={() => onClickListItem(obj)}
                  className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});

