import { WithProtection } from '../../../shared/store/HOCs/WithProtection';
import { SignUpForm } from '../../../features/auth/sign-up';

export const SignUpPage = WithProtection(() => {
	return <SignUpForm />;
});
