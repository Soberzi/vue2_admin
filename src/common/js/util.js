/*
export2Excel(columns, list)导出Excel表格
column Array=[{},{}] 表头=[{title:'',key:''}]
list =[]  table的数据 [{},{}]
*/
export function export2Excel (columns, list, name) {
  require.ensure([], () => {
    const { exportexcel } = require('../../excel/Export2Excel.js')
    const tHeader = []
    const filterVal = []
    if (!columns) {
      return
    }
    columns.forEach(item => {
      tHeader.push(item.title)
      filterVal.push(item.key)
    })
    const data = list.map(v => filterVal.map(j => v[j]))
    exportexcel(tHeader, data, name)
  })
}
