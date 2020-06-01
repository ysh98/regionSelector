//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isRegion:false,
        regionValue: ['', '', ''],
        isShow: true,
  },
    //省市区选择
    showRegion(e) {
      this.setData({
          isShow: false
      })
  },
  regionChange(e) {
    console.log(e)
    var detail = e.detail
    this.setData({
        isRegion: detail.isRegion,
        regionValue: [detail.regionValue[0].name, detail.regionValue[1].name, detail.regionValue[2].name]
    })
},
})
