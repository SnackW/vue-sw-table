<template>
  <div>
    <el-table
      ref="table"
      v-loading="loading"
      size="mini"
      :row-class-name="tableRowClassName"
      :header-cell-style="tableHeaderStyle"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :data="tableData || listdata"
      :style="tableStyle"
      :height="height"
      border
      :row-key="rowKey"
      :default-expand-all="defaultExpandAll"
      :tree-props="treeProps"
      tooltip-effect="dark"
    >
      <swcolumns
        v-for="(el, i) in options"
        :key="i"
        :header-checked="headerChecked"
        :type="el.type || ''"
        :column-el="el"
        :column-index="i"
        :prop-set="propSet"
        :tree-props="treeProps"
      ></swcolumns>
    </el-table>
  </div>
</template>
<script>
import bus from './js/bus'
import { getTableRowClass } from './js/formlist'
// swColumn 为 递归组件 父子组件用公共通信类 bus.js 通信
import swcolumns from './swColumn'
// ps 为父及递归子组件的所有props值，由此定义并传入
const ps = {
  canedit: true, // 可编辑
  textSet: {}, // 文本集合
}
export default {
  name: 'vue-sw-formlist',
  components: {
    swcolumns,
  },
  props: {
    // 父组件传入的数据源可以用此  ；也可以用 'data'中的 'listdata' 父组件外部调取'refs'赋值
    tableData: {
      type: Array,
      default: () => {
        return null
      },
    },
    rowKey: {
      // 当有树结构 时此值为'rowKey'绑定值，默认为'id'
      type: String,
      default: 'id',
    },
    treeProps: {
      // 树形结构 'children' 为子数组参数名 'hasChildren' 必须手动设置为空值 ''
      type: Object,
      default: () => {
        return { children: '', hasChildren: '' }
      },
    },
    colortips: {
      // 有关颜色乱八七糟的
      type: String,
      default: null,
    },
    options: {
      // 表格格式
      type: Array,
      default: () => {
        return []
      },
    },
    loading: {
      // 加载中
      type: Boolean,
      default: false,
    },
    propSet: {
      // 传递给每列的集合 在此文件上方'ps'中添加
      type: Object,
      default: () => {
        return {
          ...ps,
        }
      },
    },
    defaultExpandAll: {
      // 默认展开所有子节点（有'childData'时）
      type: Boolean,
      default: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    height: [String, Number],
    tableHeaderStyle: {
      // 表格头部的样式（可单独设置）
      type: Object,
      // default: () => { return { 'background-color': '#F5F7FA', 'border-color': 'gray' } }
      default: () => {
        return {}
      },
    },
    tableStyle: {
      // 表格的样式（可单独设置）
      type: Object,
      // default: () => { return { 'border-color': 'gray', 'border-left': '1px solid gray', 'border-right': '1px solid gray', 'border-top': '1px solid gray', 'border-bottom': '1px solid gray', 'width': '100%' } }
      default: () => {
        return {}
      },
    },
    rowStyle: {
      // 每行'row'的样式（可单独设置）
      type: Object,
      default: () => {
        return {}
      },
    },
    cellStyle: {
      // 每个单元格'cell'样式（可单独设置）
      type: Object,
      // default: () => { return { 'border-color': 'gray' } }
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      listdata: [],
      headerChecked: false,
    }
  },
  watch: {
    'tableData.length': {
      handler() {
        this.$nextTick(() => {
          this.$refs.table.doLayout()
        })
      },
    },
    listdata: {
      handler() {
        this.$nextTick(() => {
          this.$refs.table.doLayout()
        })
      },
    },
  },
  mounted() {
    this.bindBusNoti() // 绑定公共通信
  },
  beforeDestroy() {
    // 销毁和递归组件的公共通信
    /* ********************
     * ******需要注意*******
     * ********************
     *
     * 当有多个formlist在同一路由中 其中一个注销通讯后 会导致其他formlist也注销通讯 故此处在销毁时不去注销通讯
     * 在同一路由中如果存在多个formlist 请尽量保持'link_noti'取名不同
     * */
    // bus.$off('noti_bus_link')
  },
  methods: {
    bindBusNoti() {
      // 注册和递归组件的公共通信 (在'mounted'挂载后注册)
      bus.$on('noti_bus_link', ({ el, row, index }) => {
        // link 类型公共通信
        this.$emit(el.link_noti, { el, row, index })
      })
      bus.$on('noti_bus_checkheader', () => {
        // 头部checkbox选择器的公共通信触发方法
        this.headerChecked = !this.headerChecked
        this.listdata.forEach((el, index) => {
          el.checked = !!this.headerChecked
          // if (el[this.treeProps.children]) {
          //   el[this.treeProps.children].forEach((item, i) => {
          //     item.checked = !!this.headerChecked
          //   })
          // }
          this.$set(this.listdata, index, el)
        })
        // this.$emit('noti_check_header')
      })
      bus.$on('noti_bus_check', ({ row }) => {
        // 每列checkbox选择器的公共通信触发方法
        // row.checked = !row.checked
        if (this.listdata && this.listdata.length > 0) {
          this.listdata.forEach((el, i) => {
            if (el[this.rowKey] && el[this.rowKey] === row[this.rowKey]) {
              this.$set(this.listdata, i, row)
            }
          })
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      // 颜色乱八七糟的（改变每个'row'背景颜色）
      return getTableRowClass(row, rowIndex, this.colortips)
    },
  },
}
</script>
<style scope="scss">
.el-table .success-row {
  background: #9ad47a;
}
.el-table .warning-row {
  background: rgb(255, 230, 87);
}
.el-table .danger-row {
  background: rgb(255, 142, 108);
}
/* 解决固定列遮挡滚动条  =>  设置wrapper层级 */
.el-table__fixed-body-wrapper {
  z-index: 2;
}
/* .el-table__fixed-right, .el-table__fixed{
    height: auto !important;
      bottom: 14px !important;

  } */

/* .el-table__fixed-right::before, .el-table__fixed::before {
    content: '';
    left: 0;
    bottom: 0;
    background-color: transparent;
    color: transparent;
    width: 100%;
    height: 0px;
    z-index: 4;
} */

/* .el-table__fixed,
.el-table__fixed-right {
  height: auto !important;
  bottom: 14px !important;
  position: absolute;
  top: 0;
  right: 0;
} */
/* .el-table__fixed-left {
  height: auto !important;
  bottom:16px;
}
.el-table__fixed-true {
  height: auto !important;
  bottom:16px;
}
 */

/* .el-table--border:after,.el-table--group:after,.el-table:before { background-color: black;}
.el-table--border,.el-table--group { border-color: black;}
.el-table td,.el-table th.is-leaf {  border-bottom: 1px solid black;}
.el-table--border th,.el-table--border th.gutter:last-of-type {  border-bottom: 1px solid black;}
.el-table--border td,.el-table--border th { border-right: 1px solid black;} */
</style>
