export abstract class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  equals(vo: ValueObject<unknown>) {
    if (typeof vo === 'undefined') {
      return false
    }

    return JSON.stringify(vo.props) === JSON.stringify(this.props)
  }
}
