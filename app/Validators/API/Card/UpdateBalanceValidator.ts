import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateBalanceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    balance: schema.number()
  })

  public messages: CustomMessages = {
    'required': 'Field {{field}} is required.',
    'number': 'Field {{field}} must be number.',
  }
}
