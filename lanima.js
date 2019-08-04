class LAnima { //v 1.0
	constructor(scalexy) {
		if(scalexy === undefined)
			this.scaleXY = '0.62';
		else
			this.scaleXY = scalexy;
			
		this.data_list = ['data-effect', 'data-time', 'data-top', 'data-bottom', 'data-left', 'data-right', 'data-scale', 'data-opacity', 'data-styles'];	
		this.all = document.getElementsByClassName('lanima');
		this.flag = false;
	}
	start(){
		for (var i = 0; i < this.all.length; i++) {
			this.all[i]['data'] = this.get_attr(this.all[i]);
			this.all[i].style.opacity = this.all[i]['data']['data-opacity'];
			if(this.all[i]['data']['data-time'] === 0)
				this.all[i]['data']['data-time'] = "0.3";
			switch (this.all[i]['data']['data-effect']) {
			case 'line':
				if(this.all[i]['data']['data-top'] !== 0)
					this.all[i]['data']['data-top'] = '-' + this.all[i]['data']['data-top'];
				else
					this.all[i]['data']['data-top'] = this.all[i]['data']['data-bottom'];
				
				if(this.all[i]['data']['data-left'] !== 0)
					this.all[i]['data']['data-left'] = '-' + this.all[i]['data']['data-left'];
				else
					this.all[i]['data']['data-left'] = this.all[i]['data']['data-right'];
				this.all[i].style.transform = 'scaleX(' + this.scaleXY + ') translate(' + this.all[i]['data']['data-left'] + ', ' + this.all[i]['data']['data-top'] + ')';
				break;
			case 'scale':
				this.all[i].style.transform = 'scale(' + this.all[i]['data']['data-scale'] + ')';
				break;
			case 'my':
				this.all[i].style.transform = this.all[i]['data']['data-styles'];
				break;
			}	
		}
		this.ready();
	}
	get_attr(el){
		var arr = [];
		var tmp;
		for(var i = 0; i < this.data_list.length; i++){
			tmp = el.getAttribute( this.data_list[i] );
			if(tmp === null)
				tmp = 0;
			arr[ this.data_list[i] ] = tmp;
		}
		return arr;
	}
	ready(){
		this.flag = true;
	}
	go(){
		if(this.flag){
			for (var i = 0; i < this.all.length; i++) {
				this.all[i].style.transition = this.all[i]['data']['data-time'] + 's';
				this.all[i].style.opacity = '1';
				
				this.all[i].style.transform = 'none';
			}
		}else{
			this.go();
		}
	}
}
let lanima = new LAnima();
lanima.start();

window.addEventListener("load", function(){
	lanima.go()
});
