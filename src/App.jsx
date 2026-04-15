import { useState, useEffect } from "react";

// ============================================================
// ACTI — Accounting Character Type Indicator
// 会计人格类型指标
// ============================================================

// Image path convention: /images/{code}.png  e.g. /images/tie-r.png
// If image fails to load, falls back to emoji
const IMG_BASE = import.meta.env.BASE_URL + "images/";

function TypeImage({ type, size = 120, style: extra = {} }) {
  const [failed, setFailed] = useState(false);
  const src = IMG_BASE + type.code.toLowerCase().replace(/\s/g, "") + ".png";

  if (failed) {
    return (
      <div style={{
        fontSize: size * 0.6, lineHeight: 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        width: size, height: size, ...extra,
      }}>{type.emoji}</div>
    );
  }

  return (
    <div style={{
      width: size, height: size, borderRadius: 8,
      overflow: "hidden", flexShrink: 0, ...extra,
    }}>
      <img
        src={src}
        alt={type.code}
        onError={() => setFailed(true)}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
        }}
      />
    </div>
  );
}

// ---------- DATA: 16 Types ----------
const TYPES = [
  {
    code: "TIE-R",
    name: "平账强迫症",
    nameEn: "The Balancer",
    emoji: "⚖️",
    color: "#E63946",
    tagline: "差一分钱，死都不走。",
    desc: "差一分钱，死都不走。全组人都下班了，你还在翻第387张凭证。同事说「差一分没关系」，你看他的眼神像看杀人犯。你的人生没有「差不多」，只有「差一分就是差十万」。找到那一分钱的瞬间，你的快感比涨薪还强烈。别人下班约饭，你在和数字约架。你的Excel里藏着你的执念，你的执念里藏着你最后的尊严。你曾经为了两分钱的差额加班到凌晨，第二天发现是自己多输了一个小数点——但你不后悔，因为「对了就是对了」。",
    traits: ["完美主义", "不放过细节", "较真到底", "数字洁癖"],
    fear: "Trial Balance不为零",
    motto: "It has to tie. IT HAS TO TIE.",
    strength: "精确度全组第一，出过的报表零差错",
    weakness: "效率不高，因为别人觉得不重要的事你也要较真",
    bestMatch: "NEAT",
    worstMatch: "FINE",
  },
  {
    code: "CLOSE-R",
    name: "月末关账人",
    nameEn: "The Month-Ender",
    emoji: "💀",
    color: "#457B9D",
    tagline: "每月25号准时去世，1号自动复活。",
    desc: "每月最后一周准时去世，1号自动复活。年审季你直接进入「死后世界」。朋友圈连续五天没更新不是因为你低调，是因为你真的死了。家人以为你失踪了，同事以为你住在公司了——其实两个都对。关账关的不是账，是你和正常生活之间的那扇门。你的月末标配是：泡面、咖啡、枸杞，和一双没来得及换的拖鞋。1号那天你满血复活，在朋友圈发一条「活过来了」，底下清一色的同行在点赞。",
    traits: ["周期性崩溃", "抗压但有极限", "月初满血复活", "硬扛型选手"],
    fear: "永远关不完的账",
    motto: "这个月终于close了……等等，下个月又来了？",
    strength: "抗压能力强，关键时刻扛得住",
    weakness: "月末脾气极差，请勿靠近",
    bestMatch: "LOUD-R",
    worstMatch: "LATE-R",
  },
  {
    code: "COPY-R",
    name: "人肉复印机",
    nameEn: "The Duplicator",
    emoji: "📋",
    color: "#2A9D8F",
    tagline: "上个月分录改个日期就是这个月的。",
    desc: "上个月的分录改个日期就是这个月的。你的会计人生就是一场大型Ctrl+V表演。领导说「今年有变化」，你心态直接崩了——意味着你要重新想。你上次真正原创一张凭证是什么时候？你自己也不记得了。你不是不会创新，你是发现复制粘贴才是会计的终极真理。新来的实习生问你「为什么这样做」，你说「一直都是这样做的」。其实你也不知道为什么，但它work了十二个月了，你为什么要动它？",
    traits: ["高效（物理）", "模板大师", "拒绝变化", "经验主义者"],
    fear: "准则更新 / 系统升级",
    motto: "如果上个月的能用，为什么要重新做？",
    strength: "效率极高，月末出凭证速度全组最快",
    weakness: "一旦遇到新情况直接宕机",
    bestMatch: "FINE",
    worstMatch: "NEAT",
  },
  {
    code: "SORRY",
    name: "跪式催人员",
    nameEn: "The Apologizer",
    emoji: "🙇",
    color: "#F4A261",
    tagline: "催人像在道歉，道歉像在催人。",
    desc: "催回款、催发票、催报销单、催部门交数据、催审批签字……你的日常就是一个大型「不好意思打扰了」循环。对方已读不回你还帮他找理由：「可能太忙了吧。」催了三遍不好意思催第四遍，第四遍开头还是「不好意思」。全公司最没有攻击性的人，也是最多事情卡在手上的人。你的微信置顶永远是那几个催了八百遍还没回的人，你每次打开对话框都深呼吸三次才敢发消息。同事说你太软了，但你觉得做人要厚道——虽然厚道的代价是你的KPI。",
    traits: ["社恐催人", "过度共情", "无攻击性", "自我消耗型"],
    fear: "打电话催人 / 被领导问催款进度",
    motto: "不好意思打扰了，请问那个……算了下次再说。",
    strength: "人缘好，大家都觉得你人很好",
    weakness: "好到什么事都卡在你这里",
    bestMatch: "LOUD-R",
    worstMatch: "FLY-er",
  },
  {
    code: "POOR",
    name: "管钱的穷鬼",
    nameEn: "The Broke Treasurer",
    emoji: "💸",
    color: "#264653",
    tagline: "帮公司管几个亿，自己花呗没还。",
    desc: "帮公司管几个亿，自己花呗没还。做税务筹划帮老板省了一套房的钱，你的午饭是食堂三块五。别人问你理财建议你滔滔不绝，自己的工资卡余额不敢打开看。你是世界上最懂钱的穷人。每天经手的数字都比你的年薪多几个零。最讽刺的是，你帮客户做财务自由规划的那天晚上，回家发现外卖红包过期了，心痛了十分钟。你安慰自己：「至少我懂复利的力量。」然后继续吃泡面。",
    traits: ["精通理论", "实践为零", "精神富有", "物质贫穷"],
    fear: "同学聚会被问收入 / 亲戚问年终奖",
    motto: "钱只是一个数字。尤其是别人的。",
    strength: "理论知识扎实，分析能力强",
    weakness: "道理都懂但就是存不下钱",
    bestMatch: "RICH",
    worstMatch: "LIAR",
  },
  {
    code: "FAKE-R",
    name: "平行宇宙建筑师",
    nameEn: "The Multiverse Architect",
    emoji: "🎭",
    color: "#6D6875",
    tagline: "内账外账无缝切换。",
    desc: "内账外账无缝切换，税务局和老板看到的是两个次元。你不叫「做假账」，你叫「多维度财务叙事工程师」。你最大的恐惧不是做错账，是哪天记不清楚哪个版本给了哪个人。你的大脑里运行着两套操作系统，偶尔还要切换到第三套应付审计。你的桌面上有三个Excel文件，文件名分别是「报表_final」「报表_final_v2」和「报表_真的final_老板看这个」。你不觉得自己在造假，你觉得自己在搞平行宇宙物理学。",
    traits: ["多线程大脑", "记忆力惊人", "压力山大", "版本管理大师"],
    fear: "把内账发给了税务局 / 版本搞混",
    motto: "哪个版本？你要看哪个版本的？",
    strength: "多任务处理能力极强，头脑灵活",
    weakness: "精神压力大到随时可能爆炸",
    bestMatch: "LIAR",
    worstMatch: "TIE-R",
  },
  {
    code: "YES-er",
    name: "老板说啥都说好",
    nameEn: "The Yes-Man",
    emoji: "🐶",
    color: "#E76F51",
    tagline: "老板说「帮我算一下」等于今晚别走了。",
    desc: "老板说「帮我算一下」等于你今晚别走了。他拍脑袋你擦屁股，他画大饼你做可行性分析，他说「大概估一下就行」但你知道他要的是精确到小数点后两位。你不是CFO，你是CEO身上的一个外挂配件。「好的」「没问题」「马上做」是你的三大核心技能。你的内心OS和嘴说出来的话从来不是一个频道——嘴上说「好的马上」，脑子里在想「又来了又来了又来了」。但你就是拒绝不了，因为你怕拒绝之后的气氛，比加班还可怕。",
    traits: ["无条件服从", "加班体质", "内心OS很丰富", "讨好型人格"],
    fear: "老板周五下午说「你等一下」",
    motto: "好的老板。没问题老板。马上做老板。",
    strength: "执行力强，领导信任",
    weakness: "不会拒绝，活越来越多",
    bestMatch: "FAVO-R",
    worstMatch: "LOUD-R",
  },
  {
    code: "FLY-er",
    name: "盘点放飞机的人",
    nameEn: "The Inventory Dodger",
    emoji: "✈️",
    color: "#90BE6D",
    tagline: "盘点的时候人呢？飞了。",
    desc: "盘点日别人在仓库里满头大汗数货，你不知道躲在哪个角落玩手机。主管喊你名字，三秒后你从货架后面冒出来：「我在数这边呢！」你不是不想干活，你是觉得数来数去最后还是要调账，那不如直接调。你是全组最有哲学思维的人——用最少的体力解决问题。年终盘点你永远自告奋勇负责「记录」而不是「数数」。你的手机相册里有盘点当天拍的仓库照片——不是工作记录，是你躲在角落拍的自拍。",
    traits: ["摸鱼高手", "善于隐藏", "有自己的道理", "体力活绝缘体"],
    fear: "主管突然出现在身后 / 突击盘点",
    motto: "我刚刚在数那边的……你没看到吗？",
    strength: "善于找到效率最高（最省力）的方案",
    weakness: "体力活永远指望不上",
    bestMatch: "LATE-R",
    worstMatch: "TIE-R",
  },
  {
    code: "FINE",
    name: "佛系做账人",
    nameEn: "The Zen Accountant",
    emoji: "🧘",
    color: "#B5838D",
    tagline: "差一万？挂其他。审计来了？随缘。",
    desc: "差一万？挂其他。审计来了？随缘。升职没你？命里没有。别人加班焦虑你在喝茶，别人对着报表崩溃你说「都会过去的」。你的心态比资产负债表还平，比直线折旧还稳。全组最没有情绪波动的人，也是唯一一个准点下班从不愧疚的人。你的工位上永远有一杯温度刚好的茶，屏幕永远停在某个不急不慢的Excel上。同事崩溃的时候来找你，你说「急也没用」——他们讨厌这句话，但不得不承认你说的对。",
    traits: ["心态稳如泰山", "不争不抢", "准点下班", "情绪绝缘体"],
    fear: "其实没有什么好怕的",
    motto: "都行。都可以。没关系。",
    strength: "永远不崩溃，团队的定海神针",
    weakness: "过于佛系导致很多事卡在你手上也不着急",
    bestMatch: "COPY-R",
    worstMatch: "TIE-R",
  },
  {
    code: "NEAT",
    name: "像素级对齐狂",
    nameEn: "The Pixel Perfectionist",
    emoji: "📐",
    color: "#43AA8B",
    tagline: "字体、缩进、边框、颜色，全部必须完美。",
    desc: "跟TIE-R不同，TIE-R要的是数字对，你要的是一切都对。字体、缩进、小数位数、边框粗细、表头颜色，全部必须完美。你做的报表是艺术品，但没人在乎。你发现同事的表格用了宋体和微软雅黑混排，差点当场去世。你的审美洁癖已经从Excel蔓延到了PPT、邮件、甚至群消息的标点符号。你曾经花两个小时调一张报表的列宽，只为了打印出来每一列都正好在网格线上。同事说你有病，你说这叫「专业素养」。",
    traits: ["审美洁癖", "排版大师", "不被理解的艺术家", "表格美学家"],
    fear: "同事发来的表格用了彩虹色填充 / 宋体微软雅黑混排",
    motto: "这个单元格为什么没有右对齐？？？",
    strength: "出品质量极高，做的表格赏心悦目",
    weakness: "在别人看来不重要的事上花太多时间",
    bestMatch: "TIE-R",
    worstMatch: "COPY-R",
  },
  {
    code: "LIAR",
    name: "预算表演艺术家",
    nameEn: "The Budget Novelist",
    emoji: "🎪",
    color: "#F77F00",
    tagline: "把「完全偏了」说成「基本符合预期」。",
    desc: "你做的预算从来没准过，但你的差异分析写得行云流水。核心技能是把「完全偏了」包装成「基本符合预期」，把「亏麻了」翻译成「短期承压但长期向好」。你不是在做财务，你是在做文学创作。年底述职的时候你是全场最佳编剧，数字不够叙事来凑。你的PPT功力比财务功力还深，领导看完你的报告觉得「形势一片大好」——直到看了原始数据。你最擅长的财务术语不是EBITDA，是「环比改善」和「剔除一次性因素后」。",
    traits: ["文字功底深厚", "包装大师", "永远正能量", "PPT王者"],
    fear: "领导要看原始数据 / 审计追问细节",
    motto: "基本符合预期。（预期已经调过三次了）",
    strength: "沟通能力强，能把复杂的事说得好听",
    weakness: "有时候连自己都信了",
    bestMatch: "FAKE-R",
    worstMatch: "TIE-R",
  },
  {
    code: "QUIT-R",
    name: "每天想辞职的人",
    nameEn: "The Almost-Quitter",
    emoji: "🚪",
    color: "#9B5DE5",
    tagline: "没辞是因为简历上只会写会计。",
    desc: "入行第一年背准则背到哭，第三年连借贷都不想分了。每天打开电脑的第一个念头是「我为什么要做会计」，第二个念头是「但我简历上只会写这个」。你没有离开，不是因为热爱，是因为沉没成本。你的辞职信已经写好了，就差一个勇气和一个offer。你关注了十几个「转行成功」的公众号，收藏了几十篇「会计转行指南」，但打开频率为零。每次发完牢骚，你又默默打开了Excel——毕竟月底了。",
    traits: ["持续性厌班", "沉没成本受害者", "辞职信常年待发", "精神离职"],
    fear: "发现转行也好不到哪去 / CPA白考了",
    motto: "等年终奖发了我就……算了明年再说。",
    strength: "忍耐力极强（被动技能）",
    weakness: "工作热情约等于零",
    bestMatch: "POOR",
    worstMatch: "YES-er",
  },
  {
    code: "FAVO-R",
    name: "万能帮忙财务",
    nameEn: "The Office Glue",
    emoji: "🩹",
    color: "#577590",
    tagline: "「帮个小忙」是你听过最多的话。",
    desc: "报销找你、开票找你、打印机卡纸找你、系统报错找你、「这个流程怎么走」找你。你不是会计，你是全公司的IT+行政+客服+心理咨询师。你的本职工作永远排在最后，因为永远有人在找你「帮个小忙」。你的善良就是你的牢笼。你的微信永远有99+的未读消息，其中95条是「在吗？」。你想说不，但那个字到了嘴边就自动变成了「行吧我看看」。年底评优你什么奖都没拿到，因为你帮的那些忙都不算你的KPI。",
    traits: ["来者不拒", "万能工具人", "本职工作永远最后做", "隐形劳模"],
    fear: "有人走过来说「在吗？」/ 周一早上的消息列表",
    motto: "行吧我看看……你等一下哈。",
    strength: "全公司人缘最好，什么都会一点",
    weakness: "自己的活永远加班做",
    bestMatch: "YES-er",
    worstMatch: "LOUD-R",
  },
  {
    code: "LATE-R",
    name: "永远待会儿再说",
    nameEn: "The Deadline Surfer",
    emoji: "⏰",
    color: "#F94144",
    tagline: "永远最后一秒交，全部卡点提交。",
    desc: "月报、季报、年报，全部卡点提交。领导问进度你说「快了快了」，实际上还没打开文件。不是你拖延，是你「需要压力才能激发潜能」。同事叫你deadline战神，领导叫你心脏病根源。你的人生哲学：如果提前交了，不就显得deadline定太松了吗？你的电脑桌面上永远有一个文件叫「月报」但里面是空的，它只在截止日前24小时才会被真正打开。神奇的是，你每次都能赶上——虽然质量参差不齐，但「交了」本身就是一种胜利。",
    traits: ["拖延症晚期", "爆发力惊人", "压力转化效率高", "DDL战神"],
    fear: "截止日期突然提前 / 领导要看进度",
    motto: "快了快了，马上就好。（还没开始）",
    strength: "在极限压力下也能交出东西",
    weakness: "东西的质量取决于最后12小时的状态",
    bestMatch: "FLY-er",
    worstMatch: "CLOSE-R",
  },
  {
    code: "RICH",
    name: "精神富豪",
    nameEn: "The Paper Millionaire",
    emoji: "👑",
    color: "#FFB703",
    tagline: "帮客户做资产配置，自己基金亏40%。",
    desc: "帮客户做投资分析头头是道，自己的基金亏了40%没敢打开看。给老板讲资产配置滔滔不绝，回家吃泡面。同事找你推荐股票，你推得头头是道——反正亏的不是自己的钱。你活在一个「帮别人赚钱」的平行宇宙里，在那里你是巴菲特。你的知乎收藏夹里有200篇投资文章，你的基金账户里有200块钱。你最常安慰自己的话是「投资最重要的是认知」——你的认知确实很到位，只是钱不够配合你的认知。",
    traits: ["理论巨人实践矮子", "帮人头头是道", "自己一塌糊涂", "纸上谈兵大师"],
    fear: "有人问你自己的收益率 / 被要求晒持仓",
    motto: "投资嘛，要看长期。（已经亏三年了）",
    strength: "知识面广，分析框架清晰",
    weakness: "执行力和风控完全不行（仅限自己的钱）",
    bestMatch: "POOR",
    worstMatch: "NEAT",
  },
  {
    code: "LOUD-R",
    name: "嘴替型会计",
    nameEn: "The Enforcer",
    emoji: "📢",
    color: "#D62828",
    tagline: "全组唯一敢跟业务部门硬刚的人。",
    desc: "全组唯一敢跟业务部门正面硬刚的人。「发票不合规打回去！」「预算超了我不签！」「上个月的单子这个月才拿来，你当我是时间管理大师？」别人做会计做成了服务业，你做成了执法部门。全公司怕你，但全组靠你。你说出了所有会计想说但不敢说的话。你的企业微信头像是你本人，但所有人看到都觉得有一种「不好惹」的气场。你不是脾气差，你是受不了不专业。在你心里，流程就是流程，规定就是规定，谁来了都一样——包括CEO。",
    traits: ["正义感爆棚", "不怕得罪人", "全组靠山", "原则性极强"],
    fear: "其实内心也会怕，但嘴比脑快",
    motto: "不合规就是不合规，谁来都一样！",
    strength: "有你在，没人敢乱来",
    weakness: "偶尔太刚，容易得罪人",
    bestMatch: "SORRY",
    worstMatch: "YES-er",
  },
];

const QUESTIONS = [
  {
    q: "月末最后一天，系统差了一分钱，你会？",
    options: [
      { text: "翻遍所有凭证找到它", types: ["TIE-R", "NEAT"] },
      { text: "挂「其他」科目，下班", types: ["FINE", "FLY-er"] },
      { text: "先截图保留证据，明天再说", types: ["LATE-R", "COPY-R"] },
      { text: "跟旁边的人吐槽半小时然后再找", types: ["LOUD-R", "QUIT-R"] },
    ],
  },
  {
    q: "业务部门的报销单又不合规，你会？",
    options: [
      { text: "直接打回去，附上规定截图", types: ["LOUD-R", "NEAT"] },
      { text: "帮他改好再走流程", types: ["FAVO-R", "YES-er"] },
      { text: "发消息温柔提醒，措辞斟酌半小时", types: ["SORRY", "LIAR"] },
      { text: "假装没看到，等他自己发现", types: ["FLY-er", "FINE"] },
    ],
  },
  {
    q: "老板周五下午五点突然说「帮我算个东西」，你？",
    options: [
      { text: "「好的老板」（内心在骂）", types: ["YES-er", "CLOSE-R"] },
      { text: "「我看一下哈」（然后周一再做）", types: ["LATE-R", "FLY-er"] },
      { text: "「这个需要XX数据，周一给您可以吗」", types: ["LOUD-R", "LIAR"] },
      { text: "默默打开电脑，心里更新一遍辞职信", types: ["QUIT-R", "POOR"] },
    ],
  },
  {
    q: "年底盘点日到了，你？",
    options: [
      { text: "带着表格第一个到仓库", types: ["TIE-R", "NEAT"] },
      { text: "找个角落玩手机等结束", types: ["FLY-er", "FINE"] },
      { text: "在办公室说「我负责录数据」", types: ["COPY-R", "LATE-R"] },
      { text: "带头干活顺便指挥别人", types: ["LOUD-R", "CLOSE-R"] },
    ],
  },
  {
    q: "同事发来一张表格，字体混乱颜色辣眼，你？",
    options: [
      { text: "重新排版再发回去（虽然没人叫你这样做）", types: ["NEAT", "TIE-R"] },
      { text: "截图发到朋友圈吐槽（打码）", types: ["LOUD-R", "QUIT-R"] },
      { text: "能看就行，内容比形式重要", types: ["FINE", "COPY-R"] },
      { text: "帮他改好然后说「我顺手调了一下」", types: ["FAVO-R", "SORRY"] },
    ],
  },
  {
    q: "有人问你「会计工资高吗」，你？",
    options: [
      { text: "呵呵", types: ["POOR", "QUIT-R"] },
      { text: "还行吧（谎言）", types: ["LIAR", "FAKE-R"] },
      { text: "认真分析不同级别的薪资范围", types: ["RICH", "NEAT"] },
      { text: "你自己干一个月就知道了", types: ["LOUD-R", "CLOSE-R"] },
    ],
  },
  {
    q: "审计来了，你的反应？",
    options: [
      { text: "提前三天把底稿整理得完美无瑕", types: ["TIE-R", "NEAT"] },
      { text: "心跳加速虽然我没做错什么", types: ["SORRY", "FAKE-R"] },
      { text: "该来的总会来的", types: ["FINE", "FLY-er"] },
      { text: "谁怕谁，所有凭证我都有底", types: ["LOUD-R", "CLOSE-R"] },
    ],
  },
  {
    q: "做预算的时候，你？",
    options: [
      { text: "参考去年数字微调一下", types: ["COPY-R", "LATE-R"] },
      { text: "认真做完然后知道实际一定对不上", types: ["LIAR", "RICH"] },
      { text: "跟每个部门battle他们的数字", types: ["LOUD-R", "TIE-R"] },
      { text: "老板说多少就多少", types: ["YES-er", "FINE"] },
    ],
  },
  {
    q: "你的Excel水平？",
    options: [
      { text: "VLOOKUP够用了为什么要学新的", types: ["COPY-R", "FINE"] },
      { text: "Pivot Table、Power Query、VBA都会一点", types: ["NEAT", "RICH"] },
      { text: "能算就行不在乎用什么函数", types: ["FLY-er", "LATE-R"] },
      { text: "帮全组人修表格的就是我", types: ["FAVO-R", "TIE-R"] },
    ],
  },
  {
    q: "月初的你 vs 月末的你？",
    options: [
      { text: "月初微笑上班，月末工位渡劫", types: ["CLOSE-R", "QUIT-R"] },
      { text: "没区别，每天都一样的", types: ["FINE", "COPY-R"] },
      { text: "月初计划满满，月末全部推翻", types: ["LATE-R", "LIAR"] },
      { text: "月初帮别人，月末恨别人", types: ["FAVO-R", "LOUD-R"] },
    ],
  },
  {
    q: "供应商的款到期了但他没付，你？",
    options: [
      { text: "发一条措辞温柔得像情书的催款消息", types: ["SORRY", "LIAR"] },
      { text: "直接打电话过去要", types: ["LOUD-R", "TIE-R"] },
      { text: "跟领导汇报让领导去催", types: ["YES-er", "FLY-er"] },
      { text: "先计提坏账准备吧", types: ["FINE", "POOR"] },
    ],
  },
  {
    q: "有人说「会计很轻松，不就是记记账吗」，你？",
    options: [
      { text: "微笑但内心已经写好了三千字反驳", types: ["SORRY", "QUIT-R"] },
      { text: "直接科普二十分钟", types: ["LOUD-R", "RICH"] },
      { text: "是啊挺轻松的（疯狂暗示）", types: ["LIAR", "FAKE-R"] },
      { text: "懒得解释，反正说了也不懂", types: ["FINE", "POOR"] },
    ],
  },
  {
    q: "你最常说的一句话是？",
    options: [
      { text: "「不好意思，这个发票不能报」", types: ["SORRY", "NEAT"] },
      { text: "「好的马上」", types: ["YES-er", "FAVO-R"] },
      { text: "「快了快了」", types: ["LATE-R", "FLY-er"] },
      { text: "「这个不合规」", types: ["LOUD-R", "TIE-R"] },
    ],
  },
  {
    q: "如果可以转行，你想做什么？",
    options: [
      { text: "开个咖啡店/花店（虽然知道也会亏）", types: ["QUIT-R", "POOR"] },
      { text: "做自媒体吐槽会计日常", types: ["LOUD-R", "LIAR"] },
      { text: "其实想了很多但没有行动过", types: ["LATE-R", "FINE"] },
      { text: "转什么行，在哪打工不是打工", types: ["CLOSE-R", "COPY-R"] },
    ],
  },
  {
    q: "你怎么看待「其他应收款」这个科目？",
    options: [
      { text: "万能垃圾桶，什么都能往里扔", types: ["FINE", "FAKE-R"] },
      { text: "每一笔都应该有明确对应的原始凭证", types: ["TIE-R", "NEAT"] },
      { text: "老板的私人花销都在这里，别问", types: ["YES-er", "FAKE-R"] },
      { text: "审计最爱翻的科目，小心", types: ["SORRY", "CLOSE-R"] },
    ],
  },
  {
    q: "下班后有人微信问你工作上的事，你？",
    options: [
      { text: "秒回", types: ["YES-er", "FAVO-R"] },
      { text: "看到了但假装没看到", types: ["FLY-er", "LATE-R"] },
      { text: "回一个「明天上班看」", types: ["LOUD-R", "FINE"] },
      { text: "回了，但附带一声叹息", types: ["QUIT-R", "POOR"] },
    ],
  },
];

function calculateResult(answers) {
  const scores = {};
  TYPES.forEach((t) => (scores[t.code] = 0));
  answers.forEach((ai, qi) => {
    if (ai !== null && QUESTIONS[qi]) {
      QUESTIONS[qi].options[ai].types.forEach((tc) => {
        scores[tc] = (scores[tc] || 0) + 1;
      });
    }
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const topCode = sorted[0][0];
  const topScore = sorted[0][1];
  return {
    type: TYPES.find((t) => t.code === topCode),
    matchPercent: Math.min(99, Math.round((topScore / (QUESTIONS.length * 2)) * 100 + 40)),
    allScores: sorted,
  };
}

// ===================== COMPONENTS =====================

function Nav({ page, setPage }) {
  const links = [["home", "首页"], ["types", "全部角色"], ["test", "开始测试"], ["about", "关于"]];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "16px 24px", background: "rgba(10,10,12,0.85)",
      backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)",
    }}>
      <div onClick={() => setPage("home")} style={{
        cursor: "pointer", fontFamily: "'Space Mono',monospace",
        fontSize: 20, fontWeight: 700, letterSpacing: 3, color: "#F0E68C",
      }}>ACTI</div>
      <div style={{ display: "flex", gap: 24 }}>
        {links.map(([p, label]) => (
          <span key={p} onClick={() => setPage(p)} style={{
            cursor: "pointer", fontSize: 13, letterSpacing: 1,
            color: page === p ? "#F0E68C" : "rgba(255,255,255,0.5)",
            fontFamily: "'Space Mono',monospace", transition: "color 0.2s",
          }}>{label}</span>
        ))}
      </div>
    </nav>
  );
}

function Btn({ onClick, children, color, border, bg, hoverBg, hoverColor, style: extra }) {
  return (
    <button onClick={onClick}
      onMouseEnter={e => { e.target.style.background = hoverBg || "#F0E68C"; e.target.style.color = hoverColor || "#0a0a0c"; }}
      onMouseLeave={e => { e.target.style.background = bg || "transparent"; e.target.style.color = color || "#F0E68C"; }}
      style={{
        fontFamily: "'Space Mono',monospace", fontSize: 14, letterSpacing: 3,
        padding: "16px 40px", border: border || "2px solid #F0E68C",
        background: bg || "transparent", color: color || "#F0E68C",
        cursor: "pointer", transition: "all 0.3s", ...extra,
      }}>{children}</button>
  );
}

function HomePage({ setPage }) {
  const marquee = [...TYPES, ...TYPES];
  return (
    <div style={{ minHeight: "100vh", paddingTop: 80 }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "80vh", padding: "40px 20px", textAlign: "center",
      }}>
        <div style={{
          fontFamily: "'Space Mono',monospace", fontSize: "clamp(12px,2vw,14px)",
          letterSpacing: 8, color: "rgba(255,255,255,0.3)", marginBottom: 24, textTransform: "uppercase",
        }}>Accounting Character Type Indicator</div>
        <h1 style={{
          fontFamily: "'Space Mono',monospace", fontSize: "clamp(64px,15vw,160px)",
          fontWeight: 700, letterSpacing: 12, color: "#F0E68C", margin: "0 0 16px 0",
          lineHeight: 1, textShadow: "0 0 80px rgba(240,230,140,0.3)",
        }}>ACTI</h1>
        <p style={{
          fontFamily: "'Noto Serif SC',serif", fontSize: "clamp(18px,3vw,28px)",
          color: "rgba(255,255,255,0.7)", marginBottom: 12, fontWeight: 300,
        }}>会计人格类型指标</p>
        <p style={{
          fontFamily: "'Noto Serif SC',serif", fontSize: "clamp(14px,2vw,18px)",
          color: "rgba(255,255,255,0.35)", marginBottom: 48, maxWidth: 500, lineHeight: 1.6,
        }}>MBTI太正经了。来看看你是哪种会计。<br />16题，找到你的财务人格。</p>
        <Btn onClick={() => setPage("test")} style={{ fontSize: 16, letterSpacing: 4, padding: "18px 48px" }}>开始测试</Btn>
        <p style={{
          fontFamily: "'Noto Serif SC',serif", fontSize: 13,
          color: "rgba(255,255,255,0.25)", marginTop: 20, lineHeight: 1.8,
        }}>准备好被精准冒犯了吗？ · 纯属娱乐，请勿辞职</p>
      </div>
      <div style={{
        overflow: "hidden", padding: "40px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{
          display: "flex", gap: 24, animation: "marquee 30s linear infinite", width: "max-content",
        }}>
          {marquee.map((t, i) => (
            <div key={i} onClick={() => setPage("types")} style={{
              cursor: "pointer", padding: "12px 24px", border: "1px solid " + t.color + "44",
              borderRadius: 4, whiteSpace: "nowrap", background: t.color + "11", transition: "all 0.3s",
            }}>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 14, color: t.color, letterSpacing: 2 }}>{t.code}</span>
              <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypesPage({ setPage, setSelectedType }) {
  const [hov, setHov] = useState(null);
  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: 36, color: "#F0E68C", letterSpacing: 4, marginBottom: 8 }}>ALL TYPES</h1>
        <p style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.4)", marginBottom: 48 }}>16种会计人格 · 每一种都是「全国最稀有的会计人格」</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {TYPES.map(t => (
            <div key={t.code} onMouseEnter={() => setHov(t.code)} onMouseLeave={() => setHov(null)}
              onClick={() => { setSelectedType(t); setPage("typeDetail"); }}
              style={{
                cursor: "pointer", border: "1px solid " + (hov === t.code ? t.color : "rgba(255,255,255,0.08)"),
                borderRadius: 8, background: hov === t.code ? t.color + "12" : "rgba(255,255,255,0.02)",
                transition: "all 0.3s", overflow: "hidden",
              }}>
              <div style={{ position: "relative", background: t.color + "10", aspectRatio: "1", }}>
                <TypeImage type={t} size={280} style={{ display: "block", width: "100%", height: "100%" }} />
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent 0%, rgba(10,10,12,0.85) 70%)",
                  padding: "50px 14px 14px",
                  display: "flex", flexDirection: "column", alignItems: "flex-start",
                }}>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 15, color: "#fff", letterSpacing: 2, fontWeight: 700, textShadow: "0 1px 8px rgba(0,0,0,0.6)", marginBottom: 2 }}>{t.code}</div>
                  <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{t.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypeDetailPage({ type, setPage, setSelectedType }) {
  if (!type) return null;
  const bestType = TYPES.find(t => t.code === type.bestMatch);
  const worstType = TYPES.find(t => t.code === type.worstMatch);
  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={() => setPage("types")} style={{
          background: "none", border: "none", color: "rgba(255,255,255,0.4)",
          fontFamily: "'Space Mono',monospace", fontSize: 13, cursor: "pointer", marginBottom: 40, letterSpacing: 2,
        }}>{"\u2190 返回全部角色"}</button>
        {/* Hero with large image and overlaid code */}
        <div style={{ borderRadius: 8, overflow: "hidden", marginBottom: 40, border: "2px solid " + type.color + "33" }}>
          <div style={{ position: "relative", background: type.color + "12" }}>
            <TypeImage type={type} size={280} style={{ margin: "0 auto", display: "block" }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(10,10,12,0.95))",
              padding: "80px 28px 24px", textAlign: "center",
            }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(36px,8vw,56px)", color: "#fff", letterSpacing: 6, fontWeight: 700, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{type.code}</div>
            </div>
          </div>
          <div style={{ padding: "16px 28px 24px", background: "rgba(10,10,12,0.95)", textAlign: "center" }}>
            <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 22, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>{type.name}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>{type.nameEn}</div>
          </div>
        </div>
        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 20, color: type.color, textAlign: "center", marginBottom: 40, fontStyle: "italic" }}>
          {"「" + type.tagline + "」"}
        </div>
        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 2, marginBottom: 48, textAlign: "justify" }}>{type.desc}</div>

        {/* Traits */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" }}>核心特征</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {type.traits.map(tr => (
              <span key={tr} style={{ padding: "6px 16px", border: "1px solid " + type.color + "44", borderRadius: 2, fontFamily: "'Noto Serif SC',serif", fontSize: 13, color: type.color, background: type.color + "11" }}>{tr}</span>
            ))}
          </div>
        </div>

        {/* Strength & Weakness */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          <div style={{ padding: 20, background: "rgba(67,170,139,0.08)", border: "1px solid rgba(67,170,139,0.2)", borderRadius: 4 }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#43AA8B", letterSpacing: 2, marginBottom: 8 }}>STRENGTH</div>
            <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{type.strength}</div>
          </div>
          <div style={{ padding: 20, background: "rgba(230,57,70,0.08)", border: "1px solid rgba(230,57,70,0.2)", borderRadius: 4 }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#E63946", letterSpacing: 2, marginBottom: 8 }}>WEAKNESS</div>
            <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{type.weakness}</div>
          </div>
        </div>

        {/* Fear */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" }}>最大恐惧</div>
          <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 15, color: "rgba(255,255,255,0.6)" }}>{type.fear}</div>
        </div>

        {/* Motto */}
        <div style={{ marginBottom: 32, padding: 24, borderLeft: "3px solid " + type.color, background: type.color + "08" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>口头禅</div>
          <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>{type.motto}</div>
        </div>

        {/* Compatibility */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}>
          {bestType && (
            <div onClick={() => { setSelectedType(bestType); setPage("typeDetail"); window.scrollTo(0,0); }}
              style={{ padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, cursor: "pointer" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginBottom: 8 }}>BEST MATCH</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TypeImage type={bestType} size={36} />
                <div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 14, color: bestType.color }}>{bestType.code}</div>
                  <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{bestType.name}</div>
                </div>
              </div>
            </div>
          )}
          {worstType && (
            <div onClick={() => { setSelectedType(worstType); setPage("typeDetail"); window.scrollTo(0,0); }}
              style={{ padding: 16, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, cursor: "pointer" }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginBottom: 8 }}>WORST MATCH</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <TypeImage type={worstType} size={36} />
                <div>
                  <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 14, color: worstType.color }}>{worstType.code}</div>
                  <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{worstType.name}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <Btn onClick={() => setPage("test")} color={type.color} border={"2px solid " + type.color} hoverBg={type.color}>我是这个吗？去测试 →</Btn>
        </div>
      </div>
    </div>
  );
}

function TestPage({ setPage, setResult }) {
  const [curQ, setCurQ] = useState(-1);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [fade, setFade] = useState(true);
  const go = (fn) => { setFade(false); setTimeout(() => { fn(); setFade(true); }, 250); };

  if (curQ === -1) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, opacity: fade ? 1 : 0, transition: "opacity 0.3s" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 48, color: "#F0E68C", letterSpacing: 8, marginBottom: 24 }}>ACTI</div>
        <p style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 400, lineHeight: 1.8, marginBottom: 16 }}>16道题，测出你是哪种会计人格。<br />不要想太多，选最真实的那个。</p>
        <p style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 48 }}>纯属娱乐，请勿作为辞职依据。</p>
        <Btn onClick={() => go(() => setCurQ(0))} style={{ fontSize: 16, letterSpacing: 4, padding: "18px 48px" }}>开始</Btn>
      </div>
    );
  }

  const question = QUESTIONS[curQ];
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ position: "fixed", top: 70, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.06)" }}>
        <div style={{ height: "100%", width: ((curQ + 1) / QUESTIONS.length * 100) + "%", background: "#F0E68C", transition: "width 0.5s ease" }} />
      </div>
      <div style={{ opacity: fade ? 1 : 0, transition: "opacity 0.25s", maxWidth: 560, width: "100%" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: 4, marginBottom: 24, textAlign: "center" }}>{curQ + 1} / {QUESTIONS.length}</div>
        <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: "clamp(18px,4vw,24px)", color: "rgba(255,255,255,0.85)", textAlign: "center", marginBottom: 48, fontWeight: 400, lineHeight: 1.6 }}>{question.q}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {question.options.map((opt, i) => (
            <button key={i}
              onClick={() => {
                const na = [...answers]; na[curQ] = i; setAnswers(na);
                if (curQ < QUESTIONS.length - 1) { go(() => setCurQ(curQ + 1)); }
                else { const r = calculateResult(na); setResult(r); setPage("result"); }
              }}
              onMouseEnter={e => { e.target.style.borderColor = "#F0E68C"; e.target.style.color = "#F0E68C"; e.target.style.background = "rgba(240,230,140,0.06)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.color = "rgba(255,255,255,0.6)"; e.target.style.background = "rgba(255,255,255,0.02)"; }}
              style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 15, padding: "18px 24px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, background: "rgba(255,255,255,0.02)", color: "rgba(255,255,255,0.6)", cursor: "pointer", textAlign: "left", transition: "all 0.2s", lineHeight: 1.5 }}
            >{opt.text}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResultPage({ result, setPage, setSelectedType }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  if (!result) return null;
  const { type, matchPercent, allScores } = result;
  const runners = allScores.slice(1, 4).map(([code]) => TYPES.find(t => t.code === code));

  return (
    <div style={{ minHeight: "100vh", paddingTop: 80, opacity: show ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px 80px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.25)", letterSpacing: 6, marginBottom: 40, textTransform: "uppercase" }}>你的会计人格是</div>
        {/* Hero card with large image and overlaid text */}
        <div style={{ marginBottom: 40, borderRadius: 8, overflow: "hidden", border: "2px solid " + type.color + "44" }}>
          <div style={{ position: "relative", background: type.color + "15" }}>
            <TypeImage type={type} size={320} style={{ margin: "0 auto", display: "block" }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(transparent, rgba(10,10,12,0.95))",
              padding: "60px 24px 24px",
            }}>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(36px,10vw,56px)", color: "#fff", letterSpacing: 6, fontWeight: 700, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>{type.code}</div>
            </div>
          </div>
          <div style={{ padding: "20px 24px 28px", background: "rgba(10,10,12,0.95)" }}>
            <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 22, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>{type.name}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: type.color, letterSpacing: 1, marginBottom: 12 }}>{"匹配度 " + matchPercent + "%"}</div>
            <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 15, color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>{"「" + type.tagline + "」"}</div>
          </div>
        </div>
        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 2, textAlign: "left", marginBottom: 40 }}>{type.desc}</div>
        <div style={{ padding: 24, borderLeft: "3px solid " + type.color, background: type.color + "08", textAlign: "left", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 8 }}>你的口头禅</div>
          <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>{type.motto}</div>
        </div>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: 3, marginBottom: 16, textTransform: "uppercase" }}>你也有一点……</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {runners.map(r => r && (
              <span key={r.code} onClick={() => { setSelectedType(r); setPage("typeDetail"); }}
                style={{ cursor: "pointer", padding: "8px 16px", border: "1px solid " + r.color + "44", borderRadius: 2, fontFamily: "'Space Mono',monospace", fontSize: 13, color: r.color, background: r.color + "11" }}>{r.code}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Btn onClick={() => setPage("test")} style={{ fontSize: 13, letterSpacing: 2, padding: "14px 28px" }}>再测一次</Btn>
          <Btn onClick={() => setPage("types")} color="rgba(255,255,255,0.5)" border="2px solid rgba(255,255,255,0.15)" hoverBg="rgba(255,255,255,0.1)" hoverColor="rgba(255,255,255,0.8)" style={{ fontSize: 13, letterSpacing: 2, padding: "14px 28px" }}>看全部角色</Btn>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 650, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Space Mono',monospace", fontSize: 36, color: "#F0E68C", letterSpacing: 4, marginBottom: 48 }}>ABOUT</h1>
        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 2 }}>
          <p style={{ marginBottom: 24 }}><strong style={{ color: "#F0E68C" }}>ACTI</strong>（Accounting Character Type Indicator）是一个纯娱乐性质的会计人格测试，灵感来自SBTI（Silly Big Personality Test）。</p>
          <p style={{ marginBottom: 24 }}>我们观察到，会计人虽然做着看似统一的工作，但每个人的做账风格、沟通方式、抗压姿势和摸鱼哲学都大不相同。于是我们提炼了16种最具辨识度的会计人格，配上精准到冒犯的描述。</p>
          <p style={{ marginBottom: 24 }}>测试共16题，每题4个选项，没有标准答案。选最真实的那个就好。结果不代表你的全部——只代表你在职场上最突出的那个侧面。</p>
          <div style={{ padding: 24, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, marginTop: 40, marginBottom: 40 }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 12 }}>DISCLAIMER</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>ACTI纯属娱乐，没有任何心理学依据。请勿将测试结果用于辞职、吵架、绩效考核或自我怀疑。如果结果看起来很准，那是巧合。如果很离谱，那也是巧合。</p>
          </div>
                    <p>
            灵感来源：<span style={{ color: "#F0E68C" }}>SBTI</span> by 
            <a
              href="https://space.bilibili.com/417038183"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#F0E68C", textDecoration: "none" }}
            >
              B站UP主@Q肉儿串儿
            </a>
          </p>
          <p>
            作者：
            <a
              href="https://www.xiaohongshu.com/user/profile/61d329c4000000001000f722"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#F0E68C", textDecoration: "none" }}
            >
              小红书@麦丽素
            </a>
          </p>
        </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Btn onClick={() => setPage("test")}>去测试 →</Btn>
        </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [result, setResult] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0c", color: "#fff" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Noto+Serif+SC:wght@300;400;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a0c; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0c; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        button:focus { outline: 2px solid #F0E68C44; outline-offset: 2px; }
        ::selection { background: #F0E68C33; color: #F0E68C; }
      `}</style>
      <Nav page={page} setPage={setPage} />
      {page === "home" && <HomePage setPage={setPage} />}
      {page === "types" && <TypesPage setPage={setPage} setSelectedType={setSelectedType} />}
      {page === "typeDetail" && <TypeDetailPage type={selectedType} setPage={setPage} setSelectedType={setSelectedType} />}
      {page === "test" && <TestPage setPage={setPage} setResult={setResult} />}
      {page === "result" && <ResultPage result={result} setPage={setPage} setSelectedType={setSelectedType} />}
      {page === "about" && <AboutPage setPage={setPage} />}
      <footer style={{ textAlign: "center", padding: "40px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.15)", letterSpacing: 3 }}>ACTI · Accounting Character Type Indicator</div>
      </footer>
    </div>
  );
}