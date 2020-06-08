function create(){  
    group = this.physics.add.group({
        defaultKey: 'rice',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true
    });
    
    for (x = 0; x < 25; x++){
	     var rice = group.create(200 + x * 30, 300).setVelocity(0, 0);
	     rice.setScale(Phaser.Math.Between(8, 24) / 100);
	     rice.setTint(0xffffff * Math.random());
	     
	     rice.body.onWorldBounds = true;
	     this.physics.world.on('worldbounds', playSound);
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
        item.body.velocity.y = -gamma * 18 + (Math.random() * 10);
        item.body.velocity.x = beta * 9 + (Math.random() * 10);
    }, this);
}

function playSound(body){
	sfxToPlay = sfxs[Phaser.Math.Between(0, 7)];
	sfxToPlay.volume = Math.abs(body.gameObject.body.velocity.y) / 12;
	if (sfxToPlay.volume > 1) sfxToPlay.volume = 1;
	
	sfxToPlay.play();
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
