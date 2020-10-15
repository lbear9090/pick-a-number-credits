function CWinPanel(oParentContainer){
    var _iWidthBib;
    var _iHeightBib;
    var _oSpriteSheetBib;
    var _oListener;
    
    var _oButSkip;
    var _oWinText;
    var _oContainer;
    var _oParentContainer;

    var _oCurMoney = 0;
    var _isCashOut = false;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        _oListener = _oContainer.on("click",function(){});
        _oContainer.visible = false;
        _oParentContainer.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("win_panel"));
        _oContainer.addChild(oBg);
        
        var oSprite = s_oSpriteLibrary.getSprite("bibs");
        _iWidthBib = oSprite.width/4;
        _iHeightBib = oSprite.height/2;
        
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: _iWidthBib, height: _iHeightBib},
            animations: {bib_0: [0], bib_1: [1],bib_2:[2],bib_3:[3],bib_4:[4],bib_5:[5],bib_6:[6],bib_7:[7]}
        };

        _oSpriteSheetBib = new createjs.SpriteSheet(oData);
        
        _oWinText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2+40, 470, 120, 80, 
                    EngagedNation.Config.Game.text_bet_win_panel_font_size, "center", EngagedNation.Config.Game.text_bet_win_panel_font_color, EngagedNation.Config.Game.text_bet_win_panel_font_family, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_win_panel,
                    true, true, true,
                    false );
                    
    };
    
    this.unload = function(){
        _oContainer.off("click",_oListener);
        _oButSkip.unload();
    };
    
    this.show = function(iWin,aWinList,aRank,s_iCurMoney){
        _oCurMoney = s_iCurMoney;
        _oWinText.refreshText(EngagedNation.Config.Game.text_bet_win + "\n" + EngagedNation.Config.Game.text_currency + iWin);

        //ADD HORSE SPRITES
        var iY = 240;
        for(var j=0;j<3;j++){
            var oSpriteA = s_oSpriteLibrary.getSprite("horse_"+(aRank[j]+1)+"_a");
            var oSpriteB = s_oSpriteLibrary.getSprite("horse_"+(aRank[j]+1)+"_b");
            var oData = {
                images: [oSpriteA,oSpriteB],
                // width, height & registration point of each sprite
                "frames": [
                            [1, 1, 249, 191, 0, -56, -19],
                            [252, 1, 307, 193, 0, -8, -19],
                            [561, 1, 308, 196, 0, -4, -16],
                            [1, 199, 307, 198, 0, -2, -14],
                            [310, 199, 306, 201, 0, -1, -11],
                            [618, 199, 307, 205, 0, 0, -7],
                            [1, 406, 305, 209, 0, -1, -3],
                            [308, 406, 304, 211, 0, -3, -1],
                            [614, 406, 301, 209, 0, -8, 0],
                            [1, 619, 295, 207, 0, -17, -2],
                            [298, 619, 295, 204, 0, -19, -5],
                            [595, 619, 301, 203, 0, -21, -8],
                            [1, 1, 284, 200, 1, -35, -11],
                            [287, 1, 293, 198, 1, -31, -14],
                            [582, 1, 306, 196, 1, -20, -16]
                        ],
                animations: {idle: [1,1], anim: [1,14],start:[15],anim_1:[1,14,"anim"],anim_2:[6,14,"anim"],anim_3:[11,14,"anim"]}
            };

            var oSpriteSheet = new createjs.SpriteSheet(oData);
            
            var oHorse = createSprite(oSpriteSheet,"idle",HORSE_WIDTH/2,HORSE_HEIGHT,HORSE_WIDTH,HORSE_HEIGHT);
            oHorse.scaleX = oHorse.scaleY = 0.35;
            oHorse.x = CANVAS_WIDTH/2 + 90;
            oHorse.y = iY;
            _oContainer.addChild(oHorse);
            
            iY += 68;
        }
        
        //ADD WIN LIST
        var iY = CANVAS_HEIGHT/2 -150;
        for(var i=0;i<aWinList.length;i++){
            var _iXOffset, iXOffset;

            if(aWinList[i].type === "forecast"){
                var aBibs = aWinList[i].horses;
                var oBib1 = createSprite(_oSpriteSheetBib,"bib_"+aBibs[0],0,0,_iWidthBib,_iHeightBib);
                oBib1.x = 310;
                oBib1.y = iY;
                oBib1.scaleX = oBib1.scaleY = 0.5;
                _oContainer.addChild(oBib1);
                
                var oText = new createjs.Text("X", "20px " + PRIMARY_FONT, "#fff");
                oText.textAlign = "center";
                oText.textBaseline = "middle";
                oText.x = oBib1.x + _iWidthBib*0.5 + 10;
                oText.y = iY +18;
                _oContainer.addChild(oText);
                
                var oBib2 = createSprite(_oSpriteSheetBib,"bib_"+aBibs[1],0,0,_iWidthBib,_iHeightBib);
                oBib2.x = oText.x + 10;
                oBib2.y = iY;
                oBib2.scaleX = oBib2.scaleY = 0.5;
                _oContainer.addChild(oBib2);
                
                _iXOffset = oBib1.x + 35;
                iXOffset = oBib2.x + 35;
            }else{
                var oBib1 = createSprite(_oSpriteSheetBib,"bib_"+aWinList[i].horses,0,0,_iWidthBib,_iHeightBib);
                oBib1.x = 310;
                oBib1.y = iY;
                oBib1.scaleX = oBib1.scaleY = 0.5;
                _oContainer.addChild(oBib1);
                
                iXOffset = oBib1.x + 35;
            }
            
            var oTextType = new CTLText(_oContainer, 
                    iXOffset, iY + 8, 80, 20, 
                    EngagedNation.Config.Game.text_bet_win_list_font_size, "left", EngagedNation.Config.Game.text_bet_win_list_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    (aWinList[i].type).toUpperCase(),
                    true, true, false,
                    false );
                    
           
            
            var oTextWin = new CTLText(_oContainer, 
                    ((_iXOffset) ? _iXOffset : iXOffset) + 170, iY + 8, 80, 20, 
                    EngagedNation.Config.Game.text_bet_win_panel_value_font_size, "right", EngagedNation.Config.Game.text_bet_win_panel_value_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_currency + aWinList[i].win,
                    true, true, false,
                    false );
                    
       
            
            iY += 35;
        }

        isTextLonger = (EngagedNation.Config.Game.text_bet_lose_panel).length > 22;
        if (aWinList.length === 0) {
            var textLose = new CTLText(_oContainer, 
                310, iY + 8, 280, isTextLonger ? 250 : 230, 
                EngagedNation.Config.Game.text_bet_lose_panel_font_size, "center", EngagedNation.Config.Game.text_bet_lose_panel_font_color, PRIMARY_FONT, 1,
                0, 0,
                EngagedNation.Config.Game.text_bet_lose_panel,
                true, true, isTextLonger ? true : false,
                false
            );
        }

        _oButSkip = new CGfxButton(860,510,s_oSpriteLibrary.getSprite(_oCurMoney == 0 ? 'but_collect' : 'but_skip'),_oContainer);
        _oButSkip.addEventListener(ON_MOUSE_UP,this.onSkip,this);
        
        _oContainer.visible = true;
        _oContainer.alpha = 0;
        createjs.Tween.get(_oContainer).wait(1000).to({alpha: 1}, 500,createjs.Ease.cubicOut);
    };
    
    this.onSkip = function(){
        if (_isCashOut) return;

        if (_oCurMoney == 0 || (s_oMain.getNumberOfRace() == 0 && !s_oMain.getIsUnlimitedRace())) {
            _isCashOut = true;
            playSound('cash_out', 1);
            EngagedNation.Game.addPostMessage(
                {
                    status: 'complete',
                    score: _oCurMoney
                }
            );

            return;
        }

        s_oGame.returnInBetPanel();
    };
    
    _oParentContainer = oParentContainer;
    this._init();
}