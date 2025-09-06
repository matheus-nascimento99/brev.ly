import { UniqueEntityId } from '../value-objects/unique-entity-id'

export abstract class Entity<Props> {
  protected props: Props
  private _id: UniqueEntityId

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props
    this._id = id ?? new UniqueEntityId()
  }

  equals(e: Entity<unknown>) {
    if (typeof e === 'undefined') {
      return false
    }

    if (!e.id.equals(e.id)) {
      return false
    }

    return true
  }
}
