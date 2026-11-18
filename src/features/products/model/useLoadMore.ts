import { RefObject, useCallback, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/store/utils';
import { useGetProductsQuery } from '../../../shared/store/api/productsApi';
import {
	productsActions,
	productsSelectors,
} from '../../../shared/store/slices/products';

interface UseLoadMoreParams {
	ref: RefObject<HTMLDivElement | null>;
}
export const useLoadMore = ({ ref }: UseLoadMoreParams) => {
	const dispatch = useAppDispatch();

	const { searchText, page, perPage, sort } = useAppSelector(
		productsSelectors.getProductsState
	);
	const { data, isFetching } = useGetProductsQuery({
		searchText,
		page,
		perPage,
		sort,
	});
	const products = data?.products || [];
	const productsCount = data?.length || 0;
	const isEndOfList = products.length >= productsCount;

	const fetchMoreProducts = useCallback(() => {
		if (!isEndOfList && !isFetching) {
			dispatch(productsActions.setPage(page + 1));
		}
	}, [isEndOfList, isFetching, page, dispatch]);

	useLayoutEffect(() => {
		let observer: IntersectionObserver | undefined = undefined;

		if (!isEndOfList && products.length) {
			const options: IntersectionObserverInit = { threshold: 0.5 };
			const callback: IntersectionObserverCallback = (entries) => {
				if (entries[0].isIntersecting) {
					fetchMoreProducts();
				}
			};
			observer = new IntersectionObserver(callback, options);
			ref.current && observer.observe(ref.current);
		}

		return () => {
			observer?.disconnect();
		};
	}, [fetchMoreProducts, isEndOfList, products.length, ref]);

	return { isEndOfList, isFetching };
};
