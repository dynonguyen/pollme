import { atom } from 'recoil';
import { UserInfoFragment } from './../../graphql-client/generated/graphql';

const userAtom = atom<UserInfoFragment>({
	key: 'userState',
	default: {
		_id: '',
		name: '',
		email: '',
		avt: '',
	},
});

export default userAtom;
