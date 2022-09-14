import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCustomerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    first_name: schema.string({}, [
      rules.minLength(3),
      rules.regex(/^[ A-Za-z0-9_@.\#&+\-\*']*$/),
    ]),
    last_name: schema.string({}, [
      rules.minLength(3),
      rules.regex(/^[ A-Za-z0-9_@.\#&+\-\*']*$/),
    ]),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'customers', column: 'email'})
    ]),
    phone_number: schema.string([
      rules.regex(/^\d+$/gi),
    ]),
    address: schema.string.optional([
      rules.regex(/^[ A-Za-z0-9_@.\#&+\-\*']*$/),
    ]),
    city: schema.string.optional([
      rules.regex(/^[ A-Za-z0-9_@.\#&+\-\*']*$/),
    ]),
    zip_code: schema.string.optional([
      rules.regex(/^[ A-Za-z0-9_@.\#&+\-\*']*$/),
    ])
  })


  public messages: CustomMessages = {
    'minLength': 'Field {{field}} must have min {{options.minLength}} characters.',
    'string': 'Field {{field}} must be string.',
    'required': 'Field {{field}} is required.',
    'email': 'Field {{field}} must be email.',
    'unique': 'Field {{field}} already exists.',
    'regex': 'Field {{field}} contains special characters that are not allowed.',
  }
}
