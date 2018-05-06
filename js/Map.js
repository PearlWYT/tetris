function Map(){
	this.code = (function(){
		var arr = [];
		// 创建默认地图
		for (var i = 0; i < 20; i++) {
			arr.push([])
			for (var j = 0; j < 12; j++) {
				arr[i].push(0)
			}
		}
		// 创建墙 
		arr.push(Array(12).fill(1));// ES6 的对数组填充的方法
		return arr
	})()
}
Map.prototype.render = function(){
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 12; j++) {
			if(this.code[i][j] != 0){
				game.setClass(i, j, this.code[i][j])
			}
		}
	}
};