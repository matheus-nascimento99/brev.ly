import { ValueObject } from '../../../../core/value-objects/value-object.ts'

export class Raw extends ValueObject<string> {
  get value() {
    return this.props
  }

  static create(value: string) {
    return new Raw(value)
  }

  /**
   * Removes special characters, spaces, accents and normalizes text
   *
   * @example
   *   createFromText('+55 (11) 99384-7372'); // '5511993847372'
   *   createFromText('João Gonçalves'); // 'joaogoncalves'
   *   createFromText('Straße Æther'); // 'strasseaether'
   *
   * @param {String} value - The text to normalize
   */
  static createFromText(value: string) {
    // Special character mappings
    const specialChars: Record<string, string> = {
      æ: 'ae',
      œ: 'oe',
      ß: 'ss',
      ø: 'o',
      ł: 'l',
      đ: 'd',
      ð: 'd',
      þ: 'th',
      ç: 'c',
      ñ: 'n',
    }

    return new Raw(
      value
        .trim()
        .toLowerCase()
        // Replace specific special characters first
        .replace(/[æœßøłđðþçñ]/g, char => specialChars[char])
        // Normalize and remove diacritics
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        // Remove all non-alphanumeric chars
        .replace(/[^a-z0-9]/g, '')
    )
  }
}
