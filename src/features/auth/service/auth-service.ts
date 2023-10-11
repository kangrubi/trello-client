import { IHttpService } from "@/lib/http";
import {
  LoginParams,
  LoginResponse,
  PublicApiResponse,
  RegisterParams,
  RegisterResponse,
} from "../types";

export interface IAuthService {
  login(params: LoginParams): Promise<PublicApiResponse<LoginResponse>>;
  logout(): Promise<void>;
  register(
    params: RegisterParams
  ): Promise<PublicApiResponse<RegisterResponse>>;
}

export class AuthService implements IAuthService {
  constructor(private readonly httpService: IHttpService) {}

  async login(params: LoginParams): Promise<PublicApiResponse<LoginResponse>> {
    const response = await this.httpService.post<
      PublicApiResponse<LoginResponse>
    >("/api/v1/auth/login", params, { withCredentials: true });

    return response;
  }

  async logout(): Promise<void> {
    console.log("logout");
  }

  async register(
    params: RegisterParams
  ): Promise<PublicApiResponse<RegisterResponse>> {
    const response = await this.httpService.post<
      PublicApiResponse<RegisterResponse>
    >("/api/v1/auth/register", params);

    return response;
  }
}
