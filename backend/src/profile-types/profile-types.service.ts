import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileType } from './entities/profile-type.entity';

@Injectable()
export class ProfileTypesService {
  constructor(
    @InjectRepository(ProfileType)
    private profileTypesRepo: Repository<ProfileType>,
  ) {}

  findAll() {
    return this.profileTypesRepo.find();
  }
}

