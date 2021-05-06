import Entity from './Entity'
import Order from '../types/Order'

class Cooker extends Entity {
  private isCooking: boolean = false
  private readonly cookingMultiplier: number

  constructor(cookingMultiplier: number) {
    super();

    this.cookingMultiplier = cookingMultiplier
  }

  /* Public Methods */
  public isAvailable(): boolean {
    return !this.isCooking
  }

  public cook(order: Order): void {
    this.isCooking = true
    this.log(`Is Cooking ${order.type}.`)

    setTimeout(
      () => {
        this.isCooking = false
        this.log(`Returning ${order.type}`)
      },
      3000 * this.cookingMultiplier,
    )
  }
}

export default Cooker
