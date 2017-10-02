import _ from 'lodash'
import kbn from 'app/core/utils/kbn'
import {saveSaveBlob} from 'app/core/utils/file_export'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import {Builder} from './util/builder'
import {Exporter} from './util/exporter'
import {Formatter} from './util/formatter'

const panelDefaults = {
  defaultColor: 'rgb(117, 117, 117)',
  decimals: 2,
  nameComponents: '1,2,3',
  columns: []
}

class Ctrl extends MetricsPanelCtrl {
  constructor ($scope, $injector) {
    super($scope, $injector)
    _.defaults(this.panel, panelDefaults)

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this))
    this.events.on('data-received', this.onDataReceived.bind(this))
    this.events.on('render', this.onRender.bind(this))
    this.events.on('init-panel-actions', this.onInitPanelActions.bind(this))

    this.builder = new Builder(this.panel)
    this.exporter = new Exporter(this.panel)
    this.formatter = new Formatter(this.panel, kbn)

    this.rows = []
  }

  onInitEditMode () {
    this.addEditorTab('Options', 'public/plugins/btplc-peak-report-panel/editor.html')
    this.unitFormats = kbn.getUnitFormats()
  }

  onDataReceived (seriesList) {
    this.seriesList = seriesList
    this.render()
  }

  onRender () {
    this.rows = this.builder.call(this.seriesList)
    this.rows = _.sortBy(this.rows, 'name')
  }

  onInitPanelActions (actions) {
    actions.push({text: 'Export CSV', click: 'ctrl.onExportCSV()'})
  }

  onEditorAddColumn () {
    this.panel.columns.push({ format: 'none' })
    this.render()
  }

  onEditorRemoveColumn (index) {
    this.panel.columns.splice(index, 1)
    this.render()
  }

  onEditorFormatSelect (format, column) {
    column.format = format.value
    this.render()
  }

  onExportCSV () {
    saveSaveBlob(this.exporter.call(this.rows))
  }
}

Ctrl.templateUrl = 'module.html'
export { Ctrl as PanelCtrl }
