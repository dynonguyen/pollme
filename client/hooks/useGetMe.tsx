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
			let user: UserAtom = userAtomDefault;

			const promises = [];
			promises.push(
				fetch(IP_ADDRESS_API_URI).then(response =>
					promises.push(
						response.json().then(ipApi => {
							user.ip = ipApi.ip || '';
						}),
					),
				),
			);
			promises.push(
				getMeQuery().then(({ loading, data }) => {
					if (!loading) {
						if (data?.me) {
							const { __typename, avt, ...me } = data.me;
							user = { ...user, ...me, avt: avt as string };
						}
					}
				}),
			);
			await Promise.all(promises);

			setUserInfoState({ ...user });
		})();
	}, []);
}
