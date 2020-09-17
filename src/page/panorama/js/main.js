import 'style/common.mobile';
import 'style/animate.min.css';
import '../css/main';
import Threesixty from "./threesixty";

const {loading, pageAdapter, createImage, insertStyle} = __publicMethod;

pageAdapter(750);
insertStyle();
const threesixtyImg = createImage([
    'http://static-business.eg365.cn/pano/car/pano_l.jpg',
    'http://static-business.eg365.cn/pano/car/mobile_l.jpg',
    'http://static-business.eg365.cn/pano/car/pano_b.jpg',
    'http://static-business.eg365.cn/pano/car/mobile_b.jpg',
    'http://static-business.eg365.cn/pano/car/pano_d.jpg',
    'http://static-business.eg365.cn/pano/car/mobile_d.jpg',
    'http://static-business.eg365.cn/pano/car/pano_f.jpg',
    'http://static-business.eg365.cn/pano/car/mobile_f.jpg',
    'http://static-business.eg365.cn/pano/car/pano_r.jpg',
    'http://static-business.eg365.cn/pano/car/mobile_r.jpg',
    'http://static-business.eg365.cn/pano/car/pano_u.jpg',
    'http://static-business.eg365.cn/pano/car/mobile_u.jpg',
]);
const $container = $('#container');
$container.children().addClass('hide').end().find('.loading').removeClass('hide');
if (window.innerHeight > window.innerWidth) {
    $container.css({
        transformOrigin: window.innerWidth / 2 + "px " + window.innerWidth / 2 + "px",
        transform: 'rotate(90deg)',
        width: window.innerHeight + 'px',
        height: window.innerWidth + 'px'
    });
    $container.attr('data-type', 'orientation');
}

window.addEventListener('orientationchange', () => {
    window.location.search = `t=${+new Date()}`;
});

const threesixty = new Threesixty();
threesixty.init();
loading(Array.prototype.concat.apply(threesixtyImg, $('img')), num => {
    $('.loading').text(`${num}%`);
    if(num === 100){
        $('.theSame').removeClass('hide');
        $('.loading').addClass('hide');
        threesixty.threesixtyAnimate();
    }
})

setTimeout(() => {
    $('body').removeClass('visibility');
}, 0)



