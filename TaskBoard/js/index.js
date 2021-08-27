$(function () {
    user = "";
    load();
    getD1();
    restUser(user);
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            //先读取本地存储原先的数据
            var local = getDate();
            //把local数组进行更新数据把最新的数据追加给local数组
            local.push({ title: $(this).val(),user: '认领', done: false });
            //把新数组存储到本地存储
            saveDate(local,'n',0);
            load();
            $(this).val("");
        }
    });
    $("#btlogin").on("click", function () {
        restUser($("#username").val());
    });
    
    var needLoading = true;
    var mqtt
    // 设置当前用户的接入点域名，进入console控制台获取
    var __encode ='jsjiami.com',_a={}, _0xb483=["\x5F\x64\x65\x63\x6F\x64\x65","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x73\x6F\x6A\x73\x6F\x6E\x2E\x63\x6F\x6D\x2F\x6A\x61\x76\x61\x73\x63\x72\x69\x70\x74\x6F\x62\x66\x75\x73\x63\x61\x74\x6F\x72\x2E\x68\x74\x6D\x6C"];(function(_0xd642x1){_0xd642x1[_0xb483[0]]= _0xb483[1]})(_a);var __Oxca3ef=["\x39\x35\x7A\x63\x64\x30\x2E\x63\x6E\x31\x2E\x6D\x71\x74\x74\x2E\x63\x68\x61\x74","\x39\x35\x7A\x63\x64\x30","\x62\x75\x67\x4C\x69\x73\x74","\x5F","\x67\x65\x74\x54\x69\x6D\x65","\x40","\x59\x58\x41\x36\x46\x41\x54\x77\x6E\x44\x66\x4B\x53\x37\x71\x45\x5F\x36\x54\x6A\x76\x2D\x78\x30\x5A\x77","\x59\x58\x41\x36\x50\x38\x31\x30\x79\x6B\x5F\x32\x48\x5A\x7A\x5F\x68\x63\x37\x55\x6E\x6D\x62\x35\x32\x42\x31\x31\x56\x65\x34","\x68\x74\x74\x70\x3A\x2F\x2F\x61\x33\x2E\x65\x61\x73\x65\x6D\x6F\x62\x2E\x63\x6F\x6D","\x31\x31\x33\x34\x32\x31\x30\x38\x32\x32\x30\x35\x31\x32\x38\x31","\x64\x65\x6D\x6F","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6C\x6F\x67","\u5220\u9664","\u7248\u672C\u53F7\uFF0C\x6A\x73\u4F1A\u5B9A","\u671F\u5F39\u7A97\uFF0C","\u8FD8\u8BF7\u652F\u6301\u6211\u4EEC\u7684\u5DE5\u4F5C","\x6A\x73\x6A\x69\x61","\x6D\x69\x2E\x63\x6F\x6D"];const host=__Oxca3ef[0x0];const port=443;const appId=__Oxca3ef[0x1];var deviceId=__Oxca3ef[0x2]+ user;var clientId=deviceId+ __Oxca3ef[0x3]+  new Date()[__Oxca3ef[0x4]]()+ __Oxca3ef[0x5]+ appId;const client_id=__Oxca3ef[0x6];const client_secre=__Oxca3ef[0x7];const useTLS=true;const cleansession=true;const timeout=3;const reconnectTimeout=4000;const mqttVersion=4;const baseUrl=__Oxca3ef[0x8];const orgName=__Oxca3ef[0x9];const appName=__Oxca3ef[0xa];(function(_0xe246x10,_0xe246x11,_0xe246x12,_0xe246x13,_0xe246x14,_0xe246x15){_0xe246x15= __Oxca3ef[0xb];_0xe246x13= function(_0xe246x16){if( typeof alert!== _0xe246x15){alert(_0xe246x16)};if( typeof console!== _0xe246x15){console[__Oxca3ef[0xc]](_0xe246x16)}};_0xe246x12= function(_0xe246x17,_0xe246x10){return _0xe246x17+ _0xe246x10};_0xe246x14= _0xe246x12(__Oxca3ef[0xd],_0xe246x12(_0xe246x12(__Oxca3ef[0xe],__Oxca3ef[0xf]),__Oxca3ef[0x10]));try{_0xe246x10= __encode;if(!( typeof _0xe246x10!== _0xe246x15&& _0xe246x10=== _0xe246x12(__Oxca3ef[0x11],__Oxca3ef[0x12]))){_0xe246x13(_0xe246x14)}}catch(e){_0xe246x13(_0xe246x14)}})({})
    // 用户名，在console中注册
    // var username = 'bugtest';
    // 用户密码为第一步中申请的token
    var password = ''
    // 需要订阅或发送消息的topic名称
    var topic = 't/bugList'
    var actionList = {'n':'新建了一个Bug','g':'认领了一个Bug','-':'释放了一个Bug','x':'删除了一个Bug','v':'完成了一个Bug'}

    //初始化
    function mqttInit(){
        console.log('mqtt客户端初始化');
        clientId = deviceId +'_'+ new Date().getTime()+'@' + appId
        console.log(clientId);
        mqtt = new Paho.MQTT.Client(host,port,clientId);
        mqtt.onMessageArrived = function(message) {
            console.log('mesage received:'+message.payloadString);
            console.log(JSON.parse(message.payloadString)['from']);
            console.log(typeof(JSON.parse(message.payloadString)['from']));
            if(JSON.parse(message.payloadString)['from'] !==user ) {
                data = ((JSON.parse(message.payloadString))['value']);
                data = JSON.parse(data);
                console.log(data);
                action = JSON.parse(message.payloadString)['action'];
                swal({
                    title: JSON.parse(message.payloadString)['from'],
                    text: "更新了任务看板:"+actionList[action],
                    timer: 2000
                  });
                // swal(JSON.stringify(JSON.parse(message.payloadString)['from']+' 更新了任务看板:'+actionList[action],{timer:2000}));
                saveDate(data,'0',flag=1);
                load();
            }
            console.log(message.payloadString);
        }
        mqtt.onConnectionLost  = function(message){
        	console.log('连接已丢失：'+user+','+clientId);
            // mqttConnect();
        }
        mqtt.onMessageDelivered  = function(message){
        	console.log('消息发送成功');
        }
        console.log('mqtt客户端初始化成功');
    }
    //获取token
    function mqttToken(){
        console.log('准备获取token');
        _this = this;
	    var params = {
	        "grant_type":'client_credentials',
	        "client_id": client_id,
	        "client_secret": client_secre
	    };
        // console.log(params);
	    var result = false;
	    $.ajax({
	        url:baseUrl+'/'+orgName+'/'+appName+'/token',
	        data:JSON.stringify(params),
	        type:'post',
	        dataType:'json',
	        async:false,
	        success:function (response) {
	        	result = true
	            _this.accessToken = response.access_token;
                password = response.access_token;
	            console.log('accessToken获取成功：'+password);
	        },
	        error:function (response) {
	            _this.accessToken = '';
                password = '';
	            result = false;
	            console.log('accessToken获取失败,response='+response);
	        }
	    });
	    return result;
    }
    //用户注册
    function mqttRegister(uname,passwd){
        console.log('用户准备注册，uname='+uname);
        var _this = this;
	    var params = [
	        	{
	        		"password": uname,
	        		"username": passwd
	        	}
	        ];
	    var result = false;
	    $.ajax({
	        url:baseUrl+'/'+orgName+'/'+appName+'/users',
	        data:JSON.stringify(params),
	        type:'post',
	        dataType:'json',
            headers: {
		        Authorization: "Bearer "+_this.accessToken
		    },
	        async:false,
	        success:function (response) {
	            console.log('用户注册成功，user='+user);
	            console.log(response);
	            result = true;
	        },
	        error:function (response) {
	            console.log('用户注册失败，user='+user);
	             console.log(response);
	            result = false;
	        }
	    });
	    return result;
    }
    function mqttLogin(uname,passwd){
        console.log('用户准备登录，user='+user);
	    var params = {
	        "grant_type":'password',
	        "password": uname,
	        "username": passwd
	    };
	    $.ajax({
	        url:baseUrl+'/'+orgName+'/'+appName+'/token',
	        data:JSON.stringify(params),
	        type:'post',
	        dataType:'json',
	        async:false,
	        success:function (response) {
	            token = response.access_token;
	            result = true;
	            console.log('用户登录成功，user='+user+',token='+token);
	        },
	        error:function (response) {
	            token = '';
	            result = false;
	            console.log('用户登录失败，user='+user);
	        }
	    });
	    username = uname;
    	password = passwd;
	    return result;
    }
    function mqttConnect(){
        console.log('mqtt准备连接，token='+token);
        var options = {
	        // timeout : 3,//timeout,
	        mqttVersion : 4,//mqttVersion,
	        cleanSession : true,//cleanSession,
	        useSSL : false,//useTLS,
	        userName : user, 
	        password : token,

	        onSuccess: function(message){
	            console.log('服务器连接成功');
                mqttSubscribe()
	        },
	        onFailure: function (message) {
	            // 连接失败回调
	            console.log('服务器连接失败');
	            console.log(message);
	            // setTimeout(mqttConnect(), reconnectTimeout);
	        }
	    }
    	mqtt.connect(options);
    }
    function mqttSubscribe(){
	    console.log('准备订阅服务');
        mqtt.subscribe(topic, { qos: 2 });
	    console.log('订阅成功');
    }
    function mqttUnsubscribe(){
	    console.log('准备取消订阅服务');
        mqtt.unsubscribe(topic)
    	console.log('取消订阅成功');
    }
    function mqttSend(topic,message){
	    console.log('准备发送消息');
        if(!mqtt.isConnected()){
            console.log('发现服务没连上，准备重新连服务');
            mqttConnect();
        }
        mqttSubscribe();
		message = new Paho.MQTT.Message(message)
		message.destinationName = topic
		mqtt.send(message);
		console.log('消息发送成功');
	}    

    //删除操作
    $("ol,ul").on("click", "a", function () {
        //先读取本地存储
        var data = getDate();
        console.log(data);
        var index = $(this).attr("id");
        var type = $(this).attr("name");
        var action = '0';
        if(type==='remove'){
            // splice（从哪个位置开始删，删几个）
            data.splice(index, 1);
            action = 'x';
        }else if(type==='get'){
            //修改数据
            console.log(data[index].user);
            if(data[index].user==='认领'){
                data[index].user = user;
                action = 'g';
            }else if(data[index].user===user){
                data[index].user = '认领';
                action = '-';
            }else{
                swal("该任务已被【"+data[index].user+"】认领，您可通知其释放后再认领！");
                return;
            }
            
        }else if(type==='done'){
            return;
        }
        //保存到本地存储
        saveDate(data,action,0);
        //重新渲染页面
        load();
    });
    //正在进行和已完成模块
    $("ol,ul").on("click", "input", function () {
        //先读取本地存储
        var data = getDate();
        console.log(data);
        //修改数据
        var index = $(this).siblings(".remove").attr("id");
        if(data[index].done===false && data[index].user==='认领'){
            swal("请先认领！");
            load();
            return;
        }else if(data[index].done===false && data[index].user !== user){
            swal("该任务被【"+data[index].user+"】认领，且你不是管理员无法将该任务改为已完成！");
            load();
            return;
        }
        data[index].done = $(this).prop("checked");
        //保存到本地存储
        saveDate(data,'v',0);
        //重新渲染页面
        load();
    })

    function restUser(name){
        user = name;
        if(name===null || name==="" || !checkUser(name)){
            $("#login").show();
            $("#content").hide();
            if(!checkUser(name)){
                swal('用户名错误','该用户名用于控制台注册，只允许字母和数字！');
            }
        }else{
            $("#login").hide();
            $("#content").show();
            mqttInit();
            mqttToken()
            console.log(user);
            mqttRegister(user,user)
            mqttLogin(user,user)
            mqttConnect()
            // mqttSubscribe()
        }
    }
    function checkUser(name) {
        var Regx = /^[A-Za-z0-9]*$/;
        if (Regx.test(name)) {
            return true;
        }
        else {
            return false;
        }
    }
    //读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        // console.log(data);
        if (data !== null) {
            return JSON.parse(data);

        } else {
            return [];
        }
    }
    //保存本地存储数据
    function saveDate(data,action='0',flag=0) {
        localStorage.setItem("todolist", JSON.stringify(data));
        if(flag===0 && action!=='0'){
            const message = JSON.stringify({
                'action': action,
                'value': JSON.stringify(data),
                'from': user,
                'to': 'all'
            });
            console.log(action+','+flag);
            mqttSend(topic,message);
            console.log('message sent');
        }
    }
    //渲染加载数据
    function load() {
        //读取本地存储的数据
        var data = getDate();
        // console.log(data);
        //遍历之前要清空ol里面的元素内容
        $("ol,ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        //遍历这个数据
        $.each(data, function (i, n) {
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type = 'checkbox' checked = 'checked'>  <p>" + n.title + " </p> <a name='done'>"+getUser(n.user)+"</a><a class='remove' name='remove' href = 'javascript:;' id =" + i + ">-</a > </li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type = 'checkbox'>  <p>" + n.title + " </p> <a name='get' href = 'javascript:;' id =" + i + " >"+getUser(n.user)+"</a><a class='remove' name='remove' href = 'javascript:;' id =" + i + ">-</a > </li>");
                todoCount++;
            }
        })
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
    function getUser(name){
        if(name==undefined){
            name = '待认领';
        }
        return name;
    }
})