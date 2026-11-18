import { Alert, CircularProgress, Stack } from '@mui/material';
import { RefObject } from 'react';

interface LoadMoreProps {
	isEndOfList: boolean;
	isFetching: boolean;
	containerRef: RefObject<HTMLDivElement | null>;
}

export const LoadMore = ({
	isEndOfList,
	isFetching,
	containerRef,
}: LoadMoreProps) => {
	return (
		<Stack
			ref={containerRef}
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{ my: 5 }}>
			{isFetching && <CircularProgress />}
			{isEndOfList && <Alert severity='success'>End of list!</Alert>}
		</Stack>
	);
};
