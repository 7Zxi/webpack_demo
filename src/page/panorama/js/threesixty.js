import content from './data'

const {loading, throttle} = __publicMethod;

export default class Threesixty {
    constructor() {
        this.currentIndex = 0;
        this.productIndex = 0;
        this.animateLaps = 1;
        this.lock = false;
        content.detail[this.productIndex].cache = true;
    }

    init() {
        this.renderData();
        this.handEvents();
        this.switchThreesixty();
    }

    handEvents() {
        const _this = this;

        $('.edit-btn').click(() => {
            $('.feedback-text').val('');
            $('.feedback').fadeIn(150);
        })

        $('.confirm-commit').click(() => {
            const val = $('.feedback-text').val().trim();
            if (val.length > 0) {
                alert('提交成功~');
                $('.feedback').fadeOut(150);
            } else {
                alert('请输入反馈~')
            }

        });

        $('.cancel-commit').click(() => {
            $('.feedback').fadeOut(150);
        })

        $('.view-btn').click(() => {
            $('#container').addClass('close');
        });

        $('.hidden-btn').click(() => {
            $('#container').removeClass('close');
        });

        $('.share-btn').click(() => {
            $('.j-share').fadeIn(150, () => {
                $('.share-box').addClass('show')
            });
        });

        $('.cancel-btn').click(() => {
            $('.share-box').removeClass('show');
            setTimeout(() => {
                $('.j-share').fadeOut(150);
            }, 150)
        });

        $('.switch-items li').click(function () {
            let index = Number($(this).attr('data-index'));
            if (_this.productIndex === index) return;
            $(this).addClass('active').siblings().removeClass('active');
            _this.productIndex = index;
            _this.renderThreesixty(index);
            cancelAnimationFrame(_this.currentAnimateFrame);
            if (content.detail[index].cache) {
                _this.currentIndex = 0;
                _this.threesixtyAnimate();
            } else {
                $('.switch-load').fadeIn(150);
                loading($('.three-sixty img'), num => {
                    if (num === 'end') {
                        content.detail[index].cache = true;
                        $('.switch-load').fadeOut(150, () => {
                            _this.currentIndex = 0;
                            _this.threesixtyAnimate();
                        });
                    }
                }, true)
            }
        });

        $('.effect-btn').click(() => {
            $('.switch-load').fadeIn(150);
            embedpano({
                xml: "http://static-business.eg365.cn/pano/interior.xml",
                target: "pano",
                html5: "prefer",
                initvars: {
                    imgpath: "http://static-business.eg365.cn/pano/car"
                }
            });
            setTimeout(() => {
                $('#pano').removeClass('visibility');
                $('.interior').removeClass('hide');
                $('.switch-load').hide();
            }, 2000);
        });

        $('.pano-close').click(() => {
            $('.interior').addClass('hide');
            $('#pano').empty().addClass('visibility');
        })
    }

    renderData() {
        $('.product-title').html(content.title);
        let switchList = '';

        content.detail.forEach((val, idx) => {
            if (val.type === 'color') {
                switchList += `<li data-index="${idx}"><div style="background:${val.value}"></div></li>`;
            }
        });
        $('.switch-items').html(switchList).find('li').eq(0).addClass('active');
        this.renderThreesixty();
    }

    renderThreesixty(index = 0) {
        let threesixtyList = '';
        content.detail[index].data.forEach(list => {
            threesixtyList += `<li><img src="${list}"></li>`;
        });
        $('.three-sixty').html(threesixtyList);
    }

    threesixtyAnimate(lap = 1) {
        this.lock = true;
        const max = content.detail[this.productIndex].data.length;
        if (this.currentIndex < max) {
            $('.three-sixty li').removeClass('current').eq(this.currentIndex).addClass('current');
            this.currentIndex++;
            this.currentAnimateFrame = requestAnimationFrame(this.threesixtyAnimate.bind(this, lap));
        } else {
            this.currentIndex = 0;
            lap++;
            if (lap <= this.animateLaps) {
                this.currentAnimateFrame = requestAnimationFrame(this.threesixtyAnimate.bind(this, lap));
            } else {
                $('.three-sixty li').removeClass('current').eq(this.currentIndex).addClass('current');
                this.lock = false;
            }
        }
    }

    switchThreesixty() {
        const container = document.getElementById('container');
        let isDown = false;
        let startNum = 0;
        const isOrigination = $(container).attr('data-type');

        container.addEventListener('mousedown', down.bind(this))

        container.addEventListener('mousemove', throttle(move.bind(this), 20))

        container.addEventListener('mouseup', up.bind(this));

        $(container).on('touchstart', down.bind(this));
        $(container).on('touchmove', move.bind(this));
        $(container).on('touchend', up.bind(this));

        function down(evt) {
            evt = evt.pageX ? evt : evt.targetTouches[0];

            if (isOrigination) {
                startNum = evt.pageY;
            } else {
                startNum = evt.pageX;
            }

            isDown = true;
        }

        function move(evt) {
            if (isDown && !this.lock) {
                let current;
                const max = content.detail[this.productIndex].data.length - 1;

                evt = evt.pageX ? evt : evt.targetTouches[0];
                if (isOrigination) {
                    current = evt.pageY;
                } else {
                    current = evt.pageX;
                }

                if (current - startNum === 0) return;

                if (current - startNum > 0) {
                    this.currentIndex++;
                } else {
                    this.currentIndex--;
                }

                if (this.currentIndex > max) {
                    this.currentIndex = 0;
                }

                if (this.currentIndex < 0) {
                    this.currentIndex = max;
                }

                $('.three-sixty li').removeClass('current').eq(this.currentIndex).addClass('current')

                startNum = current;

            }
        }

        function up() {
            isDown = false;
        }

    }
}
