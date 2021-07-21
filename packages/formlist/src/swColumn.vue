<template>
  <el-table-column
    :prop="getProp(columnEl)"
    :width="getWidth(columnEl)"
    :fixed="getFixed(columnEl)"
    :align="getAlign(columnEl)"
    :type="getType(columnEl)"
    :reserve-selection="true"
  >
    <template v-if="columnEl.checkHeader" slot="header">
      <el-checkbox :disabled="columnEl.headerDisabled" :v-model="colCheckHeader" @change="checkHeaderChange()"></el-checkbox>
    </template>
    <template slot="header">
      <div :style="getColumnEl_l_style(columnEl)">
        <span v-for="(l_s, l_i) in getColumnEl_l_s_t('l', columnEl)" :key="l_i">
          <span v-if="l_s !== '\n'">{{ lValue(l_s) }}</span>
          <br />
        </span>
      </div>
    </template>
    <template v-if="columnEl.s">
      <swcolumns
        v-for="(el, i) in columnEl.s"
        :key="levelIndex * 1000 + i"
        :level-index="intoNextLevel()"
        :header-checked="headerChecked"
        :type="type"
        :column-el="el"
        :column-index="i + columnIndex"
        :prop-set="propSet"
        :tree-props="treeProps"
      ></swcolumns>
    </template>
    <template v-if="!columnEl.s" v-slot="scope">
      <span v-if="columnIndex === 0 && !scope.row[treeProps.children]" :class="`${columnEl.align ? '' : 'noicon-blank'}`"></span>
      <!-- order -->
      <template v-if="columnEl.order">
        <span>{{ scope.$index + 1 }}</span>
      </template>
      <!-- e_n -->
      <template v-else-if="vif__C('e_n', columnEl, scope.row, scope.$index)">
        <span v-if="!propSet.canedit">{{ pValue(columnEl, scope.row, scope.$index) }}</span>
        <el-input
          v-else
          v-model="scope.row[`${columnEl.p}`]"
          size="mini"
          :disabled="!propSet.canedit"
          @change="e_n_valueEdit(columnEl, scope.row[columnEl.p], scope.row, scope.$index)"
          @input="getE_N_Limmit(columnEl, scope.row[columnEl.p], scope.row, scope.$index)"
        >
          <template v-if="columnEl.preStr" slot="prefix"> {{ columnEl.preStr }} </template>
          <template v-if="columnEl.edStr" slot="suffix"> {{ columnEl.edStr }} </template>
        </el-input>
      </template>
      <!-- e_t -->
      <template v-else-if="vif__C('e_t', columnEl, scope.row, scope.$index)">
        <span v-if="!propSet.canedit">{{ pValue(columnEl, scope.row, scope.$index) }}</span>
        <el-input
          v-else
          v-model="scope.row[`${columnEl.p}`]"
          size="mini"
          :disabled="!propSet.canedit"
          @change="e_t_valueEdit(columnEl, scope.row[columnEl.p], scope.row, scope.$index)"
          @input="e_t_valueEdit(columnEl, scope.row[columnEl.p], scope.row, scope.$index)"
        >
          <template v-if="columnEl.preStr" slot="prefix"> {{ columnEl.preStr }} </template>
          <template v-if="columnEl.edStr" slot="suffix"> {{ columnEl.edStr }} </template>
        </el-input>
      </template>
      <!-- e_date -->
      <template v-else-if="vif__C('e_date', columnEl, scope.row, scope.$index)">
        <span v-if="!propSet.canedit">{{ pValue(columnEl, scope.row, scope.$index) }}</span>
        <el-date-picker
          v-else
          v-model="scope.row[`${columnEl.p}`]"
          :type="columnEl.datetype ? columnEl.datetype : 'date'"
          size="mini"
          :style="columnEl.e_style ? columnEl.e_style : { width: '120px' }"
          :value-format="columnEl.valueFormat || ''"
          :format="columnEl.format || ''"
          :disabled="columnEl.disabled ? columnEl.disabled : false"
          placeholder="请选择"
          @change="date_valueChange(scope.row[`${columnEl.p}`], columnEl, scope.row, scope.$index)"
        ></el-date-picker>
      </template>
      <!-- select -->
      <template v-else-if="vif__C('select', columnEl, scope.row, scope.$index)">
        <span v-if="!propSet.canedit">{{ pValue(columnEl, scope.row, scope.$index) }}</span>
        <el-select
          v-else
          v-model="scope.row[`${columnEl.p}`]"
          :type="columnEl.datetype ? columnEl.datetype : 'date'"
          size="mini"
          :style="columnEl.e_style ? columnEl.e_style : { width: '120px' }"
          :disabled="columnEl.disabled ? columnEl.disabled : false"
          placeholder="请选择"
          :filterable="columnEl.filterable ? columnEl.filterable : false"
          :clearable="columnEl.clearable ? columnEl.clearable : false"
          :multiple="columnEl.multiple ? columnEl.multiple : false"
          @focus="e_focus(scope.row[`${columnEl.p}`], columnEl, scope.row, scope.$index)"
          @blur="e_blur(scope.row[`${columnEl.p}`], columnEl, scope.row, scope.$index)"
          @change="date_valueChange(scope.row[`${columnEl.p}`], columnEl, scope.row, scope.$index)"
        >
          <template>
            <el-option
              v-for="(item, i) in getParamForData('options', columnEl, scope.row, scope.$index) || []"
              :key="i"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </template>
        </el-select>
      </template>
      <!-- button -->
      <template v-else-if="vif__C('button', columnEl, scope.row, scope.$index)">
        <el-button
          v-for="(el, i) in getForArr('button', columnEl)"
          v-show="!getHidden(el, scope.row, scope.$index)"
          :key="i"
          :size="el.button_size || 'mini'"
          :style="{ 'margin-right': `${columnEl.gutter ? columnEl.gutter : 0}` + 'px' }"
          :disable="pip_transit('button_disable', el, scope.row, scope.$index) || false"
          :type="pip_transit('button_type', el, scope.row, scope.$index) || 'primary'"
          @click="buttonAction(el, scope.row, scope.$index)"
          >{{ pip_transit('button_t', el, scope.row, scope.$index) || '' }}</el-button
        >
      </template>
      <!-- link -->
      <template v-else-if="vif__C('link', columnEl, scope.row, scope.$index)">
        <el-link
          v-for="(el, i) in getForArr('link', columnEl)"
          :key="i"
          :style="{ 'margin-right': `${columnEl.gutter ? columnEl.gutter : 0}` + 'px' }"
          :disable="pip_transit('link_disable', el, scope.row, scope.$index) || false"
          :type="pip_transit('link_type', el, scope.row, scope.$index) || 'primary'"
          @click="linkAction(el, scope.row, scope.$index)"
          >{{ pip_transit('link_t', el, scope.row, scope.$index) || '' }}</el-link
        >
      </template>
      <!-- trans -->
      <template v-else-if="columnEl.trans">
        <span>{{ getTransText(columnEl, scope.row) }}</span>
      </template>
      <!-- check -->
      <template v-else-if="vif__C('check', columnEl, scope.row, scope.$index)">
        <el-checkbox
          v-model="scope.row[columnEl['checkedp']]"
          :disabled="getDisabled('disabled', columnEl)"
          @change="checkChange('checked', columnEl, scope.row, scope.$index)"
        ></el-checkbox>
      </template>
      <!-- p -->
      <template v-else>
        <span :style="getStyle('style', columnEl, scope.row, scope.$index)">
          <template v-if="isArray(pValue(columnEl, scope.row, scope.$index))">
            <span v-for="(p_s, p_i) in transToArr(pValue(columnEl, scope.row, scope.$index))" :key="p_i">
              <span>{{ p_s }}</span>
              <br />
            </span>
          </template>
          <template v-else>
            <span>{{ pValue(columnEl, scope.row, scope.$index) }}</span>
          </template>
        </span>
      </template>
    </template>
  </el-table-column>
</template>

<script>
import bus from './js/bus'
import { getAlignBy_l } from './js/formlist'
export default {
  name: 'Swcolumns',
  props: {
    columnEl: {
      // ? columnEl为表格配置options中的每个对象值
      type: Object,
      default: () => {
        return {}
      },
    },
    columnIndex: {
      // ? column的下标
      type: Number,
      default: 0,
    },
    treeProps: {
      // ? 树形节点
      type: Object,
      default: () => {
        return {}
      },
    },
    propSet: {
      // ? 递归参数集合
      type: Object,
      default: () => {
        return {}
      },
    },
    type: {
      // ?el-table-column 的type类型 支持‘selection’
      type: String,
      default: '',
    },
    checkHeader: {
      // ? table头部显示全选checkbox
      type: Boolean,
      default: false,
    },
    headerChecked: {
      // ? table头部全选checkbox的选择值
      type: Boolean,
      default: false,
    },

    levelIndex: {
      // ? 递归组件的层级 用于递归组件间传值
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      colCheckHeader: this.headerChecked,
    }
  },
  created() {},
  methods: {
    // todo 传到下一级的时候 层级+1 用于递归组件间传值
    intoNextLevel() {
      return Number(this.levelIndex) + 1
    },
    // todov-if 创建函数 （判断是否满足条件 返回值为'boolean'类型或者'function'）
    vif__C(type, el, row, index) {
      if (el[type] && typeof el[type] === 'boolean') {
        return el[type]
      } else if (el[type] && typeof el[type] === 'object') {
        return el[type]
      } else if (el[type] && typeof el[type] === 'function') {
        return el[type]({ el, row, index })
      } else {
        return false
      }
    },
    getParamForData(type, el, row, index) {
      if (el[type] && typeof el[type] === 'boolean') {
        return el[type]
      } else if (el[type] && typeof el[type] === 'object') {
        return el[type]
      } else if (el[type] && typeof el[type] === 'string') {
        return el[type]
      } else if (el[type] && typeof el[type] === 'function') {
        return el[type]({ el, row, index })
      } else {
        return false
      }
    },
    getE_N_Limmit(el, val, row, index) {
      if (el.point) {
        this.limitInput_PointNumber(el, val, row, index)
      } else {
        this.e_n_valueEdit(el, val, row, index)
      }
    },
    // todo 'e_n'编辑值改变时触发方法
    e_n_valueEdit(el, val, row, index) {
      val = val.replace(/[^\d]/g, '')

      if (!val || val === '' || `${Number(val)}` === 'NaN') {
        row[`${el.p}`] = Number(0)
      } else {
        row[`${el.p}`] = Number(val)
      }
      if (el.eFunc) {
        return el.eFunc({ val, row, index })
      }
      if (el.iFunc) {
        return el.iFunc({ val, row, index })
      }
    },
    // todo'e_t'编辑值改变时触发方法
    e_t_valueEdit(el, val, row, index) {
      if (el.eFunc) {
        return el.eFunc({ val, row, index })
      }
      if (el.iFunc) {
        return el.iFunc({ val, row, index })
      }
    },
    limitInput_PointNumber(el, val, row) {
      // todo 只能输入数字和小数点 （小数点后保留两位）
      if (row[el.p] === '.') {
        row[el.p] = '0.'
      } // 第一位输入的是小数点  则前面补0
      row[el.p] = row[el.p].replace(/[^\d.]/g, '')
      row[el.p] = row[el.p].replace(/\.{2,}/g, '.')
      row[el.p] = row[el.p].replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      var dd = ''
      var n = el.point && el.point !== true ? el.point : 2 // ? 不穿num 默认保留2位小数(num = 2)
      for (let i = 0; i < n; i++) {
        dd = dd + '\\d'
      }
      row[el.p] = row[el.p].replace(new RegExp(`^(\\-)*(\\d+)\\.(${dd}).*$`), '$1$2.$3') // ? 动态配置正则表达式  （根据传入的num：为小数点后保留位）  (\d\d)：小数点后保留两位
      if (row[el.p].indexOf('.') < 0 && row[el.p] !== '') {
        row[el.p] = parseFloat(row[el.p])
      }
    },
    // todo获取数组 当传入el[type]为'boolean'类型时 返回一个元素的数组
    getForArr(type, el) {
      // if ( typeof el[type] !== 'boolean') {
      // }
      if (el[type] && typeof el[type] === 'boolean') {
        return [el]
      } else {
        return el[type]
      }
    },
    // todo获取数组 当传入el[type]为'string'类型时 返回一个元素的数组
    getArrForValue(type, row) {
      if (row[type] && typeof row[type] === 'string') {
        return [row[type]]
        // eslint-disable-next-line valid-typeof
      } else {
        return row[type]
      }
    },
    // todo判断'val'是否为数组
    isArray(val) {
      if (val && typeof val === 'object') {
        return true
      } else {
        return false
      }
    },
    // todo 'val'为'string'类型时 转成数组
    transToArr(val) {
      if (val && typeof val === 'string') {
        return [val]
      } else if (val && typeof val === 'object') {
        return val
      }
    },
    // todo 公共信息处理中转 用于处理传入方法返回值
    pip_transit(type, el, row, index) {
      if (el[type] && typeof el[type] === 'boolean') {
        return el[type]
      } else if (el[type] && typeof el[type] === 'string') {
        return el[type]
      } else if (el[type] && typeof el[type] === 'function') {
        return el[type]({ el, row, index })
      } else {
        return false
      }
    },
    date_valueChange(val, el, row, index) {
      if (val === null) {
        row[el.p] = ''
      }
      if (el.cFunc) {
        return el.cFunc({ val, row, index })
      }
    },
    e_focus(val, el, row, index) {
      if (val === null) {
        row[el.p] = ''
      }
      if (el.eFocus) {
        return el.eFocus({ val, row, index })
      }
    },
    e_blur(val, el, row, index) {
      if (val === null) {
        row[el.p] = ''
      }
      if (el.eBlur) {
        return el.eBlur({ val, row, index })
      }
    },
    // todo 触发名为'noti_bus_link'的公共通讯 传入参数 '{ el, row, index }'
    linkAction(el, row, index) {
      bus.$emit('noti_bus_link', { el, row, index })
    },
    // todo 默认触发button_Func 没有配置则触发名为'noti_bus_button'的公共通讯 传入参数 '{ el, row, index }'
    buttonAction(el, row, index) {
      if (el.button_Func) {
        return el.button_Func({ el, row, index })
      } else {
        bus.$emit('noti_bus_button', { el, row, index })
      }
    },
    getHasChildrenClass() {},
    // todo 处理 p 的返回值（返回 String or Function）
    pValue(el, row, index) {
      if (el.p && typeof el.p === 'string') {
        return row[el.p]
      } else if (el.p && typeof el.p === 'function') {
        return el.p({ el, row, index })
      } else {
        return ''
      }
    },
    lValue(string) {
      return string
    },
    getProp(columnEl) {
      if (columnEl.p && typeof columnEl.p === 'string') {
        return columnEl.p
      } else {
        return ''
      }
    },
    // todo获取数组 当传入el[type]为'string'类型时 返回一个元素的数组
    getColumnEl_l_s_t(type, el) {
      if (el[type] && typeof el[type] === 'string') {
        return [el[type]]
      } else {
        return el[type]
      }
    },
    // todo处理 数据'Int'转文字
    getTransText(el, row) {
      return el.trans_map[row[el.p]]
    },
    // todo列对齐方式 （默认居中）
    getColumnEl_l_style(el) {
      if (el.l_style) {
        return el.l_style
      } else {
        return {}
      }
    },
    // todo 列对齐方式 （默认居中）
    getAlign(el) {
      // if (el.align) { return el.align } else { return el.s ? 'center' : 'left' }
      if (el.align) {
        return el.align
      } else {
        return el.s ? 'center' : getAlignBy_l(el.l)
      }
    },
    // todo 获取hidden 属性 用于按钮显示
    getHidden(el, row, index) {
      if (el.hidden === 'undefined' || el.hidden === null) {
        return false
      } else {
        if (typeof el.hidden === 'boolean') {
          return el.hidden
        } else if (typeof el.hidden === 'function') {
          return el.hidden({ el, row, index })
        }
      }
    },
    // todo 列宽度 默认自适应
    getWidth(el) {
      if (el.width) {
        return el.width
      } else {
        return ''
      }
    },
    // todo外部传入css的style
    getStyle(type, el, row, index) {
      return this.pip_transit(type, el, row, index)
    },
    // todo 外部传入头的type
    getType(el) {
      if (el.type) {
        return el.type
      }
    },
    // todo 是否可操作性 在check下设置 布尔类型 true 或者 false，默认false
    getDisabled(p, el) {
      return el[p]
    },
    // todo 头部checkbox选择变化时
    checkHeaderChange() {
      bus.$emit('noti_bus_checkheader')
    },
    // todo 每一行的checkbox选择变化时
    checkChange(p, columnEl, row, index) {
      bus.$emit('noti_bus_check', { p, row, index })
    },
    // todo 固定悬浮（左右）
    getFixed(el) {
      if (el.fixed) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
<style scoped>
.noicon-blank {
  padding-left: 25px;
}
/* .el-button{
 font-size:12px;
} */
</style>
