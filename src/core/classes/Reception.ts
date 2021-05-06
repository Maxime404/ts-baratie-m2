import Entity from './Entity'
import KitchenWorker from './KitchenWorker'
import Order from '../types/Order'
import KitchenOptions from '../types/KitchenOptions'

class Reception extends Entity {
  private workers: KitchenWorker[] = []
  private readonly kitchenOptions: KitchenOptions

  constructor(options: KitchenOptions) {
    super();

    this.kitchenOptions = options
  }

  /* Private Methods */
  private async createKitchenWorker(): Promise<KitchenWorker> {
    const worker = new KitchenWorker()
    await worker.create(this.kitchenOptions)

    this.workers.push(worker)

    return worker
  }

  private async getAvailableWorker(): Promise<KitchenWorker> {
    for (const worker of this.workers) {
      const isAvailable = await worker.isAvailable()
      if(!isAvailable) {
        continue
      }

      return worker
    }

    // When no KitchenWorker available
    return this.createKitchenWorker()
  }

  /* Public Methods */
  public async dispatch(orders: Order[]): Promise<void> {
    for (const order of orders) {
      const worker = await this.getAvailableWorker()
      this.log(`Dispatching ${order.type} to KitchenProcess(${worker.getId()})`)

      await worker.dispatch(order)
    }
  }
}

export default Reception
