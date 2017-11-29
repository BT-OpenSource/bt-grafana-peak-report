import {Builder} from '../../src/util/builder'

describe('Builder', () => {
  let subject
  let panel

  beforeEach(() => {
    panel = { nameComponents: '0,1', columns: [{ regex: 'packets' }] }
    subject = new Builder(panel)
  })

  describe('call', () => {
    it('builds the report', () => {
      let seriesList = [
        { target: 'report.section.packets.rx', datapoints: [[1, 'ts'], [2, 'ts']] },
        { target: 'report.section.packets.tx', datapoints: [[3, 'ts'], [4, 'ts']] }
      ]

      expect(subject.call(seriesList)).toEqual([
        { name: 'report.section', cells: [[4, 'ts']] }
      ])
    })

    it('copes with zeros/nulls', () => {
      let seriesList = [
        { target: 'report.section.packets.rx', datapoints: [[null, 'ts'], [0, 'ts']] },
        { target: 'report.section.packets.tx', datapoints: [[0, 'ts'], [null, 'ts']] }
      ]

      expect(subject.call(seriesList)).toEqual([
        { name: 'report.section', cells: [[0, 'ts']] }
      ])
    })

    it('copes with large values', () => {
      let list = [[100344595554.4224, 'ts'], [98668129366.496, 'ts']]

      let seriesList = [
        { target: 'report.section.packets.rx', datapoints: list }
      ]

      expect(subject.call(seriesList)).toEqual([
        { name: 'report.section', cells: [[100344595554.4224, 'ts']] }
      ])
    })

    it('copes with all nulls', () => {
      let seriesList = [
        { target: 'report.section.packets.rx', datapoints: [[null, 'ts'], [null, 'ts']] }
      ]

      expect(subject.call(seriesList)).toEqual([
        { name: 'report.section', cells: [[null, null]] }
      ])
    })
  })
})
