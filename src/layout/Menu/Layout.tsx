import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';

export function Layout() {
	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img
						src="/ava.png"
						alt="Изображение аватара"
						className={styles['ava']}
					/>
					<div className={styles['name']}>Роман Баженов</div>
					<div className={styles['email']}>roman@bachenov.com</div>
				</div>
				<div className={styles['menu']}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive
							})
						}
					>
						<img src="/menu.svg" alt="Иконка меню" />
						Меню
					</NavLink>
					<NavLink
						to="/cart"
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive
							})
						}
					>
						<img src="/cart.svg" alt="Иконка корзины" />
						Корзина
					</NavLink>
				</div>
				<Button className={styles['exit']}>
					<img src="/power.svg" alt="Иконка выхода" />
					Выход
				</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
