import Vue from 'vue'
// need import global.css
import '../assets/css/global.css'
// import fonts and icon
import '../assets/fonts/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';

import { Button, Message, Form, FormItem, Input  } from 'element-ui'
import { Container, Header, Aside, Main } from 'element-ui'
import { Menu, Submenu, MenuItemGroup, MenuItem } from 'element-ui'
import { Breadcrumb, BreadcrumbItem, Card } from 'element-ui'
import { Row, Col } from 'element-ui'
import { Table, TableColumn, Switch, Tree, Select, Option } from 'element-ui'
import { Tooltip, Pagination, Dialog, MessageBox, Tag } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

// 区别：Vue.prototype.注册全局组件更通用
// Vue.use()必须专门为vue设计的组件才可以，内置install方法，如果可以推荐这个
// install内部bind了新的this
