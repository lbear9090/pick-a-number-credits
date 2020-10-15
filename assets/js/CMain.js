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
        COLOR_FICHES = [];
        for (var i = 1; i <= 6; i++) COLOR_FICHES.push(EngagedNation.Config.Game['text_bet_right_panel_chip_0' + i + '_color']);
    
        HORSE_DATA.horse_names = [];
        HORSE_DATA.odd_win_bet = [];
        HORSE_DATA.odd_place_bet = [];
        HORSE_DATA.odd_show_bet = [];

        for(var i = 1; i <= 8; i++) {
            HORSE_DATA.horse_names.push(EngagedNation.Config.Game['game_play_horse_0' + i + '_name']);
            HORSE_DATA.odd_win_bet.push(EngagedNation.Config.Game['game_play_horse_0' + i + '_win_bet']);
            HORSE_DATA.odd_place_bet.push(EngagedNation.Config.Game['game_play_horse_0' + i + '_place_bet']);
            HORSE_DATA.odd_show_bet.push(EngagedNation.Config.Game['game_play_horse_0' + i + '_show_bet']);
        }

        var forecastDefaults = HORSE_DATA.forecast;
        HORSE_DATA.forecast = []; // Overrides odds only.
        $.each(
            forecastDefaults,
            function(index, key) {
                HORSE_DATA.forecast.push(
                    {
                        first: key.first,
                        second: key.second,
                        odd: EngagedNation.Config.Game['game_play_forecast_0' + key.first + '_0' + key.second + '_win_bet']
                    }
                );
            }
        );

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
        s_oGameSettings = new CGameSettings(HORSE_DATA);
        s_oBetList = new CBetList();
        
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

        // s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_exit", EngagedNation.Config.Game.img_btn_exit);
        s_oSpriteLibrary.addSprite("audio_icon", EngagedNation.Config.Game.img_audio_icon);
        // s_oSpriteLibrary.addSprite("but_play", EngagedNation.Config.Game.img_btn_play);
        // s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        // s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("msg_box", EngagedNation.Config.Game.img_msg_box);
        // s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        // s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        // s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        // s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        // s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("arrow_left", EngagedNation.Config.Game.img_btn_arrow_left);
        s_oSpriteLibrary.addSprite("arrow_right", EngagedNation.Config.Game.img_btn_arrow_right);
        s_oSpriteLibrary.addSprite("fiche_0", EngagedNation.Config.Game.img_fiche_01);
        s_oSpriteLibrary.addSprite("fiche_1", EngagedNation.Config.Game.img_fiche_02);
        s_oSpriteLibrary.addSprite("fiche_2", EngagedNation.Config.Game.img_fiche_03);
        s_oSpriteLibrary.addSprite("fiche_3", EngagedNation.Config.Game.img_fiche_04);
        s_oSpriteLibrary.addSprite("fiche_4", EngagedNation.Config.Game.img_fiche_05);
        s_oSpriteLibrary.addSprite("fiche_5", EngagedNation.Config.Game.img_fiche_06);
        s_oSpriteLibrary.addSprite("bg_bet_panel", EngagedNation.Config.Game.img_bet_panel);
        s_oSpriteLibrary.addSprite("money_panel", EngagedNation.Config.Game.img_money_panel);
        s_oSpriteLibrary.addSprite("simple_bet_panel", EngagedNation.Config.Game.img_simple_bet_panel);
        s_oSpriteLibrary.addSprite("forecast_panel", EngagedNation.Config.Game.img_forecast_panel);
        s_oSpriteLibrary.addSprite("bet_place", EngagedNation.Config.Game.img_bet_place);
        s_oSpriteLibrary.addSprite("fiche_highlight", EngagedNation.Config.Game.img_fiche_highlight);
        s_oSpriteLibrary.addSprite("odd_bg", EngagedNation.Config.Game.img_odd);
        s_oSpriteLibrary.addSprite("rank_panel", EngagedNation.Config.Game.img_rank_panel);
        s_oSpriteLibrary.addSprite("panel_arrival", EngagedNation.Config.Game.img_panel_arrival);
        s_oSpriteLibrary.addSprite("bibs", EngagedNation.Config.Game.img_bibs);

        s_oSpriteLibrary.addSprite("but_skip", EngagedNation.Config.Game.img_btn_continue);
        s_oSpriteLibrary.addSprite("but_collect", EngagedNation.Config.Game.img_btn_collect);

        // s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("but_start_race", EngagedNation.Config.Game.img_btn_start_race);
        s_oSpriteLibrary.addSprite("but_start_race_unli", EngagedNation.Config.Game.img_btn_start_race_unli);
        s_oSpriteLibrary.addSprite("but_cash_out", EngagedNation.Config.Game.img_btn_cash_out);
        s_oSpriteLibrary.addSprite("but_clear_bet", EngagedNation.Config.Game.img_btn_clear_bet);
        s_oSpriteLibrary.addSprite("fiche_panel", EngagedNation.Config.Game.img_fiche_panel);
        s_oSpriteLibrary.addSprite("fill_bar", EngagedNation.Config.Game.img_fill_bar);
        s_oSpriteLibrary.addSprite("win_panel", EngagedNation.Config.Game.img_win_panel);
        s_oSpriteLibrary.addSprite("lose_panel", EngagedNation.Config.Game.img_lose_panel);

        s_oSpriteLibrary.addSprite("bg_track", EngagedNation.Config.Game.img_bg_track);
        s_oSpriteLibrary.addSprite("instruction_panel", EngagedNation.Config.Game.img_instruction_panel);
        
        for(var i=0;i<NUM_HORSES;i++){
            s_oSpriteLibrary.addSprite("bib_gui_"+i, "./assets/sprites/bib_gui_"+i+".png");
            s_oSpriteLibrary.addSprite("horse_"+(i+1)+"_a", "./assets/sprites/horse_"+(i+1)+"_a.png");
            s_oSpriteLibrary.addSprite("horse_"+(i+1)+"_b", "./assets/sprites/horse_"+(i+1)+"_b.png");
            s_oSpriteLibrary.addSprite("cage_"+i, "./assets/sprites/cage_"+i+".png");
            s_oSpriteLibrary.addSprite("gate_"+i, "./assets/sprites/cage_gates/gate_"+i+".png");
        }
        
        s_oSpriteLibrary.addSprite("cage_"+NUM_HORSES, "./assets/sprites/cage_"+NUM_HORSES+".png");
        s_oSpriteLibrary.addSprite("gate_"+NUM_HORSES, "./assets/sprites/cage_gates/gate_"+NUM_HORSES+".png");
        
        /*
        for(var j=0;j<NUM_TRACK_BG;j++){
            s_oSpriteLibrary.addSprite("bg_track_"+j, "./assets/sprites/bg_track/bg_track_"+j+".jpg");
        }
        */

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
        
        

        this.gotoBetPanel();
    };
    
    this.setMoney = function(iMoney){
        
        
    };
    
    this.gotoMenu = function () {
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoBetPanel = function(){
        var cBetPanel = new CBetPanel();
        _iState = STATE_BET_PANEL;
        $(s_oMain).trigger("start_session");

        if (_isCashOutVisible) {
            cBetPanel._showCashOut();
            return;
        }
        _isCashOutVisible = true;
        cBetPanel._hideCashOut();
    };
    
    this.gotoGame = function (_iTotBet) {
        this.setNumberOfRace(this.getNumberOfRace() - 1);

        _oGame = new CGame(_iTotBet);
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

    this.getNumberOfRace = function() {
        return _numberOfRace;
    };

    this.setNumberOfRace = function(value) {
        _numberOfRace = value;
    }

    this.getIsUnlimitedRace = function() {
        return _isUnlimitedRace;
    }

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

    s_iCurMoney = EngagedNation.Config.Game.game_play_user_credits;
    _numberOfRace = EngagedNation.Config.Game.game_play_number_of_race;
    _isUnlimitedRace = EngagedNation.Config.Game.game_play_is_unlimited_race;
    
    CHIP_VALUES = [];
    for(var i = 1; i < 7; i++) CHIP_VALUES.push(EngagedNation.Config.Game['game_play_chip_0' + i + '_value']);

    MIN_BET = EngagedNation.Config.Game.game_play_min_bet;
    MAX_BET = EngagedNation.Config.Game.game_play_max_bet;
    AD_SHOW_COUNTER = 0;
    
    SHOW_CREDITS = false;
    ENABLE_FULLSCREEN = false;
    ENABLE_CHECK_ORIENTATION = false;
    
    NUM_CHIPS = 6;
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