import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesModule } from './profiles/profiles.module';
import { ProfileTypesModule } from './profile-types/profile-types.module';
import { Profile } from './profiles/entities/profile.entity';
import { ProfileType } from './profile-types/entities/profile-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'profilesdb4',
      entities: [Profile, ProfileType],
      synchronize: true,
    }),

    ProfilesModule,
    ProfileTypesModule,
  ],
})
export class AppModule {}
