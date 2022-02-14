import 'style/common.mobile';
import 'animate.css';
import '../css/main';
import 'lib/exif';

const {
  uploadImage
} = __publicMethod;

let file;
const $text = $('.text');

$('#upload').change((event) => {
  file = event.target.files[0];
});

const textGroup = [
  '习爷爷勉励我们德智体美劳全面发展',
  '赶考路',
  '伟大建党精神',
  '窑洞里传出“红色声音”',
  '中国疫苗',
  '祖国有我',
  '致敬红领巾',
  '飞扬的队歌',
  '强国少年',
  '一起向未来'
];

$('.start-btn').click(function(){
  if($(this).hasClass('disabled')) return;
  $(this).addClass('disabled');
  const name = $('#name').val().trim();
  const me = this;
  if (!name) {
    return $text.text('请输入名字').addClass('error').removeClass('success').fadeIn(300);
  }
  if (!file) {
    return $text.text('请上传文件').addClass('error').removeClass('success').fadeIn(300);
  }
  uploadImage(file, (base64) => {
    $.ajax({
      url: 'https://ai.baidu.com/aidemo',
      type: 'post',
      data: {
        type: 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic',
        detect_direction: false,
        image: base64
      },
      success(data) {
        console.log(JSON.parse(data));
        data = JSON.parse(data);
        if (data.msg === 'success') {
          let text='', bool = false, cache;
          data.data.words_result.forEach(word => {
            text += word.words;
          });

          console.log(text);

          if(new RegExp(`我是少先队员${name}`).test(text)){
            for (let i = 0; i < textGroup.length; i++) {
              cache = textGroup[i];
              const reg = new RegExp(`寒假10课${textGroup[i]}专属徽章`);
              if(reg.test(text)){
                bool = true;
                break;
              }
            }
            if(bool){
              $text.text(`图片符合要求: ${name}--${cache}`).addClass('success').removeClass('error').fadeIn(300);
            }else{
              $text.text('图片不符合要求').addClass('error').removeClass('success').fadeIn(300);
            }
          }else{
            $text.text('图片内容没有名字或名字与当前名字不相等').addClass('error').removeClass('success').fadeIn(300);
          }

        } else {
          console.log('msg:',data.msg);
          $text.text(data.msg).addClass('error').removeClass('success').fadeIn(300);
        }

        $(me).removeClass('disabled');
      }
    })
  })
})


