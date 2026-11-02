import classNames from 'classnames';
import { ReactNode, useEffect, useRef } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';

type TModal = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: TModal) => {
	const buttonClose = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				return onClose();
			}
		};
		buttonClose.current?.focus();
		document.addEventListener('keydown', handler);

		return () => {
			document.removeEventListener('keydown', handler);
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	const modalPortal = document.getElementById('modal-root');
	if (!modalPortal) {
		return null;
	}

	return createPortal(
		<div className={s.wrapper} onClick={onClose} role='presentation'>
			<div
				className={s.modalContainer}
				onClick={(e) => e.stopPropagation()}
				role='presentation'>
				<div className={classNames(s.header)}>
					<div>Modal</div>
					<button onClick={onClose} ref={buttonClose}>
						X
					</button>
				</div>
				<div className={s.body}>{children}</div>
			</div>
		</div>,
		modalPortal
	);
};
