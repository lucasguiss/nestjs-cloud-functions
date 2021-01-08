import { Test } from "@nestjs/testing"
import md5 from "md5"
import { Profile } from "../src/model/domain/profile.model"
import { CreateProfileDTO } from "../src/model/dto/create-profile.dto"
import { ProfileModule } from "../src/modules/profile.module"
import { CreateProfileService } from "../src/services/create-profile.service"

const makeProfileDTO = (): CreateProfileDTO => {
  const dto = new CreateProfileDTO()
  dto.name = 'valid_name'
  dto.email = 'email@email.com'
  dto.password = 'valid_password'
  dto.photoUrl = 'https://photo.com'
  return dto
}
describe('CreateProfile tests', () => {

  let createProfileService: CreateProfileService

  beforeEach(async () => {
    const testModule = await Test.createTestingModule({
      imports: [ProfileModule]
    }).compile()

    createProfileService = testModule.get<CreateProfileService>(CreateProfileService)
  })

  test('Should create a profile', async () => {
    const profileDTO = makeProfileDTO()
    const resultProfile: Profile = await createProfileService.createProfile(profileDTO)
    const actualDate = new Date().toLocaleDateString()

    expect(resultProfile.name).toStrictEqual(profileDTO.name)
    expect(resultProfile.email).toStrictEqual(profileDTO.email)
    expect(resultProfile.password).toStrictEqual(profileDTO.password)
    expect(resultProfile.photoUrl).toStrictEqual(profileDTO.photoUrl)
    expect(resultProfile.id).toStrictEqual(md5(actualDate))
    expect(resultProfile.creationDate).toStrictEqual(actualDate)
  })

})