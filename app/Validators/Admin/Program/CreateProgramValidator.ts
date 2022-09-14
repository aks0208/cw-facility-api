import {schema, CustomMessages, rules} from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateProgramValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(65),
      rules.regex(/^[a-zA-Z]+$/),
      rules.unique({table: 'programs', column: 'name'}),
    ]),
    description: schema.string([
      rules.minLength(3),
      rules.regex(/^[ A-Za-z0-9_@.\#&+\-\*']*$/),
    ]),
    steps: schema.array([
      rules.minLength(1),
      rules.distinct('id'),
    ]).members(schema.object().members({
      id: schema.string([
        rules.uuid(),
      ])
    }))
  })

  public messages: CustomMessages = {
    'minLength': 'Field {{field}} must have min {{options.minLength}} characters.',
    'string': 'Field {{field}} must be string.',
    'required': 'Field {{field}} is required.',
    'unique': 'Field {{field}} already exists.',
    'regex': 'Field {{field}} contains characters that are not allowed.',
    'steps.distinct': 'Field {{field}} has already been added.',
  }
}
