import { Controller, Get } from '@nestjs/common';
import { ProfileTypesService } from './profile-types.service';

@Controller('profileTypes')
export class ProfileTypesController {
  constructor(private readonly profileTypesService: ProfileTypesService) {}

  @Get()
  findAll() {
    return this.profileTypesService.findAll();
  }
}

