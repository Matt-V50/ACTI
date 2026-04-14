import { useState, useEffect } from "react";

const TYPES = [
  {
    code: "TIE-R",
    name: "平账强迫症",
    nameEn: "The Balancer",
    emoji: "⚖️",
    color: "#E63946",
    tagline: "差一分钱，死都不走。",
    desc: "差一分钱，死都不走。全组人都下班了，你还在翻第387张凭证。同事说「差一分没关系」，你看他的眼神像看杀人犯。你的人生没有「差不多」，只有「差一分就是差十万」。找到那一分钱的瞬间，你的快感比涨薪还强烈。别人下班约饭，你在和数字约架。你的Excel里藏着你的执念，你的执念里藏着你最后的尊严。",
    traits: ["完美主义", "不放过细节", "较真到底"],
    fear: "Trial Balance不为零",
    motto: "It has to tie. IT HAS TO TIE.",
  },
  {
    code: "CLOSE-R",
    name: "月末关账人",
    nameEn: "The Month-Ender",
    emoji: "💀",
    color: "#457B9D",
    tagline: "每月25号准时去世，1号自动复活。",
    desc: "每月最后一周准时去世，1号自动复活。年审季你直接进入「死后世界」。朋友圈连续五天没更新不是因为你低调，是因为你真的死了。家人以为你失踪了，同事以为你住在公司了——其实两个都对。关账关的不是账，是你和正常生活之间的那扇门。",
    traits: ["周期性崩溃", "抗压但有极限", "月初满血复活"],
    fear: "永远关不完的账",
    motto: "这个月终于close了……等等，下个月又来了？",
  },
  {
    code: "COPY-R",
    name: "人肉复印机",
    nameEn: "The Duplicator",
    emoji: "📋",
    color: "#2A9D8F",
    tagline: "上个月分录改个日期就是这个月的。",
    desc: "上个月的分录改个日期就是这个月的。你的会计人生就是一场大型Ctrl+V表演。领导说「今年有变化」，你心态直接崩了——意味着你要重新想。你上次真正原创一张凭证是什么时候？你自己也不记得了。你不是不会创新，你是发现复制粘贴才是会计的终极真理。",
    traits: ["高效（物理）", "模板大师", "拒绝变化"],
    fear: "准则更新",
    motto: "如果上个月的能用，为什么要重新做？",
  },
  {
    code: "SORRY",
    name: "跪式催人员",
    nameEn: "The Apologizer",
    emoji: "🙇",
    color: "#F4A261",
    tagline: "催人像在道歉，道歉像在催人。",
    desc: "催回款、催发票、催报销单、催部门交数据、催审批签字……你的日常就是一个大型「不好意思打扰了」循环。对方已读不回你还帮他找理由：「可能太忙了吧。」催了三遍不好意思催第四遍，第四遍开头还是「不好意思」。全公司最没有攻击性的人，也是最多事情卡在手上的人。",
    traits: ["社恐催人", "过度共情", "无攻击性"],
    fear: "打电话催人",
    motto: "不好意思打扰了，请问那个……算了下次再说。",
  },
  {
    code: "POOR",
    name: "管钱的穷鬼",
    nameEn: "The Broke Treasurer",
    emoji: "💸",
    color: "#264653",
    tagline: "帮公司管几个亿，自己花呗没还。",
    desc: "帮公司管几个亿，自己花呗没还。做税务筹划帮老板省了一套房的钱，你的午饭是食堂三块五。别人问你理财建议你滔滔不绝，自己的工资卡余额不敢打开看。你是世界上最懂钱的穷人。每天经手的数字都比你的年薪多几个零。",
    traits: ["精通理论", "实践为零", "精神富有"],
    fear: "同学聚会被问收入",
    motto: "钱只是一个数字。尤其是别人的。",
  },
  {
    code: "FAKE-R",
    name: "平行宇宙建筑师",
    nameEn: "The Multiverse Architect",
    emoji: "🎭",
    color: "#6D6875",
    tagline: "内账外账无缝切换。",
    desc: "内账外账无缝切换，税务局和老板看到的是两个次元。你不叫「做假账」，你叫「多维度财务叙事工程师」。你最大的恐惧不是做错账，是哪天记不清楚哪个版本给了哪个人。你的大脑里运行着两套操作系统，偶尔还要切换到第三套应付审计。",
    traits: ["多线程大脑", "记忆力惊人", "压力山大"],
    fear: "把内账发给了税务局",
    motto: "哪个版本？你要看哪个版本的？",
  },
  {
    code: "YES-er",
    name: "老板说啥都说好",
    nameEn: "The Yes-Man",
    emoji: "🐶",
    color: "#E76F51",
    tagline: "老板说「帮我算一下」等于今晚别走了。",
    desc: "老板说「帮我算一下」等于你今晚别走了。他拍脑袋你擦屁股，他画大饼你做可行性分析，他说「大概估一下就行」但你知道他要的是精确到小数点后两位。你不是CFO，你是CEO身上的一个外挂配件。「好的」「没问题」「马上做」是你的三大核心技能。",
    traits: ["无条件服从", "加班体质", "内心OS很丰富"],
    fear: "老板周五下午说「你等一下」",
    motto: "好的老板。没问题老板。马上做老板。",
  },
  {
    code: "FLY-er",
    name: "盘点放飞机的人",
    nameEn: "The Inventory Dodger",
    emoji: "✈️",
    color: "#90BE6D",
    tagline: "盘点的时候人呢？飞了。",
    desc: "盘点日别人在仓库里满头大汗数货，你不知道躲在哪个角落玩手机。主管喊你名字，三秒后你从货架后面冒出来：「我在数这边呢！」你不是不想干活，你是觉得数来数去最后还是要调账，那不如直接调。你是全组最有哲学思维的人——用最少的体力解决问题。",
    traits: ["摸鱼高手", "善于隐藏", "有自己的道理"],
    fear: "主管突然出现在身后",
    motto: "我刚刚在数那边的……你没看到吗？",
  },
  {
    code: "FINE",
    name: "佛系做账人",
    nameEn: "The Zen Accountant",
    emoji: "🧘",
    color: "#B5838D",
    tagline: "差一万？挂其他。审计来了？随缘。",
    desc: "差一万？挂其他。审计来了？随缘。升职没你？命里没有。别人加班焦虑你在喝茶，别人对着报表崩溃你说「都会过去的」。你的心态比资产负债表还平，比直线折旧还稳。全组最没有情绪波动的人，也是唯一一个准点下班从不愧疚的人。",
    traits: ["心态稳如泰山", "不争不抢", "准点下班"],
    fear: "其实没有什么好怕的",
    motto: "都行。都可以。没关系。",
  },
  {
    code: "NEAT",
    name: "像素级对齐狂",
    nameEn: "The Pixel Perfectionist",
    emoji: "📐",
    color: "#43AA8B",
    tagline: "字体、缩进、边框、颜色，全部必须完美。",
    desc: "跟TIE-R不同，TIE-R要的是数字对，你要的是一切都对。字体、缩进、小数位数、边框粗细、表头颜色，全部必须完美。你做的报表是艺术品，但没人在乎。你发现同事的表格用了宋体和微软雅黑混排，差点当场去世。你的审美洁癖已经从Excel蔓延到了PPT、邮件、甚至群消息的标点符号。",
    traits: ["审美洁癖", "排版大师", "不被理解的艺术家"],
    fear: "同事发来的表格用了彩虹色填充",
    motto: "这个单元格为什么没有右对齐？？？",
  },
  {
    code: "LIAR",
    name: "预算表演艺术家",
    nameEn: "The Budget Novelist",
    emoji: "🎪",
    color: "#F77F00",
    tagline: "把「完全偏了」说成「基本符合预期」。",
    desc: "你做的预算从来没准过，但你的差异分析写得行云流水。核心技能是把「完全偏了」包装成「基本符合预期」，把「亏麻了」翻译成「短期承压但长期向好」。你不是在做财务，你是在做文学创作。年底述职的时候你是全场最佳编剧，数字不够叙事来凑。",
    traits: ["文字功底深厚", "包装大师", "永远正能量"],
    fear: "领导要看原始数据",
    motto: "基本符合预期。（预期已经调过三次了）",
  },
  {
    code: "QUIT-R",
    name: "每天想辞职的人",
    nameEn: "The Almost-Quitter",
    emoji: "🚪",
    color: "#9B5DE5",
    tagline: "没辞是因为简历上只会写会计。",
    desc: "入行第一年背准则背到哭，第三年连借贷都不想分了。每天打开电脑的第一个念头是「我为什么要做会计」，第二个念头是「但我简历上只会写这个」。你没有离开，不是因为热爱，是因为沉没成本。你的辞职信已经写好了，就差一个勇气和一个offer。",
    traits: ["持续性厌班", "沉没成本受害者", "辞职信常年待发"],
    fear: "发现转行也好不到哪去",
    motto: "等年终奖发了我就……算了明年再说。",
  },
  {
    code: "FAVO-R",
    name: "万能帮忙财务",
    nameEn: "The Office Glue",
    emoji: "🩹",
    color: "#577590",
    tagline: "「帮个小忙」是你听过最多的话。",
    desc: "报销找你、开票找你、打印机卡纸找你、系统报错找你、「这个流程怎么走」找你。你不是会计，你是全公司的IT+行政+客服+心理咨询师。你的本职工作永远排在最后，因为永远有人在找你「帮个小忙」。你的善良就是你的牢笼。",
    traits: ["来者不拒", "万能工具人", "本职工作永远最后做"],
    fear: "有人走过来说「在吗？」",
    motto: "行吧我看看……你等一下哈。",
  },
  {
    code: "LATE-R",
    name: "永远待会儿再说",
    nameEn: "The Deadline Surfer",
    emoji: "⏰",
    color: "#F94144",
    tagline: "永远最后一秒交，全部卡点提交。",
    desc: "月报、季报、年报，全部卡点提交。领导问进度你说「快了快了」，实际上还没打开文件。不是你拖延，是你「需要压力才能激发潜能」。同事叫你deadline战神，领导叫你心脏病根源。你的人生哲学：如果提前交了，不就显得deadline定太松了吗？",
    traits: ["拖延症晚期", "爆发力惊人", "压力转化效率高"],
    fear: "截止日期突然提前",
    motto: "快了快了，马上就好。（还没开始）",
  },
  {
    code: "RICH",
    name: "精神富豪",
    nameEn: "The Paper Millionaire",
    emoji: "👑",
    color: "#FFB703",
    tagline: "帮客户做资产配置，自己基金亏40%。",
    desc: "帮客户做投资分析头头是道，自己的基金亏了40%没敢打开看。给老板讲资产配置滔滔不绝，回家吃泡面。同事找你推荐股票，你推得头头是道——反正亏的不是自己的钱。你活在一个「帮别人赚钱」的平行宇宙里，在那里你是巴菲特。",
    traits: ["理论巨人实践矮子", "帮人头头是道", "自己一塌糊涂"],
    fear: "有人问你自己的收益率",
    motto: "投资嘛，要看长期。（已经亏三年了）",
  },
  {
    code: "LOUD-R",
    name: "嘴替型会计",
    nameEn: "The Enforcer",
    emoji: "📢",
    color: "#D62828",
    tagline: "全组唯一敢跟业务部门硬刚的人。",
    desc: "全组唯一敢跟业务部门正面硬刚的人。「发票不合规打回去！」「预算超了我不签！」「上个月的单子这个月才拿来，你当我是时间管理大师？」别人做会计做成了服务业，你做成了执法部门。全公司怕你，但全组靠你。你说出了所有会计想说但不敢说的话。",
    traits: ["正义感爆棚", "不怕得罪人", "全组靠山"],
    fear: "其实内心也会怕，但嘴比脑快",
    motto: "不合规就是不合规，谁来都一样！",
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
  const [hov, setHov] = useState(null);
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
              <span style={{ marginRight: 8 }}>{t.emoji}</span>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 14, color: t.color, letterSpacing: 2 }}>{t.code}</span>
              <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "80px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "'Noto Serif SC',serif", fontSize: 24, color: "rgba(255,255,255,0.6)",
          textAlign: "center", marginBottom: 48, fontWeight: 300,
        }}>16种会计人格，总有一款是你</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12 }}>
          {TYPES.map(t => (
            <div key={t.code} onMouseEnter={() => setHov(t.code)} onMouseLeave={() => setHov(null)}
              onClick={() => setPage("types")} style={{
                cursor: "pointer", padding: 20,
                border: "1px solid " + (hov === t.code ? t.color : "rgba(255,255,255,0.08)"),
                borderRadius: 4, background: hov === t.code ? t.color + "15" : "rgba(255,255,255,0.02)",
                transition: "all 0.3s",
              }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{t.emoji}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 14, color: t.color, letterSpacing: 2, marginBottom: 4 }}>{t.code}</div>
              <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{t.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "80px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 20, color: "rgba(255,255,255,0.5)", marginBottom: 32 }}>准备好被精准冒犯了吗？</p>
        <Btn onClick={() => setPage("test")}>开始测试 →</Btn>
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
                cursor: "pointer", padding: 28, border: "1px solid " + (hov === t.code ? t.color : "rgba(255,255,255,0.08)"),
                borderRadius: 4, background: hov === t.code ? t.color + "12" : "rgba(255,255,255,0.02)",
                transition: "all 0.3s", position: "relative", overflow: "hidden",
              }}>
              <div style={{ position: "absolute", top: -20, right: -10, fontSize: 80, opacity: 0.06 }}>{t.emoji}</div>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{t.emoji}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 18, color: t.color, letterSpacing: 3, marginBottom: 4 }}>{t.code}</div>
              <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>{t.name}</div>
              <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>{t.tagline}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TypeDetailPage({ type, setPage }) {
  if (!type) return null;
  return (
    <div style={{ minHeight: "100vh", padding: "100px 24px 80px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <button onClick={() => setPage("types")} style={{
          background: "none", border: "none", color: "rgba(255,255,255,0.4)",
          fontFamily: "'Space Mono',monospace", fontSize: 13, cursor: "pointer", marginBottom: 40, letterSpacing: 2,
        }}>{"\u2190 返回全部角色"}</button>
        <div style={{ textAlign: "center", padding: "60px 0", borderBottom: "2px solid " + type.color + "33", marginBottom: 40 }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>{type.emoji}</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(36px,8vw,56px)", color: type.color, letterSpacing: 6, marginBottom: 8, fontWeight: 700 }}>{type.code}</div>
          <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 22, color: "rgba(255,255,255,0.7)", marginBottom: 8 }}>{type.name}</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>{type.nameEn}</div>
        </div>
        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 20, color: type.color, textAlign: "center", marginBottom: 40, fontStyle: "italic" }}>
          {"「" + type.tagline + "」"}
        </div>
        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 2, marginBottom: 48, textAlign: "justify" }}>{type.desc}</div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" }}>核心特征</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {type.traits.map(tr => (
              <span key={tr} style={{ padding: "6px 16px", border: "1px solid " + type.color + "44", borderRadius: 2, fontFamily: "'Noto Serif SC',serif", fontSize: 13, color: type.color, background: type.color + "11" }}>{tr}</span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" }}>最大恐惧</div>
          <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 15, color: "rgba(255,255,255,0.6)" }}>{type.fear}</div>
        </div>
        <div style={{ marginBottom: 48, padding: 24, borderLeft: "3px solid " + type.color, background: type.color + "08" }}>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 8, textTransform: "uppercase" }}>口头禅</div>
          <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>{type.motto}</div>
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
        <div style={{ padding: "48px 32px", border: "2px solid " + type.color, borderRadius: 4, background: type.color + "08", marginBottom: 40, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -20, fontSize: 140, opacity: 0.05 }}>{type.emoji}</div>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{type.emoji}</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "clamp(40px,10vw,64px)", color: type.color, letterSpacing: 6, fontWeight: 700, marginBottom: 8, textShadow: "0 0 60px " + type.color + "44" }}>{type.code}</div>
          <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 22, color: "rgba(255,255,255,0.8)", marginBottom: 8 }}>{type.name}</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 1, marginBottom: 24 }}>{"匹配度 " + matchPercent + "%"}</div>
          <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, color: type.color, fontStyle: "italic" }}>{"「" + type.tagline + "」"}</div>
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
                style={{ cursor: "pointer", padding: "8px 16px", border: "1px solid " + r.color + "44", borderRadius: 2, fontFamily: "'Space Mono',monospace", fontSize: 13, color: r.color, background: r.color + "11" }}>{r.emoji} {r.code}</span>
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
          <p>灵感来源：<span style={{ color: "#F0E68C" }}>SBTI</span> by B站UP主@蛆肉儿串儿</p>
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Btn onClick={() => setPage("test")}>去测试 →</Btn>
        </div>
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
      {page === "typeDetail" && <TypeDetailPage type={selectedType} setPage={setPage} />}
      {page === "test" && <TestPage setPage={setPage} setResult={setResult} />}
      {page === "result" && <ResultPage result={result} setPage={setPage} setSelectedType={setSelectedType} />}
      {page === "about" && <AboutPage setPage={setPage} />}
      <footer style={{ textAlign: "center", padding: "40px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: 3 }}>ACTI — 纯属娱乐，请勿辞职</div>
      </footer>
    </div>
  );
}
