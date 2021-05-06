import DishType, { isDishType } from '../enums/DishType'
import DishSize, { isDishSize } from '../enums/DishSize'

type Order = {
  type: DishType
  size: DishSize
  quantity: number
}

export function isOrder(value: { [key: string]: any }): value is Order {
  const { type, size, quantity } = value

  return isDishType(type)
    && isDishSize(size)
    && typeof quantity === 'number'
}

/**
 * @description Parse an Order Command as:
 * S := TYPE SIZE NUMBER [; TYPE SIZE NUMBER]*
 * TYPE := CHARACTER+
 * SIZE := S|M|L|XL|XXL
 * NUMBER := x[1..9][0..9]*
 * CHARACTER := [a..zA..Z]
 */
export function parse(
  input: string,
): Order[] {
  const orders: Order[] = []

  for (const order of input.split(';')) {
    const [, type, size, quantity] = /(?<type>\w+) (?<size>S|M|L|XL|XXL) x(?<amount>\d+)/g.exec(order)
    if (!(isDishSize(size) && isDishType(type))) {
      continue
    }

    orders.push({
      type,
      size,
      quantity: parseInt(quantity),
    })
  }

  return orders
}

export default Order
