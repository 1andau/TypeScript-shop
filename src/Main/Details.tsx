import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../redux/slices/cartSlice';
import { useState } from 'react';
// import { DetailsProps } from '../components/cart/types';

export const Details:React.FC = () => {
  const [books, setBooks] = useState<{
    imageLink: string;
    title: string;
    author: string;
    bookId: string;
  count: number;
  price: number;
  subtitle: string,
  name: string, 
  year:string, 
  language:string, 
  category: string, 
  country:string, 
  themes: string, 
  pages: string,     
  }>();
  const { bookId } = useParams();
  const dispatch = useDispatch();
    //@ts-ignore

  const handleOneClick = () => {
    const addToCart = {
      id: bookId,
          //@ts-ignore

      imageLink: books.imageLink,
          //@ts-ignore

      title: books.title,
          //@ts-ignore

      name: books.name,
          //@ts-ignore

      author: books.author,
          //@ts-ignore

      price: books.price,
    };
    dispatch(addItem(addToCart));
  };

  useEffect(() => {
    async function fetchbookss() {
      try {
        const { data } = await axios.get(
          'https://624c63b1d71863d7a80997bc.mockapi.io/movies/' + bookId,
        );
        setBooks(data);
      } catch (error) {
        alert('Error');
      }
    }
    fetchbookss();
  }, [bookId]);

  if (!books) {
    return <>Loading...</>;
  }
  return (
    <div className="card-wrapper" key={books.bookId}>
      <div className="card">
        <div className="img-display">
          <div className="img-showcase">
            <img src={books.imageLink} alt="" />
          </div>
        </div>

        <div className="product-content">
          <h2 className="product-title">{books.title}</h2>
          <h3 className="product-link">{books.author}</h3>
          <div className="product-rating">
            <span>4.7(21)</span>
          </div>

          <div className="product-price">
            <p className="last-price">
              Price: <span> {books.price} $</span>
            </p>
            <p className="new-price">
              Year : <span> {books.year}</span>
            </p>
          </div>

          <div className="product-detail">
            <h2>about this item: </h2>
            <p>{books.subtitle}</p>
            <ul>
              <li>
                Binding : <span>{books.language}</span>
              </li>
              <li>
                Pages : <span>{books.pages}</span>
              </li>
              <li>
                Binding : <span>{books.category}</span>
              </li>
              <li>
                Themes: <span>{books.themes}</span>
              </li>
              <li>
                country: <span> {books.country}</span>
              </li>
            </ul>
          </div>
          <button type="button" className="btn" onClick={() => handleOneClick()}>
            Click on by
          </button> 
        </div>
      </div>
    </div>
  );
};

