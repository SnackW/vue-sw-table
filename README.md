# vue-sw-formlist

>
>
> 注：此组件基于element-ui，对el-table二次封装，需要安装element-ui（2.10.0及以上）
>
>

```
 当前版本支持大部分的表格操作，例如：
 显示文本（p）、
 编辑数字（e_n）、
 编辑文本（e_t）、
 日期选择（e_date）、
 下拉选择（select）、
 多选（check）、
 文本链接（link）、
 按钮（button）
 等...
```

```
 对应详细用法请见下列说明（待补充）
```


## 项目安装
```
npm install vue-sw-formlist
```

## 在main.js中引入并使用
```
import formlist from 'vue-sw-formlist'
```
```
Vue.use(formlist)
```

## 组件用法及用例
### example:
> 在template中需要传入显示options的配置
> 
> 其中tableData为传入的数据源（也可以使用属性listdata来赋值）
> 
>先看看下面两组 options 和 options1 的配置带你简单体验一下

```
template:

<vue-sw-formlist :options="options" :table-data="data"></vue-sw-formlist>



script:

data() {
    return {
      options:[
        {l:'序号',order:true,width:70 },
        {l:'姓名',p:'name'},
        {l:'年龄',p:'age',e_n:true},
        {l:'性别',p:'sex'},
        {l:'电话',p:'tel'},
      ],
      options1: [
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
      ],
      data:[
       { name: '甘尼特', age: '14', sex: '男', tel: '13100009999', brithday: '1999-01-03' },
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
        { name: '巴巴托斯', age: '33', sex: '男', tel: '12345678901', brithday: '1999-01-03' }
      ]
    }
```

options效果如下：

![效果图1](https://github.com/SwMango/vue-sw-formlist/blob/master/public/images/ex1.png?raw=true)

>
options1效果如下：

![效果图2](https://github.com/SwMango/vue-sw-formlist/blob/master/public/images/ex2.png?raw=true)


======================================
### l

> label 显示的列头文本》
>
> l 传入数组时自动换行（数组中每个元素为一行）

`{l:''}`

`{l:['','']}`

### p

> prop 显示的数据源字段 or 回调函数
>
> p 传入数组时自动换行（数组中每个元素为一行）使用于回调中

`{p:''}`

`{p:['','']}`

`{p:({el,row,index})=>{return ''}}`

### order

> 排序 自动+1

`{order:true}`

### s

> 嵌套子列

`{s:[{l:'',p:''},{l:'',p:''}]}`

### e_n

> 只可编辑-数字 文本框
>
> eFunc 编辑时处理函数，返回值为:{val,row,index} --- val：编辑后的值 row：编辑行 index：编辑下标数
>
> --- efunc (放弃焦点回调) 该函数可以处理编辑后的大部分操作 （例如计算当前行合计值）
>
> --- ifunc (实时改变回调) 该函数可以处理编辑后的大部分操作 （例如计算当前行合计值）
>
> --- point:1 (or true) 设置此属性 则可编辑内容为浮点型 保留小数据后为 point 设置的位数（为 true 时默认两位）

`{e_n:true,eFunc:({val,row,index})=>{ console.log(val,row,index) }}`

`{e_n:true,iFunc:({val,row,index})=>{ console.log(val,row,index) }}`

`{e_n:true,point: 2}`

### e_t

> 可编辑-字符串 文本框
>
> eFunc 编辑时处理函数，返回值为:{val,row,index} --- val：编辑后的值 row：编辑行 index：编辑下标数
>
> --- efunc (放弃焦点回调) 该函数可以处理编辑后的大部分操作 （例如输入本文后自动保存）
>
> --- ifunc (放弃焦点回调) 该函数可以处理编辑后的大部分操作 （例如输入本文后自动保存）

`{e_t:true,eFunc:({val,row,index})=>{}}`

`{e_t:true,iFunc:({val,row,index})=>{}}`

### button

> 可触发事件按钮
>
> button :'true' or '[]' (true：只创建一个 button，[]：根据数组内的个数创建对应个数的 button； eg: {button[{ button_t:'',button_noti:'',button_type:''}]})
>
> gutter: 0(默认) 当 button 传入数组时 gutter 表示 button 间隔 px(单位默认'px')
>
> button_t：显示的链接文本'string' or 传入一个有返回值的函数'function'（用于处理不同条件下文本的显示）(返回值：{row,el,index} row：行 el：传入的该列配置 index：下标)
>
> button_noti：父类传入的回调名 用于触发事件的回调 返回值：{ row, el, index } --- row：行子对象 el：列配置 index：下标
>
> button_type：button 的类型 （默认：primary）:primary success warning danger info
>
> button_Func：button 的事件回调 （默认不写的话走：button_noti） 回调参数为 { row,el,index }

`{button:true button_t:'',button_noti:'',button_type:'',button_Func:({ row })=>{}}` 创建一个 button

`{button:[{button_t:'',button_noti:'',button_type:''}],gutter:'10',}` 一列中创建多个 button，gutter 为每个 button 的间隔

`{button:true button_t:({el,row,index})=>{},button_noti:'',button_type:''}` 传入回调（button_t,button_type）的回调

### link

> 可触发事件链接
>
> link :'true' or '[]' (true：只创建一个 link，[]：根据数组内的个数创建对应个数的 link； eg: {link[{ link_t:'',link_noti:'',link_type:''}]})
>
> gutter: 0(默认) 当 link 传入数组时 gutter 表示 link 间隔 px(单位默认'px')
>
> link_t：显示的链接文本'string' or 传入一个有返回值的函数'function'（用于处理不同条件下文本的显示）(返回值：{row,el,index} row：行 el：传入的该列配置 index：下标)
>
> link_noti：父类传入的回调名 用于触发事件的回调 返回值：{ row, el, index } --- row：行子对象 el：列配置 index：下标
>
> link_type：link 的类型 （默认：primary）:primary success warning danger info

`{link:true link_t:'',link_noti:'',link_type:''}` 创建一个 link

`{link:[{link_t:'',link_noti:'',link_type:''}],gutter:'10',}` 一列中创建多个 link，gutter 为每个 link 的间隔

`{link:true link_t:({el,row,index})=>{},link_noti:'',link_type:''}` 传入回调（link_t,link_type）的回调


### check 选择框（多选）

> checkbox 样式 传入对象 默认{}
>
> checkedp 每行传入的 checked 绑定元素
>
> checkHeader:true 为头部是否显示全选框
>
> check:true 为显示每行选择框 可以为函数 ({row})=>{ return true} //其中 row 为每行数据
>
> disabled:true 禁用

`{ l: '', disabled : true, checkedp: 'checked', checkHeader: true, check: true, width: 40, align: 'center' },`

`{ l: '', checkedp: 'checked', checkHeader: true, check: ({ row }) => { return true }, width: 40, align: 'center' },`

### e_date 日期选择器

> valueFormat 值显示格式
>
> format 格式
>
> datetype:date month 默认 date
>
> e_style:{width:120} datepicker 的 style 为对象 默认{width:120}

`{ l: '', e_date : true, valueFormat: 'yyyyMMdd', format: 'yyyyMMdd',e_style: {width:'120px'}},`

### select 选择器

> select:true 选择器
>
> options 格式为 [{name:'',value:''}]
>
> clearable 允许清空
>
> disabled 禁用
>
> multiple 允许多选

`{ l: '', p: '', select: true, options: [], width: 150 , clearable: true, multiple: true,disabled: true }`


### trans 转换文本

> trans_map：传入的对象 根据 ‘p’ 值转换成对应的文本（多用于状态：数字转文本） 下列'p'为 1 时，当前列行显示'aaa'

`{trans:true,trans_map:{'1':'aaa','2':'bbb'}}`

### width 列宽度

> 非必要 默认''

`{width:100}`

### align 文本对齐

> 非必要 默认 left

`{align:'center'}`

### fixed 左右固定悬浮

> 非必要 默认 无悬浮

`{fixed:true}`

### style 传入样式

> css style 样式 传入对象 默认{}

`{style: {'font-size':15+'px'}}`

`{style: ({ row }) => { return {'font-size':row.size+'px'}}}`

## #
>有问题欢迎一起讨论：
>
>QQ:415333856 
>
>wx同号