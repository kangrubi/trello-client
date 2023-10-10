import { IHttpService } from "@/lib/http";
import { PublicApiResponse, RegisterParams, RegisterResponse } from "../types";

export interface IAuthService {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(
    params: RegisterParams
  ): Promise<PublicApiResponse<RegisterResponse>>;
}

export class AuthService implements IAuthService {
  constructor(private readonly httpService: IHttpService) {}

  async login(email: string, password: string): Promise<void> {
    this.httpService.post("/login", { email, password });
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
