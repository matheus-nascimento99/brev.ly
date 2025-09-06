import type { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/value-objects/unique-entity-id'

type LinkProps = {
  createdAt: Date
}

export class Link extends Entity<LinkProps> {
  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<LinkProps, 'createdAt'>, id?: UniqueEntityId) {
    const link = new Link(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return link
  }
}
