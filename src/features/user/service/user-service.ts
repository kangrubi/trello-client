import { PublicApiResponse } from "@/types";
import { ProfileResponse } from "../types";
import { IHttpService } from "@/lib/http";

export interface IUserService {
  profile(): Promise<PublicApiResponse<ProfileResponse>>;
}

export class UserService implements IUserService {
  constructor(private readonly httpService: IHttpService) {}

  async profile(): Promise<PublicApiResponse<ProfileResponse>> {
    const response = await this.httpService.get<
      PublicApiResponse<ProfileResponse>
    >("/api/v1/user/profile");

    return response;
  }
}
