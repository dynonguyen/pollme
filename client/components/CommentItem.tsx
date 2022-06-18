import { HeartIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { DEFAULT } from '../constants/default';
import { useFavoriteCommentMutation } from '../graphql-client/generated/graphql';
import useLanguage from '../hooks/useLanguage';
import userAtom from '../recoil/atoms/user.atom';
import { dateFormat } from '../utils/format';

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
	const userAvt = avt ? avt : DEFAULT.USER_AVT;
	const userInfo = useRecoilValue(userAtom);
	const { _id, ip } = userInfo;
	const [liked, setLiked] = useState(false);
	const [totalFavorite, setTotalFavorite] = useState(favorites.length);
	const [favoriteCommentMutation] = useFavoriteCommentMutation();
	const router = useRouter();
	const lang = useLanguage();

	useEffect(() => {
		//  Only setState on CSR
		setLiked(favorites.findIndex(f => f === _id || f === ip) !== -1);
	}, [userInfo]);

	const handleFavorite = async () => {
		if (!userInfo._id) {
			router.push(lang.pages.login.link);
			return;
		}

		await favoriteCommentMutation({
			variables: {
				favoriteCommentInput: {
					commentId,
					userId: userInfo._id,
				},
			},
		});
		if (liked) setTotalFavorite(totalFavorite - 1);
		else setTotalFavorite(totalFavorite + 1);
		setLiked(!liked);
	};

	return (
		<div className='flex gap-3 shadow-md px-3 py-4 rounded-lg dark:shadow-none dark:bg-d_bg_hover'>
			<img
				className='w-8 h-8 rounded-full flex-shrink-0'
				src={userAvt}
				alt={username}
				onError={e => (e.currentTarget.src = DEFAULT.USER_AVT)}
			/>
			<div>
				<div className='flex flex-wrap items-center gap-1 md:gap-3'>
					<strong>{username}</strong>
					<span className='text-gray-400 dark:text-gray-600 text-sm'>
						{dateFormat(new Date(createdAt), true)}
					</span>
				</div>
				<p className='text-gray-600 dark:text-d_text_primary py-2'>{content}</p>
				<div className='flex gap-2 items-center text-gray-400 dark:text-gray-600'>
					<HeartIcon
						className={`h-7 cursor-pointer hover:opacity-70 duration-200 ${
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
