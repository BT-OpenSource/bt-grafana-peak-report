import {Exporter} from '../../src/util/exporter'

describe('Exporter', function () {
  beforeEach(function () {
    this.columns = [
      {
        title: 'throughput', format: 'bps', showDate: true
      },
      {
        title: 'packet_loss', format: 'pps'
      }
    ]

    this.subject = new Exporter(this.columns)
  })

  describe('call', function () {
    it('returns a CSV string', function () {
      var rows = [
        {
          name: 'name', cells: [[123.45, 1489994720000], [0.22, 'ts']]
        }
      ]

      expect(this.subject.call(rows)).toEqual(
        [
          'Name,throughput (bps),throughput (time),packet_loss (pps)',
          'name,123.45,2017-03-20T07:25:20.000Z,0.22'
        ].join('\n')
      )
    })
  })
})
