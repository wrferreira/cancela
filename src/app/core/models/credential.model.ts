import { UserModel } from './user.model';

export interface Credencial {
	token: string;
	usuario: UserModel;
}
