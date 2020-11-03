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

            img_audio_icon: './assets/sprites/audio_icon.png',
            img_btn_exit: './assets/sprites/but_exit.png',
            img_btn_continue: './assets/sprites/but_skip.png',
            img_btn_collect: './assets/sprites/but_collect.png',
            img_msg_box: './assets/sprites/msg_box.png',
            img_bg_main: './assets/sprites/bg_main.jpg',
            img_instruction_panel: './assets/sprites/instruction_box.png',
            img_box:'./assets/sprites/box.png',

            text_general_font_family: 'impactregular',

            parent_width: null,
            parent_height: null
        };
    }(jQuery)
);
