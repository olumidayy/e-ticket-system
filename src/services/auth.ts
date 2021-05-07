import { Inject, Service } from 'typedi';
import { IUserCreateDTO, IUserLoginDTO } from '../interfaces/IUser';

@Service()
export default class AuthService {
    constructor(
        @Inject('userModel') model: Models.UserModel
    ){}
    
    public async signUp(user: IUserCreateDTO) {
        
    }

    public async signIn(user: IUserLoginDTO) {
        
    }

}