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
      portraitCredit: "AI 生成 · 虚构形象 · 2026"
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
    }
  ]
};
