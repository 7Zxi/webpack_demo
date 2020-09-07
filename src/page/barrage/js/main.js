import 'style/common'
import '../css/main.less'
import Barrage from './barrage'

module.hot && module.hot.accept();

let data = [
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 1, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 1, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '周杰伦的听妈妈的话，让我反复循环再循环', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: 'qzx', time: 3, color: 'red', speed: 1, fontSize: 22},
    {value: '想快快长大，才能保护她', time: 5, color: '#00a1f5', speed: 1, fontSize: 30},
    {value: '听妈妈的话吧，晚点再恋爱吧！爱呢？', time: 7},
    {value: '听妈妈的话吧，晚点再恋爱吧！爱呢11？', time: 9},
];
let canvas = document.getElementById('canvas');
let video = document.getElementById('video');
let $text = document.getElementById('text');
let $btn = document.getElementById('btn');
let $color = document.getElementById('color');
let $range = document.getElementById('range');

class CanvasBarrage {
    constructor(canvas, video, opt = {}) {
        if (!canvas || !video) return;

        // 直接挂载到this上
        this.canvas = canvas;
        this.video = video;

        // 设置canvas的宽高和video一致
        this.canvas.width = video.width;
        this.canvas.height = video.height - 65;
        this.ctx = canvas.getContext('2d');

        // 设置默认参数，如果没有传就给带上
        let defOpts = {
            color: '#e91e63',
            speed: 1.5,
            opacity: 0.5,
            fontSize: 20,
            data: []
        };
        Object.assign(this, defOpts, opt);// 合并对象并全都挂到this实例上

        // 添加个属性，用来判断播放状态，默认是true暂停
        this.isPaused = true;

        // 得到所有的弹幕消息
        this.barrages = this.data.map(item => new Barrage(item, this));

        // 把画布高度均分，避免弹幕遮挡
        this.averageCanvas = [];

        // 缓存上一条弹幕渲染的管道index
        this.cachePrevIndex = null;

        // 每条弹幕x轴坐标的间隔距离
        this.distanceX = 20;
    }

    // 渲染canvas绘制的弹幕
    render() {
        // 渲染的第一步是清除原来的画布，方便复用写成clear方法来调用
        this.clear();

        //渲染弹幕
        this.renderBarrage();

        // 如果没有暂停的话就继续渲染
        if (!this.isPaused) {
            requestAnimationFrame(this.render.bind(this));
        }
    }

    renderBarrage() {
        // 首先拿到当前视频播放的时间
        // 要根据该时间来和弹幕要展示的时间做比较，来判断是否展示弹幕
        const time = this.video.currentTime;

        //遍历所有的弹幕，每个barrage都是Barrage的实例
        this.barrages.forEach(barrage => {

            if (!barrage.isInit && time >= barrage.time) {
                // 获取当前弹幕需要渲染的管道index
                const index = barrage.init(this.cachePrevIndex);
                // 缓存当前弹幕的index，用于保证下一条弹幕不在当前管道中
                this.cachePrevIndex = index;
                // 弹幕压入管道中
                this.averageCanvas[index] = this.averageCanvas[index] || [];
                this.averageCanvas[index].push(barrage);

                barrage.isInit = true;
            }

        })

        // 渲染管道中的弹幕
        this.renderAverageBarrage();
    }

    renderAverageBarrage() {
        this.averageCanvas.forEach(barrageItems => {
            if (barrageItems.length > 0) {
                for (let i = 0; i < barrageItems.length; i++) {
                    let barrage = barrageItems[i];
                    if (i === 0) {
                        if (barrage.flag) {
                            barrageItems.splice(i, 1);
                        } else {
                            render(barrage)
                        }
                    } else {
                        let prevBarrage = barrageItems[i - 1];
                        let prevBarrageMoveDistance = prevBarrage.ctx.canvas.width - prevBarrage.x - prevBarrage.width;
                        if (prevBarrageMoveDistance >= this.distanceX) {
                            render(barrage);
                        } else {
                            break;
                        }
                    }
                }
            }
        });

        function render(barrage) {
            // 弹幕要从右向左渲染，所以x坐标减去当前弹幕的speed即可
            barrage.x -= barrage.speed;
            barrage.render();

            // 如果当前弹幕的x坐标比自身的宽度还小了，就表示结束渲染了
            barrage.flag = barrage.x < -barrage.width;
        }
    }

    replay() {
        this.clear(); //先清除画布
        // 获取当前视频播放时间
        let time = this.video.currentTime;

        this.barrages.forEach(barrage => {

            if (barrage.time >= time) { // 就把isInit重设为false，这样才会重新初始化渲染
                barrage.isInit = false;
                barrage.flag = false;// 当前弹幕的flag设为false
            } else {
                barrage.flag = true; // 其他时间对比不匹配的，flag还是true不用重新渲染
            }
        })
    }

    add(data) {
        this.barrages.push(new Barrage(data, this));
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}

let canvasBarrage = new CanvasBarrage(canvas, video, {data});
console.log(canvasBarrage);

video.addEventListener('play', () => {
    canvasBarrage.isPaused = false;
    canvasBarrage.render();
});

video.addEventListener('pause', () => {
    canvasBarrage.isPaused = true;
});

video.addEventListener('seeked', () => {
    // 调用CanvasBarrage类的replay方法进行回放，重新渲染弹幕
    canvasBarrage.replay();
});

function send() {
    let value = $text.value;
    if (value) {
        let time = video.currentTime; // 当前视频时间
        let color = $color.value;   // 选取的颜色值
        let fontSize = $range.value; // 选取的字号大小
        let data = {value, time, color, fontSize};
        canvasBarrage.add(data);
        $text.value = "";
    }
}

$btn.addEventListener('click', send);
$text.addEventListener('keyup', e => {
    e.keyCode === 13 && send()
});

canvas.addEventListener('click', e => {
    let x = e.offsetX, y = e.offsetY;
    console.log(canvasBarrage.ctx.isPointInPath(x, y));
    /*canvasBarrage.barrages.forEach(barrage => {
        if (x >= barrage.x && x <= barrage.x + barrage.width && y <= barrage.y && y >= barrage.y - barrage.height) {
            console.log(barrage);
            barrage.value = 'Hi~ o(*￣▽￣*)ブ';
        }
    })*/
});

