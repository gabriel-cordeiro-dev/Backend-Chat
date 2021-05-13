import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"


interface ISettingsCreate {
    chat: boolean
    username: string
}

class SettingsService{

    async create({ chat, username } : ISettingsCreate){
        
        const settingsRepository = getCustomRepository(SettingsRepository)

        //faz isso: select * from settings where username = "username"
        const userAlreadyExistis = await settingsRepository.findOne({ 
            username
        })

        if (userAlreadyExistis) {
            throw new Error("Usuário já existe")
        }

        const settings = settingsRepository.create({
            chat,
            username
    })

    await settingsRepository.save(settings)

    return settings
    }
}


export { SettingsService }