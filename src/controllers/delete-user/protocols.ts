import { User } from "../../models/user";

export interface IDeletedUserRepository {
    deleteUser(id:string): Promise<User>
}