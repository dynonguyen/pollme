export interface BasicVoteSettings {
	title: string;
	desc: string;
	tags: string[];
	answers: Array<{
		id: string;
		label: string;
		photo?: string | ArrayBuffer | null;
	}>;
}

export interface AdvanceVoteSettings {
	type: number;
	isPrivate: boolean;
	isReCaptcha: boolean;
	isIPDuplicationCheck: boolean;
	isLoginRequired: boolean;
	isShowResult: boolean;
	isShowResultBtn: boolean;
	allowAddOption: boolean;
	maxVote?: number;
	maxScore?: number;
	endDate?: Date;
}
