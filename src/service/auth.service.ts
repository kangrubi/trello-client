import { ApiService } from "../lib/api";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../features/auth/types/auth.type";

export class AuthService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async register(
    registerRequest: IRegisterRequest
  ): Promise<IRegisterResponse> {
    const response = await this.apiService.post<IRegisterResponse>(
      "/auth/register",
      registerRequest
    );
    return response;
  }

  async login(loginRequest: ILoginRequest): Promise<ILoginResponse> {
    const response = await this.apiService.post<ILoginResponse>("/auth/login", {
      ...loginRequest,
    });
    return response;
  }

  async logout(): Promise<void> {
    await this.apiService.post<void>("/auth/logout", {});
  }
}
