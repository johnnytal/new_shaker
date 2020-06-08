function create(){  
    group = this.physics.add.group({
        defaultKey: 'rice',
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true
    });
    
    blues = [
    	'C3','Eb3','F3','F#3','G3','Bb3',
   		'C4','Eb4','F4','F#4','G4','Bb4'
    ];
    
    osces = [];
    reverbs = [];
    rices = [];
    
    for (x = 0; x < 10; x++){
	     var rice = group.create(200 + x * 50, 300).setVelocity(0, 0);
	     rice.setScale(Phaser.Math.Between(12, 36) / 100);
	     rice.setTint(0xffffff * Math.random());
	     
	     rice.body.onWorldBounds = true;
	     this.physics.world.on('worldbounds', playSound);
	     
		 rices.push(rice);
		
	     osces[x] = T("cosc", {wave: 'tri', beats: 5, mul: 0.2});
	     reverbs[x] = T("reverb", {room:0.9, damp:0.4, mix: 0.5}, osces[x]);
	     
	     frequency = teoria.note(blues[x]).fq();
	     osces[x].set({freq: frequency});
    }
    
    //loadSfx();
	
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
	index = rices.indexOf(body.gameObject);
    T("perc", {a: 30, d:150, s:300, r: 100}, reverbs[index]).on("ended", function() {}).bang().play();
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
