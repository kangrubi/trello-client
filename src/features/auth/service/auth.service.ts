import { ApiService } from "../../../lib/api";
import { IRegisterRequest, IRegisterResponse } from "../types/auth.type";

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
}
