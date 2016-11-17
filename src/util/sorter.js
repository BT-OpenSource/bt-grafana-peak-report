export class Sorter {
  constructor (options) {
    this.options = options
  }

  sort (rows) {
    return rows.concat().sort((rowA, rowB) => {
      var value = this._sortValueFor(rowA, rowB)
      return this.options.sortMultiplier * value
    })
  }

  toggle (index) {
    var multiplier = this.options.sortMultiplier
    var column = this.options.sortColumn

    if (column !== index) {
      this.options.sortColumn = index
    } else {
      this.options.sortMultiplier = multiplier * -1
    }
  }

  icon (index) {
    if (this.options.sortColumn !== index) { return null }

    if (this.options.sortMultiplier === 1) {
      return 'fa fa-sort-asc'
    } else {
      return 'fa fa-sort-desc'
    }
  }

  _sortValueFor (rowA, rowB) {
    var column = this.options.sortColumn

    if (column === -1) {
      return rowA.name.localeCompare(rowB.name)
    } else {
      return rowA.cells[column][0] - rowB.cells[column][0]
    }
  }
}
