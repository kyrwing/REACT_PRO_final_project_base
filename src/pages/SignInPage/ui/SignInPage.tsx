import { SignInForm } from '../../../features/auth/sign-in/ui/SignInForm';
import { WithProtection } from '../../../shared/store/HOCs/WithProtection';

export const SignInPage = WithProtection(() => {
	return <SignInForm />;
});
