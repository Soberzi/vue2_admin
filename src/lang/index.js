import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 导入自己的语言包
import chinese from './chinese.js'
import english from './english.js'

Vue.use(VueI18n)

// 准备语言
const messages = {
  // 1.英文
  en: {
    ...english,
    ...enLocale
  },
  // 2.中文
  zh: {
    ...chinese,
    ...zhLocale
  }
}

// 2.通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 选中语言
  messages// 语言环境
})

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})
// 3.导出i18n
export default i18n
