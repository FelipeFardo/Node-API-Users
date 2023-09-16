import { User } from "../../models/user";
import { HttpResponse, HttpRequest, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

import validator from "validator";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) { }
  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<User>> {
    try {
      // verificar campos obrigatórios
      const RequiredFields = ["firstName", "lastName", "email", "password"];

      // validar se body existe
      for (const field of RequiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`,
          };
        }
      }

      // verificar se o e-mail é valido
      const emailIsValid = validator.isEmail(httpRequest.body!.email);
      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "E-mail is invalid",
        };
      }
      if (!httpRequest.body) {
        return {
          statusCode: 400,
          body: "Please specify a body",
        };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);
      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return { statusCode: 500, body: "Something went wrong" };
    }
  }
}
