<template>
  <div class="app-content">
    <div class="contentBox">
      <header class="header">
        <img src="@/assets/img/jcdsj_logo.gif" alt="" />
        <div class="title">
          综合分析平台
        </div>
      </header>
      <div class="content">
        <div class="leftContent">
          <div class="leftOne">
            <div class="leftOneTitle">
              <!-- <img src="../assets/img/fltleftbg.png" alt=""> -->
              <span>微服务交易量排名</span>
            </div>
            <div class="leftOneEchart">
              <div class="scrollBox">
                <div class="leftOneEchartScroll" id="microserviceAutoScoll" @mouseover="msvAutoScollMouseover" @mouseout="msvAutoScollMouseout">
                  <div id="msvBoxOne">
                    <label v-for="(item, index) in pagesData.percentage" :key="index">
                      <span style="
                          float: left;
                          display: inline-block;
                          margin-left: 30px;
                        ">{{ item.name }}</span>
                      <span style="
                          float: right;
                          display: inline-block;
                          margin-right: 30px;
                        ">{{ item.count }}</span>
                      <el-progress :percentage="item.proportion"></el-progress>
                    </label>
                  </div>
                  <div id="msvBoxTwo"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="leftTwo">
            <div class="leftTwoTitle">
              <span>统计对比</span>
            </div>
            <div id="leftTwoEcharts" class="leftTwoEchart"></div>
          </div>
          <div class="leftThree">
            <div class="leftThreeEchart">
              <el-tabs type="border-card" v-model="tabPage">
                <el-tab-pane label="事件单" name='0' ref="elTabPaneHeight1">
                  <el-table :data="pagesData.eventData" height="100%" align="center" :row-class-name="tableRowClassName" stripe>
                    <el-table-column prop="date" show-overflow-tooltip label="事件">
                    </el-table-column>
                    <el-table-column prop="name" show-overflow-tooltip label="描述">
                    </el-table-column>
                    <el-table-column prop="date" show-overflow-tooltip label="等级">
                    </el-table-column>
                    <el-table-column prop="name" show-overflow-tooltip label="状态">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="告警中心" name='1' ref="elTabPaneHeight2">
                  <el-table :data="pagesData.eventData" height="100%" :row-class-name="tableRowClassName" show-overflow-tooltip stripe>
                    <el-table-column prop="date" show-overflow-tooltip label="信息">
                    </el-table-column>
                    <el-table-column prop="name" show-overflow-tooltip label="人员">
                    </el-table-column>
                    <el-table-column prop="date" show-overflow-tooltip label="等级">
                    </el-table-column>
                    <el-table-column prop="name" show-overflow-tooltip label="问题">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
        <div class="middleContent">
          <div class="middleOneTitle">
            <div class="middleOneTitleSmall">
              <h3>耗时</h3>
              <span class="middleOneTitleData">{{middleTopInfo.middleTopFirst}} </span><span>/sec</span>
              <div class="middleOneTitleHistory">历史峰值：<span>{{middleTopInfo.middleTopFirstHistory}}</span></div>
            </div>
            <div class="middleOneTitleBig">
              <h3>当日总交易量当前TPS</h3>
              <span class="middleOneTitleData">{{middleTopInfo.middleTopSecond}}</span><span>/TPS</span>
              <div class="middleOneTitleHistory">历史峰值：<span>{{middleTopInfo.middleTopSecondHistory}}</span></div>
            </div>
            <div class="middleOneTitleSmall">
              <h3>失败率</h3>
              <span class="middleOneTitleData">{{middleTopInfo.middleTopThird}}</span><span>%</span>
              <div class="middleOneTitleHistory">历史峰值：<span>{{middleTopInfo.middleTopThirdHistory}}</span></div>
            </div>
            <div class="middleOneTitleBig">
              <h3>总结点数</h3>
              <span class="middleOneTitleData">{{middleTopInfo.middleTopFour}}</span><span>/台</span>
              <div class="middleOneTitleHistory">线节点峰值：<span>{{middleTopInfo.middleTopFourHistory}}</span></div>
            </div>
          </div>
          <div class="middleTwo">
            <span class="middleTwoTitle">{{checkedApplication}}</span>
            <div class="middleTwoEcharts">
              <div @click="show3 = true">应用</div>
            </div>

            <el-collapse-transition>
              <!-- <div v-if="show3"> -->
              <el-dialog title="应用选择" :visible.sync="show3">
                <el-tree ref="tree" :data="dialogData" :props="defaultProps" accordion highlight-current show-checkbox node-key="label" :check-strictly="true" @check-change="handleCheckChange" @node-click="handleNodeClick"></el-tree>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button type="primary" @click="show3 = false">取消</el-button>
              </el-dialog>
              <!-- </div> -->
            </el-collapse-transition>
          </div>
          <div class="middleThree">
            <div class="middleThreeTitle">实时统计</div>
            <div class="middleThreeEchartBox">
              <div class="middleThreeEchartBlock">
                <span>当日预警数量</span>
                <!-- <span>当日预警数量：{{middelBottomInfo.middelBottomOneCount}}</span> -->
                <div class="middleThreeEchart" id="middleThreeEcharts1"></div>

              </div>
              <div class="middleThreeEchartBlock">
                <!-- <span>当日变更数量{{middelBottomInfo.middelBottomTwoCount}}</span> -->
                <span>当日变更数量</span>
                <div class="middleThreeEchart" id="middleThreeEcharts2"></div>

              </div>
              <div class="middleThreeEchartBlock">
                <!-- <span>当日用户数量：{{middelBottomInfo.middelBottomThreeCount}}</span> -->
                <span>当日用户数量</span>
                <div class="middleThreeEchart" id="middleThreeEcharts3"></div>

              </div>
            </div>
          </div>
        </div>
        <div class="rightContent">
          <div class="rightOne">
            <div class="rightOneTitle">
              <!-- <img src="../assets/img/fltrightbg.png" alt=""> -->
              <span>当月发生</span>
            </div>
            <div class="rightOneEchartBox">
              <!-- <div class="rightOneEchart" id="rightOneEchartId"></div> -->
              <el-carousel>
                <el-carousel-item>
                  <div class="rightOneEchart" id="rightOneEchartId"></div>
                </el-carousel-item>
                <el-carousel-item>
                  <div class="rightOneEchart" id="rightOneEchartIdOther"></div>
                </el-carousel-item>
              </el-carousel>
            </div>
            <!-- <div class="rightOneEchart" id="rightOneEchartId"></div> -->
          </div>
          <div class="rightTwo">
            <div class="rightTwoTitle">系统集群性能概览</div>
            <div class="rightTwoEchartsBox">
              <div class="rightTwoEcharts" id="rightTwoEchart1"></div>
              <div class="rightTwoEcharts" id="rightTwoEchart2"></div>
              <div class="rightTwoEcharts" id="rightTwoEchart3"></div>
              <div class="rightTwoEcharts" id="rightTwoEchart4"></div>
            </div>
          </div>
          <div class="rightThree">
            <div class="rightThreeTitle">批量作业执行情况</div>
            <div class="rightThreeEcharts" id="rightThreeEchart">
              <el-table :data="pagesData.eventData" style="width: 100%" height="100%" align="center" :row-class-name="tableRowClassName" stripe>
                <!-- 开始时间 作业名称 结束时间 是否成功 同期环比用时 -->
                <el-table-column prop="date" show-overflow-tooltip label="开始时间">
                </el-table-column>
                <el-table-column prop="name" show-overflow-tooltip label="名称">
                </el-table-column>
                <el-table-column prop="date" show-overflow-tooltip label="结束时间">
                </el-table-column>
                <el-table-column prop="result" show-overflow-tooltip label="结果" width="55">
                </el-table-column>
                <el-table-column prop="date" show-overflow-tooltip label="同期环比用时">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      tabPage: '1', //选项卡绑定的值
      elTabPaneHeight: '100%',
      show3: false,
      nodekeid: null,
      checkedApplication: '',
      middleTopInfo: {
        middleTopFirst: 10,
        middleTopFirstHistory: 20,
        middleTopSecond: 1000,
        middleTopSecondHistory: 1030,
        middleTopThird: 4,
        middleTopThirdHistory: 7,
        middleTopFour: 200,
        middleTopFourHistory: 130
      },

      rightOneBaseData: [
        {
          name: '停机',
          value: 30
        },
        {
          name: '告警',
          value: 30
        },
        {
          name: '重启',
          value: 42
        },
        {
          name: '完成',
          value: 50
        },
        {
          name: '异常',
          value: 34
        }
      ],
      leftThirdBaseData: [
        {
          date: '1998',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          result: '成功'
        },
        {
          date: '2016',
          name: '宋大牛',
          address: '巴塞罗那普陀区诺坎普 1517 弄',
          result: '成功'
        },
        {
          date: '3366',
          name: '张三',
          address: '陕西西安',
          result: '成功'
        },
        {
          date: '4488',
          name: '李四',
          address: '甘肃兰州',
          result: '成功'
        },
        {
          date: '1235',
          name: '王小虎',
          address: '北京朝阳',
          result: '成功'
        },
        {
          date: '5656',
          name: '王华',
          address: '浙江杭州',
          result: '成功'
        },
        {
          date: '3465',
          name: '小明',
          address: '江苏南京',
          result: '成功'
        },
        {
          date: '2016',
          name: '哈哈',
          address: '辽宁大连',
          result: '失败'
        },
        {
          date: '2016',
          name: '嘿嘿',
          address: '四川成都',
          result: '成功'
        },
        {
          date: '7851',
          name: '呵呵',
          address: '232',
          result: '成功'
        },
        {
          date: '1084',
          name: '王小虎',
          address: '35435',
          result: '失败'
        },
        {
          date: '1246',
          name: '嗯嗯',
          address: '123121',
          result: '成功'
        },
        {
          date: '9863',
          name: '呃呃',
          address: '西安高新',
          result: '失败'
        }
      ],
      pagesData: {
        percentage: [
          { name: '微服务1', proportion: 20, count: 123 },
          { name: '微服务2', proportion: 40, count: 143 },
          { name: '微服务3', proportion: 60, count: 163 },
          { name: '微服务4', proportion: 70, count: 323 },
          { name: '微服务5', proportion: 80, count: 523 },
          { name: '微服务6', proportion: 10, count: 23 },
          { name: '微服务4', proportion: 70, count: 323 },
          { name: '微服务5', proportion: 80, count: 523 },
          { name: '微服务6', proportion: 10, count: 23 }
        ],
        eventData: []
      },
      dialogData: [
        {
          label: '上海',
          id: 1,
          children: [
            {
              label: '一级服务',
              id: 2,
              children: [
                {
                  label: '设备1',
                  id: 3
                }
              ]
            }
          ]
        },
        {
          label: '南京',
          id: 4,
          children: [
            {
              label: '南京一级服务',
              id: 5,
              children: [
                {
                  label: '南京设备A',
                  id: 6
                }
              ]
            },
            {
              label: '南京二级服务',
              id: 7,
              children: [
                {
                  label: '南京设备B',
                  id: 8
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      microserviceSscollTime: null,
      statistic: null,
      tabTime: null,
      middelBottomInfo: {
        middelBottomOneCount: null
      }, //中间底部数据
      oleftTwoEcharts: null, //左边第二个 TPS/耗时/失败率 统计echarts折线图
      oMiddleThreeEcharts1: null, //中间底部环形图
      oMiddleThreeEcharts2: null,
      oMiddleThreeEcharts3: null,
      oRightOneEchartId: null, //本月发生  右边第一个雷达图
      oRightOneEchartIdOther: null, //本月发生  右边第一个  雷达图 中的第二个
      oRightTwoEchart1: null, //系统集群性能概览   右边第二个
      oRightTwoEchart2: null, //系统集群性能概览   右边第二个
      oRightTwoEchart3: null, //系统集群性能概览   右边第二个
      oRightTwoEchart4: null, //系统集群性能概览   右边第二个
      option2: {}, //左边第二个 TPS/耗时/失败率 统计echarts折线图
      option5: {}, //中间底部环形图
      option6: {},
      option7: {},
      option3: {}, //本月发生  右边第一个雷达图
      option1: {} //系统集群性能概览   右边第二个
    }
  },
  created() {
    this.pagesData.eventData = this.leftThirdBaseData.slice(2, 6)
  },
  mounted() {
    this.autoScroll()
    // this.tabPageAutoChange()
    this.oleftTwoEcharts = this.$echarts.init(document.getElementById('leftTwoEcharts'))
    this.oMiddleThreeEcharts1 = this.$echarts.init(document.getElementById('middleThreeEcharts1'))
    this.oMiddleThreeEcharts2 = this.$echarts.init(document.getElementById('middleThreeEcharts2'))
    this.oMiddleThreeEcharts3 = this.$echarts.init(document.getElementById('middleThreeEcharts3'))
    this.oRightOneEchartId = this.$echarts.init(document.getElementById('rightOneEchartId'))
    this.oRightOneEchartIdOther = this.$echarts.init(document.getElementById('rightOneEchartIdOther'))
    this.oRightTwoEchart1 = this.$echarts.init(document.getElementById('rightTwoEchart1'))
    this.oRightTwoEchart2 = this.$echarts.init(document.getElementById('rightTwoEchart2'))
    this.oRightTwoEchart3 = this.$echarts.init(document.getElementById('rightTwoEchart3'))
    this.oRightTwoEchart4 = this.$echarts.init(document.getElementById('rightTwoEchart4'))
    this.leftTwoEchartsSet()
    this.middleThreeEchartSet()
    this.oRightOneEchartSet()
    this.oRightTwoEchartSet()
    this.checkedApplication = this.dialogData[0].label
    window.addEventListener('resize', this.setSize, false)
    document.addEventListener('keydown', this.setSize, false)
    this.setSize()
  },
  methods: {
    /**
     * echarts图自适应
     */
    setSize() {
      setTimeout(() => {
        this.oleftTwoEcharts.resize()
        this.oMiddleThreeEcharts1.resize()
        this.oMiddleThreeEcharts2.resize()
        this.oMiddleThreeEcharts3.resize()
        this.oRightOneEchartId.resize()
        this.oRightOneEchartIdOther.resize()
        this.oRightTwoEchart1.resize()
        this.oRightTwoEchart2.resize()
        this.oRightTwoEchart3.resize()
        this.oRightTwoEchart4.resize()
      }, 10)
    },
    /**
     * 微服务交易量排名自动滚动
     */
    autoScroll() {
      var oMsvBoxOne = document.getElementById('msvBoxOne')
      var oMsvBoxTwo = document.getElementById('msvBoxTwo')
      oMsvBoxTwo.innerHTML = oMsvBoxOne.innerHTML
      var microserviceSscollTop = document.getElementById('microserviceAutoScoll')
      this.microserviceSscollTime = setInterval(() => {
        if (oMsvBoxTwo.offsetTop > microserviceSscollTop.scrollTop) {
          microserviceSscollTop.scrollTop++
        } else {
          microserviceSscollTop.scrollTop -= oMsvBoxOne.offsetHeight
        }
      }, 100)
    },
    /**
     * 微服务交易量排名鼠标移入停止滚动
     */
    msvAutoScollMouseover() {
      clearInterval(this.microserviceSscollTime)
    },
    /**
     * 微服务交易量排名鼠标移出开始滚动
     */
    msvAutoScollMouseout() {
      this.autoScroll()
    },
    /**
     * 左边第三个选项卡的tab自动切换
     */
    tabPageAutoChange() {
      this.tabTime = setInterval(() => {
        if (this.tabPage == '0') {
          this.tabPage = '1'
        } else {
          this.tabPage = '0'
        }
      }, 30000)
    },
    /**
     * 统计对比的echarts图  左边第二个
     */
    leftTwoEchartsSet() {
      this.option2 = {
        tooltip: {
          //鼠标指上时的标线
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['TPS', '耗时', '失败率'],
          left: '20px',
          top: '0px',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        grid: {
          x: 35,
          y: 25,
          x2: 8,
          y2: 25
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            },
            data: ['10:23:01', '10:23:02', '10:23:03', '10:23:04', '10:23:05', '10:23:06', '10:23:07', '10:23:08', '10:23:09', '10:23:10', '10:23:11', '10:23:12']
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              },
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }
        ],
        series: [
          {
            name: 'TPS',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(137, 189, 27, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(137, 189, 27, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(137,189,27)'
              }
            },
            data: [20, 35, 34, 45, 52, 41, 49, 64, 24, 52.4, 24, 33]
          },
          {
            name: '耗时',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0, 136, 212, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0, 136, 212, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(0,136,212)'
              }
            },
            data: [97.3, 99.2, 99.3, 100.0, 99.6, 90.6, 80.0, 91.5, 69.8, 67.5, 90.4, 84.9]
          },
          {
            name: '失败率',
            type: 'line',
            smooth: true,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(219, 50, 51, 0.3)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(219, 50, 51, 0)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: 'rgb(219,50,51)'
              }
            },
            data: [84.2, 81.0, 67.5, 62.1, 43.7, 68.5, 51.9, 71.8, 76.7, 67.6, 62.9, 0]
          }
        ]
      }
      //////////////////////交通工具流量 end
      this.oleftTwoEcharts.setOption(this.option2)

      var self = this
      this.statistic = setInterval(() => {
        var time = new Date()
        var num0 = Math.random(100 - 20 + 20) * 100
        var num1 = Math.random(100 - 20 + 20) * 100
        var num2 = Math.random(100 - 20 + 20) * 100
        self.option2.series[0].data.shift()
        self.option2.xAxis[0].data.shift()
        self.option2.series[0].data.push(num0)
        self.option2.series[1].data.push(num1)
        self.option2.series[2].data.push(num2)
        self.option2.xAxis[0].data.push(self.formatterDate(time, 'hh:mm:ss'))

        this.oleftTwoEcharts.setOption(this.option2)
      }, 1000)
    },
    /**
     * 表格实现隔行变色
     */
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'tableFirstRow'
      } else {
        return 'tableSecondRow'
      }
    },
    /**
     * 今日实时统计  中间底部图
     */
    middleThreeEchartSet() {
      //今日实时统计
      var value = 80
      this.option5 = {
        title: {
          //text: `${value}万辆`,
          text: `${value}`,
          subtext: ``,
          left: 'center',
          top: 'center', //top待调整
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular'
          },
          // subtextStyle: {             },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}({d}%)'
          },
          subtextStyle: {
            color: '#fff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'top'
          },
          legend: {
            orient: 'vertical',
            left: '70%', //图例距离左的距离
            y: 'center', //图例上下居中
            data: ['']
          },
          itemGap: -1 //主副标题间距
        },

        series: [
          {
            name: 'pie1',
            type: 'pie',
            clockWise: true,
            radius: ['65%', '70%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: value,
                name: 'completed',
                itemStyle: {
                  normal: {
                    borderWidth: 3,
                    borderColor: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#68eaf9' || '#367bec' // 100% 处的颜色
                        }
                      ]
                    },
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#1d54f7' || '#00cefc' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#68eaf9' || '#367bec' // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: 'gap',
                value: 100 - value,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                  }
                }
              }
            ]
          }
        ]
      }
      var value = 85
      this.option6 = {
        title: {
          //text: `${value}万辆`,
          text: `${value}`,
          subtext: ``,
          left: 'center',
          top: 'center', //top待调整
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular'
          },
          tooltip: {
            formatter: function (params) {
              return '<span style="color: #fff;">当日变更数量：' + value + '</span>'
            }
          },
          subtextStyle: {
            color: '#ff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
          },
          itemGap: -1 //主副标题间距
        },

        series: [
          {
            name: 'pie1',
            type: 'pie',
            clockWise: true,
            radius: ['65%', '70%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: value,
                name: 'completed',
                itemStyle: {
                  normal: {
                    borderWidth: 3,
                    borderColor: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#02df94' || '#25d6bc' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#28d3d0' || '#14dbaa' // 100% 处的颜色
                        }
                      ]
                    },
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#02df94' || '#25d6bc' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#28d3d0' || '#14dbaa' // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: 'gap',
                value: 100 - value,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                  }
                }
              }
            ]
          }
        ]
      }
      var value = 46
      this.option7 = {
        title: {
          //text: `${value}万辆`,
          text: `${value}`,
          subtext: ``,
          left: 'center',
          top: 'center', //top待调整
          textStyle: {
            color: '#fff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular'
          },
          tooltip: {
            formatter: function (params) {
              return '<span style="color: #fff;">当日用户数量：' + value + '</span>'
            }
          },
          subtextStyle: {
            color: '#ff',
            fontSize: 14,
            fontFamily: 'PingFangSC-Regular',
            top: 'center'
          },
          itemGap: -1 //主副标题间距
        },

        series: [
          {
            name: 'pie1',
            type: 'pie',
            clockWise: true,
            radius: ['65%', '70%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: value,
                name: 'completed',
                itemStyle: {
                  normal: {
                    borderWidth: 3,
                    borderColor: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#eb3600' || '#cc9a00' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#d0a00e' || '#d0570e' // 100% 处的颜色
                        }
                      ]
                    },
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#eb3600' || '#cc9a00' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#d0a00e' || '#d0570e' // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: 'gap',
                value: 100 - value,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: 'rgba(0, 0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 0
                  }
                }
              }
            ]
          }
        ]
      }
      //////////////////////今日实时统计 end
      this.oMiddleThreeEcharts1.setOption(this.option5)
      this.oMiddleThreeEcharts2.setOption(this.option6)
      this.oMiddleThreeEcharts3.setOption(this.option7)
      this.middelBottomInfo.middelBottomOneCount = this.option5.series[0].data[0].value
      this.middelBottomInfo.middelBottomTwoCount = this.option6.series[0].data[0].value
      this.middelBottomInfo.middelBottomThreeCount = this.option7.series[0].data[0].value
    },
    /**
     * 本月发生事件
     */
    oRightOneEchartSet() {
      //本月发生事件1
      var color = ['#e9df3d', '#f79c19', '#21fcd6', '#08c8ff', '#df4131']
      var data = this.rightOneBaseData
      var max = data[0].value
      data.forEach(function (d) {
        max = d.value > max ? d.value : max
      })

      var renderData = [
        {
          value: [],
          name: '本月发生TOP5',
          symbol: 'none',
          lineStyle: {
            normal: {
              color: '#ecc03e',
              width: 2
            }
          },
          areaStyle: {
            normal: {
              color: new this.$echarts.graphic.LinearGradient(
                0,
                0,
                1,
                0,
                [
                  {
                    offset: 0,
                    color: 'rgba(203, 158, 24, 0.8)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(190, 96, 20, 0.8)'
                  }
                ],
                false
              )
            }
          }
        }
      ]

      data.forEach(function (d, i) {
        var value = ['', '', '', '', '']
        ;(value[i] = max), (renderData[0].value[i] = d.value)
        renderData.push({
          value: value,
          symbol: 'circle',
          symbolSize: 12,
          lineStyle: {
            normal: {
              color: 'transparent'
            }
          },
          itemStyle: {
            normal: {
              color: color[i]
            }
          }
        })
      })
      var indicator = []

      data.forEach(function (d) {
        indicator.push({
          name: d.name,
          max: max,
          color: '#fff'
        })
      })

      this.option3 = {
        tooltip: {
          show: true,
          trigger: 'item'
        },
        radar: {
          center: ['50%', '50%'], //偏移位置
          radius: '50%',
          // startAngle: 40, // 起始角度
          splitNumber: 4,
          shape: 'circle',
          splitArea: {
            areaStyle: {
              color: 'transparent'
            }
          },
          axisLabel: {
            show: false,
            fontSize: 20,
            color: '#000',
            fontStyle: 'normal',
            fontWeight: 'normal'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.5)'
            }
          },
          indicator: indicator
        },
        series: [
          {
            type: 'radar',
            data: renderData
          }
        ]
      }
      //////////////////////本月发生事件1 end
      this.oRightOneEchartId.setOption(this.option3)
      this.oRightOneEchartIdOther.setOption(this.option3)
    },
    /**
     * 系统集群性能概括
     */
    oRightTwoEchartSet() {
      //  第一个饼状图
      this.option1 = {
        title: {
          subtext: '磁盘使用率',
          subtextStyle: {
            color: '#ffffff'
          },
          right: 20,
          top: -13
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          textStyle: {
            color: '#fff',
            fontSize: '12px'
          }
        },
        legend: {
          orient: 'vertical',
          // left: 5,
          left: 0, //legend相对位置
          bottom: 10,
          // icon:"circle",
          padding: 0,
          itemHeight: 7,
          itemWidth: 9,
          textStyle: {
            color: '#fff',
            fontSize: '10'
          },
          data: ['0~25%', '26%~50%', '51%~75%', '76%~100%']
        },
        series: [
          {
            name: '磁盘使用率',
            type: 'pie',
            radius: ['45%', '80%'],
            center: ['70%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                color: '#ffffff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 210, name: '0~25%', itemStyle: { color: '#99cc99' } },
              { value: 834, name: '26%~50%', itemStyle: { color: '#669999' } },
              { value: 435, name: '51%~75%', itemStyle: { color: '#336699' } },
              { value: 1048, name: '76%~100%', itemStyle: { color: '#CC6600' } }
            ]
          }
        ]
      }
      this.option9 = {
        title: {
          subtext: 'CPU使用率',
          subtextStyle: {
            color: '#ffffff'
          },
          left: 20,
          top: -13
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          textStyle: {
            color: '#fff',
            fontSize: '12px'
          }
        },
        legend: {
          orient: 'vertical',
          // left: 5,
          right: 0, //legend相对位置
          bottom: 10,
          // icon:"circle",
          padding: 0,
          itemHeight: 7,
          itemWidth: 9,
          textStyle: {
            color: '#fff',
            fontSize: '10'
          },
          data: ['0~25%', '26%~50%', '51%~75%', '76%~100%']
        },
        series: [
          {
            name: 'CPU使用率',
            type: 'pie',
            radius: ['45%', '80%'],
            center: ['30%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                color: '#ffffff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1310, name: '0~25%', itemStyle: { color: '#99cc99' } },
              { value: 234, name: '26%~50%', itemStyle: { color: '#669999' } },
              { value: 135, name: '51%~75%', itemStyle: { color: '#336699' } },
              { value: 548, name: '76%~100%', itemStyle: { color: '#CC6600' } }
            ]
          }
        ]
      }
      this.option10 = {
        title: {
          subtext: '内存使用率',
          subtextStyle: {
            color: '#ffffff'
          },
          right: 20,
          top: -13
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          textStyle: {
            color: '#fff',
            fontSize: '12px'
          }
        },
        legend: {
          orient: 'vertical',
          // left: 5,
          left: 0, //legend相对位置
          bottom: 10,
          // icon:"circle",
          padding: 0,
          itemHeight: 7,
          itemWidth: 9,
          textStyle: {
            color: '#fff',
            fontSize: '10'
          },
          data: ['0~25%', '26%~50%', '51%~75%', '76%~100%']
        },
        series: [
          {
            name: '内存使用率',
            type: 'pie',
            radius: ['45%', '80%'],
            center: ['70%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                color: '#ffffff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 210, name: '0~25%', itemStyle: { color: '#99cc99' } },
              { value: 334, name: '26%~50%', itemStyle: { color: '#669999' } },
              { value: 1135, name: '51%~75%', itemStyle: { color: '#336699' } },
              { value: 548, name: '76%~100%', itemStyle: { color: '#CC6600' } }
            ]
          }
        ]
      }
      this.option11 = {
        title: {
          subtext: 'IO使用率',
          subtextStyle: {
            color: '#ffffff'
          },
          left: 20,
          top: -13
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          textStyle: {
            color: '#fff',
            fontSize: '12px'
          }
        },
        legend: {
          orient: 'vertical',
          // left: 5,
          right: 0, //legend相对位置
          bottom: 10,
          // icon:"circle",
          padding: 0,
          itemHeight: 7,
          itemWidth: 9,
          textStyle: {
            color: '#fff',
            fontSize: '10'
          },
          data: ['0~25%', '26%~50%', '51%~75%', '76%~100%']
        },
        series: [
          {
            name: 'IO使用率',
            type: 'pie',
            radius: ['45%', '80%'],
            center: ['30%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '10',
                color: '#ffffff',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 310, name: '0~25%', itemStyle: { color: '#99cc99' } },
              { value: 234, name: '26%~50%', itemStyle: { color: '#669999' } },
              { value: 135, name: '51%~75%', itemStyle: { color: '#336699' } },
              { value: 1548, name: '76%~100%', itemStyle: { color: '#CC6600' } }
            ]
          }
        ]
      }
      this.oRightTwoEchart1.setOption(this.option1)
      this.oRightTwoEchart2.setOption(this.option9)
      this.oRightTwoEchart3.setOption(this.option10)
      this.oRightTwoEchart4.setOption(this.option11)
    },
    /**
     * 监听应用级联选择
     */
    handleNodeClick(data) {
      // console.log(data);
      // console.log(this.$refs.tree.getCheckedKeys())
    },
    handleCheckChange(data, checked, node) {
      if (checked == true) {
        this.checkedId = data.label
        this.$refs.tree.setCheckedNodes([data])
      }
      this.checkedApplication = data.label
      // console.log(data,checked)
      // console.log(this.$refs.tree.getCheckedKeys())
    },
    /**
     * 随机生成数组中的值
     */
    randomNumberParam() {
      //左边第一个图标
      var self = this
      var percentage = []
      this.pagesData.percentage.forEach((item, index) => {
        var percentageObj = {}
        percentageObj.count = Math.ceil(Math.random() * 500 + 500)
        percentageObj.proportion = Math.ceil(Math.random() * 30 + 60)
        percentageObj.name = item.name
        percentage.push(percentageObj)
      })
      this.pagesData.percentage = percentage
      //左边第一个图标   end
      //左边第三个 start
      self.pagesData.eventData = []
      for (var i = 0; i < 6; i++) {
        self.pagesData.eventData.push(self.leftThirdBaseData[Math.ceil(Math.random() * 12)])
      }
      //左边第三个图标   end
      //中间第一个 start
      this.middleTopFirst = this.randomData(800, 1000)
      this.middleTopSecond = this.randomData(1000, 1500)
      this.middleTopThird = this.randomData(0, 20)
      this.middleTopFour = this.randomData(0, 1000)
      //中间第一个 end
      //中间底部start
      this.option5.series[0].data[0].value = this.randomData(0, 100)
      this.option6.series[0].data[0].value = this.randomData(0, 100)
      this.option6.series[0].data[0].value = this.randomData(0, 100)
      this.oMiddleThreeEcharts1.setOption(this.option5)
      this.oMiddleThreeEcharts2.setOption(this.option6)
      this.oMiddleThreeEcharts3.setOption(this.option7)
      //中间底部end
      //右边第一个 start
      this.rightOneBaseData.forEach((item, index) => {
        item.value = self.randomData(30, 60)
      })
      this.oRightOneEchartSet()
    },
    formatterDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
        }
      }
      return fmt
    },
    onSubmit() {
      this.randomNumberParam()
      this.show3 = false
    },
    randomData(min, max) {
      return Math.ceil(Math.random() * (max - min) + min)
    }
  },
  beforeDestroy() {
    clearInterval(this.microserviceSscollTime, this.statistic, this.tabTime)
    this.microserviceSscollTime = null
    this.statistic = null
    this.tabTime = null
  },
  destroyed() {
    window.removeEventListener('resize', this.setSize)
  }
}
</script>

<style scoped lang="scss">
.app-content {
  // background-image: url('../assets/img/data08.png');
  background-color: #061436;
  background-size: 100%;
  width: 100vw;
  height: 100vh;
  color: #fff;
  min-width: 1536px;
  min-height: 750px;
  overflow: auto;
  .contentBox {
    width: 100%;
    height: 100%;
    padding: 15px;
    overflow: hidden;
    box-sizing: border-box;
    .header {
      width: 100%;
      position: relative;

      img {
        width: 90%;
        margin: 0 auto;
        display: block;
      }
      .title {
        width: 30%;
        height: 31px;
        font-size: 30px;
        background: #07243f;
        color: #e1f7fb;
        text-align: center;
        position: absolute;
        left: 34%;
        top: 0;
      }
    }
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: left;
      overflow: hidden;
      .leftContent {
        width: 24%;
        text-align: center;
        margin-top: 5px;
        .leftOne {
          height: 30%;
          width: 100%;
          border: 1px solid #00d8ff;
          background-color: rgba(0, 168, 255, 0.2);
          .leftOneTitle {
            width: 100%;
            height: 80px;
            // background-image: url('../assets/img/fltleftbg.png');
            background-repeat: no-repeat;
            background-size: contain;
            overflow: hidden;
            position: relative;
            span {
              position: absolute;
              top: 15px;
              right: 25px;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          .leftOneEchart {
            height: calc(100% - 80px);
            width: 100%;
            position: relative;
            .scrollBox {
              overflow: hidden;
              width: 90%;
              margin: 0 auto;
            }
            .leftOneEchartScroll {
              height: 100%;
              width: 90%;
              overflow: auto;
              // margin-bottom: 20px;
              margin-top: -17px;
              position: absolute;
            }
            label {
              width: 90%;
            }
            label::after {
              content: '';
              width: 90%;
              height: 0px;
              margin: 5px auto;
              border-bottom: 2px solid #061436;
              display: block;
            }
            /deep/ .el-progress {
              margin: 0 auto;
              /deep/ .el-progress__text {
                display: none !important;
              }
              /deep/ .el-progress-bar {
                padding: 0;
                margin: 0 auto;
              }
              /deep/ .el-progress-bar__outer {
                height: 6px;
                border-radius: 100px;
                background-color: #3e506f;
              }
              /deep/ .el-progress-bar__inner {
                height: 6px;
                border-radius: 100px;
                background-color: #00a8ff;
              }
            }
          }
          /deep/ .leftOneEchartScroll::-webkit-scrollbar {
            display: none;
          }
        }
        .leftTwo {
          height: 30%;
          width: 100%;
          margin-top: 10px;
          background-color: rgba(0, 168, 255, 0.2);
          .leftTwoTitle {
            height: 24px;
            text-align: right;
            padding: 10px 20px 0 0;
          }
          .leftTwoEchart {
            // height: 200px;
            height: calc(100% - 32px);
            width: 100%;
          }
        }
        .leftThree {
          height: 30%;
          width: 100%;
          margin-top: 10px;
          background-color: rgba(0, 168, 255, 0.2);
          .leftThreeEchart {
            height: 100%;
            width: 100%;
            /deep/ .el-table {
              height: 100%;
              width: 100%;
              background-color: transparent;
              overflow: auto;
              /deep/ .el-table__body {
                width: 100% !important;
              }
              // overflow: auto;
              /deep/ tr {
                background-color: transparent;
                color: #fff;
              }
              td {
                // border-bottom: 1px solid #106EA6
                border-bottom: none;
              }
              th {
                background-color: transparent;
                font-weight: 400;
                background-color: #295071 !important;
                padding: 8px 0;
                width: 100%;
              }
              /deep/ .gutter {
                display: table-cell !important;
              }
              /deep/ colgroup.gutter {
                display: table-cell !important;
              }
              /deep/ .el-table__body-wrapper::-webkit-scrollbar {
                display: none;
              }
              /deep/ .el-table__body::-webkit-scrollbar {
                display: none;
              }
              /deep/ .tableFirstRow td {
                background-color: #295071 !important;
              }
              /deep/ .tableSecondRow td {
                background-color: transparent !important;
              }
              /deep/ th.is-leaf {
                border-bottom: none;
              }
            }
            /deep/ .el-table::before {
              display: none;
            }
            /deep/ .el-tabl::-webkit-scrollbar {
              display: none;
            }
            /deep/ .el-tabs--border-card {
              background: transparent;
              border: none;
              height: 100%;
            }
            /deep/ .el-tabs--border-card > .el-tabs__header {
              background: transparent;
              border-bottom: 2px solid #061436;
              color: #fff;
              height: 41px;
            }
            /deep/ .el-tabs__header .el-tabs__item {
              color: #fff;
            }
            /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
              background: #295071;
              border: none;
              color: #00a8ff;
            }
            /deep/ .el-tabs--border-card > .el-tabs__content {
              height: calc(100% - 57px);
              padding-bottom: 0;
              overflow: hidden;
            }
            /deep/ .el-tab-pane {
              height: 100%;
            }
            /deep/ .el-table::-webkit-scrollbar {
              display: none;
            }
          }
        }
      }
      .middleContent {
        width: 50%;
        text-align: center;
        padding: 25px 20px 0 20px;
        .middleOneTitle {
          width: 100%;
          height: 15%;
          display: flex;
          justify-content: space-between;
          h3 {
            font-size: 16px;
            font-weight: 500;
          }
          .middleOneTitleData {
            color: #20dbfd;
            display: inline-block;
            text-shadow: 0 0 25px #00d8ff;
            border-radius: 4px;
            white-space: nowrap;
            // width: 50%;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 24px;
          }
          .middleOneTitleHistory {
            margin-top: 5px;
            font-size: 18px;
            span {
              color: #20dbfd;
              display: inline-block;
              text-shadow: 0 0 25px #00d8ff;
              border-radius: 4px;
            }
          }
          .middleOneTitleSmall {
            width: 20%;
            background-color: rgba($color: #fff, $alpha: 0.2);
            // background-image: url('../assets/img/ksh40.png');
            // background-size: 100% 100%;
          }
          .middleOneTitleBig {
            width: 28%;
            // background-image: url('../assets/img/ksh39.png');
            background-color: rgba($color: #fff, $alpha: 0.2);
            background-size: 100% 100%;
          }
        }
        .middleTwo {
          width: 100%;
          height: 55%;
          border: 1px solid #00d8ff;

          margin-top: 14px;
          .middleTwoTitle {
            display: inline-block;
            height: 36px;
            line-height: 36px;
            width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
            text-align: left;
          }
          .middleTwoEcharts {
            display: flex;
            align-items: center;
            justify-content: center;
            height: calc(100% - 36px);
            width: 100%;
          }
        }
        .middleThree {
          width: 100%;
          height: 17%;
          margin-top: 20px;
          background: #10365780;
          border: 1px solid #345f92;
          padding-bottom: 10px;
          box-sizing: border-box;
          .middleThreeTitle {
            height: 24px;
            line-height: 24px;
            text-align: left;
            padding-left: 20px;
          }
          .middleThreeEchartBox {
            display: flex;
            justify-content: space-around;
            height: calc(100% - 24px);
            width: 100%;
            .middleThreeEchartBlock {
              width: 30%;
              height: 100%;
              .middleThreeEchart {
                width: 100%;
                height: 85%;
              }
            }
          }
        }
      }
      .rightContent {
        width: 25%;
        text-align: center;
        height: 100%;
        margin-top: 5px;
        .rightOne {
          height: 30%;
          width: 100%;
          overflow: hidden;
          position: relative;
          border: 1px solid #00d8ff;
          background-color: rgba(0, 168, 255, 0.2);

          .rightOneTitle {
            height: 80px;
            // background-image: url(../assets/img/fltrightbg.png);
            background-repeat: no-repeat;
            background-size: contain;

            overflow: hidden;
            position: relative;
            span {
              position: absolute;
              top: 15px;
              left: 25px;
            }
            img {
              width: 100%;
              height: 100%;
            }
          }
          .rightOneEchartBox {
            width: 100%;
            height: calc(100% - 80px);
            box-sizing: border-box;
            // margin-top: -17px;
            // position: absolute !important;
            // top: 41px;
            overflow: hidden;
            /deep/ .el-carousel {
              position: absolute;
              top: 0px;
              width: 100%;
              height: 100%;
            }
            /deep/ .el-carousel--horizontal {
              overflow-x: clip !important;
              overflow: hidden;
            }
          }

          .rightOneEchart {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            position: absolute !important;
            // top: 41px;
          }
        }
        .rightTwo {
          height: 30%;
          width: 100%;
          margin-top: 10px;
          background-color: rgba(0, 168, 255, 0.2);
          .rightTwoTitle {
            height: 36px;
            line-height: 36px;
            padding: 0 20px;
            text-align: left;
            box-sizing: border-box;
            width: 100%;
          }
          .rightTwoEchartsBox {
            height: calc(100% - 36px);
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }
          .rightTwoEcharts {
            height: 47%;
            width: 47%;
          }
        }
        .rightThree {
          height: 30%;
          width: 100%;
          margin-top: 10px;
          background-color: rgba(0, 168, 255, 0.2);
          .rightThreeTitle {
            height: 32px;
            line-height: 32px;
            padding: 0 20px;
            text-align: left;
            width: 100%;
            box-sizing: border-box;
          }
          .rightThreeEcharts {
            height: calc(100% - 32px);
            width: 100%;
            /deep/ .el-table {
              flex: none;
              height: 100%;
              background-color: transparent;
              /deep/ .el-table__body {
                width: 100% !important;
              }
              // overflow: auto;
              /deep/ tr {
                background-color: transparent;
                color: #fff;
              }
              td {
                // border-bottom: 1px solid #106EA6
                border-bottom: none;
              }
              th {
                background-color: transparent;
                font-weight: 400;
                background-color: #295071 !important;
                padding: 8px 0;
                width: 100%;
              }
              // /deep/ .gutter {
              //   display: table-cell !important;
              // }
              // /deep/ colgroup.gutter {
              //   display: table-cell !important;
              // }
              /deep/ .el-table__body-wrapper::-webkit-scrollbar {
                display: none;
              }
              /deep/ .el-table__body::-webkit-scrollbar {
                display: none;
              }
              /deep/ .tableFirstRow td {
                background-color: #295071 !important;
              }
              /deep/ .tableSecondRow td {
                background-color: transparent !important;
              }
              /deep/ th.is-leaf {
                border-bottom: none;
              }
            }
            /deep/ .el-table::before {
              display: none;
            }
            /deep/ .el-tabl::-webkit-scrollbar {
              display: none;
            }
          }
        }
      }
    }
  }
  /deep/ .el-dialog {
    background: #061436;
    color: #fff;
    /deep/ .el-tree {
      background: #061436;
      color: #fff;
    }
    /deep/ .el-dialog__title {
      color: #fff;
    }
    /deep/ .el-button--primary {
      background-color: #05325e !important;
    }
  }
  /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: #05325e !important;
    color: #20dbfd;
  }
  /deep/ .el-tree-node__content:hover {
    background: #05325e;
  }
}
</style>
