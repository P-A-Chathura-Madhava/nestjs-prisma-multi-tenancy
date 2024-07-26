import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class CreateUserDto implements Omit<User, "id"> {
  @ApiProperty()
  name: string;
}
