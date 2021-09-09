import React from 'react';
import '../../style/DialogBox.css';
import IconButton from './IconButton';

function DialogBox(props: DialogBoxProps): React.ReactElement {
	window.addEventListener('keydown', e => {
		if (props.visible && e.key === 'Escape' && typeof props.onClose === 'function')
			props.onClose();
	});
	return (
		<div className={`blur-container ${!props.visible && 'hidden'}`}>
			<div className={`dialog-box ${props.className || ''}`}>
				<div className='dialog-box-heading'>
					<div className='dialog-box-title'>{props.title}</div>
					<IconButton icon='close' type='discreet' onClick={props.onClose} size={24} className='dialog-box-close' color='#000000'></IconButton>
				</div>
				<div className='dialog-box-body'>
					{props.children}
				</div>
			</div>
		</div>
	);
}
export default DialogBox;


interface DialogBoxProps {
	children?: React.ReactNode;
	className?: string;
	/**
	 * The function called when the close button or escape is pressed.
	 */
	onClose?: () => void;
	/**
	 * The title of the dialog box.
	 */
	title: string;
	/**
	 * Whether the dialog box is visible.
	 */
	visible: boolean;
}