import _ from 'lodash'

export class Builder {
  constructor (options) {
    this.options = options
  }

  call (seriesList = []) {
    var groupedSeries = _.groupBy(seriesList, _.bind(this._shortName, this))

    return _.map(groupedSeries, (rowSeries, shortName) => {
      return { name: shortName, cells: this._cellsFor(rowSeries) }
    })
  }

  _shortName (series) {
    var nameComponents = this.options.nameComponents.split(',')
    var components = series.target.split('.')
    return _.map(nameComponents, (nc) => components[parseInt(nc)]).join('.')
  }

  _cellsFor (rowSeries) {
    return _.map(this.options.columns, (column) => {
      var columnSeries = this._filterByColumn(column, rowSeries)
      return this._peakForColumn(columnSeries)
    })
  }

  _peakForColumn (seriesList) {
    var maxes = seriesList.map((series) => this._maxPoint(series.datapoints))
    return this._maxPoint(maxes)
  }

  _filterByColumn (column, seriesList) {
    var regex = new RegExp(column.regex)
    return _.filter(seriesList, (series) => series.target.match(regex))
  }

  _maxPoint (points) {
    points = _.filter(points, point => point[0] != null)
    if (points.length === 0) return [null, null]
    return points.reduce((max, point) => point[0] > max[0] ? point : max, points[0])
  }
}
