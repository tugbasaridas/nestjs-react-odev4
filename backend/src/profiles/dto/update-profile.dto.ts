import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';
import { IsOptional, IsEmail, Matches, IsNumber } from 'class-validator';
import { Match } from '../../common/match.decorator';
import { Type } from 'class-transformer';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message:
      'Password must include 1 uppercase, 1 lowercase, 1 number and 1 symbol',
  })
  password?: string;

  @IsOptional()
  @Match('password', { message: 'Passwords do not match' })
  confirmPassword?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  profileTypeId?: number;

  @IsOptional()
  photo?: string;
}
