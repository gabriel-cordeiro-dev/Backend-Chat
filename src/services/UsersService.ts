import  { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'



class UsersService{
    async create(email: string){
        const usersRepository = getCustomRepository(UsersRepository)

        //verificar se usuario existe
        const userExists = await usersRepository.findOne({
            email
        })
        if (userExists) {
            return userExists
        }

        const user = usersRepository.create({
            email
        })

        await usersRepository.save(user)

        //se nao existir, salvar no bd
        return user
    }
}

export { UsersService }