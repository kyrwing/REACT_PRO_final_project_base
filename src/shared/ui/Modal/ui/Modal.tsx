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
	const refFocusElement = useRef<HTMLElement | null>(null);
	const refTabFocus = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;
		refFocusElement.current = document.activeElement as HTMLElement;
		const focusableElements =
			refTabFocus.current?.querySelectorAll<HTMLElement>(
				'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
			);

		const firstElement = focusableElements?.[0];
		const lastElement = focusableElements?.[focusableElements.length - 1];
		const handler = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				return onClose();
			}
			if (focusableElements?.length) {
				if (
					e.key === 'Tab' &&
					!e.shiftKey &&
					document.activeElement === lastElement
				) {
					e.preventDefault();
					firstElement?.focus();
				}
				if (
					e.key === 'Tab' &&
					e.shiftKey &&
					document.activeElement === firstElement
				) {
					e.preventDefault();
					lastElement?.focus();
				}
			}
		};
		if (firstElement) {
			firstElement.focus();
		} else {
			refTabFocus.current?.focus();
		}
		document.addEventListener('keydown', handler);

		return () => {
			document.removeEventListener('keydown', handler);
			refFocusElement.current?.focus();
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
				role='presentation'
				tabIndex={-1}
				ref={refTabFocus}>
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
