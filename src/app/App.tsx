import './styles/normalize.css';
import './styles/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../widgets/Header';
import { Footer } from '../widgets/Footer';
import { ToastContainer } from 'react-toastify';
import { Modal } from '../shared/ui/Modal';
import { useCallback, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClose = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<>
			<Header />
			<Outlet />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<button onClick={() => setIsOpen(true)}>Открыть</button>
			<Modal isOpen={isOpen} onClose={handleClose}>
				text
			</Modal>
			<Footer />
		</>
	);
};
