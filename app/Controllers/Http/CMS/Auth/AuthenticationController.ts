// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Employee from "App/Models/Employee";

export default class AuthenticationController {

  public async me({ auth }) {
    try {
      return await Employee.findOrFail(auth.user.id)
    } catch (e) {
      return e
    }
  }
}
