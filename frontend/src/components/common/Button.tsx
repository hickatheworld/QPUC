import React, { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import '../../style/Button.css';

function Button(props: ButtonProps): React.ReactElement {
	const [buttonCSS, setButtonCSS] = useState({
		background: props.loading ? 'transparent' : props.backgroundColor || '#ffffff',
		borderColor: props.backgroundColor || '#ffffff',
	});
	const [bodyCSS, setBodyCSS] = useState({
		color: props.textColor || '#000'
	});
	const hoverIn = () => {
		if (props.loading)
			return;
		setButtonCSS({ ...buttonCSS, background: 'transparent' });
		setBodyCSS({ color: props.backgroundColor || '#ffffff' });
	}
	const hoverOut = () => {
		if (props.loading)
			return;
		setButtonCSS({
			background: props.backgroundColor || '#fff',
			borderColor: props.backgroundColor || '#fff'
		});
		setBodyCSS({ color: props.textColor || '#000' });
	};
	return (
		<div className={`button${props.loading ? ' loading' : ''} ${props.className || ''}`} onClick={props.onClick} style={buttonCSS} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
			<LoadingIndicator size={8} color={props.backgroundColor} />
			<div className='button-text' style={bodyCSS}>
				{props.children}
			</div>
		</div>
	);
}
export default Button;

interface ButtonProps {
	/**
	 * The hex color of the button's background.
	 */
	backgroundColor?: string;
	children: string;
	className?: string;
	/**
	 * Whether this component has to display a loading indicator.
	 */
	loading?: boolean;
	onClick?: () => void;
	/**
	 * The hex color of the button's text.
	 */
	textColor?: string;
}