import { parentPort } from 'worker_threads'

import Kitchen from '../classes/Kitchen'
import KitchenWorkerEvents from '../enums/KitchenWorkerEvents'
import { isOrder } from '../types/Order'
import { isKitchenOptions } from '../types/KitchenOptions'

/**
 * Global Variables
 */
let kitchen: Kitchen

/**
 * Event Listeners
 */
function onCreate(payload: unknown): boolean {
  if (!isKitchenOptions(payload)) {
    return false
  }

  kitchen = new Kitchen(payload)
  return true
}

function onIsAvailable(_: unknown): boolean {
  return kitchen.isAvailable()
}

function onDispatch(payload: unknown): void {
  if (!isOrder(payload)) {
    return
  }

  kitchen.dispatch(payload)
}

/**
 * Entrypoint
 */
parentPort.on(
  'message',
  ({ event, payload }: any) => {
    const listeners = {
      [KitchenWorkerEvents.CREATE]: onCreate,
      [KitchenWorkerEvents.IS_AVAILABLE]: onIsAvailable,
      [KitchenWorkerEvents.DISPATCH]: onDispatch,
    }

    const response = listeners[event](payload)
    parentPort.postMessage({
      event,
      payload: (response === undefined)
        ? {}
        : response,
    })
  },
)
