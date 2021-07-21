// 导入组件，组件必须声明 name
import formlist from './src/swFormlist.vue'

// 为组件提供 install 安装方法，供按需引入
formlist.install = function (Vue) {
  Vue.component(formlist.name, formlist)
}

// 导出组件
export default formlist
