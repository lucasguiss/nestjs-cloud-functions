import { Module } from '@nestjs/common';
import { ProfileRepository } from '../repository/profile.repository';
import { CreateProfileService } from '../services/create-profile.service';

@Module({
  providers: [
    CreateProfileService,
    ProfileRepository
  ],
})
export class ProfileModule { }
