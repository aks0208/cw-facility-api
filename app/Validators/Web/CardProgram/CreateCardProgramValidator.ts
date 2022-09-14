import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCardProgramValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    program_id: schema.string([
      rules.exists({column: 'id', table: 'programs'}),
      rules.uuid({ version: 4 })
    ]),
    steps: schema.array([
      rules.distinct('id'),
      rules.minLength(1)
    ]).members(schema.object().members( {
      id: schema.string([
        rules.uuid({ version: 4 }),
        rules.exists({column: 'id', table: 'steps'})
      ]),
      price: schema.number(),
      time: schema.number()
    })),
    total_price: schema.number()
  })


  public messages: CustomMessages = {
    'array': 'Field {{field}} must be an array.',
    'steps.*.minLength': 'Field {{field}} must have min {{options.minLength}} characters.',
    'required': 'Field {{field}} is required.',
    'steps.*.object': 'Field {{field}} must be an array of object.',
    'steps.*.exists': "Field {{field}} doesn't exist.",
    'exists': "Field {{field}} doesn't exist.",
    'number': 'Field {{field}} must be number.',
    'uuid': 'Field {{field}} must be uuid v4.',
  }
}
