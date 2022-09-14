import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string({},[
      rules.email(),
      rules.exists({ table: 'employees', column: 'email' })
    ]),
    password: schema.string({}, [
      //rules.minLength(8)
    ])
  })

  public messages: CustomMessages = {
    string: 'Field {{field}} must be string.',
    minLength: 'Field {{field}} must have min {{options.minLength}} characters.',
    required: 'Field {{field}} is required.',
    email: 'Field {{field}} must be email.',
    exists: "The {{field}} doesn't exist.",
  }
}
