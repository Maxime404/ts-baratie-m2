import Entity from './Entity'
import Cooker from './Cooker'
import Order from '../types/Order'
import KitchenOptions from '../types/KitchenOptions'
import KitchenStock from '../types/KitchenStock'
import Ingredients from '../enums/Ingredients'

class Kitchen extends Entity {
  private cookers: Cooker[] = []
  private stock: KitchenStock

  private options: KitchenOptions

  constructor(options: KitchenOptions) {
    super()
    this.options = options

    // Initialize Cookers
    for (let i = 0; i < options.numberOfCookers; i++) {
      this.cookers.push(
        new Cooker(options.cookingMultiplier)
      )
    }

    // Initialize IngredientsStock & RefillTimer
    for (const ingredient in this.stock) {
      this.stock[ingredient]++
    }

    setInterval(
      () => { this.refillIngredients() },
      options.refillIngredientsTimer,
    )
  }

  /* Private Methods */
  public refillIngredients(): void {
    this.log('New Ingredients arrived.')

    for (const key in this.stock) {
      this.stock[key]++
    }
  }

  /* Public Methods */
  public isAvailable(): boolean {
    return this.cookers.filter(
      (cooker) => cooker.isAvailable(),
    ).length > 0
  }

  public dispatch(order: Order): void {
    const cooker = this.cookers.find(
      (cooker) => cooker.isAvailable()
    )

    cooker.cook(order)
  }
}

export default Kitchen
