import { IHttpService } from "@/lib/http";
import { RegisterParams, RegisterResponse } from "../types";

export interface IAuthService {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(params: RegisterParams): Promise<void>;
}

export class AuthService implements IAuthService {
  constructor(private readonly httpService: IHttpService) {}

  async login(email: string, password: string): Promise<void> {
    this.httpService.post("/login", { email, password });
  }
  async logout(): Promise<void> {
    console.log("logout");
  }
  async register(params: RegisterParams): Promise<void> {
    await this.httpService.post<RegisterResponse>(
      "/api/v1/auth/register",
      params
    );
  }
}
