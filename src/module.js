import _ from 'lodash'
import kbn from 'app/core/utils/kbn'
import * as fileExport from 'app/core/utils/file_export'
import {MetricsPanelCtrl} from 'app/plugins/sdk'
import {Builder} from './util/builder'
import {Sorter} from './util/sorter'
import {Exporter} from './util/exporter'

const panelDefaults = {
  defaultColor: 'rgb(117, 117, 117)',
  decimals: 2,
  nameComponents: '1,2,3',
  columns: [],
  sortColumn: -1,
  sortMultiplier: 1
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
    this.sorter = new Sorter(this.panel)
    this.exporter = new Exporter(this.panel.columns)
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
    this.rows = this.sorter.sort(this.rows)
  }

  onInitPanelActions (actions) {
    actions.push({text: 'Export CSV', click: 'ctrl.exportCSV()'})
  }

  onEditorAddColumnClick () {
    this.panel.columns.push({ title: '', regex: '', format: 'none', showDate: false })
    this.render()
  }

  onEditorRemoveColumnClick (index) {
    this.panel.columns.splice(index, 1)
    this.render()
  }

  onEditorFormatSelect (format, column) {
    column.format = format.value
    this.render()
  }

  onColumnClick (index) {
    this.sorter.toggle(index)
    this.render()
  }

  format (value, index) {
    var column = this.panel.columns[index]
    return kbn.valueFormats[column.format](value, this.panel.decimals, null)
  }

  sortIcon (index) {
    return this.sorter.icon(index)
  }

  exportCSV () {
    fileExport.saveSaveBlob(this.exporter.call(this.rows), 'grafana_data_export')
  }
}

Ctrl.templateUrl = 'module.html'
export { Ctrl as PanelCtrl }
