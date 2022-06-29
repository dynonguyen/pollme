import { HeartIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
	USER_AVT_THUMBNAIL_HEIGHT,
	USER_AVT_THUMBNAIL_WIDTH,
} from '../../constants';
import { DEFAULT } from '../../constants/default';
import { useFavoriteCommentMutation } from '../../graphql-client/generated/graphql';
import useLanguage from '../../hooks/useLanguage';
import userAtom from '../../recoil/atoms/user.atom';
import { dateFormat, optimizeCloudinarySrc } from '../../utils/format';

interface CommentItemProps {
	commentId: string;
	username: string;
	avt: string;
	createdAt: Date | string;
	content: string;
	favorites: string[];
}

export default function CommentItem(props: CommentItemProps): JSX.Element {
	const {
		commentId,
		avt,
		username = 'Anonymous',
		content = '',
		createdAt,
		favorites = [],
	} = props;
	const userAvt = avt
		? optimizeCloudinarySrc(
				avt,
				USER_AVT_THUMBNAIL_WIDTH,
				USER_AVT_THUMBNAIL_HEIGHT,
		  )
		: DEFAULT.USER_AVT;
	const userInfo = useRecoilValue(userAtom);
	const [liked, setLiked] = useState(false);
	const [totalFavorite, setTotalFavorite] = useState(favorites.length);
	const [favoriteCommentMutation] = useFavoriteCommentMutation();
	const router = useRouter();
	const lang = useLanguage();

	const handleFavorite = async () => {
		if (!userInfo._id) {
			router.push(lang.pages.login.link);
			return;
		}

		if (liked) setTotalFavorite(totalFavorite - 1);
		else setTotalFavorite(totalFavorite + 1);
		setLiked(!liked);

		await favoriteCommentMutation({
			variables: {
				favoriteCommentInput: {
					commentId,
					userId: userInfo._id,
				},
			},
		});
	};

	useEffect(() => {
		const { _id, ip } = userInfo;
		if (_id) {
			const isLike = favorites.findIndex(f => f === _id || f === ip) !== -1;
			isLike && setLiked(true);
		}
	}, [userInfo]);

	return (
		<div className='flex space-x-4 rounded-lg px-3 py-4 shadow-md dark:bg-d_bg_hover dark:shadow-none'>
			<img
				className='h-8 w-8 flex-shrink-0 rounded-full'
				src={userAvt}
				alt={username}
				onError={e => (e.currentTarget.src = DEFAULT.USER_AVT)}
			/>
			<div>
				<div className='flex flex-wrap items-center space-x-1 md:space-x-3'>
					<strong>{username}</strong>
					<span className='text-sm text-gray-400 dark:text-gray-600'>
						{dateFormat(new Date(createdAt), true)}
					</span>
				</div>
				<p className='py-2 text-gray-600 dark:text-d_text_primary'>{content}</p>
				<div className='flex items-center space-x-2 text-gray-400 dark:text-gray-600'>
					<HeartIcon
						className={`h-7 cursor-pointer duration-200 hover:opacity-70 ${
							liked ? 'error-text' : ''
						}`}
						onClick={handleFavorite}
					/>
					<span>{totalFavorite}</span>
				</div>
			</div>
		</div>
	);
}
