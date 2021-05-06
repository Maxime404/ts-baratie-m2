enum DishSize {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
}

export function isDishSize(value: string): value is DishSize {
  return value in DishSize
}

export default DishSize
