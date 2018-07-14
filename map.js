$(function(){
	new Map();
});

function Map(){
	var _this = this;

	this.countires = [{name:"chicago"}, {name:"london"}, {name:"krakow"}, {name:"bangalore"}, {name:"melbourne"}];
	this.activeCountry = "";

	this.init();
}

Map.prototype = {
	init:function(){
		var _this = this;
		this.smallMode = false;

	    this.updateMapSize();

	    $( window ).resize(function() {
	    	_this.updateMapSize();
		});
	    this.setupListeners();
	},
	setupListeners:function(){
		var _this = this;

		for(var i = 0; i < _this.countires.length; i++){
			
			(function(index){

		        $("#"+_this.countires[i].name+"_point .click_area").click(countryClicked);
		        $("#"+_this.countires[i].name+"_point .label").click(countryClicked);

		        function countryClicked(){
		        	var country = _this.countires[index].name;
		            var message_box = $("#"+country+"_point .message_box");
		            var msg_mask = $("#"+country+"_point .msg_mask");
					var line = $("#"+country+"_point .line");

					_this.activeCountry = country;

					_this.closeAll();			
					_this.openCountry(message_box, line, msg_mask, index);

					_this.openMsgLitebox($("#"+country+"_point .title").html(), $("#"+country+"_point .message").html());
		        }

		        $("#"+_this.countires[index].name+"_point .close_btn").click(function(){ _this.activeCountry = ""; _this.closeAll(); });

		    })(i);

		}

		$("#msg_litebox").click(function(){
			_this.closeMsgLitebox();
		});

	},
	openCountry:function(_message_box, _line, _msg_mask, index){
		TweenMax.to(_line, 0.3, {height:this.countires[index].lineHeight, top:this.countires[index].lineTop, onComplete:function(){
			if(_msg_mask.position().left < 0){
				TweenMax.set(_message_box, {left:_msg_mask.outerWidth()});
			}else{
				TweenMax.set(_message_box, {left:-_msg_mask.outerWidth()});
			}
			TweenMax.to(_message_box, 0.3, {left:0});
			
		}});
	},
	closeCountry:function(_message_box, _line, _msg_mask){
		var moveBoxAmount = _message_box.outerWidth();
		if(_msg_mask.position().left >= 0) moveBoxAmount = -_message_box.outerWidth();

		TweenMax.to(_message_box, 0.3, {left:moveBoxAmount, onComplete:function(){
			_message_box.parent().parent().css("z-index", "auto");
			TweenMax.to(_line, 0.3, {height:0, top:0});
		}});
	},
	openMsgLitebox:function(title, msg){
		var msg_litebox = $("#msg_litebox");
		$("#msg_litebox .title").html(title);
		$("#msg_litebox .message").html(msg);
		TweenMax.to(msg_litebox, 0.5, {scale:1, opacity:1});
		msg_litebox.css("pointer-events", "auto");
	},
	closeMsgLitebox:function(){
		var msg_litebox = $("#msg_litebox");
		TweenMax.to(msg_litebox, 0.5, {scale:0.8, opacity:0});
		msg_litebox.css("pointer-events", "none");
		this.closeAll();
	},
	closeAll:function(){
		var _this = this;
		for(var i = 0; i < _this.countires.length; i++){
			var country = _this.countires[i].name;

			if(_this.activeCountry != country){
				var message_box = $("#"+country+"_point .message_box");
				var line = $("#"+country+"_point .line");
				var _msg_mask = $("#"+country+"_point .msg_mask");
				_this.closeCountry(message_box, line, _msg_mask);
				//$("#"+country+"_point").css("z-index", "auto");
			}else{
				$("#"+country+"_point").css("z-index", 5);
			}
		}

		_this.activeCountry = "";
	},
	updateMapSize:function(){
		var _this = this;

		var map  = $("#map");
		var wrapperWidth = $("#container").width();
		var wrapperHeight = $("#container").height();

		$("#msg_litebox").css({"width":wrapperWidth, "height":wrapperWidth/800*467});


		if(wrapperWidth < 700) this.smallMode = true; else this.smallMode = false;
		
		var scaleTo = wrapperWidth/800;
		TweenMax.set(map, {scale:scaleTo, transformOrigin:'left top'});
		

		for(var i = 0; i < _this.countires.length; i++){
			var country = _this.countires[i].name;
			var country_point = $("#"+country+"_point .point");
			TweenMax.set(country_point, {scale:1/scaleTo});

			var _msg_mask = $("#"+country+"_point .msg_mask");
			var _line = $("#"+country+"_point .line");

			
			
			var lineTop = _msg_mask.position().top;
			var lineHeight = -lineTop;
			
			if(lineTop > 0){
				lineTop = 0;
				lineHeight = (_msg_mask.outerHeight()+20) * scaleTo;
			}
			if(lineHeight != 0){
				_this.countires[i].lineTop = lineTop * (1/scaleTo);
				_this.countires[i].lineHeight = lineHeight * (1/scaleTo);
			}

			if(this.smallMode){
				_msg_mask.css("opacity", "0");
				_line.css("opacity", "0");
			}else{
				_msg_mask.css("opacity", "1");
				_line.css("opacity", "1");
			}
			
		}

		var msg_litebox = $("#msg_litebox");
		if(this.smallMode){
			msg_litebox.css("display", "inline");
			
		}else{
			TweenMax.set(msg_litebox, {scale:1});
			msg_litebox.css("display", "none");
		}
	}
}