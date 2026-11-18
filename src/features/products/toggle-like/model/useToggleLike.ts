import { toast } from 'react-toastify';
import { useCallback, useOptimistic, useTransition } from 'react';
import {
	IErrorResponse,
	useDeleteLikeProductMutation,
	useSetLikeProductMutation,
} from '../../../../shared/store/api/productsApi';
import { userSelectors } from '../../../../shared/store/slices/user';
import { useAppSelector } from '../../../../shared/store/utils';

type UseToggleLikeProps = {
	product: Product;
};

export const useToggleLike = ({ product }: UseToggleLikeProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const isLike = product.likes.some((l) => l.userId === user?.id);
	const [optimisticIsLike, setOptimisticIsLike] = useOptimistic(isLike);
	const [isPending, startTransition] = useTransition();

	const toggleLike = useCallback(async () => {
		if (!accessToken) {
			toast.warning('Вы не авторизованы');
			return;
		}

		startTransition(async () => {
			setOptimisticIsLike(!isLike);

			let response;

			if (isLike) {
				response = await deleteLike({ id: `${product.id}` });
			} else {
				response = await setLike({ id: `${product.id}` });
			}

			if (response.error) {
				const error = response.error as IErrorResponse;
				toast.error(error.data.message);
			}
		});
	}, [
		accessToken,
		isLike,
		product.id,
		deleteLike,
		setLike,
		setOptimisticIsLike,
	]);

	return {
		isLike: optimisticIsLike,
		toggleLike,
		isPending,
	};
};
