import { CheckIcon } from '@heroicons/react/outline';
import { CameraIcon, PencilIcon } from '@heroicons/react/solid';
import { NextPage } from 'next';
import Link from 'next/link';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DEFAULT } from '../../constants/default';
import { MAX } from '../../constants/validation';
import { useUpdateUserInfoMutation } from '../../graphql-client/generated/graphql';
import useCheckUserLogin from '../../hooks/useCheckUserLogin';
import useLanguage from '../../hooks/useLanguage';
import useToast from '../../hooks/useToast';
import userAtom from '../../recoil/atoms/user.atom';
import { dateFormat, toStaticUri } from '../../utils/format';
import { uploadUserAvt } from '../../utils/private-api-caller';

function UserName({
	onChange,
}: {
	onChange: (name: string) => void;
}): JSX.Element {
	const [showEditName, setShowEditName] = useState(false);
	const userInfo = useRecoilValue(userAtom);
	const [username, setUsername] = useState(userInfo.name);
	const nameRef = useRef(userInfo.name);
	const toast = useToast();
	const lang = useLanguage();

	const handleSaveName = () => {
		const newName = nameRef.current.trim();
		if (!newName || newName.length > MAX.USERNAME_LEN) {
			toast.show({
				type: 'error',
				message: lang.pages.register.fields.name.errors.max,
			});
			return;
		}

		onChange(newName);
		setUsername(newName);
		setShowEditName(false);
	};

	useEffect(() => {
		nameRef.current = userInfo.name;
		setUsername(userInfo.name);
	}, [userInfo.name]);

	return (
		<>
			{showEditName ? (
				<div className='flex space-x-2'>
					<input
						type='text'
						className='field'
						onChange={e => (nameRef.current = e.target.value.trim())}
						defaultValue={nameRef.current}
						placeholder='Enter the name'
						autoFocus
					/>
					<CheckIcon
						className='success-text w-8 cursor-pointer'
						onClick={handleSaveName}
					/>
				</div>
			) : (
				<h1 className='flex-center space-x-2 text-lg md:text-2xl'>
					<span>{username}</span>
					<PencilIcon
						className='w-5 flex-shrink-0 cursor-pointer'
						onClick={() => setShowEditName(true)}
					/>
				</h1>
			)}
		</>
	);
}

function UserAvatar({
	onChange,
}: {
	onChange: (photo: string) => void;
}): JSX.Element {
	const lang = useLanguage();
	const settingLang = lang.pages.accountSettings;
	const { avt } = useRecoilValue(userAtom);
	const [userAvt, setUserAvt] = useState(
		avt ? toStaticUri(avt) : DEFAULT.USER_AVT,
	);
	const photoRef = useRef<HTMLInputElement>(null);
	const toast = useToast();

	useEffect(() => {
		setUserAvt(avt ? toStaticUri(avt) : DEFAULT.USER_AVT);
	}, [avt]);

	const handleAvtChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			const photo = e.target.files[0];
			const photoSize = photo.size / (1024 * 1024);
			if (photoSize > MAX.USER_AVT_SIZE) {
				toast.show({ type: 'error', message: settingLang.maxAvtSize });
				return;
			}

			const reader = new FileReader();
			reader.readAsDataURL(photo);
			reader.onload = function () {
				const dataUrl = reader.result as string;
				onChange(dataUrl);
				setUserAvt(dataUrl);
			};
		}
	};

	return (
		<div className='relative mx-auto h-28 w-28 md:h-32 md:w-32'>
			<img className='h-full w-full rounded-full' src={userAvt} alt='Avatar' />
			<div className='absolute bottom-1 right-0 h-10 w-10 rounded-full bg-white p-1 dark:bg-d_bg_hover'>
				<div
					className='cursor-pointer rounded-full bg-primary/80 p-1 duration-300 hover:opacity-70'
					onClick={() => photoRef.current?.click()}
				>
					<CameraIcon className='text-slate-100' />
				</div>
			</div>
			<input
				type='file'
				accept='image/png,image/jpeg,image/webp'
				className='hidden'
				onChange={handleAvtChange}
				ref={photoRef}
			/>
		</div>
	);
}

const AccountSettings: NextPage = () => {
	useCheckUserLogin({ isLoginPage: false });
	const lang = useLanguage();
	const settingLang = lang.pages.accountSettings;
	const [userInfo, setUserInfo] = useRecoilState(userAtom);
	const { _id: userId, name, avt, email, createdAt } = userInfo;
	const updateFields = useRef<{ name?: string; avt?: string }>({ name, avt });
	const [updating, setUpdating] = useState(false);
	const [updateUserInfoMutation] = useUpdateUserInfoMutation();
	const toast = useToast();

	const handleUpdateInfo = async () => {
		const { name: newName, avt: newAvt } = updateFields.current;
		if (!newName && !newAvt) return;
		if (newName === name && !newAvt) return;

		setUpdating(true);
		if (newAvt) {
			await uploadUserAvt(userId, newAvt);
		}
		const updateRes = await updateUserInfoMutation({
			variables: {
				updateInput: {
					avt: newAvt ? `/upload/user-${userId}/avt.jpeg` : '',
					name: newName,
				},
			},
		});
		if (updateRes.data?.updateUserInfo.success) {
			toast.show({ type: 'success', message: settingLang.updateSuccess });
			setUserInfo({
				...userInfo,
				name: newName ? newName : name,
			});
			updateFields.current.avt = '';
		} else {
			toast.show({ type: 'error', message: settingLang.updateFailed });
		}
		setUpdating(false);
	};

	return (
		<div className={`container ${updating ? 'disabled' : ''}`}>
			<div className='mx-auto my-8 max-w-md rounded-lg py-6 px-5 shadow-lg dark:bg-d_bg_hover md:py-8 md:px-8'>
				<UserAvatar onChange={photo => (updateFields.current.avt = photo)} />
				<div className='my-6 flex flex-col items-center space-y-2 md:space-y-3'>
					<UserName onChange={value => (updateFields.current.name = value)} />
					<div className='text-color-normal md:text-lg'>{email}</div>
					<div className='text-color-normal md:text-lg'>
						{settingLang.createdDate}: {dateFormat(createdAt)}
					</div>
				</div>
				<div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
					<Link href={lang.pageSEO.changePwd.pathname}>
						<button className='btn btn-outline w-full py-2 font-medium capitalize'>
							{settingLang.changePwd}
						</button>
					</Link>
					<button
						className='btn btn-primary w-full py-2 font-medium capitalize'
						onClick={handleUpdateInfo}
					>
						{settingLang.updateBtn}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AccountSettings;
