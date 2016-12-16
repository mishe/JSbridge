(function () {
    function getParam(str, key) {
        if (arguments.length == 1) {
            key = str;
            str = location.href;
        }

        var reg = new RegExp(key + '=([^#&]*)', 'i');
        var r = str.match(reg);
        if (r != null) return unescape(r[1]);
        return null;
    }

    function uniqID(string) {
        string = string || '';
        return string + Math.floor(Math.random() * 10000000) + new Date().getTime().toString().substring(10, 13);
    }

    function getUniqFn(fn) {
        var uniq = uniqID('callback_');
        window[uniq] = function (d) {
            if (d.status == 0) {
                fn(d);
            } else {
                console.log(d.msg);
            }
        };
        return uniq;
    }

    var JSBridge = function () {
        var isBridge = window.JF;
        var isApp = getParam('isapp');
        this.share = function (options) {
            var title = options.title || '跟我来摇旺赚钱吧，100元返现券、14%新手专享产品和万元体验金等你来拿~',
                desc = options.desc || '不会理财的人不漂亮！',
                link = options.link || location.href,
                icon = options.icon || '/images/headImg.jpg',
                callback = options.callback || function () {
                    },
                shareMask = $('.share_mask');

            if (isBridge) {
                JF.navigator_setShareInfo(JSON.stringify({
                    title: title,
                    desc: desc,
                    icon: icon,
                    link: link
                }), getUniqFn(function (d) {
                    callback(d);
                    shareMask.hide().off('tap.share_mask');
                }));
            } else if (isApp) {
                window.location = '/shareToApp?title=' + encodeURIComponent(title) + '&desc=' + encodeURIComponent(desc) + '&link=' + encodeURIComponent(link) + '&icon=' + encodeURIComponent(icon);
            } else {
                $.ajax({
                    method: 'get',
                    url: location.origin + '/weizhan/oauth/config',
                    data: {url: location.href},
                    dataType: 'json',
                    success: function (d) {
                        _initWeChat(d);
                    }
                });

                function _initWeChat(weChatCfg) {
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: weChatCfg.appid, // 必填，公众号的唯一标识
                        timestamp: weChatCfg.timestamp, // 必填，生成签名的时间戳
this.share = function () {
            // if (isBridge) {
            //     JF.navigator_setShareInfo(JSON.stringify({
            //         title: shareInfo.title,
            //         desc: shareInfo.desc,
            //         icon: shareInfo.icon,
            //         link: shareInfo.link
            //     }), getUniqFn(function (d) {
            //         callback(d);
            //         shareMask.hide().off('tap.share_mask');
            //     }));
            // } else
            if (isApp) {
                window.location = '/share_action?title=' + encodeURIComponent(shareInfo.title) + '&desc=' + encodeURIComponent(shareInfo.desc) + '&link=' + encodeURIComponent(shareInfo.link) + '&icon=' + encodeURIComponent(shareInfo.icon);
            } else {
                var shareMask = $('.share_mask');
                if (shareMask.length) {
                    shareMask.show().on('tap.share_mask', function () {
                        shareMask.hide().off('tap.share_mask');
                    });
                } else {
                    shareMask = $('<div class="share_mask"></div>');
                    $('body').append(shareMask);
                    shareMask.show().on('tap.share_mask', function () {
                        shareMask.hide().off('tap.share_mask');
                    });
                }
            }
        };
        this.setShareInfo=function(options){
            shareInfo=options;
            var title = options.title || '跟我来摇旺赚钱吧，100元返现券、14%新手专享产品和万元体验金等你来拿~',
                desc = options.desc || '不会理财的人不漂亮！',
                link = options.link || location.href,
                icon = options.icon || '/images/headImg.jpg',
                callback = options.callback || function () {};
            $.sync({
                method: 'get',
                url: location.origin + '/weizhan/oauth/config',
                data: {url: location.href.split('#')[0]},
                dataType: 'json',
                success: function (d) {
                    _initWeChat(d);
                }
            });

            function _initWeChat(weChatCfg) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: weChatCfg.appid, // 必填，公众号的唯一标识
                    timestamp: weChatCfg.timestamp, // 必填，生成签名的时间戳
                    nonceStr: weChatCfg.nonceStr, // 必填，生成签名的随机串
                    signature: weChatCfg.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation', 'getLocation', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 onMenuShareAppMessage showOptionMenu
                });
                var cfg = {
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: icon,
                    success: function () {
                        callback();
                        shareMask.hide().off('tap.share_mask');
                    },
                    cancel: function () {
                        shareMask.hide().off('tap.share_mask');
                    }
                };
                wx.showOptionMenu();
                wx.ready(function () {
                    wx.onMenuShareAppMessage(cfg);
                    wx.onMenuShareTimeline(cfg);
                    wx.onMenuShareQQ(cfg);
                    wx.onMenuShareWeibo(cfg);
                    wx.onMenuShareQZone(cfg);
                });
            }
        };
        this.toList = function () {
            if (isBridge) {
                JF.passport_productList();
            } else if (isApp) {
                window.location = '/productList';
            } else {
                window.location = '/weizhan/#product';
            }
        };
        this.toDetail = function (pid) {
            if (isBridge) {
                JF.passport_productDetail(JSON.stringify({productNo: pid}));
            } else if (isApp) {
                window.location = '/productDetail?pid=' + pid;
            } else {
                window.location = '/weizhan/#product';
            }
        }
        this.login = function (id, callback) {
            if (typeof(id == 'function')) {
                callback = id;
                id = '';
            }
            if (isBridge) {
                JF.passport_login(JSON.stringify({phoneNum: id}), getUniqFn(function (d) {
                    localStorage.setItem('yw_user_loginToken', d);
                    if (callback) {
                        callback();
                    } else {
                        location.reload();
                    }
                }));
            } else if (isApp) {
                window.location = '/login?phoneNum=' + id;
            } else {
                localStorage.setItem('yw_user_after_login_link', location.href);
                window.location = '/weizhan/#login';
            }
        }
        this.register = function (id, callback) {
            if (typeof(id == 'function')) {
                callback = id;
                id = '';
            }
            if (isBridge) {
                JF.passport_register(JSON.stringify({phoneNum: id}), getUniqFn(function (d) {
                    localStorage.setItem('yw_user_loginToken', d);
                    if (callback) {
                        callback();
                    } else {
                        location.reload();
                    }
                }));
            } else if (isApp) {
                window.location = '/register?phoneNum=' + id;
            } else {
                window.location = '/weizhan/#register';
            }
        }
        this.setTitle = function (title) {
            if (isBridge) {
                JF.navigator_setTitle(JSON.stringify({title: title}));
            } else {
                document.title = title;
                // $.setAppTitle(title);
                // hack在微信IOS webview中无法修改document.title的情况
                if ($.isWeixin() && $.isIOS()) {
                    var $iframe = $('<iframe src="/images/9e3e8cf0.png" style="border: 0;outline: 0"></iframe>');
                    $iframe.on('load', function () {
                        setTimeout(function () {
                            $iframe.off('load').remove();
                        }, 0);
                    }).appendTo('body');
                }
            }
        }
        this.invite = function (code) {
            if (isBridge) {
                JF.passport_invite(JSON.stringify({code: code}));
            } else if (isApp) {
                window.location = '/invite?code=' + code;
            } else {
                window.location = '/weizhan/#uc/invite';
            }
        }

        function yaobao(id) {
            if (isBridge) {
                JF.passport_shakeTreasure(JSON.stringify({code: id}));
            } else if (isApp) {
                window.location = '/yaobao?pid=' + id;
            } else {
                window.location = '/weizhan/#yaobao';
            }
        }

        this.yaobao = function (id) {
            if (id > 0) {
                yaobao(id)
            } else {
                $.sync({
                    url: location.origin + '/app/webservice/v2/newProductList',
                    type: 'post',
                    data: {
                        currentPage: 0,
                        pageCount: 15,
                        productType: 4,
                        channelCode: ''
                    },
                    success: function (d) {
                        yaobao(d.currentProduct.productNo);
                    }
                });
            }
        }
        this.mall = function () {
            if (isBridge) {
                JF.passport_ScoreMarket();
            } else if (isApp) {
                window.location = '/mall?code=' + code;
            } else {
                window.location = '/weizhan/#mall';
            }
        }
    }
    window.jsb = new JSBridge();
}());
