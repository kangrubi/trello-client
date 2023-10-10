import { IHttpService } from "@/lib/http";
import { RegisterParams, RegisterResponse } from "../types";

export interface IAuthService {
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  register(params: RegisterParams): Promise<void>;
}

export class AuthService implements IAuthService {
  constructor(private readonly httpService: IHttpService) {}

  login = async (email: string, password: string) => {
    this.httpService.post("/login", { email, password });
  };

  logout = async () => {
    console.log("logout");
  };

  register = async (params: RegisterParams) => {
    this.httpService.post<RegisterResponse>("/api/v1/auth/register", params);
  };
}
