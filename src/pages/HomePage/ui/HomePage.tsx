import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { WithQuery } from '../../../shared/store/HOCs/WithQuery';
import { CardList } from '../../../widgets/CardList';
import { useProducts } from '../../../shared/store/hooks/useProducts';
import { LoadMore } from '../../../shared/ui/LoadMore';
import { useRef } from 'react';
import { useLoadMore } from '../../../features/products/model/useLoadMore';
import { Sort } from '../../../shared/ui/Sort';
import { useSort } from '../../../features/products/sort/useSort';
const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();
	const containerRef = useRef<HTMLDivElement>(null);
	const { sort, setSort, sortParams } = useSort();
	const { isEndOfList, isFetching } = useLoadMore({
		ref: containerRef,
	});
	return (
		<>
			<Sort sort={sort} setSort={setSort} sortParams={sortParams} />
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore
				isEndOfList={isEndOfList}
				isFetching={isFetching}
				containerRef={containerRef}
			/>
		</>
	);
});
