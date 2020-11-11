import 'style/common.pc';
import 'style/animate.min';
import '../css/main';
import Business from "./business";

const {loading, getURLParams} = __publicMethod;

module.hot && module.hot.accept();

const mock = {
    // 个人单日交易时间段金额列表
    singleItems: [
        {
            nickname: '罗永浩',
            uid: '4195355415549012',
            avatar: 'https://p29-dy.byteimg.com/img/tos-cn-i-0813/61a6d24b06744b2199c5155e1e9cb3d6~c5_1080x1080.jpeg?from=4010531038',
            period: [0, 0, 0, 16085, 16827, 17222, 17937, 18552, 19538, 19540, 20415, 21223, 21488, 22298, 22653, 23320, 24274, 24618, 24680, 24727, 25257, 25409, 25763, 26183],
            current: 0
        },
        {
            nickname: '衣哥',
            uid: '104689026423',
            avatar: 'https://p3-dy-ipv6.byteimg.com/aweme/1080x1080/2dec200075cf4da114436.jpeg?from=4010531038',
            period: [0, 0, 0, 13668, 13719, 14424, 15319, 15348, 15631, 15653, 15867, 16513, 16590, 16769, 17416, 18216, 18898, 18965, 19170, 20115, 20479, 20485, 20774, 21273],
            current: 0
        },
        {
            nickname: '言真夫妇',
            uid: '71912868448',
            avatar: 'https://p26-dy.byteimg.com/aweme/1080x1080/31caf0000bd0aabece9f3.jpeg?from=4010531038',
            period: [0, 0, 0, 0, 1117294, 1117805, 1118207, 1111147, 1193163, 19947, 20122, 20299, 20585, 20607, 20804, 20903, 21660, 21661, 22247, 22663, 23094, 23897, 24545, 24684],
            current: 0
        },
        {
            nickname: '永',
            uid: '419535549012',
            avatar: 'https://p29-dy.byteimg.com/img/tos-cn-i-0813/61a6d24b06744b2199c5155e1e9cb3d6~c5_1080x1080.jpeg?from=4010531038',
            period: [0, 0, 0, 111110, 16827, 17222, 17937, 18552, 41703, 19540, 20415, 21223, 83318, 107279, 22653, 23320, 24274, 61937, 2680, 62604, 25257, 2549, 25763, 21183],
            current: 0
        },
        {
            nickname: '👑轻奢女王珊珊（今天明天休息哦',
            uid: '4195554149012',
            avatar: 'https://p26-dy.byteimg.com/aweme/1080x1080/2e51a000620634e258e8c.jpeg?from=4010531038',
            period: [4345, 64567, 455673, 1611085, 2216827, 337222, 4447937, 18552, 107546, 19540, 20415, 57756, 21488, 48257, 22653, 3320, 4274, 4618, 24680, 24727, 5257, 25409, 25763, 26183],
            current: 0
        },
        {
            nickname: '小花妞',
            uid: '104761982553',
            avatar: 'https://p29-dy.byteimg.com/aweme/1080x1080/31a9400081f686b688674.jpeg?from=4010531038',
            period: [36052, 37016, 37780, 16085, 16827, 1117222, 44123, 18552, 31639, 19540, 20415, 21223, 21488, 22298, 12653, 23320, 14274, 108778, 62336, 102633, 64645, 102633, 5763, 234534],
            current: 0
        },
        {
            nickname: '小小莎老师',
            uid: '56663252872',
            avatar: 'https://p3-dy-ipv6.byteimg.com/aweme/1080x1080/facd000b12ec36349082.jpeg?from=4010531038',
            period: [13342, 23435, 1112614, 16085, 16827, 345232, 17937, 18552, 18707, 19540, 20415, 21223, 21488, 22298, 12653, 23320, 14274, 24618, 23680, 456424, 25257, 453465, 234634, 456436],
            current: 0
        },
        {
            nickname: '陈赫',
            uid: '84990209480',
            avatar: 'https://p3-dy-ipv6.byteimg.com/aweme/1080x1080/fa5a000368a5098c3d15.jpeg?from=4010531038',
            period: [4916, 4716, 214231, 575467, 12413, 837495, 23312, 213212, 7867643, 34342, 565467, 23435, 467456, 345234, 78967, 68678, 24354, 78567, 345643, 435643, 4563456, 23453, 52345, 345342],
            current: 0
        },
        {
            nickname: '薇菡电子商务',
            uid: '102415426911',
            avatar: 'https://p3-dy-ipv6.byteimg.com/img/tos-cn-avt-0015/8527bf4d7108604199f18e434015c249~c5_1080x1080.jpeg?from=4010531038',
            period: [2345, 3524, 43552, 12323, 53134, 563456, 34643, 576567, 76555, 89975, 545754, 3456654, 345345, 467467, 234545, 234245, 123135, 45634, 34535, 234234, 123234, 45634, 54657, 65435],
            current: 0
        },
        {
            nickname: '灵子—11号下午1点女装上新',
            uid: '41953554155492',
            avatar: 'https://p3-dy-ipv6.byteimg.com/aweme/1080x1080/31bb6000220bcc42ca37b.jpeg?from=4010531038',
            period: [243, 2445, 23553, 79234, 453345, 234556, 345564, 65456, 767567, 123345, 234534, 879787, 23413, 567567, 345667, 3466, 565467, 5446, 45587, 678556, 245546, 564667, 435676, 54645],
            current: 0
        },
        {
            nickname: '天津一家人',
            uid: '92826097922',
            avatar: 'https://p6-dy-ipv6.byteimg.com/aweme/1080x1080/2e48d0000bc193e7ff759.jpeg?from=4010531038',
            period: [436, 8743, 4523, 24356, 24456, 45245, 34545, 123345, 456346, 235345, 341424, 123556, 123566, 78967, 352436, 345645, 12356, 23435, 436565, 345543, 234564, 5464356, 34554, 454245],
            current: 0
        },
        {
            nickname: '黄小敏● 12点极光轻奢女装！震撼来袭！',
            uid: '540597062470539',
            avatar: 'https://p6-dy-ipv6.byteimg.com/img/tos-cn-avt-0015/ad96602b26f00261c4799bfdae8d20da~c5_1080x1080.jpeg?from=4010531038',
            period: [5236, 23435, 12345, 23445, 76868, 333456, 24355, 76834, 23345, 11346544, 234535, 234234, 32456, 23432, 45456, 235633, 345464, 453445, 23455, 123445, 435235, 34525, 423454, 45456],
            current: 0
        },
        {
            nickname: '一喜推荐官-每天早上6点开播',
            uid: '43633690021463',
            avatar: 'https://p9-dy.byteimg.com/img/tos-cn-avt-0015/76480c515251d9d413fb7b18cae17814~c5_1080x1080.jpeg?from=4010531038',
            period: [234, 25535, 43463, 56567, 56767, 453454, 323445, 456432, 534553, 123435, 45244, 233532, 567545, 567656, 90870, 435354, 124352, 234545, 64333, 34245, 22314, 21235, 234345, 565678],
            current: 0
        },
        {
            nickname: '浩哥女装穿搭',
            uid: '73235901009',
            avatar: 'https://p29-dy.byteimg.com/aweme/1080x1080/31ac60004e9655c73d38c.jpeg?from=4010531038',
            period: [613, 45634, 43656, 23445, 23435, 345345, 67978, 234554, 456754, 23632, 89008, 67578, 435354, 34545, 456456, 453456, 222434, 234545, 34556, 345345, 34545, 24545, 453643, 454376],
            current: 0
        },
        {
            nickname: '一盟大小姐',
            uid: '95163755819',
            avatar: 'https://p29-dy.byteimg.com/aweme/1080x1080/31ca200001e073321e0ad.jpeg?from=4010531038',
            period: [2525, 234553, 455677, 234345, 122345, 245534, 455634, 345235, 323345, 123435, 123435, 214214, 134346, 12332, 12336, 75534, 345643, 234564, 3434523, 342343, 454364, 356345, 453454, 435656],
            current: 0
        },
        {
            nickname: '喜哥喜嫂海鲜',
            uid: '75743141851',
            avatar: 'https://p6-dy-ipv6.byteimg.com/aweme/1080x1080/31c720000281a8b1ad59b.jpeg?from=4010531038',
            period: [5226, 2235, 12545, 241445, 768868, 235456, 232345, 76534, 234445, 34444, 235435, 23234, 454456, 234232, 456356, 234633, 344564, 2334645, 236545, 12345, 43545, 34345, 452354, 43356],
            current: 0
        },
        {
            nickname: '王祖蓝',
            uid: '98351247903',
            avatar: 'https://p26-dy.byteimg.com/aweme/1080x1080/1e18000051060e06761b2.jpeg?from=4010531038',
            period: [526, 23135, 12345, 24145, 76868, 25456, 243245, 76674, 234345, 346444, 235435, 2345234, 325456, 223452, 456356, 234633, 3454564, 2344645, 234645, 123445, 43245, 342345, 45654, 43656],
            current: 0
        },
        {
            nickname: '李诞',
            uid: '96433230515',
            avatar: 'https://p3-dy-ipv6.byteimg.com/aweme/1080x1080/a1780019c65e8e769dd6.jpeg?from=4010531038',
            period: [552, 23515, 123545, 241445, 7868, 23435, 245345, 76734, 23345, 354544, 23335, 234534, 324556, 234232, 456256, 25633, 354564, 234345, 234545, 123345, 43545, 322345, 456214, 435456],
            current: 0
        },
        {
            nickname: '知音漫客',
            uid: '795689506056131',
            avatar: 'https://p29-dy.byteimg.com/img/tos-cn-i-0813/82ab7e8803734f349322907ada7a2c57~c5_1080x1080.jpeg?from=4010531038',
            period: [11456, 4544, 56464, 77856, 2343223, 567678, 4234123, 734524, 23345, 34444, 254535, 236234, 1132436, 2223132, 245356, 2332343, 343264, 234645, 2223655, 123645, 454645, 334565, 454354, 345656],
            current: 0
        },
        {
            nickname: '吴双双严选',
            uid: '104384757334',
            avatar: 'https://p9-dy.byteimg.com/aweme/1080x1080/31b2100012d037f0775f8.jpeg?from=4010531038',
            period: [535, 23455, 12315, 24445, 76888, 234556, 243545, 786734, 23345, 36444, 234435, 234234, 324546, 234232, 452456, 235333, 344464, 233445, 2346545, 123235, 444645, 34345, 456234, 433456],
            current: 0
        },
        {
            nickname: '国岳',
            uid: '68232212180',
            avatar: 'https://p3-dy-ipv6.byteimg.com/img/tos-cn-avt-0015/4cac08ff2befdcf3f7d942807ff1211b~c5_1080x1080.jpeg?from=4010531038',
            period: [3580, 234535, 132454, 24145, 76868, 23456, 242355, 7664, 234235, 34644, 23435, 23234, 324566, 48242, 45616, 234563, 342564, 235345, 2361545, 123445, 41645, 34345, 456454, 433456],
            current: 0
        },
        {
            nickname: '多余和毛毛姐',
            uid: '60424463447',
            avatar: 'https://p6-dy-ipv6.byteimg.com/aweme/1080x1080/f94e000bd7b489e668da.jpeg?from=4010531038',
            period: [828, 512435, 14335, 24445, 768668, 235456, 243545, 76534, 234345, 34544, 2345, 234234, 325456, 46456, 575768, 756466, 35464, 312435, 12345, 3456754, 334574, 345767, 45886, 234568],
            current: 0
        },
        {
            nickname: '凌康（康哥）明天下午1点富安娜总部专场',
            uid: '3034271739293271',
            avatar: 'https://p6-dy-ipv6.byteimg.com/aweme/1080x1080/31a7a0007e186a74aca8d.jpeg?from=4010531038',
            period: [598, 2535, 12445, 24245, 6868, 234556, 2235445, 768534, 23545, 346244, 23435, 252234, 325426, 2344532, 453546, 23413, 345264, 233445, 4565145, 14345, 444645, 345345, 45654, 46456],
            current: 0
        },
        {
            nickname: '菁菁啊studio',
            uid: '3082675884405016',
            avatar: 'https://p9-dy.byteimg.com/img/mosaic-legacy/2eb3a0008eae3ee0bdd7a~c5_1080x1080.jpeg?from=4010531038',
            period: [5436, 25435, 124545, 242445, 76568, 23856, 253545, 767734, 456345, 344544, 45435, 2343234, 3243456, 23332, 45356, 234633, 34434, 25535, 234435, 12345, 35364, 34345, 43454, 43556],
            current: 0
        },
        {
            nickname: '常熟市王孟杰服装商行',
            uid: '100344747322',
            avatar: 'https://p6-dy-ipv6.byteimg.com/aweme/1080x1080/f8f9000ffd50353fddaa.jpeg?from=4010531038',
            period: [5342, 23513, 1243, 2412, 76486, 23443, 24355, 768734, 234345, 346544, 234535, 235564, 345656, 234232, 45646, 23633, 34664, 23545, 235545, 123445, 435645, 34345, 456434, 433456],
            current: 0
        }
    ]
}

const id = getURLParams('search').id;

if (id === '1') {
    $('.mark, .rank,.time,.alert-text').addClass('hide');
    $('.columnar-chart').removeClass('hide');
}

if (id === '2') {
    $('.time,.alert-text').addClass('hide');
    //$('.mark').css('zIndex', 0);
    //$('.at').removeClass('hide');
}
if (id === '3'){
    $('.time,.alert-text').addClass('hide');
}

window.onload = function () {
    const $video = $('video');
    $video.click(() => {
        $video[0].play();
    })
    $.ajax({
        type: 'POST',
        url: 'https://capi.newrank.cn/api/custom/double11/xd_live',
        data: {rankDate: parseInt(+new Date() / 1000) - 24 * 60 * 60},
        headers: {
            'key': 'v5e7f279c135f473bbbdattuo'
        },
        success(data) {
            let mock = {
                singleItems: []
            };

            if (Array.isArray(data.data)) {
                data.data.forEach(value => {
                    if (value.source !== 'dy' && id !== '3') return;
                    let info = {
                        period: []
                    };
                    if(value.uid === "104310207374"){
                        console.log(value)
                    }

                    info.nickname = value.nickname;
                    info.avatar = value.avater;
                    info.uid = value.uid;
                    info.source = value.source;
                    info.current = 0;
                    if (id === '2' || id === '3') {
                        value.toatal_daily.forEach(({sales_money}) => {
                            info.period.push(sales_money)
                        })
                    } else {
                        value.today.forEach(({sales_money}, index) => {
                            if (index > 0) {
                                info.period.push(sales_money - value.today[index - 1].sales_money)
                            } else {
                                info.period.push(sales_money)
                            }
                        });
                    }
                    if (id === '3') {
                        info.total_sales = info.period.reduce((a, b) => a + b);
                        //console.log(info.total_sales, info)
                    } else {
                        info.total_sales = value.total.pop().sales_money;
                    }

                    if (info.uid === "96285518522") {
                        mock.singleItems.unshift(info);
                    } else {
                        mock.singleItems.push(info);
                    }
                })
            }
            console.log(mock)
            const chartData = mock.singleItems.sort((a, b) => b.total_sales - a.total_sales).slice(0, 20);

            /*if(id === '2'){
                mock.singleItems = chartData;
            }*/
            const business = new Business(mock);
            if (id === '2') {
                business.gradient = ['#d10e9d', '#d41299', '#d71794', '#db1c8e', '#dd208b', '#e02387', '#e32882', '#e62c7e', '#e93178', '#ed3674', '#f03b6e', '#f23e6b', '#f64366', '#f84762', '#fc4c5d', '#ff5058', '#ff5058', '#ff5058', '#ff5058', '#ff5058'];
            }

            if (id === '1') {
                business.setNowTime();
                business.renderColumnarChart(chartData);
            }
            /*else if(id === '2'){
                /!*business.setNowTime();
                business.yAxis = business.createPosition();
                const {html} = business.getInitValue(chartData);
                business.renderRankList(html, chartData, false);
                business.renderRankNumber();
                business.renderColumnarChart(chartData, 'vertical');*!/
            }*/
            else {
                business.init();
                loading($('img'), num => {
                    console.log('页面元素加载完毕');
                    business.start();
                }, true)
            }


        }
    })
}


/*const business = new Business(mock);
business.init();
loading($('img'), num => {
    console.log(num)
    business.start();
}, true)*/


