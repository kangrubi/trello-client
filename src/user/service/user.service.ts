import { ApiService } from "../../app/lib/api";
import { IGetUserProfileResponse } from "../types/user.type";

export class UserService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getUserProfile(): Promise<IGetUserProfileResponse> {
    const response = await this.apiService.get<IGetUserProfileResponse>(
      "/user/profile"
    );
    return response;
  }
}
