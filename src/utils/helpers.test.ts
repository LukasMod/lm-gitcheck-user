import { bigNumberText } from './helpers'

describe('helpers', () => {
  describe('bigNumberText', () => {
    it('shows correct string for 123456789 (9 digits)', () => {
      const localText = bigNumberText(123456789)
      expect(localText).toBe('123 456 789')
    })
    it('shows correct string for 123 (3 digits)', () => {
      const localText = bigNumberText(123)
      expect(localText).toBe('123')
    })
    it('shows empty string when passing undefined', () => {
      const localText = bigNumberText(null)
      expect(localText).toBe('')
    })
  })
})
