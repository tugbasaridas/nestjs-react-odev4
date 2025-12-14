import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileTypesService } from './profile-types.service';
import { ProfileTypesController } from './profile-types.controller';
import { ProfileType } from './entities/profile-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileType])],
  controllers: [ProfileTypesController],
  providers: [ProfileTypesService],
})
export class ProfileTypesModule {}
