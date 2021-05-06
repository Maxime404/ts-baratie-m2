import Ingredients from '../enums/Ingredients'

type KitchenStock = {
  [key in Ingredients]: number
}

export default KitchenStock
