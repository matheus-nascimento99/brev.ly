import { randomUUID } from 'node:crypto'
import { ValueObject } from './value-object.ts'

export class UniqueEntityId extends ValueObject<string> {
  constructor(id?: string) {
    super(id ?? randomUUID())
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }
}
