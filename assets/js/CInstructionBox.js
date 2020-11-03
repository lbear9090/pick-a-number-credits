function CInstructionBox(){
    
    var _oBg;
    var _oGroup;
    
    this._init = function(){
        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        s_oStage.addChild(_oGroup);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('instruction_panel'));
        _oGroup.addChild(_oBg);

        this._initListener();
    };
    
    this.unload = function(){
        _oBg.unload();
    };
    
    this.show = function(){
        _oGroup.visible = true;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500);
    };
    
    this._onExit = function(){
        _oGroup.visible = false;
        s_oGame.openGame();
    };

    this._initListener = function () {
        _oBg.on("pressup", this._onExit);
    };
    
    this._init();
    
    return this;
}