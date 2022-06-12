import { atom } from 'recoil';
import { UserInfoFragment } from './../../graphql-client/generated/graphql';

interface UserAtom extends UserInfoFragment {
	loading?: boolean;
}

export const userAtomDefault: UserAtom = {
	_id: '',
	name: '',
	email: '',
	avt: '',
	loading: true,
};

const userAtom = atom<UserAtom>({
	key: 'user-state',
	default: userAtomDefault,
});

export default userAtom;
