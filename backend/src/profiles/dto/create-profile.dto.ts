import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
} from 'class-validator';
import { Match } from '../../common/match.decorator';
import { Type } from 'class-transformer';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must include 1 uppercase, 1 lowercase, 1 number and 1 symbol',
  })
  password: string;
  
  @IsNotEmpty({ message: 'Confirm password is required' })
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword: string;

  @Type(() => Number)  
  @IsNumber()
  profileTypeId: number;
}
