import { ApiService } from "../../app/lib/api";
import { LocalStorageService } from "../../localStorage/localStorage.service";
import {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IRegisterResponse,
} from "../types/auth.type";

export class AuthService {
  private apiService: ApiService;
  private localStorageService: LocalStorageService;

  constructor(
    apiService: ApiService,
    localStorageService: LocalStorageService
  ) {
    this.apiService = apiService;
    this.localStorageService = localStorageService;
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

    this.localStorageService.setItem("accessToken", response.accessToken);
    return response;
  }

  async logout(): Promise<void> {
    await this.apiService.post<void>("/auth/logout", {});
    this.localStorageService.removeItem("accessToken");
  }
}
