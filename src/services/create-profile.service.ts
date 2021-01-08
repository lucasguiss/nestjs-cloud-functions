import { Injectable } from "@nestjs/common";
import { Profile } from "../model/domain/profile.model";
import { CreateProfileDTO } from "../model/dto/create-profile.dto";
import { ProfileRepository } from "../repository/profile.repository";
import md5 from 'md5'

@Injectable()
export class CreateProfileService {

  constructor(
    private readonly repository: ProfileRepository
  ) { }

  async createProfile(profileDTO: CreateProfileDTO): Promise<Profile> {
    const profile: Profile = Object.assign(new Profile, profileDTO)
    const actualDate = new Date().toLocaleDateString()
    profile.creationDate = actualDate
    profile.id = md5(actualDate)
    await this.repository.create(profile)
    return profile
  }

}