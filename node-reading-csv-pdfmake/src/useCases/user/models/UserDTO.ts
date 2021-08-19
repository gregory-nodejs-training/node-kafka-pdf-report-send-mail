import { IsEmail, IsNotEmpty } from 'class-validator';

class UserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    admin: boolean;

    constructor(name: string, email: string, password: string, admin?: boolean) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.admin = admin === null || admin === undefined ? false : admin;
    }
}

export { UserDTO };
