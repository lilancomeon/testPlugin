define(function(require, exports, module) {  
    var $ = require('$'),
    Scroll = function(options){
      this.init(options);
    }    
    //目前支持向上滚动
    Scroll.prototype={
      options:{
        fatherTag:'',
        conTag:'',        
        speed:0,
        direction:'down'
      },
      timer : null,      
      init:function(options){
        this.options = $.extend({}, this.options, options || {});        
        this.element();
        this.autoPlay();
        this.hover();
      },
      element: function(){
        this.fatherTag=$(this.options.fatherTag);
        this.conTag=$($(this.options.fatherTag)).find(this.options.conTag);               
       },
      autoPlay : function(){
          var _self = this;
          if(_self.options.direction == 'down'){
            $(this.options.fatherTag).css({
              'marginTop':0-$(this.options.conTag).height()
            })
          }
          _self.timer = window.setInterval(function(){
            _self.options.direction == 'up'? _self.upScroll() : _self.downScroll()       
          },this.options.speed);
      },
      autoStop : function(){
        window.clearInterval(this.timer);
      },
      hover : function(){
        var _self=this;        
        $(_self.options.fatherTag)
        .delegate(this.options.conTag,{
          'mouseover' : function(){
              _self.autoStop()            
          },
          'mouseout' : function(){     
               _self.autoPlay()         
          }
        });
      },
      upScroll : function(){
        var _self=this,
          con=$($(this.options.fatherTag)).find(this.options.conTag);
          var conFirst=con.first(),
              conHeight=conFirst.height(),
              upHeight=0-conHeight;
          $(conFirst).animate({
            'marginTop':upHeight
          },1000,function(){
              var temp=conFirst           
              temp.removeAttr('style');
              $(_self.options.fatherTag).append(temp);
          });            
      },
      downScroll : function(){
        var _self=this;       
        con=$($(this.options.fatherTag)).find(this.options.conTag);
        //console.log();
        var last=con.last();        
        var downHeight=last.height();
        $(con.eq(0)).animate({
          'marginTop':downHeight
        },1000,function(){
          $(_self.options.fatherTag).prepend(last);
          $(this).removeAttr('style');
        });
      }
    }    
    module.exports = Scroll;
  });