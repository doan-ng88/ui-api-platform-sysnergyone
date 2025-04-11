export interface APICheckUserInfoProps {
	userId: string | number;
}

export interface UserDetailsStoreState {
	ip?: string;
	device?: string;
	email?: string;
	id?: string;
	code?: string;
}

export interface UserDetailsStoreSaveProps {
	device: string;
	ip: string;
}

export interface UserDetailsStoreSetUserDetailsProps {
	email: string;
	userId: string;
	userCode: string;
}
