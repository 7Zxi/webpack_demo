export default class Barrage {
    constructor(data, ctx) {
        this.value = data.value; // 弹幕的内容
        this.time = data.time; // 弹幕出现时间

        //把obj和ctx都挂载到this上方便获取
        this.data = data;
        this.ctx = ctx;
    }

    init(cachePrevIndex = 0) {
        // 如果数据里没有涉及到下面4种参数，就直接取默认参数
        this.color = this.data.color || this.ctx.color;
        this.speed = this.data.speed || this.ctx.speed;
        this.opacity = this.data.opacity || this.ctx.opacity;
        this.fontSize = this.data.fontSize || this.ctx.fontSize;

        //计算文字宽度
        let p = document.querySelector('.getWidth');
        p.style.fontSize = this.fontSize + 'px';
        p.innerHTML = this.value;
        this.width = p.clientWidth;
        this.height = p.clientHeight;

        //设置弹幕出现的位置
        this.x = this.ctx.canvas.width;
        const getYCoordinate = (cachePrevIndex) => {
            let heightBlock = this.ctx.canvas.height / 10;
            let index = Math.floor(Math.random() * 10);
            let y = index * heightBlock + (heightBlock - this.height) / 2;
            if (index === cachePrevIndex) {
                return getYCoordinate(cachePrevIndex);
            } else {
                return {y, index};
            }
        };
        let {y, index} = getYCoordinate(cachePrevIndex);
        this.y = y;

        //做下超出范围处理
        if (this.y < this.fontSize) {
            this.y = this.fontSize;
        } else if (this.y > this.ctx.canvas.height - this.fontSize) {
            this.y = this.ctx.canvas.height - this.fontSize;
        }

        return index;
    }

    //渲染每个弹幕
    render() {
        // 设置画布文字的字号和字体
        this.ctx.ctx.font = `${this.fontSize}px woff`;
        // 设置画布文字颜色
        this.ctx.ctx.fillStyle = this.color;
        //绘制文字
        this.ctx.ctx.fillText(this.value, this.x, this.y);
    }
}
