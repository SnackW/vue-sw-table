import { Number } from 'core-js'

function accAdd(arg1, arg2) {
  var r1, r2, m, n
  try { r1 = arg1.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m + arg2 * m) / m).toFixed(n)
}

export function getTableRowClass(row, index, type) {
  if (type === 'ch_qclr' && row.qczt && Number(row.qczt) === 1 && !row.xhName) {
    var hj = Number(accAdd(accAdd(row['xqsl'] || 0, row['ysqwpbsl'] || 0), row['kysysl'] || 0))
    if ((Number(row['xqsl'] || 0) === 0) &&
        (Number(row['ysqwpbsl'] || 0) === 0) &&
        (Number(row['kysysl'] || 0) === 0)
    ) {
      return ''
    } else if (hj < Number(row['xqbzsl'] || 0)) {
      return 'warning-row'
    } else if (hj > Number(row['xqbzsl'] || 0)) {
      return 'danger-row'
    } else if (hj === Number(row['xqbzsl'] || 0)) {
      return 'success-row'
    } else {
      return ''
    }
  } else {
    return ''
  }
}

var align_left_arr = [
  '器材名称', '器材代码', '备注', '需求单位', '当前处理单位', '分配单位', '器材型号', '主责单位', '勤务类别/品种', '储存单位', '器材名称及型号', '所属大单位', '接装单位番号', '接装单位详细地址', '经费下拨单位', '经费接收单位', '规格型号', '单位名称', '类别', '调拨单位', '出库单位', '入库单位', '调运年度', '计划年度', '负责单位调运计划编号', '发出站', '接收站', '项目名称', '入库年月日', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
]
export function getAlignBy_l(t) {
  if (t && t.length > 0) {
    if ([...align_left_arr].includes(t)) {
      return 'left'
    } else {
      return 'center'
    }
  }
}

