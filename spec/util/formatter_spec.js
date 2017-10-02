import {Formatter} from '../../src/util/formatter'

describe('Formatter', function () {
  beforeEach(function () {
    var panel = { columns: [{ format: 'custom' }] }
    this.format = jasmine.createSpy().and.returnValue('custom')

    this.kbn = { valueFormats: { custom: this.format } }
    this.subject = new Formatter(panel, this.kbn)
  })

  describe('call', function () {
    it('formats the cell for the column', function () {
      expect(this.subject.call(1, 0)).toEqual('custom')
    })
  })
})
