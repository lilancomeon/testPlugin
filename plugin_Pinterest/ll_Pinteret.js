define(function(require, exports, module){
	require('../jquery2.0.3');
	var Pinteret=function(options){			   	
		this.init(options);
	}
	Pinteret.prototype={
		options : {
			container : '',
			child : '',
			col : '',
			marginRight: 0,
			marginHeight: 0
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
			var col=[];
			for(var i=0;i<_self.col;i++){
				col[i]=0;
			}			
			for(var j=0,k=_self.child.size();j<k;j++){
				var minI=_self.getMinOne(col),
				w=_self.child.eq(j).outerWidth()

				_self.child.eq(j).css({
					"left" : minI*(w + _self.options.marginRight),
					"top" : col[minI]
				});
				col[minI]+=_self.child.eq(j).outerHeight()+_self.options.marginHeight;
			}
			_self.container.css("height",_self.child.eq(_self.child.size()-1).position().top+_self.child.eq(_self.child.size()-1).outerHeight()+_self.options.marginHeight);
		},
		getMinOne : function(arr){
			var temp=arr[0],minIndex=0;
			for(var i=0,j=arr.length;i<j;i++){
				if(temp>arr[i]){
					temp=arr[i];
					minIndex=i;
				}
			}
			return minIndex;
		}
	}

	module.exports=Pinteret;
});