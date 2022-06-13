import { VOTE_TYPE } from './index';

export const DEFAULT = {
	VOTE_MAX_SCORE: 10,
	PAGE_SIZE: 10,
	VOTE_SORT_FIELD: 'title',
	TAG_SORT_FIELD: 'name',
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
