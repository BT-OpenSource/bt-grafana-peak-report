import {Sorter} from '../../src/util/sorter'

describe('Sorter', function () {
  beforeEach(function () {
    this.options = { sortColumn: -1, sortMultiplier: 1 }
    this.subject = new Sorter(this.options)
  })

  describe('icon', function () {
    it('returns null when the column is not selected', function () {
      expect(this.subject.icon(1)).toBeNull()
    })

    it('returns sort-asc when the column is selected', function () {
      expect(this.subject.icon(-1)).toEqual('fa fa-sort-asc')
    })

    it('returns sort-desc when the column is selected', function () {
      this.options.sortMultiplier = -1
      expect(this.subject.icon(-1)).toEqual('fa fa-sort-desc')
    })
  })

  describe('toggle', function () {
    it('selects the column if it is not already selected', function () {
      this.subject.toggle(2)
      expect(this.options.sortColumn).toEqual(2)
    })

    it('toggles the sort direction if the column is already selected', function () {
      this.subject.toggle(-1)
      expect(this.options.sortMultiplier).toEqual(-1)
    })
  })

  describe('sort', function () {
    beforeEach(function () {
      this.rows = [
        { name: 'a', cells: [[1, 'timestamp']] },
        { name: 'b', cells: [[5, 'timestamp']] },
        { name: 'c', cells: [[10, 'timestamp']] }
      ]
    })

    it('sorts by name when the first column is selected', function () {
      this.rows.reverse()
      var result = this.subject.sort(this.rows)
      expect(result[0].name).toEqual('a')
      expect(result[1].name).toEqual('b')
      expect(result[2].name).toEqual('c')
    })

    it('reverses the order when the sort multiplier is -1', function () {
      this.options.sortMultiplier = -1
      var result = this.subject.sort(this.rows)
      expect(result[0].name).toEqual('c')
      expect(result[1].name).toEqual('b')
      expect(result[2].name).toEqual('a')
    })

    it('sorts by cell value when other columns are selected', function () {
      this.options.sortColumn = 0
      this.rows.reverse()
      var result = this.subject.sort(this.rows)
      expect(result[0].name).toEqual('a')
      expect(result[1].name).toEqual('b')
      expect(result[2].name).toEqual('c')
    })
  })
})
