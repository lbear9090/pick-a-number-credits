function CGame() {
    var _bUpdate;

    var _iTimeElaps;

    var _oInterface;

    var _oInstructionBox;

    this._init = function () {
        _bUpdate = false;

        
        setVolume("soundtrack", 0);

        _oInterface = new CInterface();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        var oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_main"));
        _oContainer.addChild(oBg);

        playSound("start_race",1,0);

        if (!s_isInstructionDisplayed) {
            s_isInstructionDisplayed = true;
            _oInstructionBox = new CInstructionBox();
            _oInstructionBox.show();
        }

        this.refreshButtonPos();
    };
    
    this.unload = function () {
        stopSound("start_race");
        _oInterface.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        
        s_oGame = null;
    };

    this.refreshButtonPos = function () {
        _oInterface.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.pause = function(){
        _bUpdate = false;
        pauseSound("start_race");
    };
    
    this.unpause = function(){
        _bUpdate = true;
        playSound("start_race");
    };

    this.openGame = function () {
        
    };

    this.onExit = function () {
        setVolume("soundtrack", 1);
        
        s_oGame.unload();
    };
    
    this.update = function () {
        if(!_bUpdate){
            return;
        }
    };

    s_oGame = this;

    this._init();
}

var s_oGame = null;
var s_oTweenController;