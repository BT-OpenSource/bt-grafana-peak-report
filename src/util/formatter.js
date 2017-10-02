export class Formatter {
  constructor (panel, kbn) {
    this.panel = panel
    this.kbn = kbn
  }

  call (value, index) {
    var column = this.panel.columns[index]
    var formatFunc = this.kbn.valueFormats[column.format]
    return formatFunc(value, this.panel.decimals, null)
  }
}
