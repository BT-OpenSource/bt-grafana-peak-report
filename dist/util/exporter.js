'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Exporter = exports.Exporter = function () {
  function Exporter(columns) {
    _classCallCheck(this, Exporter);

    this.columns = columns;
  }

  _createClass(Exporter, [{
    key: 'call',
    value: function call(rows) {
      var headers = this._buildHeaders();
      var lines = rows.map(this._buildRow, this).join('\n');
      return headers + '\n' + lines;
    }
  }, {
    key: '_buildHeaders',
    value: function _buildHeaders() {
      var headers = ['Name'];

      this.columns.forEach(function (column) {
        headers.push(column.title + ' (' + column.format + ')');
        if (column.showDate) headers.push(column.title + ' (time)');
      });

      return headers.join();
    }
  }, {
    key: '_buildRow',
    value: function _buildRow(row) {
      var _this = this;

      var line = [row.name];

      row.cells.forEach(function (cell, index) {
        line.push(cell[0]);

        if (_this.columns[index].showDate) {
          line.push(new Date(cell[1]).toISOString());
        }
      });

      return line.join();
    }
  }]);

  return Exporter;
}();
