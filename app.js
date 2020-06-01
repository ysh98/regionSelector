//app.js
import {region} from './utils/util'
App({
  onLaunch: function () {
    this.globalData.region = region.data
  },
  globalData: {
    region:[]
  }
})