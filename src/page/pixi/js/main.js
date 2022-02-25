import 'style/common.mobile';
import '../css/main.less';
import {scaleToWindow} from "./scaleToWindow";
import {
  Application,
  Sprite,
  Loader,
  Container
} from 'pixi.js';

const {
  pageAdapter
} = __publicMethod;

pageAdapter(750);

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  backgroundAlpha: false,
  resolution: 1,
  backgroundColor: 0x062ea3
});

// app.view就是个canvas元素，挂载到页面上
document.getElementById('app').appendChild(app.view);

//console.log(scaleToWindow(app.view))

const root = new Container();
app.stage.addChild(root);
let screenScaleRito = window.innerWidth / 750; // 横屏则用innerHeight
root.scale.set(screenScaleRito, screenScaleRito);
console.log(root);
const loader = new Loader();

loader
  .add([
    {name: 'oly1', url: require('../image/oly1.png')},
    {name: 'oly2', url: require('../image/oly2.png')}
  ])
  .load(setup)

loader.onProgress.add((loader, resources) => {
  console.log('loading:', loader.progress, ' resource:', resources.name);
});

function setup() {
  //console.log('加载完成', loader, resources);
  const oly1 = new Sprite(loader.resources['oly1'].texture);
  console.log(oly1.height);
  oly1.width = '7.5rem';
  oly1.height = '1.16rem';
  root.addChild(oly1);


  const oly2 = new Sprite(loader.resources['oly2'].texture);
  console.log((app.renderer.view.height - oly2.height * screenScaleRito)/screenScaleRito);
  oly2.position.set(0, (app.renderer.view.height - oly2.height * screenScaleRito)/screenScaleRito);
  root.addChild(oly2);
}

window.addEventListener('resize', () => {
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  screenScaleRito = window.innerWidth / 750; // 横屏则用innerHeight
  root.scale.set(screenScaleRito, screenScaleRito);
  app.renderer.reset(root);
  root.updateTransform();
  //setup();
})






