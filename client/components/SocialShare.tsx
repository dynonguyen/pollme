import { useRecoilValue } from 'recoil';
import themeAtom from '../recoil/atoms/theme.atom';

interface SocialShareProps {
	iconClassName?: string;
	className?: string;
	shareLink?: string;
}

const iconUrls: {
	src: string;
	darkSrc: string;
	alt: string;
	createLink: Function;
}[] = [
	{
		src: '/icons/social-share/facebook.svg',
		darkSrc: '/icons/social-share/facebook-dark.svg',
		alt: 'Facebook',
		createLink: (url: string) => `https://www.facebook.com/sharer.php?u=${url}`,
	},
	{
		src: '/icons/social-share/twitter.svg',
		darkSrc: '/icons/social-share/twitter-dark.svg',
		alt: 'Facebook',
		createLink: (url: string) => `https://twitter.com/intent/tweet?url=${url}`,
	},
	{
		src: '/icons/social-share/linkedin.svg',
		darkSrc: '/icons/social-share/linkedin-dark.svg',
		alt: 'Linkedin',
		createLink: (url: string) =>
			`https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
	},
];

export default function SocialShare({
	iconClassName = '',
	shareLink = '',
	className = '',
}: SocialShareProps) {
	const { isDark } = useRecoilValue(themeAtom);

	return (
		<div className={`flex space-x-2 ${className}`}>
			{iconUrls.map((icon, index) => (
				<a key={index} href={icon.createLink(shareLink)} target='_blank'>
					<img
						className={`h-6 w-6 cursor-pointer duration-300 hover:opacity-75 ${iconClassName}`}
						src={isDark ? icon.darkSrc : icon.src}
						alt={icon.alt}
					/>
				</a>
			))}
		</div>
	);
}
