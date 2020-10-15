function CSimpleBetPanel(iX,iY,oParentContainer){
    var _aHorseNames;
    var _aHorseSprite;
    var _aHorseWinOdds;
    var _aHorsePlaceOdds;
    var _aHorseShowOdds;
    var _aButsWin;
    var _aButsPlace;
    var _aButsShow;
    
    var _oContainer;
    var _oParentContainer;
    
    this._init = function(iX,iY){
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("simple_bet_panel"));
        _oContainer.addChild(oBg);
        
        var oText =  new CTLText(_oContainer, 
                    20 + 5, 60, 100, 20, 
                    EngagedNation.Config.Game.text_bet_left_panel_trap_font_size, "center", EngagedNation.Config.Game.text_bet_left_panel_trap_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_left_panel_trap,
                    true, true, false,
                    false );
                    
        
        var oText = new CTLText(_oContainer, 
                    140, 60, 100, 20, 
                    EngagedNation.Config.Game.text_bet_left_panel_win_font_size, "center", EngagedNation.Config.Game.text_bet_left_panel_win_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_left_panel_win,
                    true, true, false,
                    false );
                    
        
        var oText = new CTLText(_oContainer, 
                    250, 60, 100, 20, 
                    EngagedNation.Config.Game.text_bet_left_panel_place_font_size, "center", EngagedNation.Config.Game.text_bet_left_panel_place_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_left_panel_place,
                    true, true, false,
                    false );
                    

        
        var oText = new CTLText(_oContainer, 
                    360, 60, 100, 20, 
                    EngagedNation.Config.Game.text_bet_left_panel_show_font_size, "center", EngagedNation.Config.Game.text_bet_left_panel_show_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_left_panel_show,
                    true, true, false,
                    false );
                    

        
        var oText = new CTLText(_oContainer, 
                    475, 60, 100, 20, 
                    EngagedNation.Config.Game.text_bet_left_panel_trap_font_size, "center", EngagedNation.Config.Game.text_bet_left_panel_trap_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_left_panel_trap,
                    true, true, false,
                    false );
                    

        
        var oText = new CTLText(_oContainer, 
                    585, 60, 100, 20, 
                    EngagedNation.Config.Game.text_bet_left_panel_win_font_size, "center", EngagedNation.Config.Game.text_bet_left_panel_win_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_left_panel_win,
                    true, true, false,
                    false );
                    

        
        var oText = new CTLText(_oContainer, 
                    695, 60, 100, 20, 
                    EngagedNation.Config.Game.text_bet_left_panel_place_font_size, "center", EngagedNation.Config.Game.text_bet_left_panel_place_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_left_panel_place,
                    true, true, false,
                    false );

        
        var oText = new CTLText(_oContainer, 
                    805, 60, 100, 20, 
                    EngagedNation.Config.Game.text_bet_left_panel_show_font_size, "center", EngagedNation.Config.Game.text_bet_left_panel_show_font_color, PRIMARY_FONT, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_left_panel_show,
                    true, true, false,
                    false );

        
        var oSprite = s_oSpriteLibrary.getSprite("bibs");
        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width/4, height: oSprite.height/2},
            animations: {bib_0: [0], bib_1: [1],bib_2:[2],bib_3:[3],bib_4:[4],bib_5:[5],bib_6:[6],bib_7:[7]}
        };

        var oSpriteSheetBib = new createjs.SpriteSheet(oData);
        
        var iYBib = 160;
        var iXBib = 23;
        for(var i=0;i<NUM_HORSES;i++){
            var oBib = createSprite(oSpriteSheetBib,"bib_"+i,0,0,oSprite.width/3, oSprite.height/2);
            oBib.x = iXBib;
            oBib.y = iYBib;
            oBib.scaleX = oBib.scaleY = 0.5;
            _oContainer.addChild(oBib);
            
            if(i === NUM_HORSES/2-1){
                iXBib = 470;
                iYBib = 160;
            }else{
                iYBib += oSprite.height/2 + 45;
            }
            
        }
        
        this._initHorseInfos();
        this._initBetPlaces();
    };
    
    this._initHorseInfos = function(){
        var aNames = s_oGameSettings.getAllHorseNames();
        
        _aHorseNames = new Array();
        _aHorseSprite = new Array();
        var iX = 18;
        var iY = 85;
        for(var i=0;i<NUM_HORSES;i++){
            var oSpriteA = s_oSpriteLibrary.getSprite("horse_"+(i+1)+"_a");
            var oSpriteB = s_oSpriteLibrary.getSprite("horse_"+(i+1)+"_b");
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
            
            var oSpriteSheetHorse = new createjs.SpriteSheet(oData);

            var oHorse = createSprite(oSpriteSheetHorse,"idle",HORSE_WIDTH/2,HORSE_HEIGHT,HORSE_WIDTH, HORSE_HEIGHT);
            oHorse.x = iX;
            oHorse.y = iY;
            oHorse.scaleX = oHorse.scaleY = 0.36;
            _oContainer.addChild(oHorse);
            
            _aHorseSprite.push(oHorse);
            
            var oText = new CTLText(_oContainer, 
                    iX +4, iY, 100, 14, 
                    EngagedNation.Config.Game.text_bet_left_panel_horse_name_font_size, "left", EngagedNation.Config.Game.text_bet_left_panel_horse_name_font_color, EngagedNation.Config.Game.text_bet_left_panel_horse_name_font_family, 1,
                    0, 0,
                    aNames[i].toUpperCase(),
                    true, true, false,
                    false );
                    
            

            
            _aHorseNames[i] = oText;
            
            if(i === NUM_HORSES/2-1){
                iX = 468;
                iY = 85;
            }else{
                iY += 115;
            }
            
        }
    };
    
    this._initBetPlaces = function(){
        _aButsPlace = new Array();
        _aButsShow = new Array();
        _aButsWin = new Array();
        
        _aHorseWinOdds = new Array();
        _aHorsePlaceOdds = new Array();
        _aHorseShowOdds = new Array();
        var iX = 150;
        var iY = 75;
        var oSprite = s_oSpriteLibrary.getSprite("bet_place");
        for(var i=0;i<NUM_HORSES;i++){
            //////////////////BET WIN/////////////////////
            var oText = new createjs.Text(s_oGameSettings.getOddWin(i), "20px " + PRIMARY_FONT, "#fff");
            oText.textAlign = "center";
            oText.textBaseline = "middle";
            oText.x = iX + 18;
            oText.y = iY +104;
            _oContainer.addChild(oText);
            _aHorseWinOdds[i] = oText;
            
            var oBut = new CButBet(oText.x + 20,iY + 50,oSprite,0.7,_oContainer);
            oBut.addEventListenerWithParams(ON_MOUSE_UP,this._onWinClicked,this,i);
            _aButsWin.push(oBut);

            ////////////////BET PLACE////////////////////
            var oText = new createjs.Text(s_oGameSettings.getOddPlace(i), "20px " + PRIMARY_FONT, "#fff");
            oText.textAlign = "center";
            oText.textBaseline = "middle";
            oText.x = iX + 130;
            oText.y = iY+104;
            _oContainer.addChild(oText);
            _aHorsePlaceOdds[i] = oText;
            
            var oBut = new CButBet(oText.x + 20,iY + 50,oSprite,0.7,_oContainer);
            oBut.addEventListenerWithParams(ON_MOUSE_UP,this._onPlaceClicked,this,i);
            _aButsPlace.push(oBut);
            
            //BET SHOW
            var oText = new createjs.Text(s_oGameSettings.getOddShow(i), "20px " + PRIMARY_FONT, "#fff");
            oText.textAlign = "center";
            oText.textBaseline = "middle";
            oText.x = iX + 240;
            oText.y = iY+104;
            _oContainer.addChild(oText);
            _aHorseShowOdds[i] = oText;
            
            var oBut = new CButBet(oText.x + 20,iY + 50,oSprite,0.7,_oContainer);
            oBut.addEventListenerWithParams(ON_MOUSE_UP,this._onShowClicked,this,i);
            _aButsShow.push(oBut);
            
            if(i === NUM_HORSES/2-1){
                iX = 596;
                iY = 75;
            }else{
                iY += 116;
            }
            
        }
    };
    
    this.unload = function(){
        for(var i=0;i<_aButsPlace.length;i++){
            _aButsWin[i].unload();
            _aButsShow[i].unload();
            _aButsPlace[i].unload();
        }
    };
    
    this.setX = function(iX){
        _oContainer.x = iX;
    };
    
    this.clearBet = function(){
        for(var i=0;i<_aHorseSprite.length;i++){
            _aHorseSprite[i].gotoAndStop("idle");
        }
    };
    
    this._onWinClicked = function(iIndex){
        var iFicheValue = CHIP_VALUES[s_oBetPanel.getChipSelected()];
        
        if(s_oBetPanel.setSimpleBet(iIndex,1,iFicheValue,_aButsWin[iIndex])){
            if(_aHorseSprite[iIndex].currentAnimation !== "anim"){
                _aHorseSprite[iIndex].gotoAndPlay("anim");
            }
            _aButsWin[iIndex].increaseBet(iFicheValue);
        }
    };
    
    this._onPlaceClicked = function(iIndex){
        var iFicheValue = CHIP_VALUES[s_oBetPanel.getChipSelected()];
        if(s_oBetPanel.setSimpleBet(iIndex,2,iFicheValue,_aButsPlace[iIndex])){
            
            if(_aHorseSprite[iIndex].currentAnimation !== "anim"){
                _aHorseSprite[iIndex].gotoAndPlay("anim");
            }
            _aButsPlace[iIndex].increaseBet(iFicheValue);
        }
    };
    
    this._onShowClicked = function(iIndex){
        var iFicheValue = CHIP_VALUES[s_oBetPanel.getChipSelected()];
        if(s_oBetPanel.setSimpleBet(iIndex,3,iFicheValue,_aButsShow[iIndex])){
            if(_aHorseSprite[iIndex].currentAnimation !== "anim"){
                _aHorseSprite[iIndex].gotoAndPlay("anim");
            }
            _aButsShow[iIndex].increaseBet(iFicheValue);
        }
    };
    
    this.getContainer = function(){
        return _oContainer;
    };
    
    _oParentContainer = oParentContainer;
    this._init(iX,iY);
}