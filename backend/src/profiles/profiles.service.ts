import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './entities/profile.entity';
import { ProfileType } from '../profile-types/entities/profile-type.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepo: Repository<Profile>,
    @InjectRepository(ProfileType)
    private profileTypesRepo: Repository<ProfileType>,
  ) {}

  async create(
    createProfileDto: CreateProfileDto,
    file?: Express.Multer.File,
  ) {
    const profileType = await this.profileTypesRepo.findOne({
      where: { id: createProfileDto.profileTypeId },
    });

    if (!profileType) {
      throw new NotFoundException('ProfileType not found');
    }

    const hashedPassword = await bcrypt.hash(createProfileDto.password, 10);

    const profile = this.profilesRepo.create({
      username: createProfileDto.username,
      email: createProfileDto.email,
      password: hashedPassword,
      photo: file ? `/uploads/${file.filename}` : '',
      profileType,
    });

    return this.profilesRepo.save(profile);
  }

  findAll() {
    return this.profilesRepo.find({
      relations: ['profileType'],
    });
  }

  async findOne(id: number) {
    const profile = await this.profilesRepo.findOne({
      where: { id },
      relations: ['profileType'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
    file?: Express.Multer.File,
  ) {
    const profile = await this.profilesRepo.findOne({
      where: { id },
      relations: ['profileType'],
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (updateProfileDto.username !== undefined) {
      profile.username = updateProfileDto.username;
    }

    if (updateProfileDto.email !== undefined) {
      profile.email = updateProfileDto.email;
    }

    if (updateProfileDto.password) {
      const hashed = await bcrypt.hash(updateProfileDto.password, 10);
      profile.password = hashed;
    }

    if (updateProfileDto.profileTypeId !== undefined) {
      const profileType = await this.profileTypesRepo.findOne({
        where: { id: updateProfileDto.profileTypeId },
      });
      if (!profileType) {
        throw new NotFoundException('ProfileType not found');
      }
      profile.profileType = profileType;
    }

    if (file) {
      profile.photo = `/uploads/${file.filename}`;
    }

    return this.profilesRepo.save(profile);
  }

  async remove(id: number) {
    const profile = await this.profilesRepo.findOne({ where: { id } });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    await this.profilesRepo.remove(profile);
    return { message: 'Profile deleted successfully' };
  }
}
