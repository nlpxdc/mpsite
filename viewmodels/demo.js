console.log('load index.js');

// const access_token = '17_Wi7SeShqk1mfoZhLCjtH9Xpd56-0gFoqKTw86Ni4jWzfXNUoOBco5eTRo_BohtfogQR3sqJTSQXuIhRrEG-cqM8nvyIKVr3jS9BF6cSZG-QuftGgZ5-dXUpjG7DdqGr3HNAPT1ga9_aoo8NEGOQiAAAUCE';
const ticket = 'LIKLckvwlJT9cWIhEQTwfJuU557garB7J1tppEvMocXm6y87YjZiRkpwsw8zwY74LyWdyXRI9cPtNH6TBrhKSA';

const appId = 'wx0c14a6dfeab19166';
const timestamp = Date.now();
const nonceStr = Math.random().toString(16).substr(2);
const url = 'http://192.168.137.1:5000/demo';
// const url = 'http://192.168.137.1:5000/demo?openId=123';
const originParams = 'jsapi_ticket=' + ticket
    + '&noncestr=' + nonceStr
    + '&timestamp=' + timestamp
    + '&url=' + url;

var shaObj = new jsSHA("SHA-1", "TEXT");
shaObj.update(originParams);
var signature = shaObj.getHash("HEX");

wx.config({
    debug: false,
    appId: appId,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
        'checkJsApi',
        'chooseImage',
        'getLocation',
        'openLocation'
    ]
});

wx.error(function (res) {
    console.log('wx error');
    console.log(res);
});

wx.ready(function () {
    console.log('wx ready');
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    },
    methods: {
        handleCheckJsApi() {
            console.log('handleCheckJsApi click');
            wx.checkJsApi({
                jsApiList: ['chooseImage'],
                success: function (res) {
                    console.log(res);
                },
                fail: function (error) {
                    console.error(error);

                }
            });
        },
        handleChooseImage() {
            console.log('handleChooseImage click');
            wx.chooseImage({
                count: 2, // 默认9
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    console.log(localIds);
                },
                fail: function (error) {
                    console.error(error);
                }
            });
        },
        handleGetLocation() {
            console.log('handleGetLocation click');
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log(res);
                },
                fail: function (error) {
                    console.error(error);
                }
            });
        },
        handleOpenLocation() {
            console.log('openLocation click');
            wx.getLocation({
                type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    console.log(res);
                    wx.openLocation({
                        latitude: res.latitude, // 纬度，浮点数，范围为90 ~ -90
                        longitude: res.longitude, // 经度，浮点数，范围为180 ~ -180。
                        name: '', // 位置名
                        address: '', // 地址详情说明
                        scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                    });
                },
                fail: function (error) {
                    console.error(error);
                }
            });
        },
        handleGetUser() {
            console.log('getUser click');
            axios.get('https://api.weixin.qq.com/cgi-bin/user/info', {
                params: {
                    access_token: '17_zXovqEHjPm6zt8K1HHLMhPVj53xDwWebOeDeEN-JYq--9eOPFEHbweCigeLbAMukvTzNuXc0eWsferaBgGgbwk2AwZEtGKftNI18SYNMs8Sgz_pwMj6ig434exIQrFCkMZQiUMz1wXuhxR3TPAGcABAWHN',
                    openid:'oUwXe58JsPM6MBFsI3YvnbFIpg-8',
                    lang:'zh_CN'
                }
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                });
        }
    }
})

