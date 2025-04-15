import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispath } from '../../store/store';
import { CartItemProps } from './CartItem,props';
import styles from './CartItem.module.css';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispath>();

	const increase = () => {
		dispatch(cartActions.add(props.id));
	};

	const decrease = () => {
		dispatch(cartActions.remove(props.id));
	};

	const remove = () => {
		dispatch(cartActions.delete(props.id));
	};

	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{ backgroundImage: `url(${props.image})` }}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['prise']}> {props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={decrease}>
					<img
						className={styles['cart-icon']}
						src="/minus.svg"
						alt="Удалить из корзины"
					/>
				</button>
				<div className={styles['number']}>{props.count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img
						className={styles['cart-icon']}
						src="/plus.svg"
						alt="Добавить в корзину"
					/>
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img
						className={styles['cart-icon']}
						src="/delete.svg"
						alt="Удалить всё"
					/>
				</button>
			</div>
		</div>
	);
}

export default CartItem;
