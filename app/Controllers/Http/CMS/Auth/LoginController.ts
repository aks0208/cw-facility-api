// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Hash from "@ioc:Adonis/Core/Hash";
import LoginValidator from "App/Validators/CMS/Auth/LoginValidator";
import Employee from "App/Models/Employee";

export default class LoginController {
  public async login({auth, response, request}) {

    const { email, password } =  await request.validate(LoginValidator)

    const employee = await Employee.query()
      .where('email', email)
      .firstOrFail()

    if (!(await Hash.verify(employee.password, password))) {
      response.badRequest('Invalid credentials')
      return
    }

    return await auth.use('cms').generate(employee, {
      expiresIn: '7days'
    })

  }
}
