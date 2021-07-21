<template>
  <div id="app">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column prop="name" label="姓名" width="width">
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="width">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="width">
      </el-table-column>
      <el-table-column prop="tel" label="电话" width="width">
      </el-table-column>

    </el-table>
      <span>--------------------</span>
    <vue-sw-formlist 
    :options="options"
    :table-data="list"
    ></vue-sw-formlist>
   
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data() {
    return {
      options:[
        {l:'序号',order:true,width:70 },
        {l:'姓名',p:'name'},
        {l:'年龄',p:'age',e_n:true},
        {l:'性别',p:'sex'},
        {l:'电话',p:'tel'},
      ],
      list:[
        {name:'甘尼特',age:"14",sex:'男',tel:'13100009999'},
        {name:'甘雨',age:"15",sex:'女',tel:'13877776666'},
        {name:'钟离',age:"22",sex:'男',tel:'13977772222'},
        {name:'尤拉',age:"20",sex:'女',tel:'13099002288'},
        {name:'雷泽',age:"17",sex:'男',tel:'15188776655'},
        {name:'罗莎莉亚',age:"21",sex:'女',tel:'17266554433'},
        {name:'立本',age:"33",sex:'男',tel:'12345678901'},
       

       
      ]
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
