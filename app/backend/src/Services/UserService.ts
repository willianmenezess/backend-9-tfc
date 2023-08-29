import * as bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/users/IUserModel';
import IUser, { Login } from '../Interfaces/users/IUser';
import { ServiceResponse, ServiceMessage } from '../Interfaces/ServiceResponse';
import { IToken } from '../Interfaces/IToken';
import JWT from '../utils/JWT';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
  ) { }

  public async login(data: Login): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    if (!bcrypt.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const { email } = user;
    const token = JWT.sign({ email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string): Promise<ServiceResponse<Record<string, string>>> {
    const user = await this.userModel.findByEmail(email) as IUser;
    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
