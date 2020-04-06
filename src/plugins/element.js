import Vue from 'vue'
import { Button, Message, Form, FormItem, Input  } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.prototype.$message = Message

// 区别：Vue.prototype.注册全局组件更通用
// Vue.use()必须专门为vue设计的组件才可以，内置install方法，如果可以推荐这个
// install内部bind了新的this
