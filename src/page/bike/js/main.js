/*
import 'style/common.mobile';
import 'style/swiper.min';
import 'style/animate.min';
import 'style/animations';
import '../css/main';
import $ from 'lib/zepto.min';
import Swiper from 'lib/swiper.min';*/
import {pageAdapter, animateCSS, addMusic, loading, createImage} from 'lib/publicMethod';


module.hot && module.hot.accept();

$(() => {
    pageAdapter(750);
    addMusic({
        audioAttr: {
            src: require('../medias/music.mp3'),
            loop: true,
            preload: true
        },
        imgSrc: require('../images/music.png'),
        imgStyle: {
            position: 'absolute',
            top: '.2rem',
            right: '.2rem',
            width: '.68rem',
            zIndex: 90,
            background: 'lightblue',
            borderRadius: '50%'
        }
    });

    let bike = {

        animateIndex: 0,

        audioArr:[
            require('../medias/speak.mp3'),
            require('../medias/speak.mp3')
        ],

        animateName: ['fadeInRight', 'faster', 'slideInLeft', 'slideInRight', 'fadeInLeft', 'fadeInDown', 'fadeInUp', 'fadeInRight', 'lightSpeedIn', 'flash', 'flipInX', 'flipInY', 'zoomIn'],

        animationsNameArr: ['pt-page-rotateSlideOut', 'pt-page-rotateSidesOut', 'pt-page-rotateCarouselBottomOut,pt-page-ontop', 'pt-page-rotateCarouselTopOut,pt-page-ontop', 'pt-page-rotateCarouselRightOut pt-page-ontop', 'pt-page-rotateCarouselLeftOut pt-page-ontop', 'pt-page-rotateCubeBottomOut pt-page-ontop', 'pt-page-rotateCubeTopOut pt-page-ontop', 'pt-page-rotateCubeRightOut pt-page-ontop', 'pt-page-rotateCubeLeftOut pt-page-ontop', 'pt-page-rotateRoomBottomOut pt-page-ontop', 'pt-page-rotateRoomTopOut pt-page-ontop', 'pt-page-rotateRoomRightOut pt-page-ontop', 'pt-page-rotateRoomLeftOut pt-page-ontop', 'pt-page-moveToTopFade', 'pt-page-moveToBottomFade', 'pt-page-moveToLeftFade', 'pt-page-moveToRightFade', 'pt-page-rotateFoldBottom', 'pt-page-rotateFoldTop', 'pt-page-rotateFoldRight', 'pt-page-rotateFoldLeft', 'pt-page-rotatePushBottom', 'pt-page-rotatePushTop', 'pt-page-rotatePushRight', 'pt-page-rotatePushLeft', 'pt-page-rotatePushBottom', 'pt-page-rotatePushTop', 'pt-page-rotatePushRight', 'pt-page-rotatePushLeft', 'pt-page-rotateOutNewspaper', 'pt-page-rotateFall pt-page-ontop', 'pt-page-flipOutBottom', 'pt-page-flipOutTop', 'pt-page-flipOutLeft', 'pt-page-flipOutRight', 'pt-page-rotateBottomSideFirst', 'pt-page-rotateTopSideFirst', 'pt-page-rotateLeftSideFirst', 'pt-page-rotateRightSideFirst', 'pt-page-scaleDownCenter', 'pt-page-moveToBottom pt-page-ontop', 'pt-page-moveToTop pt-page-ontop', 'pt-page-moveToRight pt-page-ontop', 'pt-page-moveToLeft pt-page-ontop', 'pt-page-scaleDownUp', 'pt-page-scaleDown', 'pt-page-scaleDown', 'pt-page-scaleDown', 'pt-page-scaleDown', 'pt-page-scaleDown', 'pt-page-moveToBottomEasing pt-page-ontop', 'pt-page-moveToTopEasing pt-page-ontop', 'pt-page-moveToRightEasing pt-page-ontop', 'pt-page-moveToLeftEasing pt-page-ontop', 'pt-page-moveToBottomFade', 'pt-page-moveToTopFade', 'pt-page-moveToRightFade', 'pt-page-moveToLeftFade'],

        animateArray: [
            () => {
                $('.p1_right').removeClass('opacity');
                animateCSS('.p1_right', 'fadeInRight,faster', () => {
                    $('.p2').removeClass('opacity');
                    animateCSS('.p2', 'slideInLeft,faster', () => {
                        $.each($('.p1_lb img'), (idx, val) => {
                            $(val).removeClass('opacity');
                            let className = idx % 2 === 0 ? 'fadeInLeft' : 'fadeInRight';
                            animateCSS($(val)[0], className);
                        })
                    })
                })
            },
            () => {
                $('.p6, .p7').removeClass('opacity');
                animateCSS('.p6', 'fadeInRight,faster');
                animateCSS('.p7', 'lightSpeedIn', () => {
                    $('.p8 img').removeClass('opacity');
                    animateCSS('.p8 img', 'lightSpeedIn', () => {

                    });
                    $('.p9,.p10 img').removeClass('opacity');
                    animateCSS('.p9', 'fadeInDown');
                    animateCSS('.p10 img', 'fadeInUp', () => {
                        $('.p11,.p12').removeClass('opacity');
                        animateCSS('.p11', 'slideInRight');
                        animateCSS('.p12', 'slideInLeft');
                    })
                });
            },
            () => {
                $('.p14,.p15').removeClass('opacity');
                animateCSS('.p14', 'lightSpeedIn,faster');
                animateCSS('.p15', 'slideInRight', () => {
                    $('.p16_bg').removeClass('opacity');
                    animateCSS('.p16_bg', 'slideInRight,faster', () => {
                        $('.p16').removeClass('opacity');
                        animateCSS('.p16', 'rotateInUpRight', () => {
                            $('.p17,.p18,.p13').removeClass('opacity');
                            animateCSS('.p17', 'flipInX');
                            animateCSS('.p18', 'slideInLeft');
                            animateCSS('.p13', 'slideInRight');
                        })
                    })
                });
            }
        ],

        init() {
            this.resetAnimate();
            this.handEvent();
            loading([...$('img'), createImage(require('../images/p1.png'))], (number) => {
                $('.number').html(`${number}%`);
                if (number === 100) {
                    $('.loading').fadeOut(300);
                    $('.page_box').fadeIn(300);
                    this.initSwiper();
                }
            });
        },

        initSwiper() {
            var me = this;
            new Swiper('.swiper-container', {
                direction: 'vertical',
                speed: 300,
                longSwipesMs: 1000,
                on: {
                    init() {
                        me.shadeAnimate();
                        me.animateArray[this.activeIndex]();
                    },
                    slideChangeTransitionStart() {
                        $('.animate_dom').removeClass(me.animateName.join(' '));
                        me.shadeAnimate();
                    },
                    slideChangeTransitionEnd() {
                        $('#audio')[0].pause();
                        me.animateIndex = this.activeIndex;
                        me.resetAnimate();
                        me.animateArray[this.activeIndex]();
                    }
                }
            });
        },

        handEvent() {
            $('.p11,.p17').click(() => {
                this.speakPlay();
            })
        },

        resetAnimate() {
            $('.animate_dom').addClass('opacity').removeClass('animated');
        },

        speakPlay() {
            let audio = $('#audio')[0];
            audio.src = this.audioArr[this.animateIndex-1];
            audio.play();
        },

        shadeAnimate() {
            let index = Math.floor(Math.random() * this.animationsNameArr.length);
            let indexTwo = Math.floor(Math.random() * this.animationsNameArr.length);
            let $shade = $('.shade');
            $shade.removeClass('opacity');
            animateCSS($shade[0], this.animationsNameArr[index], () => {
                $shade.addClass('opacity');
            });
            animateCSS($shade[1], this.animationsNameArr[indexTwo], () => {
                $shade.addClass('opacity');
            });
        },


    };

    bike.init();
});
