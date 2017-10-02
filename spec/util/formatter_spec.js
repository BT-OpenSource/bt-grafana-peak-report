import {Formatter} from '../../src/util/formatter'

describe('Formatter', function () {
  beforeEach(function () {
    var panel = { decimals: 2, columns: [{ format: 'custom' }] }
    this.format = jasmine.createSpy().and.returnValue('custom')

    var kbn = { valueFormats: { custom: this.format } }
    this.subject = new Formatter(panel, kbn)
  })

  describe('call', function () {
    it('formats the cell for the column', function () {
      expect(this.subject.call(1, 0)).toEqual('custom')
      expect(this.format).toHaveBeenCalledWith(1, 2, null)
    })
  })
})
