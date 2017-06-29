import 'whatwg-fetch';
import React, { Component } from 'react';
import { Button, Dropdown, Menu, Select, Table, Tabs } from 'antd';
import SymbolList from './SymbolList';
import fecha from 'fecha';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/candlestick';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/lines';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/component/legend';
import ReactEchartsCore from 'echarts-for-react/lib/core';

import { getAccountDetails, getHistoryOrder, getOpenOrder, getPrice, getQuotesHistory, getServerInfo, getSymbolGroup  } from '../api';

import '../style/App.less';

const Option = Select.Option;

const TabPane = Tabs.TabPane;

const CHART_CONTAINER_STYLE = { position: 'relative', marginLeft: '358px', height: '100%', zIndex: 1};
const CHART_CONTAINER_STYLE_FULL_SCREEN = {position: 'fixed', top: '0', left: '0', marginLeft: '0', width: '100%', height: '100%', zIndex: 1049};


class App extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            account: {
                "balance": 10675.3,
                "credit": 0,
                "currency": "USD",
                "name_base64": "VGVzdCBBY2NvdW50",
                "name": "Test Account"
            },
            orders: [],
            historyOrders: [],
            serverInfo: {},
            symbols: [
                {
                    "name": "EURUSDbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "RXVybyB2cyBVUyBEb2xsYXIgLSDFt9SqttLDwNSq",
                    "digits": 5,
                    "time": 1497902685,
                    "price": 1.11523,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "EURJPYbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "RXVybyB2cyBKYXBhbmlzZSBZZW4gLSDFt9SqttLI1dSq",
                    "digits": 3,
                    "time": 1497902687,
                    "price": 124.363,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "USDJPYbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "VVMgRG9sbGFyIHZzIEphcGFuaXNlIFllbiAtIMPA1Kq20sjV1Ko=",
                    "digits": 3,
                    "time": 1497902687,
                    "price": 111.513,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "GBPUSDbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "R3JlYXQgQnJpdGFuIFBvdW5kIHZzIFVTIERvbGxhciAtINOisPe20sPA1Ko=",
                    "digits": 5,
                    "time": 1497902681,
                    "price": 1.27297,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "EURCHFbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "RXVybyB2cyBTd2lzcyBGcmFuYyAtIMW31Kq21Mjwyr+3qMDJ",
                    "digits": 5,
                    "time": 1497902674,
                    "price": 1.08773,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "USDCHFbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "VVMgRG9sbGFyIHZzIFN3aXNzIEZyYW5jIC0gw8DUqrbSyPDKv7eowMk=",
                    "digits": 5,
                    "time": 1497902690,
                    "price": 0.97533,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "AUDUSDbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "QXVzdHJhbGlhbiBEb2xsYXIgdnMgVVMgRG9sbGFyIC0gsMTUqrbSw8DUqg==",
                    "digits": 5,
                    "time": 1497902689,
                    "price": 0.7596,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "EURCADbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "RXVybyB2cyBBdXN0cmFsaWFuIERvbGxhciAtIMW31Kq20rzT1Ko=",
                    "digits": 5,
                    "time": 1497902691,
                    "price": 1.4743,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "USDCADbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "VVMgRG9sbGFyIHZzIENhbmFkaWFuIERvbGxhciAtIMPA1Kq20rzT1Ko=",
                    "digits": 5,
                    "time": 1497902682,
                    "price": 1.32199,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "GBPJPYbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "R3JlYXQgQnJpdGFpbiBQb3VuZCB2cyBKYXBhbmlzZSBZZW4gLSDTorD3ttLI1dSq",
                    "digits": 3,
                    "time": 1497902688,
                    "price": 141.948,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "EURGBPbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "RXVybyB2cyBHcmVhdCBCcml0YW4gUG91bmQgLSDFt9SqttLTorD3",
                    "digits": 5,
                    "time": 1497902690,
                    "price": 0.87609,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "NZDUSDbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "TmV3IFplYWxhbmQgRG9sbGFyIHZzIFVTIERvbGxhciAtIMWm1Kq20sPA1Ko=",
                    "digits": 5,
                    "time": 1497902685,
                    "price": 0.72303,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                },
                {
                    "name": "GBPCHFbo",
                    "loss": 100,
                    "type": [
                        1,
                        -1
                    ],
                    "expiration": "1-80,5-81,15-82,30-83,60-84,240-85,1440-86,",
                    "description": "R3JlYXQgQnJpdGFuIFBvdW5kIHZzIFN3aXNzIEZyYW5jIC0g06Kw97bSyPDKv7eowMk=",
                    "digits": 5,
                    "time": 1497902690,
                    "price": 1.24154,
                    "minimum": 500,
                    "maximum": 100000,
                    "step": 500
                }
            ],
            chartOptions: {
                backgroundColor: '#404141',
                grid: [{
                    top: '10px',
                    left: '10px',
                    bottom: '30px',
                    right: '50px'
                }],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false,
                        type: 'cross',
                        lineStyle: {
                            color: '#376df4',
                            width: 2,
                            opacity: 1
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: '#8392A5'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            align: 'center'
                        },
                        inside: false,
                        showMaxLabel: true
                    },
                    splitLine: {
                        show: true
                    }
                },
                yAxis: {
                    position: 'right',
                    scale: true,
                    axisLine: { lineStyle: { color: '#8392A5' } },
                    splitLine: { show: false },
                    textStyle: {
                        color: '#65f1f1'
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        inside: false
                    },
                    splitLine: {
                        show: true
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 50,
                    end: 100
                }],
                animation: false,
                series: [
                    {
                        type: 'candlestick',
                        name: '日K',
                        data: [],
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        }
                    }
                ]
            },
            loadingOpts: {},
            showLoading: true,
            showChart: false,
            fullScreen: false,
            chartContainerStyle: CHART_CONTAINER_STYLE,
            favorite1: [],
            favorite2: [],
            favorite3: [],
            symbol: 'GBPUSDbo',
            period: 1,
            isLoading: false,
            timeDiff: 0,
            historySpan: 1,// 1 一天， 30 一月， -1 所有
            symbolList: {

            },
            symbolNames: ''
        };
        this.onChartEvents = {
            dataZoom: this.onDataZoom.bind(this)
        };
        this.dataZoom = {
            type: 'inside',
            start: 50,
            end: 100
        };
        this.getServerInfo();
        this.getAccountInfo();
        this.getSymbolGroup(() => {
            let getPricesFunc = this.getPrices.bind(this);
            this.getPriceTimer = window.setInterval(getPricesFunc, 1000);
        });
    }

    componentDidMount (){
        setTimeout(() => {
            if (this.echarts) {
                this.echarts.resize();
            }
        }, 300);
        this.getHistoryOrders();
        this.getLatestQuotes();
        this.timer = window.setInterval(() => {
            this.getLatestQuotes();
        }, 3000);
    }

    componentWillUnmount () {
        window.clearInterval(this.timer);
        window.clearInterval(this.getPriceTimer);
    }

    /**
     * 格式化日期
     * @param timestamp
     */
    formatDateTime (timestamp) {
        let v = '';
        if (timestamp) {
            v = fecha.format(new Date(timestamp * 1000 + this.state.timeDiff), 'YYYY/MM/dd HH:mm:ss');
        }
        return v;
    }

    getAccountInfo() {
        let params = {};
        let promise = getAccountDetails(params);
        promise.then((res) => {
            if (res.code === 0) {
                this.setState({
                    account: res.data
                });
            }
        });
    }

    getHistoryOrders (params) {
        params = params || {
                from: 1478033917,
                to: 2068713600
            };
        let promise = getHistoryOrder(params);
        promise.then((res) => {
            if (res && res.code === 0) {
                let orders = res.data.orders;
                this.setState({
                    historyOrders: orders
                });
            }
        });
    }

    getOpenOrders () {
        let params = {};
    }

    getSymbolGroup (callback) {
        let params = {};
        let promise = getSymbolGroup(params);
        promise.then((res) => {
            if (res && res.code === 0) {
                let symbols = res.data.symbols;
                let symbolList = {};
                symbols.map((symbol) => {
                    let name = symbol.name;
                    symbolList[name] = {
                        name: name,
                        price: symbol.price,
                        direction: 0
                    };
                });
                let symbolNames= Object.keys(symbolList).join(',');
                this.setState({
                    symbols,
                    symbolList,
                    symbolNames
                });
                if (typeof callback === 'function') {
                    callback();
                }
            }
        });
    }

    getPrices () {
        let params = {
            symbols: this.state.symbolNames
        };
        let promise = getPrice(params);
        promise.then((res) => {
           if (res && res.code === 0) {
               let prices = res.data.quotes;
               let symbolList = this.state.symbolList;
               prices.map((item) => {
                   let name = Object.keys(item)[0];
                   let obj = symbolList[name];
                   let price = item[name];
                   if (obj.price === price) {
                       obj.direction = 0;
                   } else if (obj.price > price) {
                       obj.direction = -1;
                   } else {
                       obj.direction = 1;
                   }
                   obj.price = price;
                   symbolList[name] = Object.assign({}, obj);
               });
               this.setState({
                   symbolList
               });
           }

        });
    }

    getServerInfo () {
        let params = {};
        let promise = getServerInfo(params);
        promise.then((res) => {
            if (res.code === 0) {
                let data = res.data;
                let time = data.server_time;
                let timeDiff = (new Date()).getTime() - time * 1000;
                this.setState({
                    serverInfo: data,
                    timeDiff: timeDiff
                });
            }
        });
    }

    getLatestQuotes (callback) {
        let params = {
            symbol: this.state.symbol,
            period: this.state.period
        }
        let promise = getQuotesHistory(params);
        promise.then((res) => {
            if (res.code === 0) {
                let quotes = res.data.quotes;
                let data = [];
                let times = [];
                quotes.forEach((quote) => {
                    let timeStr = fecha.format(new Date(quote.t * 1000 + this.state.timeDiff), 'HH:mm');
                    times.push(timeStr);
                    let o = quote.o / 100;
                    let h = (quote.o + quote.h) / 100;
                    let l = (quote.o + quote.l) / 100;
                    let c = (quote.o + quote.c) / 100;
                    let item = [o, c, l, h];
                    data.push(item);
                });
                let chartOptions = this.state.chartOptions;
                chartOptions.xAxis.data = times;
                chartOptions.series[0].data = data;
                chartOptions.dataZoom=[this.dataZoom];
                this.setState({
                    chartOptions
                });
            }
            if (typeof callback === 'function') {
                callback();
            }
        });

    }

    getTypeName (type) {
        let v = '';
        if (type) {
            switch (type) {
                case -1:
                    v = 'DOWN';
                    break;
                case 1:
                    v = 'UP';
                    break;
                default:
                    v = '';
                    break;
            }
        }
        return v;
    }

    onChartReady () {
        console.log('Chart ready!')
    }

    onDataZoom (dataZoom) {
        this.dataZoom.start = dataZoom.batch[0].start;
        this.dataZoom.end = dataZoom.batch[0].end;
    }

    onCreateOrder (symbol) {

    }

    onCreateUpOrder (symbol) {

    }

    onCreateDownOrder (symbol) {

    }

    onFavoriteClick (symbol, key) {
        let stateName = `favorite${key}`;
        let favorite = this.state[stateName];
        let name = symbol.name;
        let index = favorite.indexOf(name);
        if (index > -1) {
            favorite.splice(index, 1);
        } else {
            favorite.push(name);
        }
        this.setState({
            [stateName]: favorite
        });
    }

    onFullScreen () {
        let fullScreen = !this.state.fullScreen;
        let chartContainerStyle = fullScreen ? CHART_CONTAINER_STYLE_FULL_SCREEN: CHART_CONTAINER_STYLE;

        this.setState({
            chartContainerStyle,
            fullScreen
        })
    }

    onSymbolSelect (value, option) {
        this.setState({
            symbol: value,
            isLoading: true
        }, () => {
            this.getLatestQuotes(() => {
                this.setState({
                    isLoading: false
                });
            });
        });
    }

    render() {
        let dealers = ['张三', '李四', '王五'];
        const MenuItem = Menu.Item;
        let dealerMenu = <Menu>
            { dealers.map((dealer, index) => <MenuItem key={index}><span>{dealer}</span></MenuItem>) }
        </Menu>;

        let i18ns = ['中文', 'English'];
        let i18nMenu = <Menu>
            { i18ns.map((i18n, index) => <MenuItem key={index}><span>{i18n}</span></MenuItem>)}
        </Menu>;

        let helps = ['帮助', '关于']
        let helpMenu = <Menu>
            {helps.map((help,index) => <MenuItem key={index}><span>{help}</span></MenuItem>) }
        </Menu>;

        let symbols = Object.values(this.state.symbolList);
        let symbols1 = symbols.filter((item) => {
            return this.state.favorite1.indexOf(item.name) > -1;
        });
        let symbols2 = symbols.filter((item) => {
            return this.state.favorite2.indexOf(item.name) > -1;
        });
        let symbols3 = symbols.filter((item) => {
            return this.state.favorite3.indexOf(item.name) > -1;
        });

        return (
            <div className="App">
                <div className="App-header">
                    <Dropdown overlay = {dealerMenu} placement="bottomLeft" ><a href="javascript: void(0);">交易员</a></Dropdown>
                    <Dropdown overlay = {i18nMenu}><a href="javascript: void(0);">语言</a></Dropdown>
                    <Dropdown overlay = {helpMenu} placement="bottomLeft"><a href="javascript: void(0);">帮助</a></Dropdown>

                    <div style={{float: 'right'}}>
                        <span>账户号:{this.state.account.name}</span>
                    </div>
                </div>
                <div className="App-content">
                    <div className="nav panel">
                        <Tabs type="card">
                            <TabPane tab="二元期商品" key="1">
                                <div className="table-header">
                                    <div className="row header">
                                        <div className="cell name">商品</div>
                                        <div className="cell price">价位</div>
                                    </div>
                                    <div className="b-symbol-list" style={{position: 'absolute', top: '30px', left: '4px', bottom: '6px', right: '4px'}}>
                                        <Tabs tabPosition="bottom" type="card">
                                            <TabPane tab="全部" key="0">
                                                <SymbolList
                                                    symbols={symbols}
                                                    onFavoriteClick={this.onFavoriteClick.bind(this)}
                                                    onCreateOrder={this.onCreateOrder.bind(this)}
                                                    onCreateDownOrder={this.onCreateDownOrder.bind(this)}
                                                    onCreateUpOrder={this.onCreateUpOrder.bind(this)}
                                                    favorite1={this.state.favorite1}
                                                    favorite2={this.state.favorite2}
                                                    favorite3={this.state.favorite3}
                                                />
                                            </TabPane>
                                            <TabPane tab="1" key="1">
                                                1
                                            </TabPane>
                                            <TabPane tab="2" key="2">
                                                2
                                            </TabPane>
                                            <TabPane tab="3" key="3">
                                                3
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    <div className="main" style={this.state.chartContainerStyle}>
                        <div className="header">
                            <div className="icon-logo" style={{marginRight: '20px'}}>
                            </div><Button onClick={this.onFullScreen.bind(this)} type={'primary'} size={'small'} style={{marginRight: '20px'}}>{this.state.fullScreen ? '还原' : '最大化'}
                            </Button><Select  defaultValue={this.state.symbol} size={'small'} onSelect={this.onSymbolSelect.bind(this)}>
                            { this.state.symbols.map((symbol) => <Option key={symbol.name}> {symbol.name} </Option>) }
                            </Select>
                        </div>
                        <div style={{position: 'absolute', top: '30px', bottom: '0', width: '100%'}}>
                            <ReactEchartsCore
                                    style={{position: 'absolute', width: '100%', height: '100%'}}
                                    echarts={echarts}
                                    option={this.state.chartOptions}
                                    notMerge={ true }
                                    lazyUpdate={ true }
                                    onChartReady={ this.onChartReady.bind(this)}
                                    onEvents={this.onChartEvents}
                                    showLoading={this.state.isLoading}
                                    ref={(e) => {
                                        if (e) {
                                            this.echarts = e.getEchartsInstance();
                                        } else {
                                            this.echarts = null;
                                        }
                                    }}
                                />
                        </div>
                    </div>
                </div>
                <div className="App-footer panel">
                    <Tabs type="card">
                        <TabPane tab="二元期订单" key="1">
                            <div className="table-header">
                                <div className="row header">
                                    <div className="cell" style={{width: '100px'}}>订单号</div>
                                    <div className="cell" style={{width: '100px'}}>货币</div>
                                    <div className="cell" style={{width: '100px'}}>开仓价</div>
                                    <div className="cell" style={{width: '100px'}}>现价</div>
                                    <div className="cell" style={{width: '100px'}}>看涨/看跌</div>
                                    <div className="cell" style={{width: '100px'}}>时间</div>
                                    <div className="cell" style={{width: '100px'}}>到期</div>
                                    <div className="cell" style={{width: '100px'}}>投资</div>
                                    <div className="cell" style={{width: '100px'}}>支出</div>
                                    <div className="cell" style={{width: '100px'}}>状态</div>
                                    <div className="cell"></div>
                                </div>
                            </div>

                            <div className="table-rows">
                                {
                                    this.state.orders.map((order) => <div className="row">
                                            <div className="cell" style={{width: '120px'}}>#{order.position}
                                            </div><div className="cell">{order.symbol}
                                            </div><div className="cell">{order.open_price}
                                            </div><div className="cell">{''}
                                            </div><div className="cell">{this.getTypeName(order.type)}
                                            </div><div className="cell">{''}
                                            </div><div className="cell">{order.expiration}
                                            </div><div className="cell">{order.investment}
                                            </div><div className="cell">{''}
                                            </div><div className="cell">{''}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="历史订单" key="2">
                            <div className="table-header">
                                <div className="row header">
                                    <div className="cell" style={{width: '100px'}}>订单号</div>
                                    <div className="cell" style={{width: '120px'}}>货币名称</div>
                                    <div className="cell" style={{width: '120px'}}>交易类型</div>
                                    <div className="cell" style={{width: '120px'}}>开仓价</div>
                                    <div className="cell" style={{width: '130px'}}>开仓时间</div>
                                    <div className="cell" style={{width: '120px'}}>投资金额</div>
                                    <div className="cell" style={{width: '100px'}}>预期时间</div>
                                    <div className="cell" style={{width: '120px'}}>平仓价格</div>
                                    <div className="cell" style={{width: '120px'}}>盈利值</div>
                                    <div className="cell"></div>
                                </div>
                            </div>

                            <div className="table-rows">
                                {
                                    this.state.historyOrders.map((historyOrder) => <div className="row">
                                            <div className="cell" style={{width: '100px'}}>#{historyOrder.position}
                                            </div><div className="cell" style={{width: '120px'}}>{historyOrder.symbol}
                                            </div><div className="cell" style={{width: '120px'}}>{this.getTypeName(historyOrder.type)}
                                            </div><div className="cell" style={{width: '120px'}}>{historyOrder.open_price}
                                            </div><div className="cell" style={{width: '130px'}}>{this.formatDateTime(historyOrder.open_time)}
                                            </div><div className="cell" style={{width: '120px'}}>{historyOrder.investment}
                                            </div><div className="cell" style={{width: '100px'}}>{historyOrder.expiration}
                                            </div><div className="cell" style={{width: '120px'}}>{historyOrder.close_price}
                                            </div><div className="cell" style={{width: '120px'}}>{historyOrder.profit}
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </TabPane>
                        <TabPane tab="账户" key="3">
                            <div className="table-header">
                                <div className="row header">
                                    <div className="cell" style={{width: '100px'}}>账户信息</div>
                                    <div className="cell"></div>
                                </div>
                            </div>
                            <div className="table-rows">
                                <div className="row">
                                    <div className="cell" style={{width: '120px'}}>帐户名
                                    </div><div className="cell">{this.state.account.name}</div>
                                </div>
                                <div className="row">
                                    <div className="cell" style={{width: '120px'}}>货币类型
                                    </div><div className="cell">{this.state.account.currency}</div>
                                </div>
                                <div className="row">
                                    <div className="cell" style={{width: '120px'}}>账户余客
                                    </div><div className="cell">{this.state.account.balance}</div>
                                </div>
                                <div className="row">
                                    <div className="cell" style={{width: '120px'}}>信用额
                                    </div><div className="cell">{this.state.account.credit}</div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default App;