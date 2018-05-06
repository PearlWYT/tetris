function Game(){
	this.init();
	this.start();
	this.block = new Block()
	this.map = new Map();
	this.bindEvent();
}
Game.prototype.init = function(){
	this.$dom = $("<table></table>")
	var tr, td;
	for (var i = 0; i < 20; i++) {
		tr = $('<tr></tr>')
		for (var j = 0; j < 12; j++) {
			td = $('<td></td>');
			tr.append(td)
		}
		this.$dom.append(tr)
	}
	$("#app").append(this.$dom)
};
Game.prototype.setClass = function(row,col,classname){
	$('tr').eq(row).children('td').eq(col).attr('class',classname)
};
Game.prototype.clear = function(row,col,classname){
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 12; j++) {
			$('tr').eq(i).children('td').eq(j).attr('class','')
		}
	}
};
Game.prototype.bindEvent = function(row,col,classname){
	var self = this;
	$(document).keyup(function(event) {
		if(event.keyCode == 32){
			self.block.moveDown()
		}else if(event.keyCode == 37){
			self.block.left();
			$("#click")[0].load();
			// $("#click")[0].volume = 0.1;
			$("#click")[0].play();
		}else if(event.keyCode == 38){
			self.block.rotate()
			$("#rotate")[0].load();
			$("#rotate")[0].play();
		}else if(event.keyCode == 39){
			self.block.right();
			$("#click")[0].load();
			// $("#click")[0].volume = 0.1;
			$("#click")[0].play();
		}
		if(event.ctrlKey && event.keyCode == 37){
			self.block.moveLeft();
		}
		if(event.ctrlKey && event.keyCode == 39){
			self.block.moveRight();
		}
	});
	$(".btnClose").click(function(){
		$('.gameover').hide()
	})
};
var f = 0;
var score = 0;
Game.prototype.start = function(){
	var self = this;
	this.timer = setInterval(function(){
		f++;
		self.clear();
		f % 30 == 0 && self.block.down()
		self.map.render()
		self.block.render()
		$('#info').text(`帧编号：${f}`)
		$('#score').text(`分数：${score}`)
	}, 20)
};
