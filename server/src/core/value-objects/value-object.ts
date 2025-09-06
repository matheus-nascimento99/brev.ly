export abstract class ValueObject<Props> {
  protected value: Props

  protected constructor(value: Props) {
    this.value = value
  }

  equals(vo: ValueObject<unknown>) {
    if (typeof vo === 'undefined') {
      return false
    }

    return JSON.stringify(vo.value) === JSON.stringify(this.value)
  }
}
