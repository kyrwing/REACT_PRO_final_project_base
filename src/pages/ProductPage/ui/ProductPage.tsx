import { useLocation } from 'react-router-dom';
import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { useGetProductQuery } from '../../../shared/store/api/productsApi';
import { ProductContent } from './ProductContent';

export const ProductPage = WithProtection(() => {
	const location = useLocation();
	const { pathname } = location;
	const productId = pathname.split('/').at(-1) || '';

	const { data: product } = useGetProductQuery({ id: productId });

	if (!product) {
		return <></>;
	}

	return <ProductContent product={product} />;
});
