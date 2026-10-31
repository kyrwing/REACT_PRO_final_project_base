import classNames from 'classnames';
import { ReactNode } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

type TModal = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: TModal) => {
	if (!isOpen) {
		return null;
	}

	const modalPortal = document.getElementById('modal-root');
	if (!modalPortal) {
		return null;
	}

	return createPortal(
		<div className={s.wrapper} onClick={onClose}>
			<div className={s.modalContainer} onClick={(e) => e.stopPropagation()}>
				<div className={classNames(s.header)}>
					<div>Modal</div>
					<button onClick={onClose}>X</button>
				</div>
				<div className={s.body}>{children}</div>
			</div>
		</div>,
		modalPortal
	);
};
