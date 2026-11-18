import { ChangeEvent } from 'react';

interface SortParam {
	title: string;
	value: Sort;
	href: string;
}

interface SortProps {
	sort: Sort;
	setSort: (newSort: Sort) => void;
	sortParams: SortParam[];
}
export const Sort = ({ sort, setSort, sortParams }: SortProps) => {
	const handleSortSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const newSort = e.target.value as Sort;
		setSort(newSort);
	};
	return (
		<select value={sort} onChange={handleSortSelect}>
			{sortParams.map((p) => (
				<option key={p.title} value={p.value}>
					{p.title}
				</option>
			))}
		</select>
	);
};
