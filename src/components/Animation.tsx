import React from 'react';
import ReactLoading from 'react-loading';

export interface AnimationProps {
   type?:string
	color?:string
}

export function Animation({ type, color }: AnimationProps) {
	return (
		<ReactLoading type={"bubbles"} color={"#1a2640"} height={'10%'} width={'10%'} />
	)
}