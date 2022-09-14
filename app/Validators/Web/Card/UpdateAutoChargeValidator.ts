import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateAutoChargeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    auto_charge: schema.boolean()
  })

  public messages: CustomMessages = {
    'required': 'Field {{field}} is required.',
    'boolean': 'Field {{field}} must be true or false.',
  }
}
