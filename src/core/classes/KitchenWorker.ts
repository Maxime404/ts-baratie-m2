import { Worker } from 'worker_threads'

import Entity from './Entity'
import KitchenWorkerEvents from '../enums/KitchenWorkerEvents'
import Order from '../types/Order'
import KitchenOptions from '../types/KitchenOptions'

class KitchenWorker extends Entity {
  private worker: Worker = new Worker(`${__dirname}/../workers/kitchen.js`)

  /* Private Methods */
  private async send<T>(event: KitchenWorkerEvents, payload: unknown = {}): Promise<T> {
    this.worker.postMessage({ event, payload })

    return new Promise((resolve) => {
      this.worker.once('message', ({ event, payload }) => {
        resolve(payload)
      })
    })
  }

  /* Public Methods */
  public async create(options: KitchenOptions): Promise<void> {
    return this.send(KitchenWorkerEvents.CREATE, options)
  }

  public async isAvailable(): Promise<boolean> {
    return this.send(KitchenWorkerEvents.IS_AVAILABLE)
  }

  public async dispatch(order: Order): Promise<void> {
    return this.send(KitchenWorkerEvents.DISPATCH, order)
  }
}

export default KitchenWorker
