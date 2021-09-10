import React, { useState } from 'react';
import '../../style/common/IconButton.css';
import LoadingIndicator from './LoadingIndicator';

function Button(props: IconButtonProps): React.ReactElement {
	const s = props.size || 32;
	const [background, setBackground] = useState('transparent');
	const type = props.type || 'standard';
	const loading = props.loading && type !== 'discreet';
	return (
		<button
			className={`icon-button${props.loading ? ' loading' : ''} ${type} ${props.className || ''}`}
			onMouseEnter={() => type === 'standard' && setBackground(`${props.color || '#ffffff'}40`)}
			onMouseLeave={() => type === 'standard' && setBackground(`transparent`)}
			onClick={props.onClick}
			style={{ width: `${loading ? s * 2 + 30 : s + 15}px`, height: `${s + 15}px`, background, borderColor: props.color || '#ffffff' }}
		>
			{props.type === 'standard' && <LoadingIndicator size={s / 3} color={props.color || '#ffffff'} />}
			<span className='material-icons' style={{ fontSize: `${s}px`, color: props.color || '#ffffff' }}>{props.icon}</span>
		</button>
	);
}
export default Button;

interface IconButtonProps {
	/**
	 * The hex color of the button.
	 */
	color?: string;
	/**
	 * The Material Icon of the button.
	 */
	icon: string;
	className?: string;
	/**
	 * Whether this component has to display a loading indicator.
	 */
	loading?: boolean;
	onClick?: () => void;
	/** 
	 * The size in pixels of the icon.
	 */
	size?: number;
	/**
	 * The style of this button.
	 */
	type?: 'standard' | 'discreet'
}