import { CameraIcon, PencilIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import { useRecoilValue } from 'recoil';
import { DEFAULT } from '../../constants/default';
import useLanguage from '../../hooks/useLanguage';
import userAtom from '../../recoil/atoms/user.atom';
import { dateFormat } from '../../utils/format';

const AccountSettings: NextPage = () => {
	const lang = useLanguage();
	const settingLang = lang.pages.accountSettings;
	const userInfo = useRecoilValue(userAtom);
	const { email, name, avt, createdAt } = userInfo;
	const userAvt = avt ? avt : DEFAULT.USER_AVT;

	return (
		<div className='container'>
			<div className='mx-auto my-8 max-w-md rounded-lg py-6 px-5 shadow-lg dark:bg-d_bg_hover md:py-8 md:px-8'>
				<div className='relative mx-auto h-28 w-28 md:h-32 md:w-32'>
					<img
						className='h-full w-full rounded-full'
						src={userAvt}
						alt='Avatar'
					/>
					<div className='absolute bottom-1 right-0 h-10 w-10 rounded-full bg-white p-1 dark:bg-d_bg_hover'>
						<div className='cursor-pointer rounded-full bg-primary/80 p-1 duration-300 hover:opacity-70'>
							<CameraIcon className='text-slate-100' />
						</div>
					</div>
				</div>

				<div className='my-6 flex flex-col items-center gap-2 md:gap-3'>
					<h1 className='flex-center gap-2 text-lg md:text-2xl'>
						<span>{name}</span>
						<PencilIcon className='w-5 cursor-pointer' />
					</h1>
					<div className='text-color-normal md:text-lg'>{email}</div>
					<div className='text-color-normal md:text-lg'>
						{settingLang.createdDate}: {dateFormat(createdAt)}
					</div>
				</div>

				<div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
					<button className='btn btn-outline w-full py-2 font-medium capitalize'>
						{settingLang.changePwd}
					</button>
					<button className='btn btn-primary w-full py-2 font-medium capitalize'>
						{settingLang.updateBtn}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
