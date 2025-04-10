import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/Product.interface';

export function ProductCardProps() {
	const { id } = useParams(); // достаем id из урла
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		setLoading(true);
		setError(null);

		axios
			.get(`${PREFIX}/products/${id}`)
			.then(response => {
				setProduct(response.data);
			})
			.catch(err => {
				console.error(err);
				setError('Ошибка при загрузке товара');
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	if (loading) {
		return <>Загрузка...</>;
	}

	if (error) {
		return <>{error}</>;
	}

	if (!product) {
		return <>Товар не найден</>;
	}

	return (
		<>
			<>Product: {product.name}</>
		</>
	);
}
