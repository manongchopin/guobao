/* 虚构人物档案 · 公开数据
 * 全部为虚构人物，与现实中任何个人无关。
 * 定妆照为 AI 生成的虚构形象，不是真人照片。
 * 字段约定见 fictional-characters/HANDOFF.md 第 6 节：
 *   id 作主键，姓名可重复；关系用 targetId；时间线用作品内时间。
 * 露骨描写不入档，本文件只收人物可用的外形、性格与经历。
 */
window.FICTIONAL_CHARACTERS = {
  updated: "2026-11-05",
  version: "0.2",

  universes: [
    {
      id: "abin-1985",
      title: "1985 · 台北",
      summary: "1985 年前后的台北。故事发生在一栋旧公寓六楼的分租层：六间房、共用卫浴与厨房，还有一小片晒衣服的阳台。"
    }
  ],

  characters: [
    {
      id: "char-001",
      universeId: "abin-1985",
      name: "阿宾",
      aliases: [],
      age: "19",
      gender: "男",
      role: "专科一年级学生",
      affiliation: "台北某私立专校",
      tags: ["主角", "新生", "六楼分租层"],
      summary: "十九岁的专科新生，搬进学校旁六楼的分租公寓，开始一个人住的日子。",
      appearance: "浓眉大眼、双眼皮、鼻梁挺直、下颌线明显；短发，发梢立起。约 180 公分，肩宽背直，常健身，体格健壮不夸张。衣着简单：白 T 恤、衬衫、球鞋。",
      personality: "阳光、干净、有男人味，不阴柔。也有另一面：贪心、侥幸，习惯先找一件合情合理的事，再让事情发生。",
      bio: "台北周边人，母亲健在，周末才回家。高中成绩不理想，考上台北附近一所私立专校；开学前在学校旁租了学生房。家境富裕，母亲宠爱，虽然住小公寓，音响、电视、录像机一应俱全。",
      relationships: [
        { targetId: "char-002", type: "恋人", note: "第 3 章由学姐引见认识", directed: false },
        { targetId: "char-004", type: "房客与房东", note: "同一栋楼，他住顶楼加盖层", directed: false },
        { targetId: "char-005", type: "同班同学", note: "", directed: false },
        { targetId: "char-007", type: "同班同学", note: "", directed: false }
      ],
      timeline: [
        { date: "第 1 章 · 开学前", event: "搬进六楼分租公寓，离注册还有五六天" },
        { date: "第 1 章", event: "帮房东太太把包裹搬上六楼，第一次说话" },
        { date: "第 2 章", event: "在对门学姐房里看录像带" },
        { date: "第 3 章", event: "由学姐引见，认识学妹何钰慧" },
        { date: "第 4 章", event: "舞会一夜，与钰慧走散" },
        { date: "第 5 章", event: "期中考周，陪钰慧在图书馆念书" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-001-abin.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-002",
      universeId: "abin-1985",
      name: "何钰慧",
      aliases: ["钰慧"],
      age: "19",
      gender: "女",
      role: "大一新生",
      affiliation: "与学姐同校",
      tags: ["新生", "高雄", "学姐的学妹"],
      summary: "学姐的学妹，高雄北上念书的新生；作者设定她是全书最好看的那一个。",
      appearance: "鹅蛋脸、尖下巴；眼睛不大但明亮，笑起来露出一排洁白的牙齿，颊上两个小梨涡。黑色马尾（原文作两条粗辫子盘到脑后，作者改为马尾）。165 公分，腰身纤细，身姿婀娜。平日素净：短袖浅色衬衫配牛仔裤。",
      personality: "安静内向、爱笑、没有心机，初见时拘谨。被动、温顺，习惯把疑问咽回去：别人给一个说法，她就照那个说法走；没人给说法，就自己找一个。",
      bio: "高雄人，第一次离家北上。由学姐在房里引见认识阿宾；那天下午没课，学姐和男友都在，正要去逛街。她在意别人的目光，胜过自己的感觉。",
      relationships: [
        { targetId: "char-001", type: "恋人", note: "第 3 章由学姐引见", directed: false },
        { targetId: "char-003", type: "学姐与学妹", note: "由学姐引见给阿宾", directed: true },
        { targetId: "char-006", type: "认识", note: "学长的学妹", directed: false }
      ],
      timeline: [
        { date: "第 3 章", event: "在学姐房里被引见，认识阿宾" },
        { date: "第 3 章", event: "看完电影，第一次牵手" },
        { date: "第 3 章", event: "初吻" },
        { date: "第 4 章", event: "舞会上与同伴走散" },
        { date: "第 5 章", event: "期中考周，把约会改到图书馆" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-002-he-yuhui.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026",
      portraitVariants: [
        {
          file: "images/fictional-characters/char-002b-he-yuhui-curly.jpg",
          label: "卷发版",
          credit: "AI 生成 · 虚构形象 · 2026"
        }
      ]
    },
    {
      id: "char-003",
      universeId: "abin-1985",
      name: "琇美",
      aliases: ["学姐"],
      age: "",
      gender: "女",
      role: "大三学生，住阿宾对门",
      affiliation: "与钰慧同校",
      tags: ["学姐", "对门", "牵线人"],
      summary: "住对门的学姐，把学妹介绍给阿宾的人。",
      appearance: "圆圆的脸颊、尖尖的下颚，大而明亮的眼睛，小巧的鼻梁（有时会架一副眼镜），丰厚温润的嘴唇；一头长发乌黑亮丽。约 168 公分，腰身虽不算纤细，配合紧俏的臀部与修长的双腿，曲线玲珑。皮肤白皙。",
      personality: "漂亮而迷人，知道自己好看，也习惯被看；喜欢那种被注视的感觉，所以穿得贴身。说话直、反应快，爱玩、爱新鲜事物，习惯用英文道别。被照顾惯了的大小姐模样。",
      bio: "大三，住阿宾对门，是这层楼里他印象最深的学姐。有男朋友（学长），开学那天男友替她提行李、整理房间。她是全书的牵线人：把学妹钰慧介绍给阿宾的正是她。",
      relationships: [
        { targetId: "char-006", type: "情侣", note: "男朋友", directed: false },
        { targetId: "char-002", type: "学姐与学妹", note: "她引见钰慧给阿宾", directed: true },
        { targetId: "char-001", type: "对门邻居", note: "", directed: false }
      ],
      timeline: [
        { date: "第 2 章", event: "阿宾搬来，第一次打照面" },
        { date: "第 3 章", event: "把学妹何钰慧介绍给阿宾" },
        { date: "第 3 章", event: "十点多送走男友，仍在门口等阿宾回来" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-003-xiumei.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-004",
      universeId: "abin-1985",
      name: "房东太太",
      aliases: ["胡太太"],
      age: "30 岁出头",
      gender: "女",
      role: "职业妇女，房东太太",
      affiliation: "住同一栋楼六楼",
      tags: ["房东", "上班族", "两个孩子的母亲"],
      summary: "住六楼的房东太太，三十岁出头，两个孩子的母亲。",
      appearance: "生得不算美，但也不难看；俏丽短发，脂粉未施，笑起来甜美，唇形好看。身材中等，不是艳丽型。原文形容她「小家碧玉」。",
      personality: "务实、随性（「不休白不休」），休假就睡到自然醒，不紧绷也不刻意维持形象。对人有分寸的亲切：先亮出戒心，放下得也快。",
      bio: "与丈夫同住六楼，夫妇俩都上班，两个孩子四岁和五岁，白天送褓母、晚上接回。第 1 章她请年假在家，睡到中午才起床，出门吃饭时遇见刚搬来的阿宾，请他帮忙把搬不动的包裹抬上楼。",
      relationships: [
        { targetId: "char-001", type: "房东与房客", note: "同住一栋楼，她住六楼", directed: false }
      ],
      timeline: [
        { date: "第 1 章", event: "请年假在家，睡到中午；出门吃饭遇到阿宾" },
        { date: "第 1 章", event: "请阿宾帮忙把包裹搬上六楼，来回六层" },
        { date: "第 1 章 · 15:30", event: "整理完屋子，拿出两瓶可乐与阿宾对饮" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-004-fangdong-taitai.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-005",
      universeId: "abin-1985",
      name: "阿吉",
      aliases: [],
      age: "约 19",
      gender: "男",
      role: "阿宾的同班同学",
      affiliation: "与阿宾同校同班",
      tags: ["同学", "舞会"],
      summary: "阿宾的同班同学，话多、机灵、会来事。",
      appearance: "十九岁，脸略长、单眼皮，笑起来眼睛弯，头发略翘；普通但讨喜，看着没有攻击性。",
      personality: "话多、机灵、会来事；惹了祸会想打圆场。他清楚自己在做什么，不是坏到骨子里，是机会来了就伸手的那一类。",
      bio: "阿宾的同学，与眼镜仔常一起行动。第 4 章在舞会上遇见落单的钰慧，一句「你不是和阿宾来的？」把真相捅破。",
      relationships: [
        { targetId: "char-001", type: "同班同学", note: "", directed: false },
        { targetId: "char-007", type: "常一起行动", note: "", directed: false }
      ],
      timeline: [
        { date: "第 4 章", event: "舞会上遇见独自站着的钰慧" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-005-aji.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-006",
      universeId: "abin-1985",
      name: "学长",
      aliases: [],
      age: "",
      gender: "男",
      role: "琇美的男朋友，比阿宾他们高一两届",
      affiliation: "与琇美同校",
      tags: ["学长", "有车", "体贴"],
      summary: "琇美的男朋友，体贴、会照顾人的那种「好人」。",
      appearance: "二十出头，白净斯文、三七分短发；浅蓝衬衫、深灰长裤、黑皮鞋。看着绝对可靠的正派长相。",
      personality: "体贴、会照顾人：搬行李、整理房间、关心脸色、主动送人。表面上有分寸。",
      bio: "琇美的男朋友，比阿宾他们高一两届，有车。开学那天替琇美把大包小包提上六楼。第 4 章在街上遇到脸色不好的钰慧，主动说送她回去。原文没给名字，通篇叫「学长」。",
      relationships: [
        { targetId: "char-003", type: "情侣", note: "琇美的男朋友", directed: false },
        { targetId: "char-002", type: "认识", note: "钰慧的学长", directed: false }
      ],
      timeline: [
        { date: "第 2 章", event: "开学日替琇美搬行李上六楼" },
        { date: "第 3 章", event: "与琇美在房里拥抱亲吻" },
        { date: "第 4 章", event: "街上遇见钰慧，主动要送她回去" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-006-xuezhang.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-007",
      universeId: "abin-1985",
      name: "眼镜仔",
      aliases: [],
      age: "19",
      gender: "男",
      role: "阿宾的同班同学",
      affiliation: "与阿宾同校同班",
      tags: ["同学", "舞会", "原文未给名字"],
      summary: "阿宾的同班同学，原文没给名字，通篇叫「眼镜仔」。",
      appearance: "十九岁，偏矮胖、肩窄肚圆、脸圆下巴厚；方框眼镜，头发不怎么打理。「不太讨人喜欢」，但不凶——是那种让人下意识保持距离的邋遢。",
      personality: "比阿吉更主动、更不客气；三个人里最没有分寸的那一个。",
      bio: "阿宾的同班同学，原文未给名字。第 4 章与阿吉一起在舞会上遇见钰慧。作者决定照原文叫「眼镜仔」，不另起名。",
      relationships: [
        { targetId: "char-001", type: "同班同学", note: "", directed: false },
        { targetId: "char-005", type: "常一起行动", note: "", directed: false }
      ],
      timeline: [
        { date: "第 4 章", event: "舞会上与阿吉一起遇见钰慧" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-007-yanjingzai.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-008",
      universeId: "abin-1985",
      name: "老邱",
      aliases: [],
      age: "五十多岁",
      gender: "男",
      role: "学校校工",
      affiliation: "学校（负责清扫）",
      tags: ["校工", "藏书间", "丧妻"],
      summary: "学校里五十多岁的校工，一个人负责清扫。",
      appearance: "干瘦、干扁，背略驼；穿旧工作服，手上有老茧。原文写他「外表干扁惹厌」——不讨喜，但不凶。",
      personality: "精明、会等、会拿捏把柄，嘴上占便宜；不吵不闹，坐在办公室里等人回来。他不是一时冲动，是算准了对方不敢声张。",
      bio: "学校校工，五十多岁，负责清扫。妻子过世后独居。第 5 章在藏书间清扫时，遇见到图书馆来的吴姐。",
      relationships: [
        { targetId: "char-009", type: "同校同事", note: "他在藏书间撞见她", directed: false }
      ],
      timeline: [
        { date: "第 5 章", event: "在藏书间清扫，撞见吴姐" },
        { date: "第 5 章", event: "事情没结束：他留在办公室等人回来" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-008-laoqiu.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-009",
      universeId: "abin-1985",
      name: "吴幸如",
      aliases: ["吴姐"],
      age: "三十余岁",
      gender: "女",
      role: "学校图书馆职员",
      affiliation: "学校图书馆",
      tags: ["图书馆", "文员", "已婚"],
      summary: "图书馆的女职员，大家都叫她「吴姐」。",
      appearance: "圆圆润润、有点福态，削薄的短发，脸蛋白净、淡施脂粉，厚唇；没有腰身，小腹圆突。衣着十分保守：圆领白衬衫、女西装外套、及膝淑女裙。",
      personality: "和蔼可亲、笑容可掬，声音柔细；性子软、怕事，被推到哪里就到哪里——不敢拒绝，也不敢声张。",
      bio: "学校图书馆职员，大家叫她「吴姐」。已婚、没有生育，婚后身材略为发福；丈夫对她兴趣缺缺。第 5 章在图书馆帮阿宾分类、倒水，之后带他到藏书间。",
      relationships: [
        { targetId: "char-001", type: "图书馆职员与学生", note: "帮他分类、倒水", directed: false },
        { targetId: "char-008", type: "同校同事", note: "在藏书间被他撞见", directed: false }
      ],
      timeline: [
        { date: "第 5 章", event: "在图书馆帮阿宾分类图书、倒水给他喝" },
        { date: "第 5 章", event: "带他到藏书间" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-009-wu-xingru.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-010",
      universeId: "abin-1985",
      name: "阿辉",
      aliases: [],
      age: "二十出头",
      gender: "男",
      role: "刚服完兵役",
      affiliation: "",
      tags: ["第 6 章", "退伍", "淑华的男友"],
      summary: "淑华的男朋友，刚服完兵役，口才很好。",
      appearance: "二十出头，精神、普通帅，笑起来有点痞；短发利落，白 T 恤、牛仔裤、球鞋。原文未写外形，按「与阿宾的正派形成对比」定妆。",
      personality: "口才好、一直说笑话，很容易让人放松；轻浮、手快、机会主义，当面一套背后一套。",
      bio: "刚服完兵役，与淑华认识后感情发展迅速。第 6 章由淑华介绍给钰慧。他和阿宾的区别：阿宾会绕一个弯，阿辉直接伸手。",
      relationships: [
        { targetId: "char-012", type: "情侣", note: "淑华的男朋友", directed: false },
        { targetId: "char-002", type: "认识", note: "由淑华介绍给钰慧", directed: false }
      ],
      timeline: [
        { date: "第 6 章", event: "由淑华介绍给钰慧，一路说笑话" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-010-ahui.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-011",
      universeId: "abin-1985",
      name: "店长",
      aliases: ["服饰卖场店长"],
      age: "约三十岁",
      gender: "男",
      role: "服饰大卖场店长",
      affiliation: "服饰大卖场",
      tags: ["第 6 章", "细边眼镜", "制服"],
      summary: "服饰大卖场的店长，斯文、英俊、高高瘦瘦。",
      appearance: "约三十岁，斯文英俊、高高瘦瘦；架一副细边眼镜，穿制服，胸前有名牌。看着像个体面的上班族。",
      personality: "极会说话，老练、耐心，从不硬来，只让对方自己走进来——全靠「公司规定」和礼貌。",
      bio: "服饰大卖场的店长，原文未给名字，就叫「店长」。第 6 章在卖场里遇到两个女学生。他和第 7 章便利商店那位女店长不是同一人。",
      relationships: [
        { targetId: "char-002", type: "卖场店长与顾客", note: "第 6 章在卖场遇到", directed: false },
        { targetId: "char-012", type: "卖场店长与顾客", note: "第 6 章在卖场遇到", directed: false }
      ],
      timeline: [
        { date: "第 6 章", event: "在卖场叫住两位女学生，请她们到办公室" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-011-dianzhang.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-012",
      universeId: "abin-1985",
      name: "淑华",
      aliases: [],
      age: "",
      gender: "女",
      role: "钰慧的室友，同校学生",
      affiliation: "与钰慧同校",
      tags: ["第 6 章", "室友", "阿辉的女友"],
      summary: "钰慧的室友，爱穿短薄衣裙，走路一扭一扭。",
      appearance: "苗条、腰身纤细，胸脯饱满结实，屁股小巧圆翘；长相俏丽，嘴唇薄薄小小、线条明显，不施唇彩也明艳。日常爱穿短薄衣裙、贴身衫。",
      personality: "大胆、主动、爱炫耀、不吃醋；对男人的目光来者不拒。想做什么就做，不遮掩，享受的是被渴望，不是被独占。",
      bio: "钰慧的室友，同校学生。男友阿辉刚退伍，两人感情打得火热。她是书里第一个「主动」的女性。与钰慧的对照：钰慧不敢拒绝，淑华从不拒绝、也不觉得需要拒绝。",
      relationships: [
        { targetId: "char-002", type: "室友", note: "同校同住", directed: false },
        { targetId: "char-010", type: "情侣", note: "男友阿辉", directed: false }
      ],
      timeline: [
        { date: "第 6 章", event: "把男友阿辉介绍给室友钰慧" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-05",
      portrait: "images/fictional-characters/char-012-shuhua.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-013",
      universeId: "abin-1985",
      name: "超商店长",
      aliases: ["灭绝师太"],
      age: "廿七八岁",
      gender: "女",
      role: "便利商店店长",
      affiliation: "便利商店",
      tags: ["第 7 章", "灭绝师太", "排班"],
      summary: "便利商店的店长，员工背后叫她「灭绝师太」。",
      appearance: "顶多廿七八岁，个头小小；头发整天绑在脑后，两个眼睛老是瞪得很凶。穿店长制服：白衬衫塞进深色长裤，胸前有名牌。",
      personality: "排班不讲理，爱怎么排就怎么排，骂人很凶。但凶是壳——胆子极小，被发现就跑。原文点破：因为没人对她好，所以先对人凶。",
      bio: "便利商店店长，原文没有名字，只有绰号「灭绝师太」。第 7 章在店里排班、骂盘点。她和第 6 章服饰卖场那位男店长不是同一人。",
      relationships: [
        { targetId: "char-015", type: "店长与店员", note: "", directed: true },
        { targetId: "char-014", type: "店长与店员", note: "新来的工读生", directed: true }
      ],
      timeline: [
        { date: "第 7 章", event: "店里排班，员工背后叫她「灭绝师太」" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-013-chaoshang-dianzhang.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-014",
      universeId: "abin-1985",
      name: "小萍",
      aliases: [],
      age: "",
      gender: "女",
      role: "便利商店新来的工读生",
      affiliation: "便利商店",
      tags: ["第 7 章", "工读生"],
      summary: "便利商店新来的工读生，机灵、爱打听。",
      appearance: "比小雯小，学生打工的样子；圆圆的小脸，笑起来没心机，眼神里带点狡黠。制服白衬衫、深色长裤、运动鞋。",
      personality: "机灵、爱打听，笑嘻嘻地试探。看出来了也不揭发，拿这个当把柄。",
      bio: "便利商店新来的工读生，原文起初「不知道什么名字」，后来由门外一声「小雯姐！」点出名字。第 7 章她是这一章的收尾：所有人都以为瞒过去了，只有她看出来了。",
      relationships: [
        { targetId: "char-015", type: "同事", note: "叫她「小雯姐」", directed: false },
        { targetId: "char-013", type: "工读生与店长", note: "", directed: false },
        { targetId: "char-001", type: "工读生与顾客", note: "第 7 章在店里的收尾", directed: false }
      ],
      timeline: [
        { date: "第 7 章", event: "在门外喊「小雯姐！」" },
        { date: "第 7 章", event: "笑嘻嘻地试探阿宾" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-014-xiaoping.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-015",
      universeId: "abin-1985",
      name: "小雯",
      aliases: [],
      age: "",
      gender: "女",
      role: "便利商店正式职员",
      affiliation: "便利商店",
      tags: ["第 7 章", "正式职员"],
      summary: "便利商店的正式职员，可爱、娇小。",
      appearance: "可爱的女生，娇小、娇弱、没什么体力；白衬衫配绿色工作围裙（围裙上有橘色横条），深色长裤、平底鞋。",
      personality: "亲近、爱说话、会打闹；和阿宾很熟，会骂「要死了」「不要脸」。嘴上拒绝，态度却软。关键时刻还能想起外面有人，比钰慧清醒一点。",
      bio: "便利商店正式职员，有男朋友。第 7 章阿宾到店里时她和工读生小萍一起当班。",
      relationships: [
        { targetId: "char-013", type: "店员与店长", note: "", directed: false },
        { targetId: "char-014", type: "同事", note: "小萍喊她「小雯姐」", directed: false },
        { targetId: "char-001", type: "店员与熟客", note: "第 7 章当班", directed: false }
      ],
      timeline: [
        { date: "第 7 章", event: "在便利商店当班，与阿宾打闹" }
      ],
      status: "published",
      created: "2026-11-05",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-015-xiaowen.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-016",
      universeId: "abin-1985",
      name: "公公",
      aliases: ["阿莉的公公"],
      age: "五十来岁",
      gender: "男",
      role: "阿莉的公公",
      affiliation: "",
      tags: ["第 8 章", "公婆", "理发店"],
      summary: "阿莉的公公，五十来岁，矮矮胖胖、秃头。",
      appearance: "五十来岁，矮矮胖胖、秃头；白短袖衬衫塞进深色长裤，系皮带，黑皮鞋。",
      personality: "好色、不老实，原文骂他「老不修」；爱去进香、看游览车，身上带钱。",
      bio: "阿莉的公公，与妻子、媳妇同住；儿子在金门当兵。第 8 章只出现在隔墙偷看那一段。",
      relationships: [
        { targetId: "char-018", type: "媳妇与公公", note: "", directed: true },
        { targetId: "char-017", type: "夫妻", note: "", directed: false }
      ],
      timeline: [
        { date: "第 8 章", event: "隔墙偷看那一段" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-016-gonggong.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-017",
      universeId: "abin-1985",
      name: "婆婆",
      aliases: ["阿莉的婆婆"],
      age: "四十来岁",
      gender: "女",
      role: "阿莉的婆婆",
      affiliation: "",
      tags: ["第 8 章", "公婆", "理发店"],
      summary: "阿莉的婆婆，四十来岁，珠光宝气。",
      appearance: "四十来岁，烫卷发；珠光宝气、打扮艳丽——金色项链、红色耳环，白色亮面高叉长裙，裸色高跟鞋。",
      personality: "欲求不满、主动，精于男女之事，会「教」年轻人。",
      bio: "阿莉的婆婆，与丈夫、媳妇同住。第 8 章只出现在隔墙偷看那一段。",
      relationships: [
        { targetId: "char-018", type: "媳妇与婆婆", note: "", directed: true },
        { targetId: "char-016", type: "夫妻", note: "", directed: false }
      ],
      timeline: [
        { date: "第 8 章", event: "隔墙偷看那一段" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-017-popo.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-018",
      universeId: "abin-1985",
      name: "阿莉",
      aliases: [],
      age: "二十岁出头",
      gender: "女",
      role: "家庭理发店老板娘",
      affiliation: "家庭理发店",
      tags: ["第 8 章", "理发店", "嘉义"],
      summary: "家庭理发店的老板娘，二十岁出头，从嘉义嫁到台北。",
      appearance: "白白净净、清秀，唇薄；身量小巧，产后腰略粗。穿一件又宽又大的厚衬衫，袖子撂到臂弯，下身一条简单的白短裙，被衬衫下摆遮去大半；家常打扮，脚上是白色拖鞋。",
      personality: "客气、爱笑、会招呼人，先给人三分好感；怕羞，被看会用手遮；不敢拒绝，只会小声说「不要这样」。",
      bio: "嘉义海边人，最近嫁到台北，和丈夫家人同住。丈夫 21 岁，在金门当兵；有一个四个月大的婴儿。第 8 章阿宾上门理发。",
      relationships: [
        { targetId: "char-001", type: "老板娘与客人", note: "第 8 章上门理发", directed: false },
        { targetId: "char-016", type: "媳妇与公公", note: "", directed: false },
        { targetId: "char-017", type: "媳妇与婆婆", note: "", directed: false }
      ],
      timeline: [
        { date: "第 8 章", event: "在理发店招呼阿宾「请稍坐」" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-018-ali.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-019",
      universeId: "abin-1985",
      name: "阿宾的母亲",
      aliases: ["阿姨"],
      age: "四十余岁",
      gender: "女",
      role: "阿宾的母亲；寡居",
      affiliation: "",
      tags: ["第 12 章", "家庭", "寡居"],
      summary: "阿宾的母亲，四十余岁，丈夫过世后独居。",
      appearance: "四十余岁，保养得体、居家但不邋遢，笑起来温暖；比房东太太更有底气一些。",
      personality: "热情、爱笑、会招呼人；对儿子宠溺。",
      bio: "阿宾的母亲。丈夫过世后独居，家境富裕，家里有客房附卫浴，厨房宽敞。第 12 章与钰慧一见如故，一个晚上就把「阿姨」叫成了「妈」。原文没有给她名字。",
      relationships: [
        { targetId: "char-001", type: "母子", note: "", directed: true }
      ],
      timeline: [
        { date: "第 12 章", event: "与钰慧一见如故，被叫成了「妈」" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-019-abin-mother.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-020",
      universeId: "abin-1985",
      name: "胡先生",
      aliases: ["房东先生"],
      age: "30 岁出头",
      gender: "男",
      role: "上班族；房东",
      affiliation: "",
      tags: ["第 1 章", "房东", "上班族"],
      summary: "房东先生，胡太太的丈夫，两个幼儿的父亲。",
      appearance: "普通上班族；白衬衫、深色西裤、黑皮鞋，短发整齐。第 1 章几乎没写他的外形。",
      personality: "",
      bio: "房东夫妇姓胡，住六楼，夫妇俩都上班。第 1 章只有一句提及；主线里出场极少，主要作为「丈夫」这个位置存在。",
      relationships: [
        { targetId: "char-004", type: "夫妻", note: "胡太太是他太太", directed: false },
        { targetId: "char-022", type: "兄妹", note: "佩如是他妹妹", directed: true },
        { targetId: "char-001", type: "房东与房客", note: "", directed: false }
      ],
      timeline: [
        { date: "第 1 章", event: "与太太、两个幼儿同住六楼" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-020-hu-xiansheng.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-021",
      universeId: "abin-1985",
      name: "李莲莲",
      aliases: ["莲莲", "学姐"],
      age: "",
      gender: "女",
      role: "大三学生",
      affiliation: "住六楼顶加盖层、楼梯转角的小房间",
      tags: ["第 9 章", "学姐", "商用统计重修"],
      summary: "住楼梯转角小房间的三年级学姐。",
      appearance: "身高约 155 公分；圆脸、大眼睛、戴眼镜，嘴唇稍大而厚；皮肤不白但很细腻。穿宽松家居服仍然前凸后翘，中间比较没有腰。",
      personality: "说话小声、怯生生，自卑；不会说不要。她的胖不是天生的，是用来防人的。",
      bio: "大三学生，住六楼顶加盖层、楼梯上来转角处那个小房间，房间不到两坪。商用统计学重修，期末考前两个礼拜开始准备，会煮曼特宁咖啡。",
      relationships: [
        { targetId: "char-001", type: "同栋楼的学姐", note: "", directed: false }
      ],
      timeline: [
        { date: "第 9 章", event: "期末考前两个礼拜开始准备重修" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-021-li-lianlian.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-022",
      universeId: "abin-1985",
      name: "佩如",
      aliases: [],
      age: "廿五六岁",
      gender: "女",
      role: "胡先生的妹妹、胡太太的小姑",
      affiliation: "已婚，丈夫建成",
      tags: ["第 10 章", "小姑", "已婚"],
      summary: "胡先生的妹妹，胡太太的小姑，已婚。",
      appearance: "廿五六岁，面貌可爱；爱笑，穿得略贴身——一件稍为贴身的上衣配一片裙。",
      personality: "活泼、爱玩、爱唱歌；机灵而狠，出了事会立刻想办法拖别人下水。",
      bio: "胡先生的妹妹、胡太太的小姑，丈夫是建成。第 10 章胡家过年那场戏的引子：新买的卡拉 OK、啤酒、小菜。",
      relationships: [
        { targetId: "char-020", type: "兄妹", note: "胡先生是她哥哥", directed: false },
        { targetId: "char-004", type: "姑嫂", note: "胡太太是她嫂子", directed: false },
        { targetId: "char-001", type: "认识", note: "由胡太太介绍", directed: false }
      ],
      timeline: [
        { date: "第 10 章", event: "胡家过年，卡拉 OK 与小菜" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-022-peiru.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-023",
      universeId: "abin-1985",
      name: "郭文强",
      aliases: ["文强"],
      age: "",
      gender: "男",
      role: "阿宾的同学",
      affiliation: "自己在外租房间",
      tags: ["第 14 章", "南部", "有女友"],
      summary: "阿宾的同学，南部来的，自己在外租房。",
      appearance: "南部来的学生，朴实里带点机灵；原文几乎没写外形，只按「不必帅，但要让人放松」定妆。",
      personality: "会说话、会挑地方（特意选有高档椅背的「雅座」），懂讨人欢心。",
      bio: "郭文强，阿宾的同学，南部人，自己租房间在外；有女朋友，常吵架。第 14 章与钰慧是南部同乡。",
      relationships: [
        { targetId: "char-001", type: "同学", note: "", directed: false },
        { targetId: "char-002", type: "同乡", note: "都是南部来的", directed: false }
      ],
      timeline: [
        { date: "第 14 章", event: "约钰慧到有雅座的店里" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-023-wenqiang.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-024",
      universeId: "abin-1985",
      name: "辛蒂",
      aliases: ["Cindy", "丽芳"],
      age: "",
      gender: "女",
      role: "钰慧、淑华的同学",
      affiliation: "自己在校外租房",
      tags: ["第 16 章", "同学", "校外租房"],
      summary: "钰慧、淑华的同学，英文名 Cindy，原文也叫她「丽芳」。",
      appearance: "长得并不娇美，却是刚健婀娜的那一型；会刻意打扮，唇彩与唇线画得清晰明白。",
      personality: "老练、爱出主意、嘴上占先；遇事会自我欺骗。",
      bio: "丽芳，英文名 Cindy，被叫「Cindy 姐」。钰慧与淑华的同学，自己在校外租房。第 16 章的「美人计」是她的主意——要让钰慧看清男人的真面目，结果自己被卷进去。",
      relationships: [
        { targetId: "char-002", type: "同学", note: "", directed: false },
        { targetId: "char-012", type: "同学", note: "", directed: false }
      ],
      timeline: [
        { date: "第 16 章", event: "出了「美人计」的主意" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-024-xindi.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-025",
      universeId: "abin-1985",
      name: "廖依姈",
      aliases: ["依姈"],
      age: "",
      gender: "女",
      role: "阿宾的同班同学",
      affiliation: "",
      tags: ["第 13 章", "时髦", "同班"],
      summary: "阿宾的同班同学，说话嗲声嗲气。",
      appearance: "穿着很时髦：有松紧效果的贴身裤，短发扎起，妆容明艳；手小小嫩嫩的。",
      personality: "主动、爱玩、不怕占便宜，甚至以「讨回来」为乐；被骂「小骚包」也不恼，一副自得其乐的样子。",
      bio: "廖依姈，阿宾的同班同学。第 13 章抽车钥匙抽到阿宾的车。她是全书里心理负担最少的一个：想要就伸手，不解释，也不后悔。",
      relationships: [
        { targetId: "char-001", type: "同班同学", note: "", directed: false }
      ],
      timeline: [
        { date: "第 13 章", event: "抽车钥匙抽到阿宾的车" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-025-yiling.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-026",
      universeId: "abin-1985",
      name: "卫兵甲",
      aliases: [],
      age: "二十上下",
      gender: "男",
      role: "海防部队卫兵",
      affiliation: "垦丁万里桐附近的小营舍",
      tags: ["第 20 章", "卫兵", "一次性人物"],
      summary: "第 20 章出现的两名卫兵之一。",
      appearance: "二十上下，圆脸、眉毛浓，脸和手臂晒得红黑，体格壮实；草绿短袖汗衫扎进军裤，军绿胶鞋。",
      personality: "原文把这两个人写成「呆头鹅」；他更壮也更拘谨，见了连长立刻立正。",
      bio: "海防部队的卫兵，驻在垦丁万里桐附近的小营舍。第 20 章与另一名卫兵一起出场。",
      relationships: [
        { targetId: "char-034", type: "士兵与连长", note: "", directed: true },
        { targetId: "char-027", type: "同袍", note: "", directed: false }
      ],
      timeline: [
        { date: "第 20 章", event: "在营舍门口站哨" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-026-wei-bing-jia.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-027",
      universeId: "abin-1985",
      name: "卫兵乙",
      aliases: ["阿兵哥"],
      age: "二十出头",
      gender: "男",
      role: "海防部队卫兵",
      affiliation: "垦丁万里桐附近的小营舍",
      tags: ["第 20 章", "卫兵", "一次性人物"],
      summary: "第 20 章出现的两名卫兵之一。",
      appearance: "二十出头，瘦、个子中等；长脸、单眼皮，表情有点呆。穿草绿背心，胳膊上有短袖晒出来的那一圈晒痕，军裤、胶鞋。",
      personality: "被叫「阿兵哥」的时候，会下意识立正。",
      bio: "海防部队的卫兵，驻在垦丁万里桐附近的小营舍。第 20 章与另一名卫兵一起出场。",
      relationships: [
        { targetId: "char-034", type: "士兵与连长", note: "", directed: true },
        { targetId: "char-026", type: "同袍", note: "", directed: false }
      ],
      timeline: [
        { date: "第 20 章", event: "在营舍门口站哨" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-027-wei-bing-yi.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-028",
      universeId: "abin-1985",
      name: "农妇",
      aliases: ["胖黑农妇"],
      age: "四十上下",
      gender: "女",
      role: "果园边的农妇",
      affiliation: "",
      tags: ["第 13 章", "一次性人物"],
      summary: "第 13 章果园边出现的农妇，只负责骂人。",
      appearance: "四十上下，胖、黑、结实；方脸，眉毛粗，手臂粗，手上是干活晒出来的斑。花布巾包头，碎花上衣、深色长裤、黑色雨鞋。",
      personality: "嗓门大；站着骂了十几分钟，一步也没敢往前走。",
      bio: "第 13 章果园边的农妇。她是这一章里唯一一个「看见了一切、什么也做不了」的人。",
      relationships: [],
      timeline: [
        { date: "第 13 章", event: "在果园边骂了十几分钟" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-028-nong-fu.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-029",
      universeId: "abin-1985",
      name: "女侍",
      aliases: ["西餐馆女侍"],
      age: "二十出头",
      gender: "女",
      role: "西餐馆女侍",
      affiliation: "西餐馆",
      tags: ["第 17 章", "一次性人物"],
      summary: "第 17 章西餐馆的女侍。",
      appearance: "二十出头，圆脸，眉毛画得有点重，嘴唇薄；低马尾，额前用发夹别住碎发。深色背心配白衬衫，围裙浆过、硬挺，胸牌别在左胸。",
      personality: "笑起来很有职业感，眼睛不太参与；端盘子的时候脚步很轻，跑开时是踮着脚的。",
      bio: "第 17 章西餐馆的女侍。原文写她长相只算普通，被吻之后脸红，后来还鞠躬说「欢迎再来」。",
      relationships: [],
      timeline: [
        { date: "第 17 章", event: "在西餐馆当班" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-029-nv-shi.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-030",
      universeId: "abin-1985",
      name: "追求者高",
      aliases: ["琇美的追求者（高的）"],
      age: "二十二",
      gender: "男",
      role: "琇美的同学",
      affiliation: "",
      tags: ["第 17 章", "追求者", "一次性人物"],
      summary: "琇美两个追求者里高的那个。",
      appearance: "二十二岁，瘦高、肩膀窄，站直了比门框还高半头，但总驼着；长脸、下巴有点尖，戴黑框眼镜。头发偏软、三七分，总有一撮翘着压不平。格子衬衫塞进卡其裤，皮带扣得高。",
      personality: "说话时眉毛动得比嘴多；手里一直捏着一束纸包的花，纸都被他捏皱了。",
      bio: "琇美的追求者之一，和胖的那位是同学。第 17 章知道琇美要毕业，两人来她房里「道别」。",
      relationships: [
        { targetId: "char-003", type: "追求者", note: "", directed: true },
        { targetId: "char-031", type: "同学", note: "一起来道别", directed: false }
      ],
      timeline: [
        { date: "第 17 章", event: "来琇美房里道别" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-030-zhui-qiu-zhe-gao.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-031",
      universeId: "abin-1985",
      name: "追求者胖",
      aliases: ["琇美的追求者（胖的）"],
      age: "二十二",
      gender: "男",
      role: "琇美的同学",
      affiliation: "",
      tags: ["第 17 章", "追求者", "一次性人物"],
      summary: "琇美两个追求者里胖的那个。",
      appearance: "二十二岁，胖、脖子短；圆脸，笑起来眼睛挤成两条缝，脸上有一点油光；平头。polo 衫扣子扣到最上面一颗，绷着。",
      personality: "一进门就把带来的水果放在桌上，然后不知道手该放哪儿。",
      bio: "琇美的追求者之一，和高的那位是同学。第 17 章两人一起来琇美房里「道别」。",
      relationships: [
        { targetId: "char-003", type: "追求者", note: "", directed: true },
        { targetId: "char-030", type: "同学", note: "一起来道别", directed: false }
      ],
      timeline: [
        { date: "第 17 章", event: "来琇美房里道别" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-031-zhui-qiu-zhe-pang.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-032",
      universeId: "abin-1985",
      name: "新婚丈夫",
      aliases: [],
      age: "二十七八",
      gender: "男",
      role: "从台北来垦丁度假的新婚丈夫",
      affiliation: "",
      tags: ["第 19 章", "一次性人物"],
      summary: "第 19 章从台北来垦丁度假的新婚丈夫。",
      appearance: "二十七八，中等偏高，有一点当兵留下的架子；方脸、眉毛浓，笑起来牙齿很白。短发抹了发油，梳得很整齐。白衬衫袖子卷到小臂，深色西装裤、皮鞋——来度假还是穿得像上班。",
      personality: "会在陌生场合说「Nice to Meet You」，说完自己先笑。",
      bio: "第 19 章与妻子来垦丁度假，走错房间。原文写这一对是全书少见的「正常夫妻」——正因为正常，那晚才显得特别荒唐。",
      relationships: [
        { targetId: "char-033", type: "夫妻", note: "新婚", directed: false }
      ],
      timeline: [
        { date: "第 19 章", event: "在垦丁走错房间" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-032-xin-hun-zhangfu.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-033",
      universeId: "abin-1985",
      name: "新婚妻子",
      aliases: [],
      age: "二十五",
      gender: "女",
      role: "新婚妻子",
      affiliation: "",
      tags: ["第 19 章", "一次性人物"],
      summary: "第 19 章与丈夫来垦丁度假的新婚妻子。",
      appearance: "二十五岁，个子矮、骨架小、肩窄；容貌端庄——不惊艳，但端正、耐看，皮肤白，眉毛细，只涂了一点口红。及肩发用发夹别在一侧，浅色连衣裙，布料软。",
      personality: "害羞、不肯出声；从头到尾都是被动的。",
      bio: "第 19 章与丈夫来垦丁度假。原文写她容貌端庄、身量矮，全书少见的「正常夫妻」里的那一位。",
      relationships: [
        { targetId: "char-032", type: "夫妻", note: "新婚", directed: false }
      ],
      timeline: [
        { date: "第 19 章", event: "在垦丁度假" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-033-xin-hun-qizi.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-034",
      universeId: "abin-1985",
      name: "陈明宪",
      aliases: ["连长"],
      age: "",
      gender: "男",
      role: "海防部队连长",
      affiliation: "垦丁万里桐附近的小营舍",
      tags: ["第 20 章", "连长"],
      summary: "海防部队连长，驻在垦丁万里桐附近的小营舍。",
      appearance: "体格壮硕魁梧，晒得黑，短发；上身只穿汗衫，军裤、军靴，站着有军人的直。",
      personality: "有分寸、会应对：先把好说话的带走，再对付脾气大的；精于看人下菜。",
      bio: "陈明宪，海防部队连长。第 20 章后半，淑华与 Cindy 来借浴室，他一句「你先带这位小姐去后面浴室」，把两个人分开处理。",
      relationships: [
        { targetId: "char-026", type: "连长与士兵", note: "", directed: false },
        { targetId: "char-027", type: "连长与士兵", note: "", directed: false }
      ],
      timeline: [
        { date: "第 20 章", event: "在小营舍接待来借浴室的两个人" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-034-lianzhang.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-035",
      universeId: "abin-1985",
      name: "潘瑞珠",
      aliases: ["小珠"],
      age: "",
      gender: "女",
      role: "与阿宾同校的学生",
      affiliation: "",
      tags: ["第 18 章", "短发", "细框眼镜"],
      summary: "自称「小珠」的学生，与阿宾同校。",
      appearance: "瘦瘦高高，腿细；短发俏丽、菱角嘴，秀挺的鼻子上架着细框眼镜；额头圆润、月眉细弯、长睫毛。穿白衬衫、深色长裤。",
      personality: "外表冷、脸上一直没什么表情，怕丢脸；熟了之后笑得很开——她的冷是壳。",
      bio: "潘瑞珠，自称「小珠」，与阿宾同校。第 18 章初见时骄傲、冷。男朋友是郭文强（第 19 章揭晓）。",
      relationships: [
        { targetId: "char-023", type: "情侣", note: "第 19 章揭晓", directed: false },
        { targetId: "char-001", type: "同校", note: "", directed: false }
      ],
      timeline: [
        { date: "第 18 章", event: "第一次见面，自报姓名「小珠，潘瑞珠」" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-035-xiaozhu.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-036",
      universeId: "abin-1985",
      name: "林素茵",
      aliases: ["茵姐", "老师"],
      age: "接近四十岁",
      gender: "女",
      role: "阿宾的班导师",
      affiliation: "学校",
      tags: ["第 24 章", "班导师", "已婚"],
      summary: "阿宾的班导师，接近四十岁，保养得极好。",
      appearance: "接近四十岁，面貌姣美可人、皮肤白白净净，保养得极好；烫得蓬蓬松松的头发。穿毛绒绒的长袖套衫、紧身牛仔裤，米色高跟鞋。",
      personality: "声音非常娇媚；主动，声音与姿态都在「招呼」；说谎很熟练，但说漏嘴会脸红。年轻时学过舞蹈。",
      bio: "林素茵，阿宾的班导师。学生叫她「老师」，私下叫「茵姐」。已婚近十年，丈夫是师丈，女儿是小美。第 24 章叫阿宾去家里送资料。",
      relationships: [
        { targetId: "char-001", type: "师生", note: "班导师与学生", directed: true },
        { targetId: "char-025", type: "认识", note: "阿宾的事是依姈告诉她的", directed: false }
      ],
      timeline: [
        { date: "第 24 章", event: "叫阿宾到家里送资料" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-036-lin-suyin.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    },
    {
      id: "char-037",
      universeId: "abin-1985",
      name: "李明健",
      aliases: ["明健"],
      age: "19",
      gender: "男",
      role: "淑华的直属学弟，大一新生",
      affiliation: "与阿宾同栋公寓，从前是莲莲那间小房",
      tags: ["第 23 章", "学弟", "书呆子"],
      summary: "淑华的直属学弟，大一新生，戴着眼镜的书呆子。",
      appearance: "十九岁，瘦，戴眼镜，头发有点乱；白衬衫扣得整齐，深色长裤、布鞋。显得笨拙但干净，原文用「一脸蠢样」形容。",
      personality: "老实、认真、有礼貌，说话像在念稿，会害羞；房间整理得比女生还干净。他是全书唯一一个想「负责」的男人。",
      bio: "李明健，淑华的直属学弟，大一新生，租阿宾同栋公寓、从前是莲莲那间小房。第 23 章淑华生日时被介绍给她。",
      relationships: [
        { targetId: "char-012", type: "直属学弟与学姐", note: "淑华生日时配对", directed: true },
        { targetId: "char-001", type: "同栋公寓邻居", note: "由阿宾介绍给淑华", directed: false }
      ],
      timeline: [
        { date: "第 23 章", event: "淑华生日，被介绍给淑华" }
      ],
      status: "published",
      created: "2026-11-06",
      updated: "2026-11-06",
      portrait: "images/fictional-characters/char-037-li-mingjian.jpg",
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
    }
  ]
};
