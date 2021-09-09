import React from 'react';
import '../../style/LoadingIndicator.css';
function LoadingIndicator(props: LoadingIndicatorProps): React.ReactElement {
	const s = props.size || 8;
	const css = { width: `${s}px`, height: `${s}px`, margin: `0px ${s / 4}px`, background: props.color || '#ffffff' };
	return (
		<div className='loading-indicator'>
			<div className='loading-indicator-dot first' style={css}></div>
			<div className='loading-indicator-dot second' style={css}></div>
			<div className='loading-indicator-dot third' style={css}></div>
		</div>
	);
}
export default LoadingIndicator;

interface LoadingIndicatorProps {
	/**
	 * The color of the loading indicator.
	 */
	color?: string;
	/**
	 * The size of each this loading indicator dot.
	 */
	size?: number;
}