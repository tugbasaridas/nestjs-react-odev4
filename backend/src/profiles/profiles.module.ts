import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './entities/profile.entity';
import { ProfileType } from '../profile-types/entities/profile-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, ProfileType])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
