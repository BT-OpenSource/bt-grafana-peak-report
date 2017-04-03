export class Exporter {
  constructor (columns) {
    this.columns = columns
  }

  call (rows) {
    var headers = this._buildHeaders()
    var lines = rows.map(this._buildRow, this).join('\n')
    return headers + '\n' + lines
  }

  _buildHeaders () {
    var headers = ['Name']

    this.columns.forEach((column) => {
      headers.push(column.title + ' (' + column.format + ')')
      if (column.showDate) headers.push(column.title + ' (time)')
    })

    return headers.join()
  }

  _buildRow (row) {
    var line = [row.name]

    row.cells.forEach((cell, index) => {
      line.push(cell[0])

      if (this.columns[index].showDate) {
        line.push(new Date(cell[1]).toISOString())
      }
    })

    return line.join()
  }
}
