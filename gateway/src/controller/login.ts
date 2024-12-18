import { authService } from '../lib/Axios';

interface LoginRequestBody {
    username: string;
    password: string;
}

export const LoginController = async (body: LoginRequestBody) => {
    const { data } = await authService.post('/login', body);
    return data;
}
