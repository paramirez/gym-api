import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './createUser.dto';

export class EditUserDto extends PartialType(CreateUserDTO) {}
