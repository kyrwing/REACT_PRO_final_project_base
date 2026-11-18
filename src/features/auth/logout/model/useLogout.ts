import { userActions } from '../../../../shared/store/slices/user';
import { useAppDispatch } from '../../../../shared/store/utils';

export const useLogout = () => {
	const dispatch = useAppDispatch();

	const logout = () => {
		dispatch(userActions.clearUser());
	};

	return { logout };
};
