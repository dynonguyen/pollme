import { atom } from 'recoil';
import { UserInfoFragment } from './../../graphql-client/generated/graphql';

export const userAtomDefault: UserInfoFragment = {
	_id: '',
	name: '',
	email: '',
	avt: '',
};

const userAtom = atom<UserInfoFragment>({
	key: 'userState',
	default: userAtomDefault,
});

export default userAtom;
