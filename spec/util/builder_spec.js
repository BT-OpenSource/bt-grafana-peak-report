import {Builder} from '../../src/util/builder'

describe('Builder', function () {
  beforeEach(function () {
    this.options = {
      nameComponents: '0,1',
      columns: [ { regex: 'packets' } ]
    }

    this.subject = new Builder(this.options)
  })

  describe('call', function () {
    it('builds the report', function () {
      var seriesList = [
        {
          target: 'report.section.packets.rx',
          datapoints: [ [1, 'ts'], [2, 'ts'] ]
        },
        {
          target: 'report.section.packets.tx',
          datapoints: [ [3, 'ts'], [4, 'ts'] ]
        }
      ]

      expect(this.subject.call(seriesList)).toEqual([
        {
          name: 'report.section', cells: [[4, 'ts']]
        }
      ])
    })

    it('copes with zeroes/nulls', function () {
      var seriesList = [
        {
          target: 'report.section.packets.rx',
          datapoints: [ [null, 'ts'], [0, 'ts'] ]
        },
        {
          target: 'report.section.packets.tx',
          datapoints: [ [0, 'ts'], [null, 'ts'] ]
        }
      ]

      expect(this.subject.call(seriesList)).toEqual([
        {
          name: 'report.section', cells: [[0, 'ts']]
        }
      ])
    })

    it('copes with large values', function () {
      var list = [[100344595554.4224, 'ts'], [98668129366.496, 'ts']]
      var seriesList = [
        {
          target: 'report.section.packets.rx',
          datapoints: list
        }
      ]

      expect(this.subject.call(seriesList)).toEqual([
        {
          name: 'report.section', cells: [[100344595554.4224, 'ts']]
        }
      ])
    })

    it('copes with all nulls', function () {
      var seriesList = [
        {
          target: 'report.section.packets.rx',
          datapoints: [ [null, 'ts'], [null, 'ts'] ]
        }
      ]

      expect(this.subject.call(seriesList)).toEqual([
        {
          name: 'report.section', cells: [[null, null]]
        }
      ])
    })
  })
})
