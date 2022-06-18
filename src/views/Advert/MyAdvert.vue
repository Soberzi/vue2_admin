<template>
  <div class="advert">
    <el-button @click.once="type">打字动画</el-button>
    <el-divider></el-divider>
    <typewriter class="tl" ref="typewriter" :interval="50" :style="{visibility: status}">
      <div class="comments">
        <p class="title">将进酒·君不见</p>
        <p class="content">君不见，黄河之水天上来，奔流到海不复回。

          君不见，高堂明镜悲白发，朝如青丝暮成雪。

          人生得意须尽欢，莫使金樽空对月。

          天生我材必有用，千金散尽还复来。

          烹羊宰牛且为乐，会须一饮三百杯。

          岑夫子，丹丘生，将进酒，杯莫停。

          与君歌一曲，请君为我倾耳听。

          钟鼓馔玉不足贵，但愿长醉不愿醒。

          古来圣贤皆寂寞，惟有饮者留其名。

          陈王昔时宴平乐，斗酒十千恣欢谑。

          主人何为言少钱，径须沽取对君酌。

          五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。</p>
        <el-divider></el-divider>
        <p>翻译：</p>
        <p class="content">你难道看不见，那黄河之水从天上奔腾而来，波涛翻滚直奔东海，再也没有回来。你难道看不见，那年迈的父母，对着明镜悲叹自己的衰老的白发，年轻时的满头青丝如今已是雪白一片。人生得意之时就应当纵情欢乐，不要让这金杯无酒空对明月。每个人的出生都一定有自己的价值和意义，黄金千两（就算）一挥而尽，它也还是能够再得来。我们烹羊宰牛姑且作乐，（今天）一次性痛快地饮三百杯也不为多！岑夫子，丹丘生啊，请二位快点喝酒吧，举起酒杯不要停下来。让我来为你们高歌一曲，请你们为我倾耳细听：整天吃山珍海味的豪华生活有何珍贵，只希望醉生梦死而不愿清醒。自古以来圣贤无不是冷落寂寞的，只有那会喝酒的人才能够留传美名。陈王曹植当年宴设平乐观的事迹你可知道，斗酒万千也豪饮，让宾主尽情欢乐。主人呀，你为何说我的钱不多？只管买酒来让我们一起痛饮。那些什么名贵的五花良马，昂贵的千金狐裘，快叫侍儿拿去统统来换美酒，让我们一起来消除这无穷无尽的万古长愁！</p>
        <el-divider></el-divider>
        <p>赏析：</p>
        <p class="content">将进酒，是唐代以前乐府歌曲的一个题目，内容大多咏唱饮酒放歌之事。在这首里李白“借题发挥”借酒浇愁，抒发自己的愤激情绪。这首诗非常形象的表现了李白桀骜不驯的性格：一方面对自己充满自信，孤高自傲；一方面在政治前途出现波折后，又流露出纵情享乐之情。全诗气势豪迈，感情奔放，语言流畅，具有很强的感染力。
          李白咏酒的诗篇极能表现他的个性，这类诗固然属长安放还以后所作，思想内容更为深沉，艺术表现更为成熟。《将进酒》即其代表作。</p>
      </div>
    </typewriter>
  </div>
</template>

<script>
import typewriter from 'vue-type-writer'
export default {
  components: {
    typewriter
  },
  data () {
    return {
      status: 'hidden'
    }
  },
  methods: {
    // $emit
    type () {
      this.status = 'visible'
      this.$refs.typewriter.$emit('typewrite')
    }
  }
}
</script>

<style lang='less' scoped>
@bgcolor:#111827;
@btncolor:#ffd859;
.advert{
  padding: 20px;
  font-size: 16px;
  .title{
    text-align: center;
  }
  .content{
    text-indent: 32px;
  }
}
    button{
      padding: 10px;
      margin-bottom: 10px;
      font-weight: 700;
      background-color:@bgcolor;
      font-size: 16px;
      border: 1px solid white;
      color: #fff;
    }
    button:hover{
      background-color:@btncolor;
      color: @bgcolor;
      border: 1px solid @bgcolor;
    }
</style>
