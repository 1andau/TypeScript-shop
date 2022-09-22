import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { CartItem } from '../components/cart/types';
import {addItem} from '../redux/slices/cartSlice';
import { selectCartItemById } from '../redux/slices/cartSlice';

type BooksBlockProps = {
  imageLink: string;
  title: string;
  author: string;
id: string;
count: number;
price: number;
name: string, 
subtitle: string,
}

export const Books:React.FC<BooksBlockProps> = ({
subtitle, 
title, 
imageLink,
name, 
id, 
author, 
price }) => {

const dispatch = useDispatch();

const cartItem = useSelector(selectCartItemById(id)); 

  const onClickAdd = () => {
const items:CartItem = { 
imageLink, 
author, 
id, 
count:0,
price, 
title,
subtitle,  
name, 
};
dispatch(addItem(items));
  };


  const addedCount = cartItem ? cartItem.count : 0; 
  return (
    <div className="blogItem-wrap" key={id}>
      <Link to={`/Details/${id}`}>
        <img className="blogItem-cover" src={imageLink} alt="cover" />

        <h1 className="books_title">{title}</h1>

        <p className="blogItem-desc">{subtitle}</p>
      </Link>

      <footer>
        <div className="blogItem-author">
          <img className="book__image" src={imageLink} alt="avatar" />
          <h2> {author}</h2>
          <div>
          <span>{price} $</span>

            <h6>{name}</h6>
            <button className="pay" onClick={onClickAdd}>
            pay now      
   {addedCount > 0 && <i>{addedCount}</i>}

            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

