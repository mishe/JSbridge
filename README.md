# JSbridge

总体约定格式：
交互采用以JF为命名空间的方式，后续增加模块名加功能函数的方式；
H5传入app参数2个，第一个参数是告之APP的数据，第二个为回调H5的callback
callback接受一个参数（JSON字符串）；格式为{data:'',msg:'',status:''};
第一参数只有一个字段时是单字符串，有多字段时，用json字符串表示
示例：(设置app的标题栏)
H5调app：
JF.navigator_setTitle(‘首页’,callback);
JF.navigator_setTitle({title:'产品详情',pid:'1233'},callback);
app的callback：
callback({data:'',msg:'',status:''});
 
 
 
JS与OC方法转换示例
JS
 1 testObject.test('参数');  
 2 testObject.test('参数1','参数2');  
OC
 1 -(void)test:(NSString *)str;  
 2 -(void)test:(NSString *)str1 :(NSString *)str2;
 
 
根据产品需求，JSbridge交互命名方法如下：
设置页面标题:
 
JF.navigator_setTitle(title);


/**
 *  登录
 *  message:H5 传递过来的参数(json)
 *  backName: 回调方法名
 */
-(void)passport_login:(NSString *)message :(NSString *)backName
;
不用jsbridge  /login?phoneNum={phoneNum}


/**
 *  邀请好友
 * message： 邀请码
 */
-(void)passport_invite:(NSString *)message;

不用jsbridge  /invite?code={code}

/**
 *  产品列表
 */
-(void)passport_productList:(NSString *)message;

不用jsbridge  /productList


/**
 *  产品详情
    message：产品productNo
 */
-(void)passport_productDetail:(NSString *)message;

不用jsbridge  /productDetail?pid={pid}

/**
 *  摇宝
    message：摇宝productNo
 */
-(void)passport_shakeTreasure:(NSString *)message;


不用jsbridge  /yaobao?pid={pid}
 
/**
 *  旺豆家园首页
 */
-(void)passport_ScoreMarket:(NSString *)message;

不用jsbridge  /mall?pid={pid}

/**
    分享
 *  设置页面的分享信息
 *  message:  json：
     {
        title：'', //分享标题
       desc:'', //分享描述
       icon:'' //分享的小图片,
       link:'' //分享后的连接地址
     }
*backName:回调方法名（分享平台）
 */
-(void)navigator_setShareInfo:(NSString *)message :(NSString *)backName

不用jsbridge  /shareToApp?title={title}&desc={desc}&icon={icon}&link={link}
;
