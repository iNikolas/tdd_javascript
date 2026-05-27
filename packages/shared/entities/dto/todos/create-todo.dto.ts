import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  text: string;
}
