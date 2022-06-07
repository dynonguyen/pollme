import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useGetMeQuery } from '../graphql-client/generated/graphql';
import userAtom from '../recoil/atoms/user.atom';

export default function useGetMe(): void {
	const setUserInfoState = useSetRecoilState(userAtom);
	const { loading, data } = useGetMeQuery();

	useEffect(() => {
		if (!loading) {
			if (data?.me) {
				setUserInfoState(data.me);
			}
		}
		return () => {};
	}, [loading, data]);
}
