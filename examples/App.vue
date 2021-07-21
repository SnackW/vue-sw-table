<template>
  <div id="app">
    <!-- <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="width"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="width"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="width"> </el-table-column>
      <el-table-column prop="tel" label="电话" width="width"> </el-table-column>
    </el-table> -->
    <span>--------------------</span>
    <vue-sw-formlist :options="options" :table-data="list"></vue-sw-formlist>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      // options: [
      //   { l: '序号', order: true, width: 70 },
      //   { l: '姓名', p: 'name' },
      //   { l: '年龄', p: 'age', e_n: true },
      //   { l: '性别', p: 'sex' },
      //   { l: '电话', p: 'tel' },
      // ],
      options: [
        { l: '序号', order: true, width: 70 },
        { l: '姓名', p: 'name' },
        { l: '年龄', p: 'age', e_n: true, width: 80 },
        { l: '性别', p: 'sex', width: 80 },
        {
          l: '电话',
          p: 'tel',
          width: 120,
          e_t: ({ row, index }) => {
            console.log(row)
            if ([0, 1, 2].includes(index)) {
              return true
            }
          },
        },
        {
          l: '生日',
          p: 'brithday',
          e_date: true,
          datetype: 'date',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          e_style: { width: '150px' },
          width: 180,
        },
        {
          l: '多功能',
          s: [
            {
              l: '超文本',
              link: true,
              link_t: ({ row }) => {
                return row.name
              },
              width: 120,
            },
            {
              l: '按钮',
              button: true,
              hidden: ({ index }) => {
                if ([0, 1, 2, 3, 4, 5, 6].includes(index)) {
                  return false
                } else {
                  return true
                }
              },
              button_t: ({ row }) => {
                return row.name
              },
              button_type: ({ index }) => {
                if ([0, 1, 2].includes(index)) {
                  return 'danger'
                } else {
                  return 'primary'
                }
              },
              button_Func: ({ row, index }) => {
                console.log('点击了' + index + '行：' + row)
              },
            },

            {
              l: '多个',
              s: [
                { l: '多个超文本', link: [{ link_t: 'link1' }, { link_t: 'link3' }, { link_t: 'link3' }], gutter: 20 },
                { l: '多个按钮', button: [{ button_t: 'btn1' }, { button_t: 'btn2' }], gutter: 10 },
              ],
            },
          ],
        },
      ],
      list: [
        { name: '班尼特', age: '14', sex: '男', tel: '13100009999', brithday: '1999-01-03' },
        { name: '甘雨', age: '15', sex: '女', tel: '13877776666', brithday: '1999-01-03' },
        { name: '钟离', age: '22', sex: '男', tel: '13977772222', brithday: '1999-01-03' },
        { name: '尤拉', age: '20', sex: '女', tel: '13099002288', brithday: '1999-01-03' },
        { name: '雷泽', age: '17', sex: '男', tel: '15188776655', brithday: '1999-01-03' },
        { name: '罗莎莉亚', age: '21', sex: '女', tel: '17266554433', brithday: '1999-01-03' },
        { name: '立本', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { name: '心海', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { name: '刻晴', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { name: '岩主', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { name: '神里绫华', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { name: '早柚', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { name: '香菱', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { name: '琴', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { name: '巴巴托斯', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
      ],
    }
  },
  mounted() {
    // this.$refs.formlist.listdata =
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
