function CChipPanel(iX,iY,oParentContainer){
    
    var _aChipButtons;
    
    var _oChipHighlight;
    var _oTextMoney;
    var _oTextMinBet;
    var _oTextMaxBet;
    var _oTextBet;
    var _oButStartRace;
    var _oClearBet;
    var _oContainer;
    var _oParentContainer;

    var _oCashOut;
    var _isCashOut = false;
    
    this._init = function(iX,iY){
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY - 35;
        _oParentContainer.addChild(_oContainer);

        _oCashOut = new CTextButton(73,360,s_oSpriteLibrary.getSprite("but_cash_out"), EngagedNation.Config.Game.text_button_cash_out, PRIMARY_FONT, EngagedNation.Config.Game.text_button_cash_out_font_color, EngagedNation.Config.Game.text_button_cash_out_font_size,_oContainer);
        _oCashOut.addEventListener(ON_MOUSE_UP,this._onCashOut,this);
        
        
        _oClearBet = new CTextButton(73,2,s_oSpriteLibrary.getSprite("but_clear_bet"), EngagedNation.Config.Game.text_button_clear, PRIMARY_FONT, EngagedNation.Config.Game.text_button_clear_font_color, EngagedNation.Config.Game.text_button_clear_font_size,_oContainer);
        _oClearBet.addEventListener(ON_MOUSE_UP,this._onClearBet,this);
        
        var oSprite = s_oSpriteLibrary.getSprite("money_panel");
        var oMinMaxBet = createBitmap(s_oSpriteLibrary.getSprite("money_panel"));
        oMinMaxBet.regX = oSprite.width/2;
        oMinMaxBet.x = 73;
        oMinMaxBet.y = 22;
        _oContainer.addChild(oMinMaxBet);
        
        _oTextMinBet = new CTLText(_oContainer, 
                    18, 32, 110, 14, 
                    EngagedNation.Config.Game.text_bet_right_panel_font_size, "center", EngagedNation.Config.Game.text_bet_right_panel_font_color, EngagedNation.Config.Game.text_bet_right_panel_font_family, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_right_panel_min + ': ' + EngagedNation.Config.Game.text_currency + MIN_BET,
                    true, true, false,
                    false );
                    

        
        _oTextMaxBet = new CTLText(_oContainer, 
                    18, 44, 110, 14, 
                    EngagedNation.Config.Game.text_bet_right_panel_font_size, "center", EngagedNation.Config.Game.text_bet_right_panel_font_color, EngagedNation.Config.Game.text_bet_right_panel_font_family, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_right_panel_max + ': ' + EngagedNation.Config.Game.text_currency + MAX_BET,
                    true, true, false,
                    false );
                    

        
        var oMoneyBg = createBitmap(s_oSpriteLibrary.getSprite("money_panel"));
        oMoneyBg.regX = oSprite.width/2;
        oMoneyBg.x = 73;
        oMoneyBg.y = 72;
        _oContainer.addChild(oMoneyBg);
        
        var oText = new CTLText(_oContainer, 
                    5, 74, 40, 12, 
                    EngagedNation.Config.Game.text_bet_right_panel_bet_font_size, "left", EngagedNation.Config.Game.text_bet_right_panel_bet_font_color, EngagedNation.Config.Game.text_bet_right_panel_bet_font_family, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_right_panel_bet,
                    true, true, false,
                    false );
                    
     
        
        _oTextBet = new CTLText(_oContainer, 
                    18, 82, 110, 26, 
                    EngagedNation.Config.Game.text_bet_right_panel_bet_value_font_size, "center", EngagedNation.Config.Game.text_bet_right_panel_bet_value_font_color, EngagedNation.Config.Game.text_bet_right_panel_bet_value_font_family, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_currency + '0',
                    true, true, false,
                    false );
                    
        
       
        
        var oMoneyBg = createBitmap(oSprite);
        oMoneyBg.regX = oSprite.width/2;
        oMoneyBg.x = 73;
        oMoneyBg.y = 122;
        _oContainer.addChild(oMoneyBg);
        
        var oText = new CTLText(_oContainer, 
                    5, 124, 40, 12, 
                    EngagedNation.Config.Game.text_bet_right_panel_credits_font_size, "left", EngagedNation.Config.Game.text_bet_right_panel_credits_font_color, EngagedNation.Config.Game.text_bet_right_panel_credits_font_family, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_bet_right_panel_credits,
                    true, true, false,
                    false );
                    

        
        _oTextMoney = new CTLText(_oContainer, 
                    18, 132, 110, 26, 
                    EngagedNation.Config.Game.text_bet_right_panel_credits_value_font_size, "center", EngagedNation.Config.Game.text_bet_right_panel_credits_value_font_color, EngagedNation.Config.Game.text_bet_right_panel_credits_value_font_family, 1,
                    0, 0,
                    EngagedNation.Config.Game.text_currency + s_iCurMoney,
                    true, true, false,
                    false );
                    

        
        this._initChips();

        _oButStartRace = new CButStartRace(
            73,
            304,
            s_oSpriteLibrary.getSprite((!s_oMain.getIsUnlimitedRace()) ? 'but_start_race' : 'but_start_race_unli'), 
            (!s_oMain.getIsUnlimitedRace()) ? s_oMain.getNumberOfRace() : '', 
            EngagedNation.Config.Game.text_number_of_race_font_color, 
            EngagedNation.Config.Game.text_number_of_race_font_size, 
            EngagedNation.Config.Game.text_number_of_race_font_family, 
            _oContainer
        );
        
        _oButStartRace.addEventListener(ON_MOUSE_UP,this._onStartRace,this);
        
    };
    
    this.unload = function(){
         for(var i=0;i<_aChipButtons;i++){
             _aChipButtons[i].unload();
         }
         
         _oButStartRace.unload();
    };
    
    this._initChips = function(){
        var oBg = createBitmap(s_oSpriteLibrary.getSprite("fiche_panel"));
        oBg.x = 0;
        oBg.y = 170;
        _oContainer.addChild(oBg);
        
        //SET FICHES BUTTON
        var aPos = [{x:46,y:220},{x:97,y:220},{x:145,y:220},{x:46,y:264},{x:97,y:264},{x:145,y:264}];
        _aChipButtons = new Array();

        for(var i=0;i<NUM_CHIPS;i++){
            _aChipButtons[i] = new CFicheBut(i,aPos[i].x,aPos[i].y,1,_oContainer);
            _aChipButtons[i].addEventListenerWithParams(ON_MOUSE_UP, this._onFicheClicked, this,i);
        }
        
        //SET SELECTED CHIP
        var oSpriteHighlight = s_oSpriteLibrary.getSprite('fiche_highlight');
        _oChipHighlight = createBitmap(oSpriteHighlight);
        _oChipHighlight.regX = oSpriteHighlight.width/2;
        _oChipHighlight.regY = oSpriteHighlight.height/2;
        _oChipHighlight.x = _aChipButtons[0].getX()-22;
        _oChipHighlight.y = _aChipButtons[0].getY()-23;
        _oContainer.addChild(_oChipHighlight);
    };
    
    this.refreshMoney = function(){
        _oTextMoney.refreshText(EngagedNation.Config.Game.text_currency + s_iCurMoney);
    };
    
    this.refreshBet = function(iBet){
        _oTextBet.refreshText(EngagedNation.Config.Game.text_currency + iBet);
    };
    
    this._onStartRace = function(){
        if (_isCashOut) return;
        if (s_oMain.getNumberOfRace() == 0) return;

        s_oBetPanel.onStartExit();
    };

    this._onCashOut = function() {
        if (_isCashOut) return;
        _isCashOut = true;

        s_oBetPanel.clearBet();
        playSound('cash_out', 1);
        EngagedNation.Game.addPostMessage(
            {
                status: 'complete',
                score: s_iCurMoney
            }
        );
    };

    this._showCashOut = function() {
        _oCashOut.setVisible(true);
    }

    this._hideCashOut = function() {
        _oCashOut.setVisible(false);
    }
    
    this._onClearBet = function(){
        s_oBetPanel.clearBet();
    };
    
    this._onFicheClicked = function(iIndex){
        _oChipHighlight.x = _aChipButtons[iIndex].getX()-22;
        _oChipHighlight.y = _aChipButtons[iIndex].getY()-23;
        
        s_oBetPanel.setChipSelected(iIndex);
    };
    
    _oParentContainer = oParentContainer;
    this._init(iX,iY);
}