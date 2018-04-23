// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'common/scss/test.scss';

Vue.config.productionTip = false

/* eslint-disable no-new */
console.log('---')
console.log(App)
console.log('---')
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
})
