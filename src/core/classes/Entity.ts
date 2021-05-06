import { v4 as uuid } from 'uuid'

abstract class Entity {
 private id: string = uuid()

 /* Public Methods */
 public getId(): string {
  return this.id
 }

 public log(message: string): void {
  const classname = this.constructor.name

  console.log(`${classname}(${this.getId()}) >`, message)
 }
}

export default Entity
