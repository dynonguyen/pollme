import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useGetMeQuery } from '../graphql-client/generated/graphql';
import userAtom from '../recoil/atoms/user.atom';

export default function useGetMe(): void {
	const [defaultUserInfo, setUserInfoState] = useRecoilState(userAtom);
	const { loading, data } = useGetMeQuery();

	useEffect(() => {
		if (!loading) {
			if (data?.me) {
				const { __typename, ...me } = data.me;
				setUserInfoState({ ...me, loading: false });
			} else {
				setUserInfoState({ ...defaultUserInfo, loading: false });
			}
		}
		return () => {};
	}, [loading, data]);
}
