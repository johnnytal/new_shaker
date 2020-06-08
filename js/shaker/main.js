function create(){  
    group = this.physics.add.group({
        defaultKey: 'rice',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true
    });
    
    rices = [];
    
    resetSound = true;
    
    for (x = 0; x < 10; x++){
	     var rice = group.create(200 + x * 50, 300).setVelocity(0, 0);
	     rice.setScale(Phaser.Math.Between(12, 36) / 100);
	     rice.setTint(0xffffff * Math.random());
	     
	     rice.body.onWorldBounds = true;
	     this.physics.world.on('worldbounds', playSound);
	     
	     rices[x] = rice;
    }
    
    loadSfx();
	
	if (window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', handleOrientation);
	}
	
    plugIns();
    //initAd();
}

function handleOrientation(event){
	gamma = Math.round(event.gamma);  // -90,90	
	beta = Math.round(event.beta);  // -180,180
	
	Phaser.Actions.Call(group.getChildren(), function(item) {
        item.body.velocity.y = -gamma * 18 + (Math.random() * 10) - item.displayWidth * 7;
        item.body.velocity.x = beta * 9 + (Math.random() * 10);
    }, this);
}

function playSound(body){
	var item = body.gameObject;
    
    var sfxToPlay = sfxs[Phaser.Math.Between(0, sfxs.length-1)];
    
    if (resetSound){ // resetSound for each sprite indivdually!
    	sfxToPlay.setVolume = item.body.velocity.y / 7;
    	
    	sfxToPlay.play();
    	
    	resetSound = false;
    	setTimeout(function(){
    		resetSound = true;
    	}, 500);
    }
}

function loadSfx(){
	sfx1 = game.sound.add('grain1');
	sfx2 = game.sound.add('grain2');
	sfx3 = game.sound.add('grain3');
	sfx4 = game.sound.add('grain4');
	sfx5 = game.sound.add('grain5');
	
	sfxs = [sfx1, sfx2, sfx3, sfx4, sfx5];
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