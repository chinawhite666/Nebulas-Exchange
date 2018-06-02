"use strict"

//  先提取合约里的数据，并与nnn挂钩。 评论的话  nnn*100；
var Item = function(text) {
	if(text) {
		// 解析json
		var obj=JSON.parse(text);
		this.id=obj.id;
		this.content = obj.content;
		this.account = obj.account;
	}else {
		this.id = "";
		this.content = "";
		this.account = "";
	}
};


Item.prototype ={
	toString :function() {
		return JSON.stringify(this);
	}
};


var Connotations = function (){
	LocalContractStorage.defineMapProperty(this,"Map",{
		parse: function (text) {
            return new Item(text);
        },
        stringify: function (o) {
            return o.toString();
        }
        
    });
    LocalContractStorage.defineProperty(this, "length",null);
}


Connotations.prototype ={
	init: function(){
		
		this.length=100;
	},
	
	save: function(idd,value){
		

		
		var from= Blockchain.transaction.from;
		var item = new Item();
		item.id=idd;
		item.content=value;
		item.account=from;
		
		
		var a=0;
		while(this.get(idd*100+a))
		{a++;}
		var now =idd*100+a;
		this.Map.put(now,item);

	
	},



	
	get:function(x){
		return this.Map.get(x);
	},

	getall:function(){

		var arr = new Array();         //先声明一维
       	for(var i=0;i<10;i++){          //一维长度为5
          arr[i]=new Array();    //在声明二维
          for(var j=0;j<10;j++){      //二维长度为5
             arr[i][j]=0;
       		}
		} 

		for(var j=1;j<10;j++){

			if(this.get(j*100)){
				
				arr[j-1][0]=this.get(j*100);
				for(let m=1;m<10;m++){

					if(this.get(j*100+m)){
						arr[j-1][m]=this.get(j*100+m);
					}

				}

			}




		}


		return arr;

	}



};
module.exports = Connotations;

