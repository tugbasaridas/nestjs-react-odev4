import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProfileType } from '../../profile-types/entities/profile-type.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  photo: string;

  @ManyToOne(() => ProfileType, (pt) => pt.profiles)
  profileType: ProfileType;
}
