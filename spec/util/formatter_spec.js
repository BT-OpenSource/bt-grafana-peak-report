import {Formatter} from '../../src/util/formatter'

describe('Formatter', () => {
  let subject
  let format

  beforeEach(() => {
    let panel = { decimals: 2, columns: [{ format: 'custom' }] }
    format = jasmine.createSpy().and.returnValue('custom')

    let kbn = { valueFormats: { custom: format } }
    subject = new Formatter(panel, kbn)
  })

  describe('call', () => {
    it('formats the cell for the column', () => {
      expect(subject.call(1, 0)).toEqual('custom')
      expect(format).toHaveBeenCalledWith(1, 2, null)
    })
  })
})
