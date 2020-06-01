// components/pickerRegion/pickerRegion.js
const app = getApp();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isShow: {
            type: Boolean,
            default: true
        },
        regionValues: {
            type: Array,
            default: [0, 0, 0]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        region: [],
        regionValue: [0, 0, 0],
        isShow: true
    },
    observers: {},
    /**
     * 组件的方法列表
     */
    methods: {
        //变更值
        bindChange(e) {
            var regionValue = this.data.regionValue;
            console.log(e)
            if (e.detail.value[0] != this.data.regionValue[0]) {
                regionValue[0] = e.detail.value[0]
                regionValue[1] = 0
                regionValue[2] = 0
                this.setData({
                    regionValue: regionValue
                })
                return
            }
            if (e.detail.value[1] != this.data.regionValue[1]) {
                regionValue[0] = e.detail.value[0]
                regionValue[1] = e.detail.value[1]
                regionValue[2] = 0
                this.setData({
                    regionValue: regionValue
                })
                return
            }
            this.setData({
                regionValue: e.detail.value
            })

        },
        //隐藏弹窗
        hideRegion() {
            this.setData({
                isShow: true
            })
        },
        //计算省市区
        computeArea(region,regionValues,regionValue) {
            if (regionValues[0] != '') {
                region.map((item, index) => {
                    if (regionValues[0] == item.name) {
                        console.log(index)
                        regionValue[0] = index
                    }
                    item.data.map((items, indexs) => {
                        if (regionValues[1] == items.name) {
                            console.log(indexs)
                            regionValue[1] = indexs
                        }
                        items.data.map((itemc, indexc) => {
                            if (regionValues[2] == itemc.name) {
                                console.log(indexc)
                                regionValue[2] = indexc
                            }
                        })
                    })
                })
                console.log(regionValue)
                    this.setData({
                        regionValue: regionValue,
                        
                    },()=>{
                        this.setData({
                            regionValue: regionValue
                        })
                    })
            }
        },
        //取消
        cancel() {
            this.setData({
                isShow: true
            })

        },
        //确认
        confirm() {
            var regionValue = this.data.regionValue;
            var region = this.data.region;
            var regionDetail = {
                regionValue: [region[regionValue[0]], region[regionValue[0]].data[regionValue[1]], region[regionValue[0]].data[regionValue[1]].data[regionValue[2]]],
                isRegion: true
            } // detail对象，提供给事件监听函数
            this.triggerEvent('region', regionDetail)
            this.setData({
                isShow: true
            })

        }
    },
    //初始化
    attached() {
        setTimeout(() => {
            if (app.globalData.region.length !== 0) {
                console.log(app.globalData.region)
                this.setData({
                    region: app.globalData.region
                })
                this.computeArea(app.globalData.region,this.properties.regionValues,this.data.regionValue)
            } else {
                this.setData({
                    region: app.globalData.region
                })
                
            }
        }, 509)


    }

})