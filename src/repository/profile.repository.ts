import { Injectable } from "@nestjs/common";
import { Profile } from "../model/domain/profile.model";

@Injectable()
export class ProfileRepository {

  async create(profile: Profile): Promise<Profile> {
    console.log(`Profile ${profile.id} created sucessfully!`)
    return profile
  }

}