'use strict';

var EngagedNation = {};
    EngagedNation.Game = {};
    EngagedNation.Config = {};
    EngagedNation.Config.Game = {};

(
    function($) {
        /**
         * Define all possible default game configurations
         * @type {{}}
         */
        EngagedNation.Config.Game = {
            game_play_user_credits: 500,
            game_play_min_bet: 1,
            game_play_max_bet: 1000000,
            game_play_number_of_race: 3,
            game_play_is_unlimited_race: false, // If set to true - game_play_number_of_race will be ignored as long as user have enough credits to play.
            game_play_is_forecast_enabled: false, // If set to false - forecast betting will not be displayed.

            game_play_chip_01_value: 1,
            game_play_chip_02_value: 5,
            game_play_chip_03_value: 10,
            game_play_chip_04_value: 25,
            game_play_chip_05_value: 50,
            game_play_chip_06_value: 100,

            game_play_audio_enabled_on_startup: false,

            audio_chip_mp3: './assets/sounds/chip.mp3',
            audio_chip_ogg: './assets/sounds/chip.ogg',
            audio_click_mp3: './assets/sounds/click.mp3',
            audio_click_ogg: './assets/sounds/click.ogg',
            audio_start_race_mp3: './assets/sounds/start_race.mp3',
            audio_start_race_ogg: './assets/sounds/start_race.ogg',
            audio_photo_mp3: './assets/sounds/photo.mp3',
            audio_photo_ogg: './assets/sounds/photo.ogg',
            audio_soundtrack_mp3: './assets/sounds/soundtrack.mp3',
            audio_soundtrack_ogg: './assets/sounds/soundtrack.ogg',
            audio_cash_out_mp3: './assets/sounds/cash_out.mp3',
            audio_cash_out_ogg: './assets/sounds/cash_out.ogg',

            game_play_horse_01_name: 'tony',
            game_play_horse_01_win_bet: 10,
            game_play_horse_01_place_bet: 6,
            game_play_horse_01_show_bet: 2,

            game_play_horse_02_name: 'shannon',
            game_play_horse_02_win_bet: 10,
            game_play_horse_02_place_bet: 6,
            game_play_horse_02_show_bet: 2,

            game_play_horse_03_name: 'paul',
            game_play_horse_03_win_bet: 10, 
            game_play_horse_03_place_bet: 6,
            game_play_horse_03_show_bet: 2,

            game_play_horse_04_name: 'jerry',
            game_play_horse_04_win_bet: 10,
            game_play_horse_04_place_bet: 6,
            game_play_horse_04_show_bet: 2,

            game_play_horse_05_name: 'raquel',
            game_play_horse_05_win_bet: 10,
            game_play_horse_05_place_bet: 6,
            game_play_horse_05_show_bet: 2,

            game_play_horse_06_name: 'brady',
            game_play_horse_06_win_bet: 10,
            game_play_horse_06_place_bet: 6,
            game_play_horse_06_show_bet: 2,

            game_play_horse_07_name: 'michael',
            game_play_horse_07_win_bet: 10,
            game_play_horse_07_place_bet: 6,
            game_play_horse_07_show_bet: 2,

            game_play_horse_08_name: 'jeri',
            game_play_horse_08_win_bet: 10,
            game_play_horse_08_place_bet: 6,
            game_play_horse_08_show_bet: 2,

            game_play_forecast_01_02_win_bet: 20, // Place win value for prediction of winning 1x*.
            game_play_forecast_01_03_win_bet: 20,
            game_play_forecast_01_04_win_bet: 20,
            game_play_forecast_01_05_win_bet: 20,
            game_play_forecast_01_06_win_bet: 20,
            game_play_forecast_01_07_win_bet: 20,
            game_play_forecast_01_08_win_bet: 20,

            game_play_forecast_02_01_win_bet: 20, // Place win value for prediction of winning 2x*.
            game_play_forecast_02_03_win_bet: 20,
            game_play_forecast_02_04_win_bet: 20,
            game_play_forecast_02_05_win_bet: 20,
            game_play_forecast_02_06_win_bet: 20,
            game_play_forecast_02_07_win_bet: 20,
            game_play_forecast_02_08_win_bet: 20,

            game_play_forecast_03_01_win_bet: 20, // Place win value for prediction of winning 3x*.
            game_play_forecast_03_02_win_bet: 20,
            game_play_forecast_03_04_win_bet: 20,
            game_play_forecast_03_05_win_bet: 20,
            game_play_forecast_03_06_win_bet: 20,
            game_play_forecast_03_07_win_bet: 20,
            game_play_forecast_03_08_win_bet: 20,

            game_play_forecast_04_01_win_bet: 20, // Place win value for prediction of winning 4x*.
            game_play_forecast_04_02_win_bet: 20,
            game_play_forecast_04_03_win_bet: 20,
            game_play_forecast_04_05_win_bet: 20,
            game_play_forecast_04_06_win_bet: 20,
            game_play_forecast_04_07_win_bet: 20,
            game_play_forecast_04_08_win_bet: 20,

            game_play_forecast_05_01_win_bet: 20, // Place win value for prediction of winning 5x*.
            game_play_forecast_05_02_win_bet: 20,
            game_play_forecast_05_03_win_bet: 20,
            game_play_forecast_05_04_win_bet: 20,
            game_play_forecast_05_06_win_bet: 20,
            game_play_forecast_05_07_win_bet: 20,
            game_play_forecast_05_08_win_bet: 20,

            game_play_forecast_06_01_win_bet: 20, // Place win value for prediction of winning 6x*.
            game_play_forecast_06_02_win_bet: 20,
            game_play_forecast_06_03_win_bet: 20,
            game_play_forecast_06_04_win_bet: 20,
            game_play_forecast_06_05_win_bet: 20,
            game_play_forecast_06_07_win_bet: 20,
            game_play_forecast_06_08_win_bet: 20,

            game_play_forecast_07_01_win_bet: 20, // Place win value for prediction of winning 7x*.
            game_play_forecast_07_02_win_bet: 20,
            game_play_forecast_07_03_win_bet: 20,
            game_play_forecast_07_04_win_bet: 20,
            game_play_forecast_07_05_win_bet: 20,
            game_play_forecast_07_06_win_bet: 20,
            game_play_forecast_07_08_win_bet: 20,

            game_play_forecast_08_01_win_bet: 20, // Place win value for prediction of winning 8x*.
            game_play_forecast_08_02_win_bet: 20,
            game_play_forecast_08_03_win_bet: 20,
            game_play_forecast_08_04_win_bet: 20,
            game_play_forecast_08_05_win_bet: 20,
            game_play_forecast_08_06_win_bet: 20,
            game_play_forecast_08_07_win_bet: 20,

            img_bg_track: './assets/sprites/background.jpg',
            img_audio_icon: './assets/sprites/audio_icon.png',
            img_btn_exit: './assets/sprites/but_exit.png',
            img_btn_continue: './assets/sprites/but_skip.png',
            img_btn_collect: './assets/sprites/but_collect.png',
            img_btn_arrow_left: './assets/sprites/arrow_left.png',
            img_btn_arrow_right: './assets/sprites/arrow_right.png',
            img_btn_start_race: './assets/sprites/but_start_race.png',
            img_btn_start_race_unli: './assets/sprites/but_start_race_infinity.png',
            img_btn_cash_out: './assets/sprites/but_cash_out.png',
            img_btn_clear_bet: './assets/sprites/but_clear_bet.png',
            img_msg_box: './assets/sprites/msg_box.png',
            img_fiche_01: './assets/sprites/fiche_0.png',
            img_fiche_02: './assets/sprites/fiche_1.png',
            img_fiche_03: './assets/sprites/fiche_2.png',
            img_fiche_04: './assets/sprites/fiche_3.png',
            img_fiche_05: './assets/sprites/fiche_4.png',
            img_fiche_06: './assets/sprites/fiche_5.png',
            img_fiche_highlight: './assets/sprites/fiche_highlight.png',
            img_fiche_panel: './assets/sprites/fiche_panel.png',
            img_bet_panel: './assets/sprites/bg_bet_panel.jpg',
            img_money_panel: './assets/sprites/money_panel.png',
            img_simple_bet_panel: './assets/sprites/simple_bet_panel.png',
            img_forecast_panel: './assets/sprites/forecast_panel.png',
            img_odd: './assets/sprites/odd_bg.png',
            img_rank_panel: './assets/sprites/rank_panel.png',
            img_panel_arrival: './assets/sprites/panel_arrival.png',
            img_bet_place: './assets/sprites/bet_place.png',
            img_bibs: './assets/sprites/bibs.png',
            img_fill_bar: './assets/sprites/fill_bar.png',
            img_win_panel: './assets/sprites/win_panel.png',
            img_lose_panel: './assets/sprites/lose_panel.png',
            img_instruction_panel: './assets/sprites/instruction_box.png',

            text_general_font_family: 'impactregular',

            text_button_cash_out: 'CASH OUT',
            text_button_cash_out_font_color: 'lime',
            text_button_cash_out_font_size: 24,

            text_button_clear: 'CLEAR BET',
            text_button_clear_font_color: '#fff',
            text_button_clear_font_size: 24,

            text_not_enough_credits: 'NOT ENOUGH CREDITS!!',
            text_bet_low: 'PLACE YOUR BET! MUST BE GREATER THAN MIN BET!',
            text_bet_high: 'YOUR BET MUST BE LOWER THAN MAX BET!',
            text_bet_win: 'WIN',
            text_currency: '',
            
            text_bet_win_panel: 'WIN',
            text_bet_win_panel_font_color: '#ffde00',
            text_bet_win_panel_font_family: 'ds-digitalbold',
            text_bet_win_panel_font_size: 30,

            text_bet_win_panel_value_forecast: 'FORECAST',
            text_bet_win_panel_value_font_color: '#fff',
            text_bet_win_panel_value_font_size: 20,

            text_bet_win_list_font_color: '#ffb400',
            text_bet_win_list_font_size: 20,

            text_bet_lose_panel: 'Sorry! You did not win',
            text_bet_lose_panel_font_color: '#fff',
            text_bet_lose_panel_font_size: 34,
            
            text_message_box_font_color: '#fff', // Messages ie [not enough credits, bet low, bet high]
            text_message_box_font_size: 34,

            text_bet_left_panel_trap: 'HORSE',
            text_bet_left_panel_trap_font_color: '#fff',
            text_bet_left_panel_trap_font_size: 20,

            text_bet_left_panel_win: 'WIN',
            text_bet_left_panel_win_font_color: '#fff',
            text_bet_left_panel_win_font_size: 20,

            text_bet_left_panel_place: 'PLACE',
            text_bet_left_panel_place_font_color: '#fff',
            text_bet_left_panel_place_font_size: 20,

            text_bet_left_panel_show: 'SHOW',
            text_bet_left_panel_show_font_color: '#fff',
            text_bet_left_panel_show_font_size: 20,

            text_bet_left_panel_horse_name_font_color: '#fff',
            text_bet_left_panel_horse_name_font_family: 'motorwerkregular',
            text_bet_left_panel_horse_name_font_size: 14,

            text_bet_right_panel_min: 'MIN BET',
            text_bet_right_panel_max: 'MAX BET',
            text_bet_right_panel_font_color: '#ffde00',
            text_bet_right_panel_font_family: 'ds-digitalbold',
            text_bet_right_panel_font_size: 14,

            text_bet_right_panel_bet: 'BET',
            text_bet_right_panel_bet_font_color: '#fff',
            text_bet_right_panel_bet_font_family: 'motorwerkregular',
            text_bet_right_panel_bet_font_size: 12,

            text_bet_right_panel_bet_value_font_color: '#ffde00',
            text_bet_right_panel_bet_value_font_family: 'ds-digitalbold',
            text_bet_right_panel_bet_value_font_size: 26,

            text_bet_right_panel_credits: 'CREDITS',
            text_bet_right_panel_credits_font_color: '#fff',
            text_bet_right_panel_credits_font_family: 'motorwerkregular',
            text_bet_right_panel_credits_font_size: 12,

            text_bet_right_panel_credits_value_font_color: '#ffde00',
            text_bet_right_panel_credits_value_font_family: 'ds-digitalbold',
            text_bet_right_panel_credits_value_font_size: 26,

            text_bet_right_panel_chip_01_color: '#ff7706',
            text_bet_right_panel_chip_02_color: '#ffb600',
            text_bet_right_panel_chip_03_color: '#000',
            text_bet_right_panel_chip_04_color: '#06a800',
            text_bet_right_panel_chip_05_color: '#d50000',
            text_bet_right_panel_chip_06_color: '#444444',
            text_bet_right_panel_chip_font_size: 20,

            text_arrival_panel_font_color: '#fff',
            text_arrival_panel_font_family: 'motorwerkregular',
            text_arrival_panel_font_size: 16,

            text_rank_panel_font_color: '#fff',
            text_rank_panel_font_family: 'motorwerkregular',
            text_rank_panel_font_size: 12,

            text_number_of_race_font_color: '#fff',
            text_number_of_race_font_family: 'impactregular',
            text_number_of_race_font_size: 40,

            parent_width: null,
            parent_height: null
        };
    }(jQuery)
);
