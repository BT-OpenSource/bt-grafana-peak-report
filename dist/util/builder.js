'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Builder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Builder = exports.Builder = function () {
  function Builder(options) {
    _classCallCheck(this, Builder);

    this.options = options;
  }

  _createClass(Builder, [{
    key: 'call',
    value: function call() {
      var _this = this;

      var seriesList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var groupedSeries = _lodash2.default.groupBy(seriesList, _lodash2.default.bind(this._shortName, this));

      return _lodash2.default.map(groupedSeries, function (rowSeries, shortName) {
        return { name: shortName, cells: _this._cellsFor(rowSeries) };
      });
    }
  }, {
    key: '_shortName',
    value: function _shortName(series) {
      var nameComponents = this.options.nameComponents.split(',');
      var components = series.target.split('.');
      return _lodash2.default.map(nameComponents, function (nc) {
        return components[parseInt(nc)];
      }).join('.');
    }
  }, {
    key: '_cellsFor',
    value: function _cellsFor(rowSeries) {
      var _this2 = this;

      return _lodash2.default.map(this.options.columns, function (column) {
        var columnSeries = _this2._filterByColumn(column, rowSeries);
        return _this2._peakForColumn(columnSeries);
      });
    }
  }, {
    key: '_peakForColumn',
    value: function _peakForColumn(seriesList) {
      var _this3 = this;

      var maxes = seriesList.map(function (series) {
        return _this3._maxPoint(series.datapoints);
      });
      return this._maxPoint(maxes);
    }
  }, {
    key: '_filterByColumn',
    value: function _filterByColumn(column, seriesList) {
      var regex = new RegExp(column.regex);
      return _lodash2.default.filter(seriesList, function (series) {
        return series.target.match(regex);
      });
    }
  }, {
    key: '_maxPoint',
    value: function _maxPoint(points) {
      points = _lodash2.default.filter(points, function (point) {
        return point[0] != null;
      });
      if (points.length === 0) return [null, null];
      return points.reduce(function (max, point) {
        return point[0] > max[0] ? point : max;
      }, points[0]);
    }
  }]);

  return Builder;
}();
