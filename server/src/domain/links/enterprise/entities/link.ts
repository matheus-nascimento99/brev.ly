import type { Optional } from '@/core/@types/optional'
import { Entity } from '@/core/entities/entity'
import type { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import type { Raw } from '../value-objects/raw'

export type LinkProps = {
  originalUrl: string
  shortUrl: Raw
  accessCount: number
  createdAt: Date
}

export class Link extends Entity<LinkProps> {
  get originalUrl() {
    return this.props.originalUrl
  }

  set originalUrl(value: string) {
    this.props.originalUrl = value
  }

  get shortUrl() {
    return this.props.shortUrl
  }

  set shortUrl(value: Raw) {
    this.props.shortUrl = value
  }

  get accessCount() {
    return this.props.accessCount
  }

  get createdAt() {
    return this.props.createdAt
  }

  increment() {
    this.props.accessCount = this.props.accessCount++
  }

  static create(
    props: Optional<LinkProps, 'accessCount' | 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const link = new Link(
      {
        ...props,
        accessCount: props.accessCount ?? 0,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    )

    return link
  }
}
