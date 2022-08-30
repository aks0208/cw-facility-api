// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from "@ioc:Adonis/Core/Hash";
import LoginValidator from "App/Validators/CMS/Auth/LoginValidator";
import Employee from "App/Models/Employee";

export default class LoginController {
  public async login({auth, response, request}) {

    const { email, password } =  await request.validate(LoginValidator)

    const emp = await Employee.first()
    emp!.password = 'password'
    await emp!.save()

    const user = await Employee.query()
      .where('email', email)
      .firstOrFail()

    if (!(await Hash.verify(user.password, password))) {
      response.badRequest('Invalid credentials')
      return
    }

    return await auth.use('cms').generate(user, {
      expiresIn: '7days'
    })

  }
}
