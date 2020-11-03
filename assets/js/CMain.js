function CMain() {
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    var _oPreloader;
    var _oMenu;
    var _oGame;

    var _isCashOutVisible = false;
    var _numberOfRace = 0;
    var _isUnlimitedRace = false;

    this.initContainer = function () {
        // Override default settings.
        PRIMARY_FONT = EngagedNation.Config.Game.text_general_font_family;

        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
	    s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage);

        s_bMobile = jQuery.browser.mobile;
        if (s_bMobile === false) {
            s_oStage.enableMouseOver(10);
            $('body').on('contextmenu', '#canvas', function (e) {
                return false;
            });
        }

        s_iPrevTime = new Date().getTime();

        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(FPS);

        if (navigator.userAgent.match(/Windows Phone/i)) {
            DISABLE_SOUND_MOBILE = true;
        }

        s_oSpriteLibrary = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };

    this.preloaderReady = function () {
        s_oGameSettings = new CGameSettings();

        s_oMain._loadImages();
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            s_oMain._initSounds();
        }
        _bUpdate = true;
    };
    

    
    this.soundLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
    };

    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);

        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({fileMp3: EngagedNation.Config.Game.audio_chip_mp3, fileOgg: EngagedNation.Config.Game.audio_chip_ogg, loop:false, volume:1, ingamename: 'chip'});
        s_aSoundsInfo.push({fileMp3: EngagedNation.Config.Game.audio_click_mp3, fileOgg: EngagedNation.Config.Game.audio_click_ogg, loop:false, volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({fileMp3: EngagedNation.Config.Game.audio_start_race_mp3, fileOgg: EngagedNation.Config.Game.audio_start_race_ogg, loop:false, volume:1, ingamename: 'start_race'});
        s_aSoundsInfo.push({fileMp3: EngagedNation.Config.Game.audio_photo_mp3, fileOgg: EngagedNation.Config.Game.audio_photo_ogg, loop:false, volume:1, ingamename: 'photo'});
        s_aSoundsInfo.push({fileMp3: EngagedNation.Config.Game.audio_soundtrack_mp3, fileOgg: EngagedNation.Config.Game.audio_soundtrack_ogg, loop:false, volume:1, ingamename: 'soundtrack'});
        s_aSoundsInfo.push({fileMp3: EngagedNation.Config.Game.audio_cash_out_mp3, fileOgg: EngagedNation.Config.Game.audio_cash_out_ogg, loop:false, volume:1, ingamename: 'cash_out'});

        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<s_aSoundsInfo.length; i++){
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }
        
    };  
    
    this.tryToLoadSound = function(oSoundInfo, bDelay){
        
       setTimeout(function(){        
            s_aSounds[oSoundInfo.ingamename] = new Howl({ 
                src: [
                    oSoundInfo.fileOgg,
                    oSoundInfo.fileMp3
                ],
                autoplay: false,
                preload: true,
                loop: oSoundInfo.loop, 
                volume: oSoundInfo.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(szId,szMsg){
                    for(var i=0; i < s_aSoundsInfo.length; i++){
                            if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                                break;
                            }
                    }
                },
                onplayerror: function(szId) {
                    for(var i=0; i < s_aSoundsInfo.length; i++){
                        if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                            s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function() {
                            s_aSounds[s_aSoundsInfo[i].ingamename].play();
                            if(s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null){
                                setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);
                            }

                            });
                            break;
                        }
                    }     
                } 
            });
            
        }, (bDelay ? 200 : 0) );
        
        
    };



    this._loadImages = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);

        s_oSpriteLibrary.addSprite("but_exit", EngagedNation.Config.Game.img_btn_exit);
        s_oSpriteLibrary.addSprite("audio_icon", EngagedNation.Config.Game.img_audio_icon);

        s_oSpriteLibrary.addSprite("msg_box", EngagedNation.Config.Game.img_msg_box);
        s_oSpriteLibrary.addSprite("instruction_panel", EngagedNation.Config.Game.img_instruction_panel);
        s_oSpriteLibrary.addSprite("box", EngagedNation.Config.Game.img_box);
        s_oSpriteLibrary.addSprite("bg_main", EngagedNation.Config.Game.img_bg_main);

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };

    this._onImagesLoaded = function () {
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource / RESOURCE_TO_LOAD * 100);
        _oPreloader.refreshLoader(iPerc);
    };

    this._onAllImagesLoaded = function () {
        
    };

    this.onAllPreloaderImagesLoaded = function () {
        this._loadImages();
    };
    
    this._onRemovePreloader = function(){
        try{
            saveItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }
        
        _oPreloader.unload();

        s_oSoundTrack = playSound("soundtrack",1,true);
        
        

        this.gotoGame();
    };
    
    this.setMoney = function(iMoney){
        
        
    };
    
    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoGame = function () {
        _oGame = new CGame();
        _iState = STATE_GAME;
    };

    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }
        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
        }
        
    };

    this._update = function (event) {
        if (_bUpdate === false) {
            return;
        }
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;

        if (s_iCntTime >= 1000) {
            s_iCurFps = s_iCntFps;
            s_iCntTime -= 1000;
            s_iCntFps = 0;
        }

        if (_iState === STATE_GAME) {
            _oGame.update();
        }

        s_oStage.update(event);

    };

    s_oMain = this;

    AD_SHOW_COUNTER = 0;

    ENABLE_FULLSCREEN = false;
    ENABLE_CHECK_ORIENTATION = false;

    s_bAudioActive = EngagedNation.Config.Game.game_play_audio_enabled_on_startup;

    this.initContainer();
}

var s_bMobile;
var s_bAudioActive = true;
var s_bFullscreen = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_bStorageAvailable = true;
var s_iCurMoney;
var s_iAdCounter = 0;
var s_aSounds;

var s_isInstructionDisplayed = false;