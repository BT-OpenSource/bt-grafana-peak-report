'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sorter = exports.Sorter = function () {
  function Sorter(options) {
    _classCallCheck(this, Sorter);

    this.options = options;
  }

  _createClass(Sorter, [{
    key: 'sort',
    value: function sort(rows) {
      var _this = this;

      return rows.concat().sort(function (rowA, rowB) {
        var value = _this._sortValueFor(rowA, rowB);
        return _this.options.sortMultiplier * value;
      });
    }
  }, {
    key: 'toggle',
    value: function toggle(index) {
      var multiplier = this.options.sortMultiplier;
      var column = this.options.sortColumn;

      if (column !== index) {
        this.options.sortColumn = index;
      } else {
        this.options.sortMultiplier = multiplier * -1;
      }
    }
  }, {
    key: 'icon',
    value: function icon(index) {
      if (this.options.sortColumn !== index) {
        return null;
      }

      if (this.options.sortMultiplier === 1) {
        return 'fa fa-sort-asc';
      } else {
        return 'fa fa-sort-desc';
      }
    }
  }, {
    key: '_sortValueFor',
    value: function _sortValueFor(rowA, rowB) {
      var column = this.options.sortColumn;

      if (column === -1) {
        return rowA.name.localeCompare(rowB.name);
      } else {
        return rowA.cells[column][0] - rowB.cells[column][0];
      }
    }
  }]);

  return Sorter;
}();
