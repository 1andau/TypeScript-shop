import { Link, NavLink, useLocation } from 'react-router-dom';
import { selectCart } from '../../redux/slices/cartSlice';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Search from '../Search/Search';
import styles from './header.module.scss';

const cx = classNames.bind(styles);

export const Header: React.FC<{}> = () => {
  const [checked, setChecked] = useState(false);
  const { items } = useSelector(selectCart);
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);
  const location = useLocation();

  return (
    <div className={styles.HeaderBox}>
      <h1 className={styles.logo}>
        <Link to="./">1andau</Link>
      </h1>
      <label htmlFor="checkbox" className={styles.menuBtnWrapper}>
        <div
          className={cx({
            menuBtn: true,
            closeBtn: checked,
            openBtn: !checked,
          })}
        />
      </label>
      <input
        type="checkbox"
        id="checkbox"
        className={styles.checkbox}
        onChange={() => setChecked((prev) => !prev)}
      />
      <Search />

      <div className={styles.links}>
        <NavLink to="./">
          <button data-testid="home-navlink" className={styles.link}>
            Home
          </button>
        </NavLink>

        <NavLink to="./cart">
          <button data-testid="cart-navlink" className={styles.link}>
            Cart
          </button>
        </NavLink>

        {location.pathname !== './cart' && <span>{totalCount}</span>}
      </div>
    </div>
  );
};
