import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useGetMeLazyQuery } from '../graphql-client/generated/graphql';
import userAtom, { UserAtom, userAtomDefault } from '../recoil/atoms/user.atom';
import getUserIp from '../utils/user-ip';

export default function useGetMe(): boolean {
	const setUserInfoState = useSetRecoilState(userAtom);
	const [getMeQuery] = useGetMeLazyQuery();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async function () {
			let user: UserAtom = { ...userAtomDefault };

			const ip = await getUserIp();
			const meRes = await getMeQuery();

			if (meRes.data?.me) {
				const me = meRes.data.me;
				user._id = me._id;
				user.avt = me.avt!;
				user.email = me.email;
				user.name = me.name;
				user.createdAt = me.createdAt;
			}

			setUserInfoState({ ...user, ip, loading: false });
			setLoading(false);
		})();
	}, []);

	return loading;
}
