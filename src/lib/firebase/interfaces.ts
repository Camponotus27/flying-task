export interface Login {
	token?: string;
	user: User;
}

export interface User {
	uid: string;
	name: string;
	email: string;
	urlImage?: string;
}
