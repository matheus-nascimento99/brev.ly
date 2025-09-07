class Right<L, R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }

  isRight(): this is Right<L, R> {
    return true
  }

  isLeft(): this is never {
    return false
  }
}

class Left<L, R> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isRight(): this is never {
    return false
  }

  isLeft(): this is Left<L, R> {
    return true
  }
}

export type Either<L, R> = NonNullable<Left<L, R>> | NonNullable<Right<L, R>>

export const right = <L, R>(e: R): Right<L, R> => {
  return new Right(e)
}

export const left = <L, R>(e: L): Left<L, R> => {
  return new Left(e)
}
