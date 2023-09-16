import { User } from "../../models/user";
import { badRequest, created, serverError } from "../herlpers";
import { HttpResponse, HttpRequest, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

import validator from "validator";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) { }
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User | string>> {
    try {
      // verificar campos obrigatórios
      const RequiredFields = ["firstName", "lastName", "email", "password"];

      // validar se body existe
      for (const field of RequiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`)
        }
      }

      // verificar se o e-mail é valido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return badRequest("E-mail is invalid")
      }
      if (!httpRequest.body) {
        return badRequest("E-mail is invalid")
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);
      return created<User>(user)
    } catch (error) {
      return serverError();
    }
  }
}
