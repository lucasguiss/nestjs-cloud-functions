import { NestFactory } from "@nestjs/core"
import { CreateProfileDTO } from "./model/dto/create-profile.dto"
import { ProfileModule } from "./modules/profile.module"
import { CreateProfileService } from "./services/create-profile.service"

export interface PubSubMessage {
  data: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
exports.CreateProfile = async (message: PubSubMessage, context: any) => {
  const app = await NestFactory.createApplicationContext(ProfileModule)
  const createProfileService = app.get(CreateProfileService)
  const { data } = message
  const parsedData = JSON.parse(Buffer.from(data, 'base64').toString())
  const profileDTO: CreateProfileDTO = Object.assign(new CreateProfileDTO, parsedData) 
  await createProfileService.createProfile(profileDTO)
} 