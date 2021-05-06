import * as readline from 'readline'
import * as yargs from 'yargs'

import Reception from './core/classes/Reception'
import KitchenOptions from './core/types/KitchenOptions'
import { parse } from './core/types/Order'

yargs
  .command(
    'run <cookingTimeMultiplier> <numberOfCookers> <refillIngredientsTimer>',
    '',
    {},
    ({
      cookingTimeMultiplier,
      numberOfCookers,
      refillIngredientsTimer,
    }) => {
      // TODO: Refactoring using typeguard for parameters
      const kitchenOptions: KitchenOptions = {
        cookingMultiplier: parseInt(
          (typeof cookingTimeMultiplier === 'string')
            ? cookingTimeMultiplier
            : '1'
        ),
        numberOfCookers: parseInt(
          (typeof numberOfCookers === 'string')
            ? numberOfCookers:
            '2'
        ),
        refillIngredientsTimer: parseInt(
          (typeof refillIngredientsTimer === 'string')
            ? refillIngredientsTimer:
            '2500'
        ),
      }
      const reception = new Reception(kitchenOptions)

      const rl = readline.createInterface({
        input: process.stdin,
      })

      console.log('Please enter your command:')
      rl.on('line', (command) => {
        const orders = parse(command)
        reception.dispatch(orders)
      })
    }
  )
  .help()
  .argv
