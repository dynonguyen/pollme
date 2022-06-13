import { VOTE_TYPE } from './index';

export const DEFAULT = {
	LANGUAGE: 'vi',
	USER_AVT: `/images/default-avt/0.png`,
	PAGE_SIZE: 10,
	TAG_PAGE_SIZE: 24,

	VOTE: {
		TYPE: VOTE_TYPE.SINGLE_CHOICE,
		IS_PRIVATE: false,
		IS_RECAPTCHA: false,
		IS_IP_DUPLICATION_CHECK: true,
		IS_LOGIN_REQUIRED: false,
		SHOW_RESULT: true,
		SHOW_RESULT_BTN: true,
		ALLOW_ADD_OPTION: false,
		MAX_SCORE: 10,
	},
};
