import apiService, { ApiService } from "../../../lib/api";
import { IRegisterRequest, IRegisterResponse } from "../types/auth.type";

export class AuthService {
  private readonly apiService: ApiService;

  constructor() {
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
}
