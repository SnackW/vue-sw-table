<template>
  <div id="app">
    <!-- <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="width"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="width"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="width"> </el-table-column>
      <el-table-column prop="tel" label="电话" width="width"> </el-table-column>
    </el-table> -->
    <span>--------------------</span>
    <vue-sw-table :options="options" :tree-props="{ children: 'subList', hasChidlren: '' }" :table-data="list" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      // options: [
      //   { l: '序号', order: true, width: 70, align: 'center'  },
      //   { l: '姓名', p: 'name' },
      //   { l: '年龄', p: 'age', e_n: true },
      //   { l: '性别', p: 'sex' },
      //   { l: '电话', p: 'tel' },
      // ],
      options: [
        { l: '序号', order: true, width: 70, align: 'center' },
        {
          l: '姓名',
          p: ({ row }) => {
            return row.name
          },
          style: ({ row }) => {
            if (['雷泽'].includes(row.name)) {
              return { color: 'red', 'font-weight': 600, 'font-size': '21px' }
            } else if (['立本'].includes(row.name)) {
              return { color: 'black', 'font-weight': 600, 'font-size': '16px' }
            } else if (['罗莎莉亚'].includes(row.name)) {
              return { color: 'orange', 'font-size': '19px' }
            }
          }
        },
        {
          l: '年龄',
          p: 'age',
          number: ({ row }) => {
            return !row['subList']
          },
          width: 80,
          iFunc: ({ row }) => {
            row.price = row.age * 100
            this.$refs.table.listdata.forEach(el => {
              if (el.subList) {
                var count = 0
                el.subList.forEach(item => {
                  count = count + Number(item.age) || 0
                })
                el.age = count
              }
            })
          }
        },
        {
          l: '123',
          p: ({ row }) => {
            row.price = row.age * 100
            return row.price
          },
          number: false,
          width: 80
        },
        { l: '性别', p: 'sex', width: 80 },
        {
          l: '电话',
          p: 'tel',
          width: 120,
          input: ({ row, index }) => {
            console.log(row)
            return !![0, 1, 2].includes(index)
          }
        },
        {
          l: '生日',
          p: 'brithday',
          date: true,
          datetype: 'date',
          format: 'yyyy-MM-dd',
          valueFormat: 'yyyy-MM-dd',
          e_style: { width: '150px' },
          width: 180
        },
        {
          l: '多功能',
          s: [
            {
              l: '超文本',
              link: true,
              content: ({ row }) => {
                return row.name
              },
              width: 120
            },
            {
              l: '按钮',
              button: true,
              hidden: ({ index }) => {
                return !![0, 1, 2, 3, 4, 5, 6].includes(index)
              },
              content: ({ row }) => {
                return row.name
              },
              type: ({ index }) => {
                return [0, 1, 2].includes(index) ? 'danger' : 'primary'
              },
              func: ({ row, index }) => {
                console.log('点击了' + index + '行：' + row)
              },
              disabled: ({ row, index }) => {
                if (index % 2 === 0) {
                  return true
                } else {
                  return false
                }
              }
            },

            {
              l: '多个',
              s: [
                { l: '多个超文本', link: [{ content: 'link1' }, { content: 'link3' }, { content: 'link3' }], gutter: 20 },
                { l: '多个按钮', button: [{ content: 'btn1' }, { content: 'btn2' }], gutter: 10 }
              ]
            }
          ]
        }
      ],
      list: [
        {
          id: 1,
          name: '班尼特',
          age: '14',
          sex: '男',
          tel: '13100009999',
          brithday: '1999-01-03',
          subList: [
            { id: 1001, name: '刻晴', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
            { id: 1002, name: '岩主', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' }
          ]
        },
        { id: 3, name: '甘雨', age: '15', sex: '女', tel: '13877776666', brithday: '1999-01-03' },
        { id: 4, name: '钟离', age: '22', sex: '男', tel: '13977772222', brithday: '1999-01-03' },
        { id: 5, name: '尤拉', age: '20', sex: '女', tel: '13099002288', brithday: '1999-01-03' },
        { id: 6, name: '雷泽', age: '17', sex: '男', tel: '15188776655', brithday: '1999-01-03' },
        { id: 7, name: '罗莎莉亚', age: '21', sex: '女', tel: '17266554433', brithday: '1999-01-03' },
        { id: 8, name: '立本', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { id: 9, name: '心海', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { id: 10, name: '刻晴', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { id: 11, name: '岩主', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { id: 12, name: '神里绫华', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { id: 13, name: '早柚', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { id: 14, name: '香菱', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { id: 15, name: '琴', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' },
        { id: 16, name: '巴巴托斯', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' }
      ]
    }
  },
  mounted() {
    // todo
  }
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
