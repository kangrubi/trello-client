import { IHttpService } from "@/lib/http";
import {
  ForgotPsswordParams,
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
} from "../types";
import { PublicApiResponse } from "@/types";

export interface IAuthService {
  login(params: LoginParams): Promise<PublicApiResponse<LoginResponse>>;
  logout(): Promise<void>;
  register(
    params: RegisterParams
  ): Promise<PublicApiResponse<RegisterResponse>>;
  forgetPassword(params: ForgotPsswordParams): Promise<void>;
}

export class AuthService implements IAuthService {
  constructor(private readonly httpService: IHttpService) {}

  async forgetPassword(params: ForgotPsswordParams): Promise<void> {
    await this.httpService.post("/api/v1/auth/forgot-password", params);
  }

  async login(params: LoginParams): Promise<PublicApiResponse<LoginResponse>> {
    const response = await this.httpService.post<
      PublicApiResponse<LoginResponse>
    >("/api/v1/auth/login", params, { withCredentials: true });

    return response;
  }

  async logout(): Promise<void> {
    await this.httpService.post("/api/v1/auth/logout");
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
