type KitchenOptions = {
  cookingMultiplier: number,
  numberOfCookers: number,
  refillIngredientsTimer: number,
}

export function isKitchenOptions(value: { [key: string]: any }): value is KitchenOptions {
  const { cookingMultiplier, numberOfCookers, refillIngredientsTimer } = value

  return typeof cookingMultiplier === 'number'
    && typeof numberOfCookers === 'number'
    && typeof refillIngredientsTimer === 'number'
}

export default KitchenOptions
