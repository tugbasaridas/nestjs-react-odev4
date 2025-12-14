export interface ProfileType {
  id: number;
  name: string;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
  photo: string;
  profileType: ProfileType;
}
