import { User } from "../../models/user";
import { ok, serverError } from "../herlpers";
import { HttpResponse, IController } from "../protocols";
import { IGetUsersRepository } from "./protocols";

export class GetUsersController implements IController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) { }

  async handle(): Promise<HttpResponse<User[] | string>> {
    try {
      // validar requisição
      const users = await this.getUsersRepository.getUsers();
      // direcionar chamada para o Repository
      return ok<User[]>(users);
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return serverError()
    }
  }
}
