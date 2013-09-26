define(function(require, exports, module){
	require('../jquery2.0.3.js');
	var Pinteret=function(options){			   	
		this.init(options);
	}
	Pinteret.prototype={
		options : {
			container : '',
			child : '',
			col : '',
			margin: 0
		},
		init : function(options){
			//初始化	
			var _self = this;			
			_self.options = $.extend({}, _self.options, options || {});
			if(typeof options.container == 'string'){
				_self.container = $(options.container)
			}
			if(typeof options.child == 'string'){
				_self.child = $(options.child)
			}
			_self.col = options.col || 4;
	    	_self.curRow = 0;
	    	_self.sumRow = parseInt(_self.container.children().size()/_self.col);
	    	_self.left = 0;
	    	_self.top = 0;
			
			//设置第一个div的位置
			_self.child.eq(0).css({
				"left" : 0,
				"top" : 0
			});
			for(var j=1,k=_self.child.size();j<k;j++){
				if(j%_self.col == 0){
					//设置每行最左边一个的left值
					_self.left = _self.child.eq(j-_self.col).position().left;
					_self.top = _self.child.eq(j-_self.col).position().top + _self.child.eq(j-_self.col).outerHeight()+this.options.margin
					_self.setPosition(j);
				}else if(j<_self.col){
					//单独设置第一排的top全都为0				
					_self.left = _self.child.eq(j-1).position().left+_self.child.eq(j-1).outerWidth()+this.options.margin;
					_self.top = 0
					_self.setPosition(j)
				}else{
					//设置其他无规则的内容块			
					_self.left= _self.child.eq(j-1).position().left+_self.child.eq(j-1).outerWidth()+this.options.margin;
					_self.top = _self.child.eq(j-_self.col).position().top + _self.child.eq(j-_self.col).outerHeight()+this.options.margin
					_self.setPosition(j)
				}
			}
			_self.container.css("height",_self.child.eq(_self.child.size()-1).position().top+_self.child.eq(_self.child.size()-1).outerHeight()+this.options.margin);
		},
		setPosition : function(index){
			var _self=this;
			_self.child.eq(index).css({
				"left" : _self.left,
				"top" : _self.top
			});
		}
	}

	module.exports=Pinteret;
});