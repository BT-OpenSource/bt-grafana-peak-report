'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelCtrl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _kbn = require('app/core/utils/kbn');

var _kbn2 = _interopRequireDefault(_kbn);

var _file_export = require('app/core/utils/file_export');

var fileExport = _interopRequireWildcard(_file_export);

var _sdk = require('app/plugins/sdk');

var _builder = require('./util/builder');

var _sorter = require('./util/sorter');

var _exporter = require('./util/exporter');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var panelDefaults = {
  defaultColor: 'rgb(117, 117, 117)',
  decimals: 2,
  nameComponents: '1,2,3',
  columns: [],
  sortColumn: -1,
  sortMultiplier: 1
};

var Ctrl = function (_MetricsPanelCtrl) {
  _inherits(Ctrl, _MetricsPanelCtrl);

  function Ctrl($scope, $injector) {
    _classCallCheck(this, Ctrl);

    var _this = _possibleConstructorReturn(this, (Ctrl.__proto__ || Object.getPrototypeOf(Ctrl)).call(this, $scope, $injector));

    _lodash2.default.defaults(_this.panel, panelDefaults);

    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
    _this.events.on('data-received', _this.onDataReceived.bind(_this));
    _this.events.on('render', _this.onRender.bind(_this));
    _this.events.on('init-panel-actions', _this.onInitPanelActions.bind(_this));

    _this.builder = new _builder.Builder(_this.panel);
    _this.sorter = new _sorter.Sorter(_this.panel);
    _this.exporter = new _exporter.Exporter(_this.panel.columns);
    _this.rows = [];
    return _this;
  }

  _createClass(Ctrl, [{
    key: 'onInitEditMode',
    value: function onInitEditMode() {
      this.addEditorTab('Options', 'public/plugins/btplc-peak-report-panel/editor.html');
      this.unitFormats = _kbn2.default.getUnitFormats();
    }
  }, {
    key: 'onDataReceived',
    value: function onDataReceived(seriesList) {
      this.seriesList = seriesList;
      this.render();
    }
  }, {
    key: 'onRender',
    value: function onRender() {
      this.rows = this.builder.call(this.seriesList);
      this.rows = this.sorter.sort(this.rows);
    }
  }, {
    key: 'onInitPanelActions',
    value: function onInitPanelActions(actions) {
      actions.push({ text: 'Export CSV', click: 'ctrl.exportCSV()' });
    }
  }, {
    key: 'onEditorAddColumnClick',
    value: function onEditorAddColumnClick() {
      this.panel.columns.push({ title: '', regex: '', format: 'none', showDate: false });
      this.render();
    }
  }, {
    key: 'onEditorRemoveColumnClick',
    value: function onEditorRemoveColumnClick(index) {
      this.panel.columns.splice(index, 1);
      this.render();
    }
  }, {
    key: 'onEditorFormatSelect',
    value: function onEditorFormatSelect(format, column) {
      column.format = format.value;
      this.render();
    }
  }, {
    key: 'onColumnClick',
    value: function onColumnClick(index) {
      this.sorter.toggle(index);
      this.render();
    }
  }, {
    key: 'format',
    value: function format(value, index) {
      var column = this.panel.columns[index];
      return _kbn2.default.valueFormats[column.format](value, this.panel.decimals, null);
    }
  }, {
    key: 'sortIcon',
    value: function sortIcon(index) {
      return this.sorter.icon(index);
    }
  }, {
    key: 'exportCSV',
    value: function exportCSV() {
      fileExport.saveSaveBlob(this.exporter.call(this.rows), 'grafana_data_export');
    }
  }]);

  return Ctrl;
}(_sdk.MetricsPanelCtrl);

Ctrl.templateUrl = 'module.html';
exports.PanelCtrl = Ctrl;
