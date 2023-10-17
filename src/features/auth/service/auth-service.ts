import { IHttpService } from "@/lib/http";
import {
  ForgotPsswordParams,
  LoginParams,
  LoginResponse,
  RegisterParams,
  RegisterResponse,
  ResetPasswordParams,
} from "../types";
import { PublicApiResponse } from "@/types";

export interface IAuthService {
  login(params: LoginParams): Promise<PublicApiResponse<LoginResponse>>;
  logout(): Promise<void>;
  register(
    params: RegisterParams
  ): Promise<PublicApiResponse<RegisterResponse>>;
  forgotPassword(params: ForgotPsswordParams): Promise<PublicApiResponse<void>>;
  resetPassword(params: ResetPasswordParams): Promise<void>;
}

export class AuthService implements IAuthService {
  constructor(private readonly httpService: IHttpService) {}

  async resetPassword(params: ResetPasswordParams): Promise<void> {
    await this.httpService.post("/api/v1/auth/reset-password", params);
  }

  async forgotPassword(
    params: ForgotPsswordParams
  ): Promise<PublicApiResponse<void>> {
    const response = await this.httpService.post<PublicApiResponse<void>>(
      "/api/v1/auth/forgot-password",
      params
    );

    return response;
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
