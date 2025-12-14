import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity()
export class ProfileType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Profile, (profile) => profile.profileType)
  profiles: Profile[];
}
