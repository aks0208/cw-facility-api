import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateStepValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    step: schema.object().members({
      step_id: schema.string([
        rules.uuid({version: 4}),
        rules.exists({column: 'id', table: 'steps'})
      ]),
      price: schema.number(),
      time: schema.number(),
    }),
    card_program_id: schema.string([
      rules.uuid({version: 4}),
      rules.exists({column: 'id', table: 'card_programs'})
    ]),
  })

  public messages: CustomMessages = {
    'object': 'Field {{field}} must be object.',
    'required': 'Field {{field}} is required.',
    'exists': "Field {{field}} doesn't exist.",
    'uuid': 'Field {{field}} must be uuid v4.',
  }
}
