function Block(){
	// 选择一个形状
	this.allType = ["I","L",'O','J','Z','S','T'][~~(Math.random() * 7)]
	// 得到这个这个形状的 所有形态个数
	this.allDirectionNumber = block_json[this.allType].length
	// 随机一个方向
	this.direction = ~~(Math.random() * this.allDirectionNumber)
	// 得到这个具体的形态
	this.code = block_json[this.allType][this.direction]
	// 让砖块从第0行 第4列出现  在表格的中间
	this.row = 0;
	this.col = 4;
}
Block.prototype.render = function(){
	// 遍历砖块的 4 * 4的矩阵 然后 if语句判断 等于1 调用染色方法
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(this.code[i][j] == 1){
				game.setClass(this.row + i,this.col + j,this.allType)
			}
		}
	}
};
Block.prototype.down = function(){
	// forEach 遍历数组 ES6的
	game.map.code[0].forEach(function(item){
		if(item != 0){
			$("#gameover")[0].load();
			$("#gameover")[0].play();
			clearInterval(game.timer);
			$(".gameover").show()
			return 
		}
	});
	if(this.check(this.row + 1,this.col)){
		this.row++
	}else {
		this.addDie()
		game.block = new Block()
		this.remove();
	}
};
Block.prototype.moveDown = function(){
	// 一键到底
	while(this.check(this.row + 1,this.col)){
		this.row++
	}
	$("#moveDown")[0].load();
	$("#moveDown")[0].play();
};
Block.prototype.moveLeft = function(){
	// 一键到左
	while(this.check(this.row,this.col - 1)){
		this.col--
	}
};
Block.prototype.moveRight = function(){
	// 一键到右
	while(this.check(this.row,this.col + 1)){
		this.col++
	}
};
Block.prototype.left = function(){
	// 往左
	if(this.check(this.row ,this.col - 1)){
		this.col--
	}
};
Block.prototype.right = function(){
	// 往右
	if(this.check(this.row ,this.col + 1)){
		this.col++
	}
};
Block.prototype.rotate = function(){
	// 旋转
	// 备份旧的方向 防止不能旋转的时候 
	var oldDirection = this.direction;
	if(this.direction == this.allDirectionNumber - 1){
		this.direction = 0
	}else {
		this.direction++
	}
	// 默认是能改变方向的
	this.code = block_json[this.allType][this.direction]
	// 如果不能改变方向的时候 需要将旧的方向赋值给 this.direction
	if(!this.check(this.row, this.col)){
		this.direction = oldDirection
		this.code = block_json[this.allType][this.direction]
	}
};
Block.prototype.check = function(row, col){
	// 这个函数 跟牛逼 可以返回 能不能下落
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0){
				// 不可以下落
				return false
			}
		}
	}
	return true
};
Block.prototype.addDie = function(){
	// 添加死亡砖块
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if(this.code[i][j] != 0){
				// this.allType 就是随机出的砖块的形态
				game.map.code[this.row + i][this.col + j] = this.allType
			}
		}
	}
};
Block.prototype.remove = function(){
	// 消行判定 
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 12; j++) {
			if(!game.map.code[i].includes(0)){
				game.map.code.splice(i, 1);
				game.map.code.unshift(Array(12).fill(0));
				score++; 
				$("#remove")[0].play(); 
			}
		}
	}
};