import React from 'react';
import '../../style/DialogBox.css';

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
					<div className='dialog-box-close' onClick={props.onClose}>
						<span className='material-icons'>close</span>
					</div>
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