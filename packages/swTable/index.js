// 导入组件，组件必须声明 name
import swTable from './src/swTable.vue'

// 为组件提供 install 安装方法，供按需引入
swTable.install = function (Vue) {
  Vue.component(swTable.name, swTable)
}

// 导出组件
export default swTable
