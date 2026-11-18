import { Card } from '../../../../shared/ui/Card';
import { useAppSelector } from '../../../../shared/store/utils';
import { cartSelectors } from '../../../../shared/store/slices/cart';
import { useAddToCart } from '../../../cart/add-to-cart/model/useAddToCart';
import { useToggleLike, LikeButton } from '../../toggle-like';
import { CartCounter } from '../../../cart/update-cart';
type ProductCardProps = {
	product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
	const { id } = product;

	const isProductInCart = useAppSelector((state) =>
		cartSelectors.getCartProducts(state).some((p) => p.id === id)
	);

	const { addProductToCart } = useAddToCart();
	const { isLike, toggleLike } = useToggleLike({ product });

	return (
		<Card
			product={product}
			likeButton={<LikeButton isLike={isLike} onToggleLike={toggleLike} />}
			cartControl={
				isProductInCart ? (
					<CartCounter productId={id} />
				) : (
					<button onClick={() => addProductToCart({ ...product, count: 1 })}>
						В корзину
					</button>
				)
			}
		/>
	);
};
