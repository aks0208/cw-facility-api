import Card from "App/Models/Card";
import CreateCardProgramValidator from "App/Validators/Web/CardProgram/CreateCardProgramValidator";
import CreateStepValidator from "App/Validators/Web/CardProgram/Step/CreateStepValidator";

export default class CheckBalance {
  public async handle(ctx, next: () => Promise<void>) {

    const card = await Card.findOrFail(ctx.request.body().current_card_id)

    if(ctx.route.handler === 'CardProgramsController.create') {
      const { total_price } = await ctx.request.validate(CreateCardProgramValidator)

      if(parseFloat(card.balance) < total_price) {
        return ctx.response.status(400).send("You don't have enough credit on your card")
      }
    }

    if(ctx.route.handler === 'CardProgramStepsController.create') {
      const { step } = await ctx.request.validate(CreateStepValidator)

      if(parseFloat(card.balance) < step.price) {
        return ctx.response.status(400).send("You don't have enough credit on your card")
      }
    }

    await next()
  }
}
