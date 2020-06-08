function create(){  
	this.physics.world.gravity.y = 60;
	 
    group = this.physics.add.group({
        defaultKey: 'rice',
        bounceX: 0.2,
        bounceY: 0.2,
        collideWorldBounds: true
    });
    
    for (x = 0; x < 10; x++){
	     var rice = group.create(200 + x * 20, 300).setGravity(0, Phaser.Math.Between(465, 515));
	     rice.setScale(0.2);
	     rice.setTint(0xffffff * Math.random());
	     
	     rice.body.onWorldBounds = true;
	     this.physics.world.on('worldbounds', playSound);
    }
    
    loadSfx();

	if (window.DeviceMotionEvent) {
	  	window.addEventListener('devicemotion', deviceMotion);
	}
	
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', handleOrientation);
	}
	
    //plugIns();
    //initAd();
}


function deviceMotion(event){
	accelX = Math.round(event.acceleration.x);
	accelY = Math.round(event.acceleration.y);
	
    Phaser.Actions.Call(group.getChildren(), function(item) {
        item.body.velocity.x = (Math.random() * 5) + accelX * 5;
        item.body.velocity.y = (Math.random() * 5) + accelY * 5;
    }, this);
}

function handleOrientation(event){
	gamma = Math.round(event.gamma);  // -90,90 X	
	beta = Math.round(event.beta);  // -180,180 Y	
	
	Phaser.Actions.Call(group.getChildren(), function(item) {
        item.body.gravity.x = (Math.random() * 5) + gamma / 5;
        item.body.gravity.y = (Math.random() * 5) + beta / 5;
    }, this);
}

function playSound(body){
	if (Math.abs(body.gameObject.body.velocity.y) > 1.8){
		sfxToPlay = sfxs[Phaser.Math.Between(0, 7)];
		sfxToPlay.volume = Math.abs(body.gameObject.body.velocity.y) / 10;
		sfxToPlay.play();
	}
}

function loadSfx(){
	sfx1 = game.sound.add('grain1');
	sfx2 = game.sound.add('grain2');
	sfx3 = game.sound.add('grain3');
	sfx4 = game.sound.add('grain4');
	sfx5 = game.sound.add('grain5');
	sfx6 = game.sound.add('grain6');
	sfx7 = game.sound.add('grain7');
	sfx8 = game.sound.add('grain8');
	
	sfxs = [sfx1, sfx2, sfx3, sfx4, sfx5, sfx6, sfx7, sfx8];
}

function plugIns(){
	try{
		window.plugins.insomnia.keepAwake();
	} catch(e){}
	try{
	    StatusBar.hide();
	} catch(e){} 
}

function initAd(){
	admobid = {
    	banner: 'ca-app-pub-9795366520625065/6208375739'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true
	});
}
