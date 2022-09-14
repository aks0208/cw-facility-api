// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Employee from "App/Models/Employee";

export default class EmployeesController {

  public async show() {
    return Employee.all()
  }
}
