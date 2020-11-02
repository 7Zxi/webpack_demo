const {animateCSS} = __publicMethod;
export default class Business {
    constructor(data = {}) {
        // 格式化后数据
        this.data = data;

        // 动画持续总时间 单位ms
        this.totalTime = 25000;

        // 每个时间段数据更新次数
        this.updateNumber = 30;

        // 数据按排名的y坐标，大于20名的坐标统一
        this.yAxis = [];

        // 排行榜显示最大个数
        this.maxShowRank = 20;

        // 单日最大交易额
        this.maxTransactionValue = null;

        // 当前时间段
        this.currentHour = 1;

        //渐变色集合
        this.gradient = ['#FD2C52', '#FF304D', '#FD3547', '#FD3942', '#FD3D3F', '#FD403C', '#FC4537', '#FD4932', '#FF4E2F', '#FF5228', '#FF5626', '#FF5A21', '#FF5E1F', '#FF631B', '#FF6717', '#FF6C12', '#FE6E0F', '#FF730B', '#FE760A', '#FF7909'];

        // 轴线盒子宽度
        this.axisWidth = $('.mark').width();

        // 轴线区间
        this.axisPeriod = [];

        this.maxShadowWidth = this.axisWidth * .65;

    }

    init() {
        this.setNowTime();
        this.yAxis = this.createPosition();
        const {maxTransactionValue, html} = this.getInitValue();
        this.renderRankList(html);
        this.renderRankNumber();
        if (maxTransactionValue > 5000000) {
            this.axisPeriod = [5000000];
            let complement = parseInt(maxTransactionValue / 10000000);
            for (let i = 1; i <= complement; i++) {
                if (i > 10) {
                    this.axisPeriod.push(5 * 10000000 + (i - 1) * 10000000);
                    i += 4;
                } else {
                    this.axisPeriod.push(i * 10000000);
                }
            }
            this.maxTransactionValue = 5000000;
        } else {
            this.maxTransactionValue = maxTransactionValue;
        }

        console.log('区间:', this.axisPeriod);
        console.log('y坐标:', this.yAxis);
        console.log(this.data.singleItems);
    }

    start() {
        console.log('计时开始')
        console.time('计时结束');
        this.updateRank(this.updateNumber, true);
    }

    // 改变榜单排名位置
    changeRankList() {
        // 当前用户的实时交易额
        this.data.singleItems.sort((a, b) => b.current - a.current);
        this.data.singleItems.forEach((item, index) => {
            if (item.current > 0) {
                // 添加轴线
                if (this.axisPeriod.length > 0) {
                    if (item.current.toFixed() > this.axisPeriod[0]) {
                        const number = this.axisPeriod.shift();
                        this.addAxis(number);
                    }
                }
            }

            // 生成分母
            if (item.current > 5000000 && index === 0) {
                this.maxTransactionValue = item.current;
            }
            let y, background;
            if (index >= this.maxShowRank) {
                y = 0;
                background = "#FF7909";
            } else {
                y = this.yAxis[index].y;
                background = this.yAxis[index].background;
            }

            // range样式插入
            const $el = $(`li[data-uid="${item.uid}"]`);
            $el.attr('data-index', index).css('transform', `translateY(${y}px)`);
            if (index < 22) {
                this.changeAxis(this.maxTransactionValue);
                const width = `${(item.current / this.maxTransactionValue * this.axisWidth).toFixed()}px`;
                let prevIndex = $el.attr('data-index');
                if (prevIndex) {
                    prevIndex = parseInt(prevIndex)
                    if (index - prevIndex >= 10) {
                        this.rankLiftUp($el, 'down', prevIndex, index)
                    }
                    if (index - prevIndex <= -10) {
                        this.rankLiftUp($el, 'up', index, prevIndex);
                    }
                }

                $el.find('.range').removeClass('tran').css({
                    width,
                    background,
                });
                let n = parseInt(item.current / 100) / 100;
                n = n.toString().split('.');
                n[1] = n[1] ? n[1].padEnd(2, '0') : '00';
                $el.find('.number span').html(`${n.join('.')}`);
                if (item.current > 100000000) {
                    let y = parseInt(item.current / 10000) / 10000;
                    y = y.toString().split('.');
                    y[1] = y[1] ? y[1].padEnd(4, '0') : '0000';
                    $el.find('.number').html(`<span>${y.join('.')}</span>亿`);
                }
            }

            if ((item.current / this.maxTransactionValue * this.axisWidth) >= this.maxShadowWidth && index === 14) {
                this.maxTransactionValue *= 1.1;
            }
        })
    }

    // 添加轴线
    addAxis(number) {
        const $mark = $('.mark');
        const $div = $mark.find('div:last-child');
        const left = $mark.width() - parseInt($div.css('left'));
        if (left <= 130) {
            $div.find('p').addClass('sleft');
        }

        let p = `突破${number / 10000}万`;
        if (number >= 100000000) {
            p = `突破${number / 100000000}亿`
        }
        const child = `<div class="show" data-number="${number}">
            <p>${p}</p>
        </div>`;
        $mark.append(child);

        if ($mark.find('.show').length > 2) {
            const $target = $mark.find('.show').eq(0);
            $target.removeClass('show');
            animateCSS($target[0], 'fadeOutLeft,faster', () => {
                $target.remove();
            })
        }
    }

    // 实时切换轴线
    changeAxis(denominator) {
        $.each($('.mark>.show'), (idx, axis) => {
            const number = parseInt($(axis).attr('data-number'));
            const left = (number / denominator * this.axisWidth).toFixed() + 'px';
            $(axis).css('left', left)
        })
    }

    createPosition() {
        let yAxis = [];
        let height = 34, margin = 8, i = this.maxShowRank;
        while (i--) {
            let y = (this.maxShowRank - i) * (height + margin);
            yAxis.unshift({
                background: this.gradient[i],
                y: -y
            });
        }

        return yAxis;
    }

    renderRankList(html) {
        $('.items').html(html);
        this.changeRankList();
        this.textAnimate();
    }

    renderRankNumber() {
        let num = 20, html = '';
        while (num--) {
            const index = 20 - num;
            let child = ''
            if (index < 4) {
                child = `<img src=${require(`../image/${index}.png`)}>`;
            } else {
                child = `<div>${index}</div>`
            }
            html += `<div>${child}</div>`;
        }
        $('.rank-number').html(html)
    }

    // 返回榜单单日最大交易额和榜单的列表dom
    getInitValue() {
        let totalArray = [], maxTransactionValue, html = '';

        this.data.singleItems.forEach((item, index) => {
            // 添加单人每日交易总金额
            let total = item.period.reduce((a, b) => a + b)
            this.data.singleItems[index].total = total;
            totalArray.push(total);

            // 添加单人每时间段更新的平均值
            this.data.singleItems[index].average = [];
            this.data.singleItems[index].period.forEach(number => {
                let average = number / this.updateNumber;
                this.data.singleItems[index].average.push(average);
            })

            // 生成排行榜列表list
            item.nickname = item.nickname.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
            item.nickname.length > 6 && (item.nickname += ' ');
            html += `<li data-uid="${item.uid}">
                <div class="name">
                    <img src="${item.avatar}">
                    <p class="${item.nickname.length > 6 ? 'text' : ''}">${item.nickname}</p>
                </div>
                <div class="range-box">
                    <div class="range"></div>
                    <div class="insert-box">
                        <div class="number"><span>${item.current}</span>万</div>
                        <div class="show-up">
                            <img src=${require("../image/arrow-up.gif")}>
                            <span>
                                <div class="top"></div>
                                <div class="bottom"></div>
                            </span>
                        </div>
                        <div class="show-down">
                            <img src=${require("../image/arrow-down.gif")}>
                            <span>
                                <div class="top"></div>
                                <div class="bottom"></div>
                            </span>
                        </div>
                    </div>
                </div>
            </li>`;
        });

        maxTransactionValue = totalArray.sort((a, b) => b - a)[0];

        return {maxTransactionValue, html};
    }

    // 改变榜单的current值
    changeRankListCurrent() {
        this.data.singleItems.forEach(list => {
            list.current += list.average[this.currentHour - 1];
        });
        this.changeRankList();
    }


    // 实时更新榜单数据
    updateRank(count, bool) {
        if (count > 0) {
            if (bool) {
                this.changeRankListCurrent();
                count--;
                this.updateRank(count);
            } else {
                let timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                    this.changeRankListCurrent();
                    count--;
                    this.updateRank(count);
                }, this.totalTime / 24 / this.updateNumber);
            }
        } else {
            this.currentHour++;
            if (this.currentHour <= 24) {
                this.updateRank(this.updateNumber, true);
            } else {
                console.timeEnd('计时结束');
                $('.text').removeClass('text');
                this.data.singleItems.forEach((val, idx) => {
                    if (idx < 20) {
                        $(`li[data-uid="${val.uid}"]`).find('.name p').text(val.nickname)
                    }
                })
                $('.number').removeClass('scale')
            }
        }
    }

    // 设置当前时间
    setNowTime() {
        const time = +new Date() - 24 * 60 * 60 * 1000;
        const year = new Date(time).getFullYear();
        const month = new Date(time).getMonth();
        const day = new Date(time).getDate();

        $('.year').html(year);
        $('.month').html(month + 1);
        $('.day').html(day);
    }

    // 文字动画
    textAnimate() {
        $.each($('.text'), (idx, val) => {
            const $el = $(val);
            let text = $el.text().split('');
            let first = text.shift();
            text.push(first);
            $el.text(text.join(''));
        });
        let timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            this.textAnimate();
        }, 500);
    }

    // 显示排名升降趋势
    rankLiftUp($el, type, top, bottom) {
        $el.find('.insert-box').addClass(type);
        $el.find('.top').text(top);
        $el.find('.bottom').text(bottom);
        const target = $el.find(`.show-${type}`);
        animateCSS(target[0], 'fadeIn,fast');
        let timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            animateCSS(target[0], 'fadeOut,fast', () => {
                $el.find('.insert-box').removeClass(type);
            });
        }, 1500)

    }

}
