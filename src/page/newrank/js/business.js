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

        // 最大交易总额
        this.totalSales = 0;

        this.maxHour = data.singleItems[0].period.length || 24;

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
    changeRankList(data = this.data.singleItems, bool = true) {
        // 当前用户的实时交易额
        bool && data.sort((a, b) => b.current - a.current);
        data.forEach((item, index) => {
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
            if (index < 21) {
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
                let n = parseInt(Number(item.current.toFixed()) / 100) / 100;
                n = n.toString().split('.');
                n[1] = n[1] ? n[1].padEnd(2, '0') : '00';
                $el.find('.number span').html(`${n.join('.')}`);
                if (Number(item.current.toFixed()) > 100000000) {
                    let y = parseInt(Number(item.current.toFixed()) / 10000) / 10000;
                    y = y.toString().split('.');
                    y[1] = y[1] ? y[1].padEnd(4, '0') : '0000';
                    $el.find('.number').html(`<span>${y.join('.')}</span>亿`);
                }
            }

            if ((Number(item.current.toFixed()) / this.maxTransactionValue * this.axisWidth) >= this.maxShadowWidth && index === 14) {
                this.maxTransactionValue *= 1.1;
            }
        })
    }

    // 添加轴线
    addAxis(number) {
        const $mark = $('.mark');
        const $div = $mark.find('div:last-child');
        const left = this.axisWidth - parseInt($div.css('left'));
        if (left <= 140) {
            $div.find('p').addClass('sleft');
        }

        let p = `突破${number / 10000}万`;
        if (number >= 100000000) {
            p = `突破${number / 100000000}亿`
        }
        const child = `<div class="show line" data-number="${number}">
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

    renderRankList(html, data, bool = true) {
        $('.items').html(html);

        if (bool) {
            this.changeRankList();
            this.textAnimate();
        } else {
            this.changeRankList(data, false);
        }
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
    getInitValue(data = this.data.singleItems) {
        let totalArray = [], maxTransactionValue, html = '';

        data.forEach((item, index) => {
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
                }, 35 || this.totalTime / 24 / this.updateNumber);
            }
        } else {
            this.currentHour++;
            if (this.currentHour <= this.maxHour) {
                this.updateRank(this.updateNumber, true);
            } else {
                console.timeEnd('计时结束');
                $('.text').removeClass('text');
                this.data.singleItems.forEach((val, idx) => {
                    if (idx < 20) {
                        const $el = $(`li[data-uid="${val.uid}"]`);
                        $el.find('.name p').text(val.nickname);

                        let n = parseInt(val.total / 100) / 100;
                        n = n.toString().split('.');
                        n[1] = n[1] ? n[1].padEnd(2, '0') : '00';
                        $el.find('.number span').html(`${n.join('.')}`);
                        if (val.total > 100000000) {
                            let y = parseInt(val.total / 10000) / 10000;
                            y = y.toString().split('.');
                            y[1] = y[1] ? y[1].padEnd(4, '0') : '0000';
                            $el.find('.number').html(`<span>${y.join('.')}</span>亿`);
                        }
                    }
                })


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

    renderYAxis(number, type) {
        const unit = 10000000;
        const limit = 5; // 分成区间数
        this.totalSales = Math.ceil(number / unit) * unit;
        const average = this.totalSales / limit;
        let y = 16, html = '', period = [0];
        for (let i = 1; i <= limit; i++) {
            const current = i * average;
            let number = 0;
            if(current>=100000000){
                number = parseInt(i * average / unit) / 10;
            }else{
                number = parseInt(i * average / 1000000) / 100;
            }
            period.push(number);
        }
        console.log(period)
        while (y--) {
            let val = '';
            if ((y) % 3 === 0) {
                if (y === 0) {
                    val = `<b>${period.pop()}</b>`;
                } else {
                    let num = period.pop()
                    if (num < 1) {
                        val = `<b>${num * 10000}</b>万`;
                    } else {
                        val = `<b>${num}</b>亿`;
                    }
                }
            }
            if (type === 'vertical') {
                let left = y * 44;
                html += `<div class="axis" style="left:${left}px">
                    <p>${val}</p>
                    <div class="col"></div>
                </div>`;
            } else {
                html += `<li>
                    <div class="l">${val}</div>
                    <div class="r"></div>
                </li>`;
            }
        }
        type === 'vertical' ? $('.mark').html(html) : $('.yAxis').html(html);
    }

    renderXAxis(data, type) {
        let html = '',
            background = ['#d10e9d', '#d41299', '#d71794', '#db1c8e', '#dd208b', '#e02387', '#e32882', '#e62c7e', '#e93178', '#ed3674', '#f03b6e', '#f23e6b', '#f64366', '#f84762', '#fc4c5d', '#ff5058', '#ff5058', '#ff5058', '#ff5058', '#ff5058'];
        if (type === 'vertical') {
            $.each($('.items li'), (idx, val) => {
                console.log(data[idx].total_sales)
                let number = parseInt(data[idx].total_sales / 1000000) / 100;
                number = number.toString().split('.');
                number[1] = number[1] ? number[1].padEnd(2, '0') : '00';
                $(val).find('.range').css({
                    background: background[idx],
                    width: `${data[idx].total_sales / this.totalSales * this.axisWidth}px`
                }).end().find('.number').html(`<span>${number.join('.')}</span>亿`);
            })
        } else {
            const height = $('.yAxis').height() - 40;
            data.forEach((list, idx) => {
                let number = parseInt(list.total_sales / 1000000) / 100;
                number = number.toString().split('.');
                number[1] = number[1] ? number[1].padEnd(2, '0') : '00';
                html += `<li>
                <div class="value"><span>${number.join('.')}</span>亿</div>
                <div class="bar" style="background:${background[idx]};height:${list.total_sales / this.totalSales * height}px"></div>
                <div class="user">
                    <img src="${list.avatar}">
                    <div><p>${list.nickname}</p></div>
                </div>
            </li>`
            });
            $('.xAxis').html(html)
        }
    }

    renderColumnarChart(data, type) {
        if (type === 'vertical') {
            this.renderYAxis(data[0].total_sales, type);
            this.renderXAxis(data, type);
        } else {
            this.renderYAxis(data[0].total_sales);
            this.renderXAxis(data);
        }
    }

}
