import { useEffect } from 'react';

export default function useScrollSnapByMouse(
	selector: string,
	scrollSpeed: number = 1,
): void {
	useEffect(() => {
		const slider: any = document.querySelector(selector);
		let isDown = false;
		let startX: number;
		let scrollLeft: any;

		const mousedownListener = slider?.addEventListener(
			'mousedown',
			(e: any) => {
				isDown = true;
				slider.classList.add('active');
				startX = e.pageX - slider.offsetLeft;
				scrollLeft = slider.scrollLeft;
			},
		);
		const mouseleaveListener = slider?.addEventListener(
			'mouseleave',
			(_: any) => {
				isDown = false;
			},
		);
		const mouseupListener = slider?.addEventListener('mouseup', (_: any) => {
			isDown = false;
		});
		const mousemoveListener = slider?.addEventListener(
			'mousemove',
			(e: any) => {
				if (!isDown) return;
				e.preventDefault();
				const x = e.pageX - slider.offsetLeft;
				const walk = (x - startX) * scrollSpeed;
				slider.scrollLeft = scrollLeft - walk;
			},
		);
		return () => {
			mousedownListener && removeEventListener(mousedownListener, () => {});
			mouseleaveListener && removeEventListener(mouseleaveListener, () => {});
			mousemoveListener && removeEventListener(mousemoveListener, () => {});
			mouseupListener && removeEventListener(mouseupListener, () => {});
		};
	}, []);
}
