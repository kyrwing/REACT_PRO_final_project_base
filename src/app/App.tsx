import './styles/normalize.css';
import './styles/styles.css';
import { Outlet } from 'react-router-dom';
import { Header } from '../widgets/Header';
import { Sort } from '../shared/ui/Sort';
import { Footer } from '../widgets/Footer';
import { ToastContainer } from 'react-toastify';
import { Modal } from '../shared/ui/Modal';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Header />
			<Sort />
			<Outlet />
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<button onClick={() => setIsOpen(true)}>Открыть</button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>text</Modal>
			<Footer />
		</>
	);
};
