import { IHttpService } from "@/lib/http";
import { BoradResponse, PostBoardParams } from "../types";

export interface IBoardService {
  getBoards(): Promise<BoradResponse[]>;
  postBoards(params: PostBoardParams): Promise<BoradResponse>;
}

export class BoardService implements IBoardService {
  constructor(private readonly httpService: IHttpService) {}
  async postBoards(params: PostBoardParams): Promise<BoradResponse> {
    return await this.httpService.post<BoradResponse>("/api/v1/boards", params);
  }

  async getBoards(): Promise<BoradResponse[]> {
    return await this.httpService.get<BoradResponse[]>("/api/v1/boards");
  }
}
