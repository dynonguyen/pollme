import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { IP_ADDRESS_API_URI } from '../constants';
import { useGetMeLazyQuery } from '../graphql-client/generated/graphql';
import userAtom, { UserAtom, userAtomDefault } from '../recoil/atoms/user.atom';

export default function useGetMe(): void {
	const setUserInfoState = useSetRecoilState(userAtom);
	const [getMeQuery] = useGetMeLazyQuery();

	useEffect(() => {
		(async function () {
			let user: UserAtom = { ...userAtomDefault };

			const ipAPI = await fetch(IP_ADDRESS_API_URI);
			const ip = (await ipAPI.json())?.ip || '';
			const meRes = await getMeQuery();
			if (meRes.data?.me) {
				const me = meRes.data.me;
				user._id = me._id;
				user.avt = me.avt!;
				user.email = me.email;
				user.name = me.name;
			}

			setUserInfoState({ ...user, ip, loading: false });
		})();
	}, []);
}
