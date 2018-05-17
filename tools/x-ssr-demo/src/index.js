import {h, render} from 'preact';
import {Increment} from '@financial-times/x-increment';

render(
	<Increment count={1} />,
	document.getElementById('root'),
	document.getElementById('root').firstElementChild,
);