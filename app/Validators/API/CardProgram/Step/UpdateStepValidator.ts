import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateStepValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string([
      rules.uuid({version: 4}),
      rules.exists({column: 'id', table: 'card_program_steps'})
    ]),
    status: schema.enum(['STARTED', 'FINISHED', 'ABORTED'] as const)
  })


  public messages: CustomMessages = {
    'enum': 'The value must be one of {{ options.choices }}.',
    'required': 'Field {{field}} is required.',
    'exists': "Field {{field}} doesn't exist.",
    'uuid': 'Field {{field}} must be uuid v4.',
  }
}
