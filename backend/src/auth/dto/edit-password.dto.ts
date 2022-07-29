import {IsNotEmpty, IsString} from "class-validator"

export class EditPasswordDto{
    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}