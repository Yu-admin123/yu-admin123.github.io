'use strict';
/* ================= 工具 ================= */
const $ = s => document.querySelector(s);
const FMT = (()=>{const u=[['',1],['K',1e3],['M',1e6],['B',1e9],['T',1e12],['Qa',1e15],['Qi',1e18],['Sp',1e21]];
return function(n){if(!isFinite(n)) return '∞'; const neg=n<0; n=Math.abs(n);
for(let i=u.length-1;i>0;i--){ if(n>=u[i][1]){ let v=n/u[i][1]; let s=v>=100?Math.floor(v).toLocaleString('en-US'):v>=10?v.toFixed(1):v.toFixed(2); return (neg?'-':'')+s+u[i][0]; }}
let s=n>=100?Math.floor(n).toLocaleString('en-US'):n>=10?n.toFixed(1):n.toFixed(2); return (neg?'-':'')+s;};})();
const esc = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function pay(c){ Object.entries(c||{}).forEach(([k,v])=>S.res[k]=(S.res[k]||0)-v); }
function canAfford(c){ return Object.entries(c||{}).every(([k,v])=>(S.res[k]||0)>=v); }
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),2600); }

/* ================= 数据定义 ================= */
const R=(id,name,icon,click)=>({id,name,icon,click});
const B=(id,name,icon,desc,cost,prod,unlockResearch,pop,conv)=>({id,name,icon,desc,cost,prod,unlockResearch,pop:pop||0,conv:conv||null});
const J=(id,name,icon,res,amount,desc,unlockResearch)=>({id,name,icon,res,amount,desc,unlockResearch});
const RS=(id,name,icon,desc,cost,effect,opts={})=>({id,name,icon,desc,cost,effect,milestone:!!opts.milestone,prereq:opts.prereq||[]});

/* 资源说明：采集按钮上的文本描述（按 id 查表） */
const RES_DESC = {
  // 共享·原始
  wood:'营建与燃料的根本', stone:'砌筑与锻造的基石', food:'维系族人的命脉', cornerstone:'精炼厂产出的珍贵材料，用于文明商店兑换',
  // 科技线
  iron:'冶炼金属的起点', mechanism:'精巧器械的构件', coal:'驱动蒸汽的燃料', gear:'传动机械的核心',
  copper:'导电与铸造之材', power:'点亮时代的能量', silicon:'晶圆的原料', chip:'算计的载体',
  compute:'智能的引擎', data:'认知的燃料', alloy:'星舰的骨与血', antimatter:'跃迁的奇点',
  // 仙侠线
  ling_shi:'蕴养修为的宝矿', ling_qi:'天地灵机所钟', ling_yu:'淬体洗髓的灵液', xian_cao:'炼丹的灵植',
  jindan_sand:'凝结金丹的砂', yao_dan:'妖兽内丹精华', shenhun:'魂魄淬炼之力', yuanying_yu:'护育元婴的玉',
  fazhe:'天地法则残片', shengue:'神念凝成的晶', xian_qi:'飞升前的仙灵气', tian_yin:'天道降下的印记',
  // 魔法线
  mana:'施法的源泉', wand_wood:'镌刻符文之木', ele_frag:'元素本源碎片', mithril:'轻韧的秘银',
  arcane_dust:'奥术逸散之尘', space_stone:'折叠空间的石', dragon_core:'巨龙的力量核心',
  essence:'魔法的精粹', spark:'点燃神性的火花', star_light:'星辰的余晖石', godhead:'封神的根基', faith:'信众供奉之力',
  // 生物线
  medium:'培育生命的温床', cell:'微观的生命样本', gene_frag:'遗传的密码片段', base_pair:'双螺旋的基本单位',
  stem_cell:'未分化的原初细胞', bio_ink:'打印器官的墨', neuron:'思维的基本单元', synapse:'神经的连接',
  clone:'复刻的个体', augment:'强化的基因', evolve_factor:'推动演化的因子', super_brain:'聚合的意识网络',
  // 海洋线
  fish:'果腹的渔获', shell:'坚固的甲壳', coral:'海底的聚落', pearl:'凝结的珍宝', deep_metal:'深渊的金属',
  sea_crystal:'海水的结晶', abyss_ore:'万丈下的矿脉', ocean_heart:'海洋的脉动', tide:'潮起潮落之力',
  sail:'远航的布', compass:'指引方向的针',
  // 植物线
  seed:'萌发新生的希望', fruit:'甘甜的果实', spore:'飘散的孢子', mycelium:'地下的菌丝网', resin:'树木的黄金泪',
  tree_sap:'流淌的树液', glow_moss:'幽幽的荧光苔', canopy_dew:'树冠凝的露', world_sap:'世界树的汁液',
  life_essence:'生命的本源', life_fruit:'延寿的奇果', ling_gen:'修士的灵根', spirit_wood:'通灵的木料', herb:'入药的灵草',
  // 炼金线
  quicksilver:'流动的汞', brimstone:'燃烧的硫磺', phil_stone:'点石成金之梦', truth_gold:'真理凝成的金',
  aether:'充盈周天的以太', primal_ele:'原初的元素', transform_fluid:'转化的媒介', solvent:'溶解万物的液',
  formula:'万法的总纲', universe_const:'宇宙的恒常', soul_matter:'承载意识的质',
};

/* —— 共享的原始时代 —— */
const PRIMITIVE = {
  name:'原始时代', icon:'🔥',
  resources:[
    R('wood','木材','🪵',2), R('stone','石材','🪨',1.2), R('food','食物','🍖',1.2), R('cornerstone','文明基石','🧱',0)
  ],
  buildings:[
    B('lumber','伐木屋','🪓','让木材自动生长。',{wood:10,stone:5},{wood:1},null),
    B('quarry','采石场','⛏️','敲打岩石，石料自会听话。',{wood:15,stone:10},{stone:0.8},null),
    B('campfire','火堆','🔥','温暖与食物，是部落的心脏。',{wood:20,stone:15},{food:1},'fire',2),
    B('hut','草屋','🛖','遮风挡雨，人口才能繁衍。',{wood:30,food:10},{},'language',4),
    B('refinery','精炼厂','⚙️','把木材、石材与食物精炼为文明基石。',{wood:150,stone:100,food:80},{},null,0,{in:{wood:1,stone:1,food:0.5},out:{cornerstone:0.1}}),
  ],
  jobs:[
    J('j_wood','樵夫','🪓','wood',2,'把树变成木材。','language'),
    J('j_stone','采石工','⛏️','stone',1.5,'把山变成石材。','language'),
    J('j_food','猎手','🏹','food',2,'把猎物变成食物。','language'),
  ],
  researches:[
    RS('stone_axe','石斧','🪓','打磨石片，采集效率翻倍。',{wood:15},{mult:{wood:1.5}}),
    RS('fire','火种','🔥','学会保留火种，部落不再惧怕黑暗。',{stone:20},{unlockBuilding:'campfire'}),
    RS('language','部落语言','🗣️','用语言分配劳作，人口系统解锁。',{wood:30,food:20},{unlockJobs:true},{milestone:true}),
    RS('omen','星陨预兆','🌠','那一夜，天空坠落了不属于这个世界的光。',{wood:60,stone:60,food:50},{},{milestone:true,prereq:['language']}),
  ],
  advance:{wood:40,stone:40}
};

/* ================= 平行主分支数据（占位，逐步注入） ================= */
const BRANCHES = {
  tech:{
    id:'tech', name:'科技 · 机械与嵌入式', icon:'⚙️', color:'#4aa3ff',
    tagline:'以火为始，以芯片为魂，走向电力、信息与星辰',
    desc:'钢铁与硅晶之路',
    whisper:'齿轮在远方等你，金属的歌，只为肯亲手锻打的人响起。',
    eras:[
      {id:'t0', name:'部落时代 · 鲁班', icon:'🛠️',
       story:'陨星的余烬尚未冷却，部落却已听见金属的呼唤。年轻的工匠循着鲁班的传说，不再满足于木与石——他们要在篝火旁锻出第一块铁，用榫卯与机关，为文明搭起坚硬的骨架。',
       resources:[R('iron','铁矿石','⛏️',2), R('mechanism','机关件','🧩',1)],
       buildings:[
        B('t_smith','锻造工坊','🔨','熔炼铁矿石，锤打钢铁。',{wood:80,stone:60},{iron:1.2},'t_smelt'),
        B('t_workshop','机关工坊','🧩','以榫卯与齿轮组装精密机关件。',{iron:30,wood:100},{mechanism:0.6},'t_machine'),
       ],
       jobs:[
        J('t_ironsmith','铁匠','🔨','iron',2,'把矿石锤成铁器。','t_smelt'),
        J('t_machinist','机关匠','🧩','mechanism',1.2,'拼装精密的机关部件。','t_machine'),
       ],
       researches:[
        RS('t_mortise','榫卯工艺','🧩','让木石紧密咬合，木材采集效率提升。',{wood:60},{mult:{wood:1.5}}),
        RS('t_smelt','冶铁术','🔥','点燃熔炉，从矿石中炼出钢铁。',{wood:80,stone:100},{},{milestone:true}),
        RS('t_machine','机关术','⚙️','研究齿轮与杠杆，制造机关件。',{iron:40,wood:80},{autoClick:1},{milestone:true,prereq:['t_smelt']}),
       ],
       advance:{wood:200, iron:60}},
      {id:'t1', name:'蒸汽时代 · 朋克', icon:'🏭',
       story:'当第一台锅炉轰然点火，水汽裹着煤烟冲上天空。齿轮咬合齿轮，城市在铆钉与轰鸣中拔节生长；那是一个崇尚力量、也崇尚怪诞之美的朋克年代。',
       resources:[R('coal','煤炭','⬛',2), R('gear','齿轮','⚙️',1)],
       buildings:[
        B('t_coalmine','煤矿坑','⛏️','挖出深埋地下的黑色能量。',{wood:150,iron:80},{coal:1.5},'t_steam'),
        B('t_gearshop','齿轮工坊','⚙️','浇铸咬合的钢铁齿轮。',{coal:50,iron:100},{gear:0.8},'t_gear2'),
       ],
       jobs:[
        J('t_boiler','锅炉工','🔥','coal',2.5,'往炉膛里添煤，让蒸汽咆哮。','t_steam'),
        J('t_gearsmith','齿轮匠','⚙️','gear',1.5,'铸造精密的传动部件。','t_gear2'),
       ],
       researches:[
        RS('t_punk','朋克美学','🎷','蒸汽与铆钉之美，煤炭产能提升。',{wood:120,coal:30},{mult:{coal:1.5}}),
        RS('t_steam','蒸汽动力','💨','蒸汽就是力量。',{wood:200,coal:60},{},{milestone:true}),
        RS('t_gear2','齿轮传动','🔩','让动力在齿轮间传递。',{coal:80,iron:120},{autoClick:1},{milestone:true,prereq:['t_steam']}),
       ],
       advance:{iron:300, coal:120}},
      {id:'t2', name:'电力时代 · 电学', icon:'⚡',
       story:'一道惊雷劈开了旧世界的夜。铜线如藤蔓爬满山谷，电流成了新的神谕——工程师们终于学会驯服那道曾令祖先跪拜的闪电。',
       resources:[R('copper','铜矿石','🥉',2), R('power','电力','⚡',1)],
       buildings:[
        B('t_copermine','铜矿场','⛏️','开采导电的赤铜。',{coal:200,iron:200},{copper:1.6},'t_elec'),
        B('t_generator','发电机','⚡','转动线圈，把机械能化作电流。',{copper:80,gear:60},{power:1.2},'t_circuit'),
       ],
       jobs:[
        J('t_coppersmith','铜匠','🥉','copper',2,'把铜拉成导线。','t_elec'),
        J('t_electrician','电工','⚡','power',1.8,'架设电路，输送光明。','t_circuit'),
       ],
       researches:[
        RS('t_elec','电学基础','🔌','理解电压、电流与电阻的奥秘。',{coal:250,copper:60},{},{milestone:true}),
        RS('t_circuit','电路布线','🧵','让电流按我们的意志流动。',{copper:120,iron:250},{autoClick:1},{milestone:true,prereq:['t_elec']}),
        RS('t_motor','电动机','🌀','电能驱动旋转的磁场。',{copper:100,power:50},{mult:{power:1.5,copper:1.5}},{milestone:false,prereq:['t_circuit']}),
       ],
       advance:{copper:300, coal:300}},
      {id:'t3', name:'信息时代 · 嵌入式', icon:'💾',
       story:'硅片被打磨得能映出人脸，亿万电子在晶格间奔涌如星河。一枚拇指大的芯片，装下的智慧胜过了一整座部落；嵌入式工程师，成了驾驭这微小神祇的人。',
       resources:[R('silicon','硅晶','💠',1.5), R('chip','芯片','💾',1)],
       buildings:[
        B('t_silicon','硅晶炉','🔥','从砂中提纯高纯硅晶。',{copper:300,power:200},{silicon:1.5},'t_semi'),
        B('t_chipfab','芯片厂','💾','光刻蚀刻，把电路印上硅片。',{silicon:120,power:200},{chip:1},'t_mcu'),
       ],
       jobs:[
        J('t_silwork','硅晶工','💠','silicon',1.8,'守护提纯炉的温度与纯度。','t_semi'),
        J('t_embed','嵌入式工程师','🛠️','chip',1.6,'让代码跑在裸金属之上。','t_mcu'),
       ],
       researches:[
        RS('t_semi','半导体','📡','理解能带与掺杂，硅晶的奥秘。',{copper:400,silicon:80},{},{milestone:true}),
        RS('t_mcu','单片机','🧠','把整台计算机装进一粒芯片。',{silicon:200,chip:50},{autoClick:1},{milestone:true,prereq:['t_semi']}),
        RS('t_os','嵌入式系统','🐧','实时系统让芯片昼夜不息。',{chip:100,power:300},{mult:{chip:1.6}},{milestone:false,prereq:['t_mcu']}),
       ],
       advance:{silicon:300, chip:150}},
      {id:'t4', name:'AI 时代', icon:'🤖',
       story:'芯片某天开始「思考」。数据成了新时代的粮食，算力是它的肠胃，神经网络是它的神经——当第一只电子之眼睁开，人类终于造出了会学习的影子。',
       resources:[R('compute','算力','🧮',1.5), R('data','数据','📊',1.2)],
       buildings:[
        B('t_server','服务器集群','🗄️','一墙一墙的机柜，轰鸣着计算的脉搏。',{chip:200,power:300},{compute:1.5},'t_ml'),
        B('t_datacenter','数据中心','🏢','海量数据在此沉睡与苏醒。',{compute:120,silicon:300},{data:1.2},'t_data'),
       ],
       jobs:[
        J('t_aire','算法工程师','🧠','compute',1.6,'调教神经网络的超参数。','t_ml'),
        J('t_labeler','数据标注员','🏷️','data',2,'给世界打上理解的标签。','t_data'),
       ],
       researches:[
        RS('t_ml','机器学习','📉','让机器从经验中成长。',{chip:300,compute:80},{},{milestone:true}),
        RS('t_data','数据洪流','📊','数据是新时代的石油。',{compute:150,chip:250},{autoClick:1},{milestone:true,prereq:['t_ml']}),
        RS('t_llm','大模型','🧠','千亿参数的巨人睁开双眼。',{data:200,compute:200},{mult:{compute:1.7}},{milestone:false,prereq:['t_data']}),
       ],
       advance:{compute:400, data:250}},
      {id:'t5', name:'星际时代', icon:'🚀',
       story:'目光越过大气层，工程师们不再只想着脚下的土地。轨道船坞在零重力里焊接巨构，戴森球的构想在远方聚光；文明收拾行囊，准备离开这颗蓝色的摇篮。',
       resources:[R('alloy','星际合金','🛰️',1.5), R('antimatter','反物质','⚛️',1)],
       buildings:[
        B('t_dock','轨道船坞','🛰️','在零重力下焊接巨构。',{chip:400,compute:300},{alloy:1.5},'t_star'),
        B('t_antimatter','反物质炉','⚛️','让湮灭化作澎湃的能量。',{alloy:200,power:400},{antimatter:1},'t_antimatter'),
       ],
       jobs:[
        J('t_shipeng','星舰工程师','🚀','alloy',1.6,'设计跨越光年的船体。','t_star'),
        J('t_engineer2','引擎技师','⚛️','antimatter',1.3,'校准湮灭引擎的磁场。','t_antimatter'),
       ],
       researches:[
        RS('t_star','星际航行','🚀','离开摇篮的第一步。',{chip:400,alloy:100},{},{milestone:true}),
        RS('t_antimatter','反物质理论','⚛️','物质与反物质的舞蹈。',{alloy:250,compute:350},{autoClick:1},{milestone:true,prereq:['t_star']}),
        RS('t_warp','曲率引擎','🌌','折叠空间，让飞船追光。',{alloy:300,antimatter:150},{mult:{alloy:1.8,antimatter:1.8}},{milestone:false,prereq:['t_antimatter']}),
       ],
       advance:{alloy:500, antimatter:250}},
    ],
    ending:{title:'星海火种', text:'当火种部落的方舟驶出太阳系，你回望那颗蓝色母星——从第一块燧石到曲率引擎，文明的每一步都由你的双手锻打。星海辽阔，而火种不灭。你，已然成为星际文明的奠基者。'}
  },
  xianxia:{
    id:'xianxia', name:'仙侠 · 修真问道', icon:'🐉', color:'#c084fc',
    tagline:'以灵气为食，御剑飞升，踏破虚空',
    desc:'修真问道',
    whisper:'灵脉在地下翻涌，它认得每一个愿意静静吐纳的魂。',
    eras:[
      {id:'x0', name:'灵气觉醒 · 炼气期', icon:'🍃',
       story:'陨星裂开，一道幽蓝灵脉在地底悠悠苏醒，像沉睡千年的呼吸。部落的孩童第一次「看见」了气——那无形却真实流淌在万物间的东西，是一切超凡的起点。',
       resources:[R('ling_shi','灵石','💎',2), R('ling_qi','灵气','🌫️',1.5)],
       buildings:[
        B('x_vein','灵石矿脉','⛏️','开采天地凝成的灵石。',{wood:80,stone:60},{ling_shi:1.2},'x_intro'),
        B('x_array','聚灵阵','☯️','以灵石布阵，汇聚四方灵气。',{ling_shi:30,wood:100},{ling_qi:0.8},'x_array2'),
       ],
       jobs:[
        J('x_miner','灵石矿工','⛏️','ling_shi',2,'凿开矿脉，取出灵光。','x_intro'),
        J('x_condense','聚灵者','🧘','ling_qi',1.5,'盘坐阵中，吐纳灵气。','x_array2'),
       ],
       researches:[
        RS('x_breathe','吐纳心法','🌬️','呼吸吐纳，灵气亲和度提升。',{wood:60},{mult:{wood:1.5}}),
        RS('x_intro','引气入体','🧘','打通经脉，让第一缕灵气入体。',{wood:80,stone:100},{},{milestone:true}),
        RS('x_array2','聚灵阵图','☯️','以阵法扭转灵气走向。',{ling_shi:40,wood:80},{autoClick:1},{milestone:true,prereq:['x_intro']}),
       ],
       advance:{wood:200, ling_shi:60}},
      {id:'x1', name:'筑基期', icon:'🏯',
       story:'筑基，如同为道途浇筑地基。族人在灵脉旁凿出第一座洞府，灵田里栽下会自发微光的仙草，修行不再只是吐纳，而是一门可以传承的技艺。',
       resources:[R('ling_yu','灵液','💧',1.5), R('xian_cao','灵草','🌿',2)],
       buildings:[
        B('x_field','灵田','🌾','种植蕴含灵气的仙草。',{ling_shi:150,stone:100},{xian_cao:1.5},'x_zhuji'),
        B('x_alchemy','炼丹炉','🫕','以灵火炼化草木为灵液。',{xian_cao:50,ling_shi:120},{ling_yu:0.8},'x_dan'),
       ],
       jobs:[
        J('x_herbalist','灵植夫','🌱','xian_cao',2,'照料灵田里的每一株草。','x_zhuji'),
        J('x_apothecary','丹童','🔥','ling_yu',1.3,'掌炉温火，凝炼丹液。','x_dan'),
       ],
       researches:[
        RS('x_zhuji','筑基丹方','🫙','借丹药之力巩固道基。',{ling_shi:200,xian_cao:60},{},{milestone:true}),
        RS('x_dan','灵火控温','🔥','掌控灵火的每一度。',{xian_cao:80,ling_shi:150},{autoClick:1},{milestone:true,prereq:['x_zhuji']}),
        RS('x_sword','御剑术','🗡️','踏剑而行，身法如风。',{ling_yu:50,ling_shi:100},{mult:{ling_yu:1.5}},{prereq:['x_dan']}),
       ],
       advance:{ling_shi:300, xian_cao:150}},
      {id:'x2', name:'金丹期', icon:'🟡',
       story:'丹田之内，灵气缓缓凝成一粒金丹，温润如一枚小太阳。金丹修士开宗立派，山门之下万法始兴，曾经的山野村夫，如今有了属于自己的道统。',
       resources:[R('jindan_sand','金丹砂','🟡',1.5), R('yao_dan','妖丹','🐾',1)],
       buildings:[
        B('x_iron','玄铁熔炉','⚒️','熔炼天外玄铁与金丹砂。',{ling_shi:250,ling_yu:150},{jindan_sand:1.2},'x_jindan'),
        B('x_cave','灵脉洞府','🏔️','深居灵脉核心，猎取妖丹。',{jindan_sand:60,ling_shi:250},{yao_dan:0.8},'x_core'),
       ],
       jobs:[
        J('x_smelter','铸器师','⚒️','jindan_sand',1.6,'将玄铁与金丹砂铸成法宝。','x_jindan'),
        J('x_hunter','猎妖人','🐾','yao_dan',1.4,'狩猎妖兽，取其内丹。','x_core'),
       ],
       researches:[
        RS('x_jindan','金丹大道','☯️','凝气成丹，寿元大增。',{ling_shi:300,jindan_sand:80},{},{milestone:true}),
        RS('x_core','天材地宝','🌟','感应山川灵气之眼。',{jindan_sand:120,ling_yu:200},{autoClick:1},{milestone:true,prereq:['x_jindan']}),
        RS('x_fa','阵法之道','🕸️','布阵困敌，护山护道。',{yao_dan:60,jindan_sand:80},{mult:{jindan_sand:1.5}},{prereq:['x_core']}),
       ],
       advance:{jindan_sand:300, yao_dan:150}},
      {id:'x3', name:'元婴期', icon:'👶',
       story:'金丹碎裂的刹那，一个婴孩般的元神自躯壳中坐起。神魂可离体游历天地，一念之间飞剑已越千里——凡人的躯壳，第一次装下了不灭的灵性。',
       resources:[R('shenhun','神魂之力','👻',1.5), R('yuanying_yu','元婴玉','🥚',1)],
       buildings:[
        B('x_tower','神念塔','🗼','凝练神魂之力。',{ling_shi:350,yao_dan:150},{shenhun:1.2},'x_yuanying'),
        B('x_leiting','天雷淬炼场','⛈️','引天雷淬炼元婴。',{shenhun:60,jindan_sand:250},{yuanying_yu:0.8},'x_leiting2'),
       ],
       jobs:[
        J('x_spirit','念修','🧠','shenhun',1.5,'冥想神识，淬炼神魂。','x_yuanying'),
        J('x_leigong','雷修','⛈️','yuanying_yu',1.2,'引雷入体，淬炼元婴。','x_leiting2'),
       ],
       researches:[
        RS('x_yuanying','元婴出窍','🌫️','神魂离体，神游太虚。',{yao_dan:250,shenhun:60},{},{milestone:true}),
        RS('x_leiting2','雷劫淬体','⚡','借天雷洗练道躯。',{shenhun:100,jindan_sand:250},{autoClick:1},{milestone:true,prereq:['x_yuanying']}),
        RS('x_shen','神通悟道','🧘','一朝顿悟，神通自生。',{yuanying_yu:50,shenhun:100},{mult:{shenhun:1.5}},{prereq:['x_leiting2']}),
       ],
       advance:{shenhun:300, yuanying_yu:150}},
      {id:'x4', name:'化神期', icon:'🗿',
       story:'神魂与天地法则渐渐合一，举手便可搬山填海。修士开始以意志开辟「神国」，在虚空中圈出一方只属于自己的天地，欲与天道试比高。',
       resources:[R('fazhe','法则碎片','📜',1), R('shengue','神念晶','🔮',1)],
       buildings:[
        B('x_altar','法则祭坛','🛕','参悟天地法则。',{yao_dan:300,shenhun:250},{fazhe:1.2},'x_huashen'),
        B('x_god','神国雏形','🏰','以意志开辟一方小世界。',{fazhe:80,ling_shi:400},{shengue:0.8},'x_god2'),
       ],
       jobs:[
        J('x_ruke','悟道者','🧘','fazhe',1.5,'枯坐百年，只为一线法则。','x_huashen'),
        J('x_guozhu','神国信徒','🙏','shengue',1.2,'在神国中种下信仰。','x_god2'),
       ],
       researches:[
        RS('x_huashen','化神合道','🌌','身与道合，一念山河动。',{shenhun:300,fazhe:80},{},{milestone:true}),
        RS('x_god2','神国开辟','🏛️','在虚空中开辟神国。',{fazhe:120,ling_shi:400},{autoClick:1},{milestone:true,prereq:['x_huashen']}),
        RS('x_san','斩三尸','🗡️','斩去执念，心境圆满。',{shengue:60,fazhe:80},{mult:{fazhe:1.5}},{prereq:['x_god2']}),
       ],
       advance:{fazhe:300, shengue:150}},
      {id:'x5', name:'大乘 · 飞升', icon:'🦢',
       story:'大乘圆满，天劫在云层后低吼。渡劫台高耸入云，仙宫的金瓦在雷光里流转变幻——那扇只为敢仰望者敞开的大门，终于映出了你的影子。',
       resources:[R('xian_qi','仙气','🌈',1), R('tian_yin','天道之印','🏮',1)],
       buildings:[
        B('x_flight','飞升台','🗻','登台渡劫，迎仙气灌顶。',{fazhe:350,shengue:200},{xian_qi:1.2},'x_dacheng'),
        B('x_palace','仙宫','🏯','九天之上的金阙玉宇。',{xian_qi:80,fazhe:300},{tian_yin:0.8},'x_tiandao'),
       ],
       jobs:[
        J('x_xiuzhen','渡劫者','⚡','xian_qi',1.5,'直面天劫，夺一线生机。','x_dacheng'),
        J('x_tianshi','仙官','🏮','tian_yin',1.2,'执掌仙宫律令。','x_tiandao'),
       ],
       researches:[
        RS('x_dacheng','大乘圆满','🧘','道行圆满，只待天劫。',{fazhe:400,xian_qi:80},{},{milestone:true}),
        RS('x_tiandao','合道飞升','🦅','身合天道，破碎虚空。',{xian_qi:120,shengue:250},{autoClick:1},{milestone:true,prereq:['x_dacheng']}),
        RS('x_wushang','太上忘情','☁️','忘情亦是大爱。',{tian_yin:50,xian_qi:80},{mult:{xian_qi:1.5}},{prereq:['x_tiandao']}),
       ],
       advance:{xian_qi:400, tian_yin:200}},
    ],
    ending:{title:'飞升证道', text:'当你渡过最后一道天劫，天道之门訇然洞开。回首凡尘，那个捡起灵石的孩子已站在九天之上。从此世间多了一位不朽仙尊，而火种部落的传说，化作人间万年的香火。'}
  },
  magic:{
    id:'magic', name:'魔法 · 奥术觉醒', icon:'🔮', color:'#22d3ee',
    tagline:'以魔力为弦，编织法则，点燃神火',
    desc:'奥术之路',
    whisper:'魔力在裂隙里低语，敢挥手的人，才能听见真正的咒文。',
    eras:[
      {id:'m0', name:'魔法学徒', icon:'🪄',
       story:'陨星留下的另一道裂隙，泄出浓郁得几乎凝成雾的魔力。部落孩童第一次挥手，指尖便亮起一簇跳动的火苗——魔法，从此不再是传说里的字眼。',
       resources:[R('mana','魔力','💜',2), R('wand_wood','法杖木','🪄',1.5)],
       buildings:[
        B('m_well','魔力井','⛲','汇聚地脉中溢出的魔力。',{wood:80,stone:60},{mana:1.2},'m_meditate'),
        B('m_wand','法杖工坊','🪄','削制蕴含魔力的法杖。',{mana:30,wood:100},{wand_wood:0.8},'m_fireball'),
       ],
       jobs:[
        J('m_pyrom','学徒','🧙','mana',2,'练习最基础的法术。','m_meditate'),
        J('m_carver','木雕师','🪵','wand_wood',1.5,'把灵木削成法杖。','m_fireball'),
       ],
       researches:[
        RS('m_meditate','冥想术','🧘','静心冥想，魔力亲和提升。',{wood:80,stone:100},{},{milestone:true}),
        RS('m_fireball','火球术','🔥','第一道真正的攻击法术。',{mana:40,wood:80},{autoClick:1},{milestone:true,prereq:['m_meditate']}),
        RS('m_enchant','杖端附魔','✨','给法杖刻上魔力纹路。',{wand_wood:30,mana:40},{mult:{mana:1.5}},{prereq:['m_fireball']}),
       ],
       advance:{wood:200, mana:60}},
      {id:'m1', name:'元素使', icon:'🌪️',
       story:'驯服了火，便想与风、水、土对话。元素祭坛前，四系之力第一次在掌心交融成漩涡；你意识到，世界本就是一首由元素写成的诗。',
       resources:[R('ele_frag','元素碎片','💠',1.5), R('mithril','秘银','🥈',1)],
       buildings:[
        B('m_altar','元素祭坛','🛕','把散落的元素碎片聚成能量。',{mana:150,wood:100},{ele_frag:1.3},'m_ele4'),
        B('m_mine','秘银矿脉','⛏️','开采银白的秘银。',{ele_frag:40,mana:120},{mithril:0.8},'m_fuse'),
       ],
       jobs:[
        J('m_ele','元素师','🌀','ele_frag',1.6,'与四系元素对话。','m_ele4'),
        J('m_miner','秘银矿工','⛏️','mithril',1.4,'凿出银白的秘银。','m_fuse'),
       ],
       researches:[
        RS('m_ele4','四元素精通','🌈','火风水土，尽在掌中。',{mana:200,ele_frag:60},{},{milestone:true}),
        RS('m_fuse','元素融合','🔀','让相斥的元素彼此共鸣。',{ele_frag:90,mana:150},{autoClick:1},{milestone:true,prereq:['m_ele4']}),
        RS('m_summon','召唤契约','📜','与异界生物缔结契约。',{mithril:40,ele_frag:60},{mult:{ele_frag:1.5}},{prereq:['m_fuse']}),
       ],
       advance:{ele_frag:250, mithril:120}},
      {id:'m2', name:'奥术师', icon:'📚',
       story:'魔法褪去本能的外衣，露出了严谨的骨骼。奥术图书馆的墙壁上写满法术公式，每一次施法，都是一次对宇宙逻辑的轻声追问。',
       resources:[R('arcane_dust','奥术粉尘','🌌',1.5), R('space_stone','空间石','🌠',1)],
       buildings:[
        B('m_lib','奥术图书馆','📚','研究严谨的奥术理论。',{mana:250,ele_frag:150},{arcane_dust:1.2},'m_arcane'),
        B('m_portal','空间门','🌀','在两地之间撕开通道。',{arcane_dust:50,mana:250},{space_stone:0.7},'m_space'),
       ],
       jobs:[
        J('m_scholar','奥术学者','🎓','arcane_dust',1.5,'推导晦涩的奥术公式。','m_arcane'),
        J('m_spatial','空间术士','🌌','space_stone',1.2,'维护通往异界的门。','m_space'),
       ],
       researches:[
        RS('m_arcane','奥术理论','📐','魔法即数学。',{ele_frag:250,arcane_dust:60},{},{milestone:true}),
        RS('m_space','空间法术','🌠','折叠空间，咫尺天涯。',{arcane_dust:100,mana:250},{autoClick:1},{milestone:true,prereq:['m_arcane']}),
        RS('m_rune','符文矩阵','🧮','以符文编织恒定魔法。',{space_stone:40,arcane_dust:80},{mult:{arcane_dust:1.5}},{prereq:['m_space']}),
       ],
       advance:{arcane_dust:300, space_stone:150}},
      {id:'m3', name:'大法师', icon:'🧙‍♂️',
       story:'法师塔刺破云层，塔顶的龙晶在夜风里低鸣。当禁咒的扉页被翻开的刹那，你听见了魔法黄昏的脚步——也听见了自己即将成神的回声。',
       resources:[R('dragon_core','龙晶','🐲',1), R('essence','魔法精华','✨',1.5)],
       buildings:[
        B('m_tower','法师塔','🏰','凝聚魔法精华。',{mana:350,arcane_dust:200},{essence:1.2},'m_grand'),
        B('m_dragon','龙晶祭坛','🐲','感应沉睡的龙晶。',{essence:60,arcane_dust:250},{dragon_core:0.7},'m_ban'),
       ],
       jobs:[
        J('m_arch','大法师','🧙','essence',1.5,'统御整座法师塔的魔力。','m_grand'),
        J('m_dragonist','龙语者','🐉','dragon_core',1.2,'聆听龙晶中的古老低语。','m_ban'),
       ],
       researches:[
        RS('m_grand','大法师之路','👑','以凡人之躯，触及神明之力。',{arcane_dust:300,essence:60},{},{milestone:true}),
        RS('m_ban','禁咒研究','⚠️','禁忌的咒语，撕裂天空。',{essence:100,arcane_dust:250},{autoClick:1},{milestone:true,prereq:['m_grand']}),
        RS('m_field','魔法领域','🕳️','展开只属于你的领域。',{dragon_core:40,essence:80},{mult:{essence:1.5}},{prereq:['m_ban']}),
       ],
       advance:{essence:300, dragon_core:150}},
      {id:'m4', name:'传奇法师', icon:'🌟',
       story:'你已站在凡人魔法的顶点，却望见了更高的阶梯。星辉塔顶端，你开始编织命运之线，将一缕缕星光纺成通往神座的绳索。',
       resources:[R('spark','神性火花','🌟',1), R('star_light','星辉石','⭐',1)],
       buildings:[
        B('m_star','星辉塔','🌠','收集坠落凡间的星辉。',{mana:400,essence:250},{star_light:1.1},'m_legend'),
        B('m_anchor','神国锚点','⚓','在星界打下神国的锚。',{star_light:60,arcane_dust:300},{spark:0.7},'m_spark'),
       ],
       jobs:[
        J('m_legendary','传奇法师','🧝','star_light',1.4,'在星辉中铭刻真名。','m_legend'),
        J('m_priest','神侍','🙏','spark',1.1,'侍奉即将点燃的神火。','m_spark'),
       ],
       researches:[
        RS('m_legend','半神之路','🦅','超越凡俗的桎梏。',{essence:350,star_light:60},{},{milestone:true}),
        RS('m_spark','点燃神火','🔥','让第一缕神性之火燃起。',{star_light:100,mana:400},{autoClick:1},{milestone:true,prereq:['m_legend']}),
        RS('m_fate','命运编织','🧵','窥见并编织命运之线。',{spark:40,star_light:80},{mult:{star_light:1.5}},{prereq:['m_spark']}),
       ],
       advance:{star_light:350, spark:180}},
      {id:'m5', name:'神格', icon:'✨',
       story:'神火自胸口燎原，神格在信仰的洪流中凝实。万神殿的钟声穿透三界，亿万信徒的祈愿汇成江海——你，即将在云端落座为神。',
       resources:[R('godhead','神格','⚜️',1), R('faith','信仰之力','🕯️',1)],
       buildings:[
        B('m_pantheon','万神殿','🏛️','众神之殿，容纳信仰。',{star_light:400,spark:200},{faith:1.2},'m_fire2'),
        B('m_realm','神域','☁️','以意志开辟永恒神域。',{faith:80,star_light:350},{godhead:0.7},'m_create'),
       ],
       jobs:[
        J('m_acolyte','神官','🕯️','faith',1.5,'布道四方，汇聚信仰。','m_fire2'),
        J('m_demi','半神','🌤️','godhead',1.1,'炼化神格，稳固神位。','m_create'),
       ],
       researches:[
        RS('m_fire2','点燃神火·终章','🔥','神火不熄，即为永恒。',{spark:300,faith:80},{},{milestone:true}),
        RS('m_create','创世魔法','🪐','一念之间，创造与毁灭。',{faith:120,star_light:350},{autoClick:1},{milestone:true,prereq:['m_fire2']}),
        RS('m_omni','全知咒','🧠','洞悉世间一切咒语。',{godhead:40,faith:80},{mult:{faith:1.5}},{prereq:['m_create']}),
       ],
       advance:{faith:400, godhead:200}},
    ],
    ending:{title:'封神', text:'当最后一缕信仰汇入你的神格，万神殿的钟声震荡三界。你从火种部落的篝火旁走来，如今手握星辰与法则。从此，魔法有了新的名字——你的名字。'}
  },
  bio:{
    id:'bio', name:'生物科技 · 生命改造', icon:'🧬', color:'#4ade80',
    tagline:'以基因为书，创造物种，主宰进化',
    desc:'生命之路',
    whisper:'生命的字母在荧光里闪烁，想读懂它，先学会敬畏。',
    eras:[
      {id:'b0', name:'细胞时代', icon:'🦠',
       story:'陨星带来的不止石头，还有一团在月光下缓缓蠕动的荧光黏液。部落药师凑近细看，低声说：这里面，藏着生命用来书写自己的字母。',
       resources:[R('medium','培养基','🧪',2), R('cell','细胞样本','🫧',1.5)],
       buildings:[
        B('b_plate','培养皿台','🧫','在无菌环境里培养细胞。',{wood:80,stone:60},{medium:1.2},'b_sterile'),
        B('b_sampler','采样站','🧪','从万物中采集细胞样本。',{medium:30,wood:100},{cell:0.8},'b_culture'),
       ],
       jobs:[
        J('b_tech','实验员','🥼','medium',2,'守护培养皿的温度与湿度。','b_sterile'),
        J('b_herb','采菌人','🍄','cell',1.5,'采集野生菌与细胞。','b_culture'),
       ],
       researches:[
        RS('b_sterile','无菌操作','🧼','让实验不被杂菌污染。',{wood:80,stone:100},{},{milestone:true}),
        RS('b_culture','细胞培养','🧫','让细胞在器皿中增殖。',{medium:40,wood:80},{autoClick:1},{milestone:true,prereq:['b_sterile']}),
        RS('b_enzyme','酶催化','⚗️','用酶加速生命的化学反应。',{cell:30,medium:40},{mult:{medium:1.5}},{prereq:['b_culture']}),
       ],
       advance:{wood:200, medium:60}},
      {id:'b1', name:'基因时代', icon:'🧬',
       story:'显微镜下，双螺旋第一次被凡人的眼睛看清。你翻开生命最古老的那本书，发现所谓命运，原来是一行行可以阅读、也可以修改的文字。',
       resources:[R('gene_frag','基因片段','🧬',1.5), R('base_pair','碱基对','🧵',1.5)],
       buildings:[
        B('b_seq','基因测序仪','🔬','读取生命的密码。',{medium:150,stone:100},{gene_frag:1.3},'b_dna'),
        B('b_pcr','PCR实验室','🧪','让基因指数级复制。',{gene_frag:40,medium:120},{base_pair:0.8},'b_edit'),
       ],
       jobs:[
        J('b_genomist','基因工程师','🧬','gene_frag',1.6,'剪切拼接生命的字母。','b_dna'),
        J('b_pcre','扩增师','🧪','base_pair',1.4,'让一段基因无限放大。','b_edit'),
       ],
       researches:[
        RS('b_dna','DNA测序','🧬','读懂生命之书的第一页。',{medium:200,gene_frag:60},{},{milestone:true}),
        RS('b_edit','基因编辑','✂️','精准修改生命的代码。',{gene_frag:90,medium:150},{autoClick:1},{milestone:true,prereq:['b_dna']}),
        RS('b_vector','病毒载体','🦠','让病毒为你运送基因。',{base_pair:40,gene_frag:60},{mult:{gene_frag:1.5}},{prereq:['b_edit']}),
       ],
       advance:{gene_frag:250, base_pair:150}},
      {id:'b2', name:'器官时代', icon:'🫀',
       story:'干细胞在培养舱里安静分化，心脏、肝脏、视网膜逐一成形，像被一双无形的手捏塑。你开始用细胞当墨水，「打印」曾经只能祈求神灵赐予的器官。',
       resources:[R('stem_cell','干细胞','🧫',1.5), R('bio_ink','生物墨水','🖨️',1)],
       buildings:[
        B('b_printer','3D生物打印机','🖨️','把细胞当作墨水，打印器官。',{gene_frag:250,medium:200},{bio_ink:1.2},'b_print'),
        B('b_chamber','器官培养舱','🫀','让打印的器官缓缓长成。',{bio_ink:50,gene_frag:200},{stem_cell:0.9},'b_stem'),
       ],
       jobs:[
        J('b_bio','生物打印师','🖨️','bio_ink',1.5,'一针一针打印血管与心肌。','b_print'),
        J('b_cult','培养师','🫀','stem_cell',1.6,'照料每一枚跳动的心。','b_stem'),
       ],
       researches:[
        RS('b_print','器官打印','🫁','让报废的器官重获新生。',{gene_frag:250,bio_ink:60},{},{milestone:true}),
        RS('b_stem','干细胞分化','🔬','引导细胞走向命运。',{bio_ink:100,gene_frag:250},{autoClick:1},{milestone:true,prereq:['b_print']}),
        RS('b_immune','免疫相容','🛡️','让移植不再被排斥。',{stem_cell:50,bio_ink:80},{mult:{bio_ink:1.5}},{prereq:['b_stem']}),
       ],
       advance:{bio_ink:300, stem_cell:200}},
      {id:'b3', name:'意识时代', icon:'🧠',
       story:'神经元在培养皿里连成了网络，第一次「看见」了电信号组成的潮汐。你陷入长久的沉思：如果思想也能被书写，那么「我」，究竟是什么？',
       resources:[R('neuron','神经元','🧠',1.5), R('synapse','突触网络','🕸️',1)],
       buildings:[
        B('b_bci','脑机接口','🎛️','让神经与机器对话。',{bio_ink:250,medium:300},{neuron:1.2},'b_neuron'),
        B('b_map','意识图谱','🗺️','绘制思想的河流。',{neuron:60,bio_ink:250},{synapse:0.8},'b_synapse'),
       ],
       jobs:[
        J('b_neuro','神经科学家','🧠','neuron',1.5,'记录每一次电脉冲。','b_neuron'),
        J('b_cart','图谱师','🗺️','synapse',1.3,'把意识画成地图。','b_synapse'),
       ],
       researches:[
        RS('b_neuron','神经解码','📡','听懂神经元的话语。',{bio_ink:300,neuron:60},{},{milestone:true}),
        RS('b_synapse','脑机接口','⚡','让思想接入网络。',{neuron:100,bio_ink:250},{autoClick:1},{milestone:true,prereq:['b_neuron']}),
        RS('b_upload','意识上传','🌐','把记忆备份成数据。',{synapse:50,neuron:80},{mult:{neuron:1.5}},{prereq:['b_synapse']}),
       ],
       advance:{neuron:300, synapse:180}},
      {id:'b4', name:'克隆与改造', icon:'🧫',
       story:'克隆舱列成整齐的一排，无数「生命」在营养液里沉睡又苏醒。你不再等待自然的偶然，而是从零开始书写物种——甚至，重写自己。',
       resources:[R('clone','克隆体','👤',1), R('augment','强化基因','💉',1.5)],
       buildings:[
        B('b_clone','克隆舱','🛌','让细胞长成一个完整生命。',{neuron:250,bio_ink:300},{clone:1.1},'b_clone2'),
        B('b_augment','基因强化舱','💉','给生命装上更强的骨架。',{clone:50,neuron:250},{augment:1},'b_aug'),
       ],
       jobs:[
        J('b_cloner','克隆师','🧫','clone',1.3,'守护培养液与生命体征。','b_clone2'),
        J('b_enhancer','强化师','💪','augment',1.5,'调配强化基因序列。','b_aug'),
       ],
       researches:[
        RS('b_clone2','克隆技术','🧬','生命可以被复制。',{neuron:300,clone:60},{},{milestone:true}),
        RS('b_aug','基因强化','🦾','让弱小者拥有钢铁之躯。',{clone:100,neuron:300},{autoClick:1},{milestone:true,prereq:['b_clone2']}),
        RS('b_xeno','异种融合','🦎','融合不同物种的天赋。',{augment:50,clone:80},{mult:{clone:1.5}},{prereq:['b_aug']}),
       ],
       advance:{clone:300, augment:200}},
      {id:'b5', name:'进化时代', icon:'🌱',
       story:'进化圣坛上，每一代生命都按你的意志被雕琢得更接近完美。自然选择退居幕后，你坐上导演的座位——从此，进化由你执笔。',
       resources:[R('evolve_factor','进化因子','🧿',1), R('super_brain','超脑','🌐',1)],
       buildings:[
        B('b_shrine','进化圣坛','🛕','加速物种的演化时钟。',{clone:350,augment:200},{evolve_factor:1.1},'b_evolve'),
        B('b_over','超脑服务器','🌐','把亿万神经元连成一体。',{evolve_factor:60,clone:300},{super_brain:0.8},'b_over2'),
       ],
       jobs:[
        J('b_evo','进化术士','🧿','evolve_factor',1.3,'拨动生命的演化之轮。','b_evolve'),
        J('b_net','网络意识','🕸️','super_brain',1.2,'接入共享的超脑意识。','b_over2'),
       ],
       researches:[
        RS('b_evolve','定向进化','🎯','让进化按设计图发生。',{clone:350,evolve_factor:60},{},{milestone:true}),
        RS('b_over2','超脑链接','🧠','全体生命共享一个思想。',{evolve_factor:100,augment:250},{autoClick:1},{milestone:true,prereq:['b_evolve']}),
        RS('b_law','生命法则','📖','掌握生命的最终法则。',{super_brain:40,evolve_factor:80},{mult:{evolve_factor:1.5}},{prereq:['b_over2']}),
       ],
       advance:{evolve_factor:350, super_brain:200}},
    ],
    ending:{title:'新物种之神', text:'进化圣坛前，你放下最后一支试管。火种部落的族人早已不是当年的模样——他们拥有你亲手写下的翅膀与眼睛、智慧与永恒。你低头看着掌心那颗跳动的生命之种，轻声说：从此，进化由我书写。'}
  },
  ocean:{
    id:'ocean', name:'海洋 · 碧海之心', icon:'🌊', color:'#38bdf8',
    tagline:'潜入深渊，驾驭洋流，建立海底文明',
    desc:'碧海之路',
    whisper:'海浪一遍遍拍岸，像在问你：敢不敢潜进我的深处？',
    eras:[
      {id:'o0', name:'浅滩渔猎', icon:'🐟',
       story:'那一夜的海，亮起从未见过的荧光，像有人在水下点亮了灯。潮水退去，滩涂上留下晶莹贝壳与成群的鱼影；海，第一次向部落伸出了邀请的手。',
       resources:[R('fish','鱼获','🐟',2), R('shell','贝壳','🐚',1.5)],
       buildings:[
        B('o_hut','渔棚','🎣','在浅滩支起捕鱼的棚屋。',{wood:80,stone:60},{fish:1.2},'o_net'),
        B('o_craft','贝壳工坊','🐚','把贝壳磨成饰与器。',{fish:30,wood:100},{shell:0.8},'o_carve'),
       ],
       jobs:[
        J('o_fisher','渔夫','🎣','fish',2,'撒网，收网。','o_net'),
        J('o_carver','贝雕匠','🐚','shell',1.5,'把贝壳磨成饰与器。','o_carve'),
       ],
       researches:[
        RS('o_net','结网捕鱼','🕸️','织出第一张渔网。',{wood:80,stone:100},{},{milestone:true}),
        RS('o_carve','贝壳雕刻','🐚','让贝壳成为文明的货币。',{fish:40,wood:80},{autoClick:1},{milestone:true,prereq:['o_net']}),
        RS('o_salt2','晒盐法','🧂','盐，让食物得以保存。',{shell:30,fish:40},{mult:{fish:1.5}},{prereq:['o_carve']}),
       ],
       advance:{wood:200, fish:60}},
      {id:'o1', name:'航海时代', icon:'⛵',
       story:'独木舟划破碧波，风帆第一次鼓满信风。罗盘的指针轻轻颤动，指向海平线之外——那里有什么在等待，没有人知道，但每个人都想去看。',
       resources:[R('sail','帆布','🧵',1.5), R('compass','罗盘','🧭',1)],
       buildings:[
        B('o_loom','织帆坊','🪡','把麻织成鼓风的帆。',{fish:150,wood:100},{sail:1.2},'o_boat'),
        B('o_map','制图室','🗺️','把星辰与航迹绘成海图。',{sail:40,fish:120},{compass:0.7},'o_compass'),
       ],
       jobs:[
        J('o_sailor','水手','⛵','sail',1.5,'扯帆掌舵，浪里来去。','o_boat'),
        J('o_nav','航海家','🧭','compass',1.3,'在星海间定位方向。','o_compass'),
       ],
       researches:[
        RS('o_boat','独木舟与风帆','⛵','让船学会借风而行。',{fish:200,sail:50},{},{milestone:true}),
        RS('o_compass','罗盘导航','🧭','迷途的船有了方向。',{sail:80,wood:150},{autoClick:1},{milestone:true,prereq:['o_boat']}),
        RS('o_cart','海图测绘','🗺️','把每一片海画下来。',{compass:40,sail:60},{mult:{sail:1.5}},{prereq:['o_compass']}),
       ],
       advance:{sail:250, compass:120}},
      {id:'o2', name:'深潜时代', icon:'🫧',
       story:'潜水钟沉入幽蓝，第一束人造光刺破万年的黑暗。珊瑚、珍珠、黑曜岩在探照下苏醒，深海这座被遗忘的宝库，终于等来了访客。',
       resources:[R('coral','珊瑚','🪸',1.5), R('pearl','珍珠','🦪',1)],
       buildings:[
        B('o_bell','潜水钟','🔔','载着族人潜入深蓝。',{sail:200,fish:250},{coral:1.2},'o_dive'),
        B('o_pearl','珍珠蚌池','🦪','让蚌在安宁中结珠。',{coral:40,sail:200},{pearl:0.8},'o_pearl2'),
       ],
       jobs:[
        J('o_diver','潜水员','🤿','coral',1.5,'下潜，采撷珊瑚。','o_dive'),
        J('o_pearler','育珠人','🦪','pearl',1.3,'照料一池温润的蚌。','o_pearl2'),
       ],
       researches:[
        RS('o_dive','潜水钟技术','🔔','潜入更深的蓝。',{sail:250,coral:60},{},{milestone:true}),
        RS('o_pearl2','珍珠养殖','🦪','把珍珠养成财富。',{coral:80,sail:250},{autoClick:1},{milestone:true,prereq:['o_dive']}),
        RS('o_pressure','水压适应','🫁','让身体习惯深海。',{pearl:40,coral:60},{mult:{coral:1.5}},{prereq:['o_pearl2']}),
       ],
       advance:{coral:250, pearl:150}},
      {id:'o3', name:'海底城时代', icon:'🏙️',
       story:'透明的穹顶在海底撑开，灯火在幽蓝中次第亮起，像沉入海中的星群。第一座海底城，在深渊的边缘稳稳扎下了根。',
       resources:[R('deep_metal','深海金属','⚙️',1.5), R('sea_crystal','海晶','💠',1)],
       buildings:[
        B('o_base','海底基地','🏗️','在海底打下第一根桩。',{coral:200,pearl:150},{deep_metal:1.2},'o_city'),
        B('o_crystal','海晶熔炉','💎','熔炼会发光的海晶。',{deep_metal:50,coral:250},{sea_crystal:0.8},'o_energy'),
       ],
       jobs:[
        J('o_builder','深海建筑工','🏗️','deep_metal',1.5,'在高压下浇筑城市。','o_city'),
        J('o_eng','海能工程师','💡','sea_crystal',1.3,'让海晶照亮整座城。','o_energy'),
       ],
       researches:[
        RS('o_city','海底建筑','🌆','把家建在浪之下。',{coral:300,deep_metal:60},{},{milestone:true}),
        RS('o_energy','海晶能源','💠','用海洋的光点亮文明。',{deep_metal:100,coral:300},{autoClick:1},{milestone:true,prereq:['o_city']}),
        RS('o_dome','水压防护罩','🛡️','让城市不惧千钧之压。',{sea_crystal:50,deep_metal:80},{mult:{deep_metal:1.5}},{prereq:['o_energy']}),
       ],
       advance:{deep_metal:300, sea_crystal:180}},
      {id:'o4', name:'深渊时代', icon:'🕳️',
       story:'下潜，再下潜，直到万米之下的黑水开始咆哮。深渊矿井亮起灯火，发光苔在绝对黑暗里低语——这里，藏着文明下一段秘密。',
       resources:[R('abyss_ore','深渊矿石','🪨',1.5), R('glow_moss','发光苔','💚',1)],
       buildings:[
        B('o_abyssmine','深渊矿井','⛏️','凿开万米之下的矿脉。',{deep_metal:250,sea_crystal:200},{abyss_ore:1.2},'o_abyss'),
        B('o_glow','生物光实验室','🧪','培育发光的苔与菌。',{abyss_ore:50,deep_metal:250},{glow_moss:0.8},'o_glow2'),
       ],
       jobs:[
        J('o_deep','深渊矿工','⛏️','abyss_ore',1.5,'在黑暗中凿出光明。','o_abyss'),
        J('o_bio','生物光师','💡','glow_moss',1.3,'让苔藓点亮深渊。','o_glow2'),
       ],
       researches:[
        RS('o_abyss','深渊探测','📡','倾听深渊的低语。',{deep_metal:300,abyss_ore:60},{},{milestone:true}),
        RS('o_glow2','生物发光','🪄','用生命点燃黑暗。',{abyss_ore:100,sea_crystal:250},{autoClick:1},{milestone:true,prereq:['o_abyss']}),
        RS('o_trench','万米耐压','🏗️','在极限压力下前行。',{glow_moss:50,abyss_ore:80},{mult:{abyss_ore:1.5}},{prereq:['o_glow2']}),
       ],
       advance:{abyss_ore:300, glow_moss:180}},
      {id:'o5', name:'海神时代', icon:'🌊',
       story:'潮汐圣殿落成于海沟之巅，洋流引擎的轰鸣如神的心脏搏动。你站在浪尖回望，第一次确信：整片海，都在听你一个人的号令。',
       resources:[R('tide','潮汐之力','🌊',1), R('ocean_heart','海洋之心','💙',1)],
       buildings:[
        B('o_tide','潮汐圣殿','🛕','凝聚潮起潮落的伟力。',{abyss_ore:350,glow_moss:200},{tide:1.2},'o_tide2'),
        B('o_engine','洋流引擎','🌪️','让海流听你指挥。',{tide:80,abyss_ore:300},{ocean_heart:0.7},'o_heart'),
       ],
       jobs:[
        J('o_tidemage','潮汐祭司','🌊','tide',1.4,'诵念潮汐的咒文。','o_tide2'),
        J('o_hearts','海洋卫士','💙','ocean_heart',1.1,'守护海洋之心。','o_heart'),
       ],
       researches:[
        RS('o_tide2','洋流掌控','🌊','让海流化作你的手臂。',{abyss_ore:350,tide:80},{},{milestone:true}),
        RS('o_heart','海洋之心共鸣','💙','聆听海洋古老的心跳。',{tide:100,glow_moss:250},{autoClick:1},{milestone:true,prereq:['o_tide2']}),
        RS('o_covenant','海神之契','🤝','与大海立下永恒的盟约。',{ocean_heart:40,tide:80},{mult:{tide:1.5}},{prereq:['o_heart']}),
       ],
       advance:{tide:400, ocean_heart:200}},
    ],
    ending:{title:'海神加冕', text:'当洋流引擎与海洋之心同频共振，整片海都为火种部落让路。你站在潮汐圣殿之巅，头顶是粼粼波光，脚下是万米深渊。海神之名，从此铭刻在每一道浪花里。'}
  },
  plant:{
    id:'plant', name:'植物科技 · 森之文明', icon:'🌿', color:'#a3e635',
    tagline:'以种子为盟，催生巨树，共筑世界树',
    desc:'森之文明',
    whisper:'种子在泥土里悄悄发芽，它把未来，托付给会弯腰的人。',
    eras:[
      {id:'p0', name:'播种时代', icon:'🌱',
       story:'那颗陨星，把一枚会发光的种子钉进了大地。一夜之间藤蔓攀上悬崖，果实压弯枝头；植物，成了部落新的神明，也成了新的希望。',
       resources:[R('seed','种子','🌰',2), R('fruit','果实','🍎',1.5)],
       buildings:[
        B('p_farm','农田','🌾','在沃土上播下希望的种子。',{wood:80,stone:60},{fruit:1.2},'p_plant'),
        B('p_nursery','苗圃','🪴','悉心照料幼苗。',{fruit:30,wood:100},{seed:0.8},'p_seed'),
       ],
       jobs:[
        J('p_farmer','农人','🌾','fruit',2,'播种、浇灌、收割。','p_plant'),
        J('p_grower','育苗师','🪴','seed',1.5,'让每一粒种子发芽。','p_seed'),
       ],
       researches:[
        RS('p_plant','播种技术','🌱','让土地学会丰饶。',{wood:80,stone:100},{},{milestone:true}),
        RS('p_seed','良种选育','🧬','挑出最饱满的种子。',{fruit:40,wood:80},{autoClick:1},{milestone:true,prereq:['p_plant']}),
        RS('p_compost','堆肥发酵','♻️','让落叶重回泥土。',{seed:30,fruit:40},{mult:{fruit:1.5}},{prereq:['p_seed']}),
       ],
       advance:{wood:200, fruit:60}},
      {id:'p1', name:'草药时代', icon:'🌿',
       story:'药草园里，每片叶子都藏着治愈或致幻的力量。树脂在晚风里慢慢凝固，蜜蜂把花粉酿成金色的诗——部落学会了向植物借来长寿。',
       resources:[R('herb','草药','🌿',1.5), R('resin','树脂','🍯',1)],
       buildings:[
        B('p_herbgarden','药草园','🌸','种植能救命的草药。',{fruit:150,wood:100},{herb:1.3},'p_herb'),
        B('p_resin','树脂采集站','🍯','收集凝固的树之泪。',{herb:40,fruit:120},{resin:0.8},'p_resin2'),
       ],
       jobs:[
        J('p_herbalist','采药人','🌿','herb',1.6,'识百草，采灵药。','p_herb'),
        J('p_beekeeper','养蜂人','🐝','resin',1.3,'与蜜蜂共享花蜜。','p_resin2'),
       ],
       researches:[
        RS('p_herb','草药辨识','📖','记住每一株草的性情。',{fruit:200,herb:60},{},{milestone:true}),
        RS('p_resin2','树脂加工','🍯','把树泪炼成宝物。',{herb:80,fruit:200},{autoClick:1},{milestone:true,prereq:['p_herb']}),
        RS('p_pollen','花粉授粉','🐝','让花开得更加繁盛。',{resin:40,herb:60},{mult:{herb:1.5}},{prereq:['p_resin2']}),
       ],
       advance:{herb:250, resin:150}},
      {id:'p2', name:'森林时代', icon:'🌲',
       story:'森林拔地而起，树冠遮住了整片天空。灵木在深处低吟，藤蔓攀上城墙与屋檐；文明与森林，自此共用同一个屋顶。',
       resources:[R('spirit_wood','灵木','🌳',1.5), R('tree_sap','树汁','💧',1)],
       buildings:[
        B('p_forest','森林苗圃','🌳','培育会呼吸的灵木。',{herb:200,fruit:250},{spirit_wood:1.2},'p_forest2'),
        B('p_sap','榨汁坊','🧃','收集甘甜坚韧的树汁。',{spirit_wood:40,herb:200},{tree_sap:0.8},'p_sap2'),
       ],
       jobs:[
        J('p_forester','林务员','🌲','spirit_wood',1.5,'照料一片会生长的森林。','p_forest2'),
        J('p_tapper','采汁人','💧','tree_sap',1.3,'在黎明前收集树汁。','p_sap2'),
       ],
       researches:[
        RS('p_forest2','灵木培育','🌳','让树木长成栋梁。',{herb:250,spirit_wood:60},{},{milestone:true}),
        RS('p_sap2','树汁提取','🧪','提炼树的灵魂。',{spirit_wood:90,herb:250},{autoClick:1},{milestone:true,prereq:['p_forest2']}),
        RS('p_vine','藤蔓编织','🧶','用藤条编织一切。',{tree_sap:40,spirit_wood:80},{mult:{spirit_wood:1.5}},{prereq:['p_sap2']}),
       ],
       advance:{spirit_wood:250, tree_sap:150}},
      {id:'p3', name:'真菌时代', icon:'🍄',
       story:'苔藓之下，菌丝织成一张看不见的巨网，连接着每一棵树、每一片叶。森林从不孤独——原来它，从来只有一个跳动的心脏。',
       resources:[R('spore','孢子','🍄',1), R('mycelium','菌丝','🕸️',1.5)],
       buildings:[
        B('p_fungus','菌房','🍄','驯化发光的真菌。',{spirit_wood:250,herb:250},{spore:1.2},'p_fungus2'),
        B('p_myc','菌丝网络','🕸️','编织地下的智慧之网。',{spore:40,spirit_wood:250},{mycelium:0.9},'p_myc2'),
       ],
       jobs:[
        J('p_fungic','菌农','🍄','spore',1.5,'照料一室温润的菌。','p_fungus2'),
        J('p_mycist','菌丝行者','🕸️','mycelium',1.3,'行走于地下的网络。','p_myc2'),
       ],
       researches:[
        RS('p_fungus2','真菌驯化','🍄','让菌成为盟友。',{spirit_wood:300,spore:60},{},{milestone:true}),
        RS('p_myc2','菌丝网络','🕸️','连接整片森林。',{spore:100,herb:300},{autoClick:1},{milestone:true,prereq:['p_fungus2']}),
        RS('p_sym','植物共生','🤝','让植物彼此相连。',{mycelium:50,spore:80},{mult:{spore:1.5}},{prereq:['p_myc2']}),
       ],
       advance:{spore:300, mycelium:180}},
      {id:'p4', name:'巨树时代', icon:'🗼',
       story:'一棵巨树刺破云端，树冠托起整座村庄，灵根如龙盘虬。树顶之上，是另一片天空；树底之下，是整个大陆的脉络。',
       resources:[R('ling_gen','灵根','🪵',1.5), R('canopy_dew','树冠露','💧',1)],
       buildings:[
        B('p_giant','巨树苗圃','🌳','催生一棵参天巨树。',{spore:250,mycelium:200},{ling_gen:1.2},'p_giant2'),
        B('p_tower','树冠采集塔','🗼','在树冠上采集露水与果实。',{ling_gen:40,spore:250},{canopy_dew:0.8},'p_canopy'),
       ],
       jobs:[
        J('p_treew','树冠工匠','🪵','ling_gen',1.5,'在巨树上筑巢造屋。','p_giant2'),
        J('p_dewg','露水采集者','💧','canopy_dew',1.3,'趁晨光收尽树冠的泪。','p_canopy'),
       ],
       researches:[
        RS('p_giant2','巨树催生','🌳','让树长得比山还高。',{mycelium:250,ling_gen:60},{},{milestone:true}),
        RS('p_canopy','树冠农业','🌾','在云上耕种。',{ling_gen:90,spore:250},{autoClick:1},{milestone:true,prereq:['p_giant2']}),
        RS('p_graft','灵根嫁接','🌱','把不同的根嫁接成一体。',{canopy_dew:40,ling_gen:80},{mult:{ling_gen:1.5}},{prereq:['p_canopy']}),
       ],
       advance:{ling_gen:300, canopy_dew:180}},
      {id:'p5', name:'世界树时代', icon:'🌳',
       story:'世界树的根须贯穿大陆，枝叶托举星辰。生态穹顶之下，万物与文明在树的血脉里同流——这棵树，就是家园本身，也是文明的形状。',
       resources:[R('world_sap','世界树汁','💚',1), R('life_fruit','生命果','✨',1)],
       buildings:[
        B('p_world','世界树祭坛','🛕','与世界树共鸣。',{ling_gen:350,canopy_dew:200},{world_sap:1.2},'p_world2'),
        B('p_dome','生态穹顶','🏞️','在树冠下自成天地。',{world_sap:80,ling_gen:300},{life_fruit:0.7},'p_life'),
       ],
       jobs:[
        J('p_druid','树语者','🌿','world_sap',1.4,'聆听世界树的呼吸。','p_world2'),
        J('p_guard','生态卫士','🛡️','life_fruit',1.1,'守护树下的万物。','p_life'),
       ],
       researches:[
        RS('p_world2','世界树共鸣','🌍','让文明与树同频。',{ling_gen:350,world_sap:80},{},{milestone:true}),
        RS('p_life','生命果培育','🍏','结出蕴含生机的果实。',{world_sap:100,canopy_dew:250},{autoClick:1},{milestone:true,prereq:['p_world2']}),
        RS('p_cycle','生态循环','♻️','让万物生生不息。',{life_fruit:40,world_sap:80},{mult:{world_sap:1.5}},{prereq:['p_life']}),
       ],
       advance:{world_sap:400, life_fruit:200}},
    ],
    ending:{title:'世界树之契', text:'当世界树的根须与火种部落的地基融为一体，你听见了整片大陆的心跳。从此，城市的砖瓦生长于树脉，星辰的露水喂养着孩童。你握着那枚发光的种子——它没有消失，它成了整个文明的家。'}
  },
  alchemy:{
    id:'alchemy', name:'炼金 · 真理之路', icon:'⚗️', color:'#fbbf24',
    tagline:'以物质为墨，点石成金，探求宇宙真理',
    desc:'真理之路',
    whisper:'水银不肯安定，正如真理，总藏在「不肯承认」里。',
    eras:[
      {id:'a0', name:'炼金学徒', icon:'🧪',
       story:'陨星碎片浸入水中，嘶嘶作响，析出银色的液滴。老药师盯着它说：这叫水银——它拒绝成为它自己，正如一切物质的秘密，都藏在「不肯安定」里。',
       resources:[R('quicksilver','水银','🫧',2), R('brimstone','硫磺','🟡',1.5)],
       buildings:[
        B('a_table','炼金台','⚗️','在木桌上摆开坩埚与天秤。',{wood:80,stone:60},{quicksilver:1.1},'a_analyze'),
        B('a_still','蒸馏器','🫖','把混沌分离成纯净。',{quicksilver:30,wood:100},{brimstone:0.8},'a_distill'),
       ],
       jobs:[
        J('a_apprentice','学徒','⚗️','quicksilver',2,'研磨、称量、记录。','a_analyze'),
        J('a_stoker','炉工','🔥','brimstone',1.5,'守护蒸馏炉的火候。','a_distill'),
       ],
       researches:[
        RS('a_analyze','物质分析','🔍','万物皆由可见与不可见构成。',{wood:80,stone:100},{},{milestone:true}),
        RS('a_distill','蒸馏提纯','💨','从混沌中析出纯净。',{quicksilver:40,wood:80},{autoClick:1},{milestone:true,prereq:['a_analyze']}),
        RS('a_trio','三要素论','📜','硫、汞、盐——世界的三原色。',{brimstone:30,quicksilver:40},{mult:{quicksilver:1.5}},{prereq:['a_distill']}),
       ],
       advance:{wood:200, quicksilver:60}},
      {id:'a1', name:'调配时代', icon:'🧴',
       story:'坩埚里的液体开始发光，你按古老配方调出第一剂「点金液」。它现在还只会变出假金，但气泡上升的模样，已经像是真理在冒头。',
       resources:[R('solvent','溶剂','🧴',1.5), R('formula','配方纸','📜',1)],
       buildings:[
        B('a_mix','调配室','🧪','在安全的器皿中混合物质。',{quicksilver:150,wood:100},{solvent:1.2},'a_recipe'),
        B('a_crucible','坩埚','🔥','高温熔炼，见证蜕变。',{solvent:40,quicksilver:120},{formula:0.7},'a_crucible2'),
       ],
       jobs:[
        J('a_mixer','调配师','🧴','solvent',1.5,'按比例倾注，分毫不差。','a_recipe'),
        J('a_scribe','抄写员','✍️','formula',1.2,'把每一次实验写成配方。','a_crucible2'),
       ],
       researches:[
        RS('a_recipe','配方记录','📖','让成功的实验可以重演。',{quicksilver:200,solvent:60},{},{milestone:true}),
        RS('a_crucible2','高温熔炼','🔥','在火焰中重塑物质。',{solvent:80,quicksilver:200},{autoClick:1},{milestone:true,prereq:['a_recipe']}),
        RS('a_gold','点金术','✨','让贱金属披上金光。',{formula:40,solvent:60},{mult:{solvent:1.5}},{prereq:['a_crucible2']}),
       ],
       advance:{solvent:250, formula:120}},
      {id:'a2', name:'转化时代', icon:'⚛️',
       story:'你学会了「欺骗」物质——让铅披上金衣，让土燃起火焰。贤者之石的碎片在祭坛闪烁，转化的法则，第一次露出了真容。',
       resources:[R('phil_stone','贤者石碎片','💎',1), R('transform_fluid','转化液','🫗',1.5)],
       buildings:[
        B('a_converter','转化炉','⚙️','让物质跨越本性的边界。',{solvent:200,quicksilver:250},{transform_fluid:1.2},'a_transform'),
        B('a_separator','元素分离塔','🗼','把混合的元素逐一分出。',{transform_fluid:50,solvent:200},{phil_stone:0.7},'a_phil'),
       ],
       jobs:[
        J('a_trans','转化师','⚛️','transform_fluid',1.5,'让物质背叛它们的本性。','a_transform'),
        J('a_sep','分离师','🗼','phil_stone',1.2,'从万物中榨取精华。','a_phil'),
       ],
       researches:[
        RS('a_transform','物质转化','🔁','把一种物质变成另一种。',{solvent:250,transform_fluid:60},{},{milestone:true}),
        RS('a_phil','贤者石理论','💎','点石成金，起死回生。',{transform_fluid:100,solvent:250},{autoClick:1},{milestone:true,prereq:['a_transform']}),
        RS('a_element','元素分离','⚛️','看见构成万物的微粒。',{phil_stone:40,transform_fluid:60},{mult:{transform_fluid:1.5}},{prereq:['a_phil']}),
       ],
       advance:{transform_fluid:300, phil_stone:150}},
      {id:'a3', name:'人造生命', icon:'🧬',
       story:'器皿中，第一簇「生命之火」被你亲手点燃。人造的心脏在培养液里搏动，灵魂的基质在瓶底旋转——造物主的位置，第一次坐上了凡人的身影。',
       resources:[R('life_essence','生命精华','💛',1.5), R('soul_matter','灵魂基质','👁️',1)],
       buildings:[
        B('a_homunculus','人造培育室','🧫','让无机的物质长出生命。',{transform_fluid:250,phil_stone:150},{life_essence:1.1},'a_life'),
        B('a_souljar','灵魂容器','🫙','捕捉弥散的意识之光。',{life_essence:50,transform_fluid:250},{soul_matter:0.7},'a_soul'),
       ],
       jobs:[
        J('a_lifesmith','生命工匠','🧬','life_essence',1.4,'给泥人注入心跳。','a_life'),
        J('a_soulweaver','灵魂织者','👁️','soul_matter',1.1,'把意识编成丝线。','a_soul'),
       ],
       researches:[
        RS('a_life','生命合成','🧬','从无机到有机的飞跃。',{transform_fluid:300,life_essence:60},{},{milestone:true}),
        RS('a_soul','灵魂注入','👁️','让造物拥有意志。',{life_essence:100,transform_fluid:300},{autoClick:1},{milestone:true,prereq:['a_life']}),
        RS('a_spark','意识火花','✨','在无机的躯壳中擦出火花。',{soul_matter:40,life_essence:80},{mult:{life_essence:1.5}},{prereq:['a_soul']}),
       ],
       advance:{life_essence:300, soul_matter:180}},
      {id:'a4', name:'元素掌控', icon:'🌋',
       story:'元素王座之上，地火水风任你驱策。以太在井中翻涌，法则在指尖凝成晶体；炼金术士摘下学徒的帽子，成了元素的君主。',
       resources:[R('primal_ele','原初元素','🌋',1.5), R('aether','以太','🌌',1)],
       buildings:[
        B('a_throne','元素王座','🏰','统御四大元素。',{life_essence:250,soul_matter:150},{primal_ele:1.2},'a_primal'),
        B('a_ether','以太井','🕳️','汲取虚空中的以太。',{primal_ele:50,life_essence:250},{aether:0.7},'a_aether'),
       ],
       jobs:[
        J('a_arch','元素法师','🌋','primal_ele',1.5,'号令元素的精灵。','a_primal'),
        J('a_etherist','以太学者','🌌','aether',1.2,'倾听虚空的低语。','a_aether'),
       ],
       researches:[
        RS('a_primal','原初元素','🌋','看见创世之前的元素。',{life_essence:300,primal_ele:60},{},{milestone:true}),
        RS('a_aether','以太共鸣','🌌','让万物以太相连。',{primal_ele:100,soul_matter:200},{autoClick:1},{milestone:true,prereq:['a_primal']}),
        RS('a_law','法则结晶','📐','把法则凝固成晶。',{aether:40,primal_ele:80},{mult:{primal_ele:1.5}},{prereq:['a_aether']}),
       ],
       advance:{primal_ele:300, aether:180}},
      {id:'a5', name:'大宇宙', icon:'🔭',
       story:'宇宙熔炉开始轰鸣，奇点在容器里安静沉睡。你握住的已不是物质，而是宇宙常数本身——最后的炼金，炼的原来是整片真理。',
       resources:[R('universe_const','宇宙常数','🌌',1), R('truth_gold','真理金','🏆',1)],
       buildings:[
        B('a_furnace','宇宙熔炉','🔥','熔炼星辰的余烬。',{primal_ele:350,aether:200},{universe_const:1.1},'a_universe'),
        B('a_singularity','奇点容器','⚫','囚禁坍缩的奇点。',{universe_const:60,primal_ele:300},{truth_gold:0.7},'a_truth'),
       ],
       jobs:[
        J('a_cosmologist','宇宙术士','🔭','universe_const',1.3,'计算星河的坐标。','a_universe'),
        J('a_archon','真理侍者','🏆','truth_gold',1.1,'守护最后一克真理。','a_truth'),
       ],
       researches:[
        RS('a_universe','宇宙方程','🌌','宇宙不过是可解的方程。',{primal_ele:400,universe_const:60},{},{milestone:true}),
        RS('a_truth','真理点金','🏆','把真理炼成不朽的金。',{universe_const:100,aether:250},{autoClick:1},{milestone:true,prereq:['a_universe']}),
        RS('a_singularity2','奇点操控','⚫','握紧坍缩与膨胀。',{truth_gold:40,universe_const:80},{mult:{universe_const:1.5}},{prereq:['a_truth']}),
       ],
       advance:{universe_const:400, truth_gold:200}},
    ],
    ending:{title:'真理炼金术士', text:'当宇宙熔炉的火焰映亮你的瞳孔，你终于明白——所谓点石成金，不过是让物质承认它早已是的真相。你把最后一粒真理金放入掌心，微笑着说：宇宙，不过是我的坩埚。火种部落的传说，从此成为星辰之间的方程。'}
  }
};

/* ================= 分支专属手动行动（选定分支后解锁，带冷却与材料消耗） ================= */
const MANUAL_ACT={
  tech:    {name:'锤锻铁坯', icon:'🔨', cd:5, need:{wood:3},               yield:{iron:5,mechanism:1},       desc:'亲手锤炼矿石：木材×3 → 铁矿石×5 + 机关件×1'},
  xianxia: {name:'吐纳采气', icon:'🧘', cd:5, need:{},                     yield:{ling_qi:4,ling_shi:2},     desc:'静坐吐纳：凝聚灵气×4 + 灵石×2'},
  magic:   {name:'搓火球术', icon:'🔥', cd:5, need:{wood:2},               yield:{mana:5,wand_wood:1},       desc:'第一次真正的施法：木材×2 → 魔力×5 + 法杖木×1'},
  bio:     {name:'镜检切片', icon:'🔬', cd:5, need:{},                     yield:{cell:5,medium:2},          desc:'亲手制片观察：细胞样本×5 + 培养基×2'},
  ocean:   {name:'赶海拾贝', icon:'🦀', cd:5, need:{},                     yield:{fish:6,shell:4},           desc:'退潮后的滩涂收获颇丰：鱼获×6 + 贝壳×4'},
  plant:   {name:'手工嫁接', icon:'✂️', cd:5, need:{water:2},              yield:{seed:4,fruit:5},           desc:'嫁接良种：清水×2 → 种子×4 + 果实×5'},
  alchemy: {name:'蒸馏水银', icon:'⚗️', cd:5, need:{},                     yield:{quicksilver:4,brimstone:3},desc:'以文火蒸馏：水银×4 + 硫磺×3'},
};
function doManualAct(){
  const ma=S.branch && MANUAL_ACT[S.branch]; if(!ma) return;
  if((S.mcd||0)>0 || !canAfford(ma.need)) return;
  if(ma.need) pay(ma.need);
  const crit=Math.random()<0.15;
  Object.entries(ma.yield).forEach(([k,v])=>{ S.res[k]=(S.res[k]||0)+v*(crit?2:1); });
  S.mcd=ma.cd;
  if(crit) toast('🔥 灵光一现！「'+ma.name+'」产出翻倍');
  render();
}

/* ================= 文明纪事（随机叙事事件） ================= */
const LORE_EVENTS = {
  generic:[
    {t:'篝火夜话', icon:'🔥', d:'夜深了，族人围在火堆旁，用最古老的方式传递着今天的故事——关于采集、关于建造、关于那颗坠落的星。'},
    {t:'远方来客', icon:'🏕️', d:'一支商队循着炊烟走来，带来陌生部落的见闻。他们说，天边的光，不止落在了你们身上。'},
    {t:'风中之讯', icon:'🌬️', d:'风掠过营地，捎来远方山海的气息。长老闭上眼，说听见了文明生长的声响。'},
    {t:'孩童嬉戏', icon:'🧒', d:'孩子们在篝火边追逐打闹，用泥巴捏出他们想象中的神与巨兽。未来的火种，正在这些小手心里发芽。'},
    {t:'星空低语', icon:'✨', d:'无云的夜里，星河垂得很低。守夜人仰头看了很久，说那些光点，像极了祖先未说完的话。'},
  ],
  tech:[
    {t:'炉火纪事', icon:'🔨', d:'锻炉彻夜不熄，铁匠的锤声成了部落的节拍。有人数着锤音入睡，说那是文明最踏实的声音。'},
    {t:'齿轮低语', icon:'⚙️', d:'第一台自动机械开始运转，齿轮咬合的咔哒声里，工匠们看见了「不用双手也能劳作」的未来。'},
    {t:'线缆之夜', icon:'⚡', d:'当电流第一次照亮夜空，孩子们惊呼着追逐那道蓝色的光。从此，部落的夜，不再属于黑暗。'},
    {t:'代码初现', icon:'💾', d:'工程师在硅片上刻下第一组指令，芯片微微发热，像是在回应。没有人说话，但所有人都知道，时代变了。'},
  ],
  xianxia:[
    {t:'灵脉异动', icon:'☯️', d:'后山的灵脉今夜格外活跃，溪水泛起淡蓝光晕。打坐的修士睁开眼，说听见了大地缓慢的呼吸。'},
    {t:'剑鸣山谷', icon:'🗡️', d:'有弟子练剑入神，飞剑竟自行出鞘，在月下划出一道弧光。长老捻须：此子，与剑有缘。'},
    {t:'丹香满室', icon:'🫕', d:'炼丹炉飘出异香，引得满山鸟兽驻足。丹童揭开炉盖的瞬间，一缕金光悄悄钻进了他的眉心。'},
    {t:'雷劫观礼', icon:'⚡', d:'天边紫雷翻滚，修士们远远观望不敢靠近。唯有渡劫者立于峰顶，张开双臂，迎接属于自己的天谴与机缘。'},
  ],
  magic:[
    {t:'魔力潮汐', icon:'💜', d:'地脉的魔力今夜涨潮，井水泛起紫色微光。学徒们争相把手浸入，说指尖传来母亲般的温度。'},
    {t:'符文闪烁', icon:'📜', d:'墙上的符文矩阵无风自动，幽蓝的光纹缓缓流转。图书管理员记录下这一刻：魔法，开始有了自己的语法。'},
    {t:'龙晶共鸣', icon:'🐲', d:'塔顶的龙晶忽然震颤，发出只有法师能听见的低鸣。大法师放下书卷，望向远方未知的天空。'},
    {t:'星辉降临', icon:'⭐', d:'流星雨划过法师塔顶，星辉石饱满得几乎要溢出来。传奇法师拾起一粒，轻声说：这是神座在召唤。'},
  ],
  bio:[
    {t:'培养皿奇观', icon:'🧫', d:'实验员深夜巡查，发现某株细胞竟在无人干预下长出了纤毛，像在朝她招手。生命的倔强，总在计划之外。'},
    {t:'基因图谱', icon:'🧬', d:'测序仪吐出长长的图谱，基因工程师盯着其中一段反复确认——那是祖先从未有过的序列，属于「新」。'},
    {t:'器官苏醒', icon:'🫀', d:'培养舱里，刚打印的心脏突然自主跳动了一下。整个实验室屏住呼吸，仿佛见证了一个灵魂的诞生。'},
    {t:'意识涟漪', icon:'🧠', d:'脑机接口捕捉到一阵规律的信号，像遥远的思绪。神经科学家写下批注：也许，思想真的可以被阅读。'},
  ],
  ocean:[
    {t:'潮信传来', icon:'🐚', d:'退潮时，滩涂上出现一串不属于任何族人的脚印，通向海中。守夜人说是海族在试探这片陆地。'},
    {t:'帆影点点', icon:'⛵', d:'远海出现陌生的船帆，水手们举起望远镜久久注视。那是另一支走向海洋的文明，正与你们隔海相望。'},
    {t:'深渊回响', icon:'🕳️', d:'潜水钟下潜时录到一阵低频轰鸣，工程师说那像某种巨兽的心跳。深渊，比想象中更「活着」。'},
    {t:'海晶生辉', icon:'💠', d:'海底城的灯忽然全部转成柔和的蓝绿，海晶在墙体内脉动如血管。居民们笑了：我们的城，会呼吸了。'},
  ],
  plant:[
    {t:'灵木轻摇', icon:'🌳', d:'森林里的灵木无风自动，枝叶沙沙作响，像在低声交谈。林务员说，它们记得每一双照料过它们的手。'},
    {t:'菌丝传讯', icon:'🍄', d:'地下的菌丝网络今夜格外活跃，一株枯树旁竟冒出新芽。菌农蹲下细看：森林，在用我们听不懂的语言聊天。'},
    {t:'巨树开花', icon:'🌸', d:'世界树祭坛旁的古树第一次开花，花粉随风洒满营地。孩子们追着光点奔跑，说那是树在撒星星。'},
    {t:'年轮低语', icon:'🌲', d:'年轮研究者数着巨树的圈纹，发现每一圈都对应部落一件大事。原来树，一直替我们记着历史。'},
  ],
  alchemy:[
    {t:'坩埚低吟', icon:'⚗️', d:'炼金台上的坩埚今夜发出细碎的吟唱，水银在杯壁上游走如活物。学徒记下：物质，似乎有自己的脾气。'},
    {t:'点金之诈', icon:'✨', d:'点金术造出的「黄金」在灯下闪烁，却会在黎明褪色。炼金士苦笑：真理从不喜欢被伪装。'},
    {t:'贤者石光', icon:'💎', d:'贤者石碎片在祭坛上忽明忽暗，像在呼吸。老药师说，它等的不是点石成金，而是一个值得托付的人。'},
    {t:'以太涌动', icon:'🌌', d:'以太井深处泛起银色涟漪，法则在虚空中凝成转瞬即逝的晶体。元素法师伸手去接，只握住一缕凉意。'},
  ],
};
let _loreCd = 0;   // 文明纪事冷却（秒）
/* ================= 状态 ================= */
function freshState(){
  return {
    branch:null, era:-1,           // era: -1=原始阶段, 0..5=分支时代
    res:{}, bld:{}, resDone:{}, jobs:{},
    pop:0, autoClick:0, focus:'wood', starve:0,
    buffs:[],                    // 生效中的特殊事件效果（限时）
    totalClick:0, clicks:0,
    tut:0, tutDone:false, dShown:-1, dialogClosed:false,
    choiceShown:false, story:[], ending:false,
    bonus:{prod:0,grow:0}, mcd:0, collapsed:{},
    shop:{click:0,factory:0,mat:{}},   // 文明商店：click/factory=升级等级，mat=各材料已兑换次数
    lastSave:Date.now(), started:Date.now(),
    lastTick:Date.now(),
  };
}
let S = freshState();
let LEGACY = {count:0, wins:[]};   // 火种传承：跨周目保留（每次终局 +1）

/* ================= 派生数据 ================= */
function branchOf(){ return S.branch? BRANCHES[S.branch] : null; }
function primResMap(){ const m={}; PRIMITIVE.resources.forEach(r=>m[r.id]=r); return m; }
function branchResMap(b){ const m={}; (b.eras||[]).forEach((e,ei)=>(e.resources||[]).forEach(r=>m[r.id]={...r,eraIdx:ei})); return m; }
function defs(){
  const b=branchOf();
  const res=b? Object.assign(primResMap(), branchResMap(b)) : primResMap();
  Object.keys(res).forEach(k=>{ if(res[k].eraIdx==null) res[k].eraIdx=-1; });
  const primB=PRIMITIVE.buildings.map(x=>({...x,eraIdx:-1}));
  const primJ=PRIMITIVE.jobs.map(x=>({...x,eraIdx:-1}));
  const primR=PRIMITIVE.researches.map(x=>({...x,eraIdx:-1}));
  let bld, job, rs;
  if(b){
    bld=[...primB]; job=[...primJ]; rs=[...primR];
    b.eras.forEach((e,ei)=>{
      (e.buildings||[]).forEach(x=>bld.push({...x,eraIdx:ei}));
      (e.jobs||[]).forEach(x=>job.push({...x,eraIdx:ei}));
      (e.researches||[]).forEach(x=>rs.push({...x,eraIdx:ei}));
    });
  } else {
    bld=primB; job=primJ; rs=primR;
  }
  return {res, bld, job, rs};
}
/* ================= 死锁修复（依赖环自动打破） =================
   问题：每个时代(era>=1)的材料，其生产建筑/职业被该时代的里程碑研究锁定，
   而该里程碑的研究消耗又包含这个材料本身 → 无法产出也就无法研究 → 死锁。
   修复（加载时执行一次）：把「生产材料 M 的建筑/职业」所依赖的研究 R，从 R 的消耗里
   删掉 M 自身。这样进入时代即可用上一时代已持有的材料研究 R、解锁 M 的生产，
   后续研究再消耗 M，形成正常的链式解锁，依赖环被打破。 */
function fixDependencyDeadlocks(){
  Object.keys(BRANCHES).forEach(br=>{
    const b=BRANCHES[br];
    (b.eras||[]).forEach((e,ei)=>{
      if(ei<1) return;
      (e.resources||[]).forEach(r=>{
        const mat=r.id;
        const prods=[...(e.buildings||[]),...(e.jobs||[])].filter(p=>(p.prod&&p.prod[mat])||p.res===mat);
        prods.forEach(p=>{
          const gate=p.unlockResearch; if(!gate) return;
          const R=(e.researches||[]).find(x=>x.id===gate);
          if(R && R.cost && R.cost[mat]>0) delete R.cost[mat];   // 打破自引用
        });
      });
    });
  });
}
fixDependencyDeadlocks();
function eraName(){
  if(!S.branch) return '原始时代';
  const b=branchOf(); if(!b) return '';
  return b.eras[S.era]? b.eras[S.era].name : b.name;
}
function eraIcon(){
  if(!S.branch) return '🔥';
  const b=branchOf(); if(!b) return '';
  return b.eras[S.era]? b.eras[S.era].icon : b.icon;
}
function multFactor(resId){
  let m=1;
  const d=defs();
  d.rs.forEach(rs=>{ if(S.resDone[rs.id] && rs.effect && rs.effect.mult && rs.effect.mult[resId]!=null) m*=rs.effect.mult[resId]; });
  m*=(1+(S.bonus?S.bonus.prod:0));
  m*=buffMult('prod');   // 特殊事件：限时产出加成
  return m;
}
/* ================= 精炼厂 / 文明基石 =================
   精炼厂把木材、石材、食物实时精炼成「文明基石」(🧱)，
   文明基石用于在文明商店兑换后续材料与各类加成。 */
function convLevel(){ return S.bld['refinery']||0; }
function convInfo(){
  const L=convLevel(); if(L<=0) return {ok:false, out:0, in:{wood:0,stone:0,food:0}};
  const conv=PRIMITIVE.buildings.find(b=>b.id==='refinery').conv;
  const IN=conv.in, OUT=conv.out.cornerstone;
  let f=1; Object.keys(IN).forEach(k=>{ const need=IN[k]*L; if(need>0) f=Math.min(f,(S.res[k]||0)/need); });
  f=Math.max(0,Math.min(1,f));
  const out=OUT*L*f, inn={}; Object.keys(IN).forEach(k=>inn[k]=IN[k]*L*f);
  return {ok:f>0, out, in:inn, frac:f};
}
function applyConverter(dt){
  const L=convLevel(); if(L<=0) return;
  const conv=PRIMITIVE.buildings.find(b=>b.id==='refinery').conv;
  const IN=conv.in, OUT=conv.out.cornerstone;
  let sustain=Infinity;
  Object.keys(IN).forEach(k=>{ const need=IN[k]*L; if(need>0){ const s=S.res[k]||0; if(s<=0) sustain=0; else sustain=Math.min(sustain, s/need); } });
  const eDt=Math.max(0,Math.min(dt, sustain));
  if(eDt>0){
    S.res['cornerstone']=(S.res['cornerstone']||0)+OUT*L*eDt;
    Object.keys(IN).forEach(k=>{ S.res[k]=(S.res[k]||0)-IN[k]*L*eDt; });
  }
}

/* ================= 文明商店（用文明基石兑换） =================
   文明基石(🧱)由精炼厂产出。商店分三类：
   - 材料兑换：用基石兑换本分支的后续材料（含未来时代），动态生成、可重复、有上限；
   - 采集精通：永久提升手动点击采集收益（leveled）；
   - 工业催化：永久提升所有建筑产出（leveled）。 */
const SHOP={
  matBase:3,    // 第 0 时代材料的首次兑换消耗；实际单价 = matBase ×(材料时代+1) ×(已兑次数+1)
  matGive:50,   // 每次兑换给付的材料数量
  matMax:30,    // 每种材料最多兑换次数
  upgrades:[
    {id:'click',  icon:'👆', name:'采集精通', per:0.15, base:10, max:12, desc:'手动点击采集收益 +15%/级'},
    {id:'factory',icon:'🏭', name:'工业催化', per:0.15, base:14, max:12, desc:'所有建筑产出 +15%/级'},
  ],
};
function shopState(){ if(!S.shop) S.shop={click:0,factory:0,mat:{}}; if(!S.shop.mat) S.shop.mat={}; return S.shop; }
function clickMult(){ const s=shopState(); const up=SHOP.upgrades.find(u=>u.id==='click'); return (1 + up.per*(s.click||0)) * buffMult('click'); }
function factoryMult(){ const s=shopState(); const up=SHOP.upgrades.find(u=>u.id==='factory'); return (1 + up.per*(s.factory||0)) * buffMult('factory'); }
function shopMatList(){
  const d=defs(); const skip=new Set(['wood','stone','food','cornerstone']);
  return Object.keys(d.res).filter(id=>!skip.has(id)).map(id=>({id, def:d.res[id], lvl:(shopState().mat[id]||0)}));
}
function shopCost(kind,id){
  if(kind==='mat'){
    const lvl=(shopState().mat[id]||0);
    const def=defs().res[id];
    const eraF=(def && def.eraIdx!=null && def.eraIdx>=0) ? (def.eraIdx+1) : 1;  // 越后期材料越贵
    return Math.round(SHOP.matBase*eraF*(lvl+1));
  }
  const up=SHOP.upgrades.find(u=>u.id===id); const lvl=(shopState()[id]||0); return up.base*(lvl+1);
}
function shopMaxed(kind,id){
  if(kind==='mat'){ return (shopState().mat[id]||0)>=SHOP.matMax; }
  const up=SHOP.upgrades.find(u=>u.id===id); return (shopState()[id]||0)>=up.max;
}
function buyShop(kind,id){
  const s=shopState(); const cs=S.res['cornerstone']||0;
  if(shopMaxed(kind,id)){ toast('已达兑换上限'); return; }
  const cost=shopCost(kind,id);
  if(cs<cost){ toast('🧱 文明基石不足（需 '+cost+'）'); return; }
  S.res['cornerstone']=cs-cost;
  if(kind==='mat'){
    S.res[id]=(S.res[id]||0)+SHOP.matGive;
    s.mat[id]=(s.mat[id]||0)+1;
    const def=defs().res[id];
    toast('🛒 兑换 '+(def?def.icon+' '+def.name:id)+' ×'+SHOP.matGive);
  } else {
    s[id]=(s[id]||0)+1; const up=SHOP.upgrades.find(u=>u.id===id);
    toast('🛒 '+up.icon+' '+up.name+' Lv.'+s[id]+'（'+up.desc+'）');
  }
  render();
}

/* ================= 经济节奏修正 =================
   思路：让"建造"成为唯一可靠的产出引擎，手动点击退居早期 bootstrap。
   - RAW_CLICK：只有基础资源可手动点击；进阶/分支资源点击归零，必须建建筑才产出 → 结构性激发建造动机。
   - BUILD_MULT：建筑与职业的每秒产出整体 ×2 → 被动收入明显碾压手动点击。 */
const RAW_CLICK=new Set(['wood','stone','food']);
const BUILD_MULT=2;
function rates(){
  const d=defs(); const r={};
  Object.keys(d.res).forEach(k=>r[k]=0);
  const fMult=factoryMult();
  d.bld.forEach(b=>{ const l=S.bld[b.id]||0; if(l<=0) return; Object.entries(b.prod||{}).forEach(([k,v])=>r[k]=(r[k]||0)+v*l*BUILD_MULT*fMult); });
  d.job.forEach(j=>{ const n=S.jobs[j.id]||0; if(n<=0) return; r[j.res]=(r[j.res]||0)+j.amount*n*BUILD_MULT; });
  Object.keys(r).forEach(k=>r[k]*=multFactor(k));
  if(S.autoClick>0 && d.res[S.focus] && RAW_CLICK.has(S.focus)) r[S.focus]=(r[S.focus]||0)+S.autoClick*d.res[S.focus].click;
  return r;
}
function popCap(){ let c=2; const d=defs(); d.bld.forEach(b=>{ const l=S.bld[b.id]||0; if(l>0) c+=(b.pop||0)*l; }); return c; }
function visEra(it){ if(!S.branch) return it.eraIdx==null||it.eraIdx<0; return it.eraIdx<=S.era; }
function unlockedBy(it){ return !it.unlockResearch || !!S.resDone[it.unlockResearch]; }

function eraMilestones(){ if(!S.branch) return defs().rs.filter(r=>r.id==='language'||r.id==='omen'); const d=defs(); return d.rs.filter(r=>r.eraIdx===S.era && r.milestone); }
function eraReady(){ const m=eraMilestones(); return m.length>0 && m.every(r=>S.resDone[r.id]); }
function advanceCost(){ if(!S.branch) return PRIMITIVE.advance||{}; const b=branchOf(); const e=b.eras[S.era]; const raw=(e&&e.advance)||{}; const out={}; const mul=0.5+0.45*S.era; Object.entries(raw).forEach(([k,v])=>out[k]=Math.ceil(v*mul)); return out; }
function isLastEra(){ return S.branch && S.era===(branchOf().eras.length-1); }

/* ================= 晋升基础设施门槛（适中档） =================
   目标：手动采集只能早期起步，中后期资源必须靠建筑+职业的被动产出；
   且晋升时代须真正"经营"——人口(实际人数)绝对门槛、人口上限、建筑种类覆盖、建筑总等级四者同时达标。
   人口门槛用绝对人数(INFRA_POP)而非占上限比例，避免低住房玩家也容易混过；关卡数值随时代递增，正常游玩自然达成、略带规划压力。 */
const INFRA_POPCAP=[5,11,20,33,50,70];   // 人口上限硬性门槛（逼建草屋/火堆等住房与食物产能；人口成长本身有速率上限，越往后越逼你经营）
const INFRA_POP   =[4,9,17,28,43,60];   // 人口(实际人数)硬性门槛：基于绝对人数，而非占上限比例；须 ≤ 对应 INFRA_POPCAP 否则人口长不到
const INFRA_LVL   =[12,28,55,90,140,200]; // 建筑总等级门槛（逼你持续建造并升级，而非一两座就过）
const INFRA_TYPE_RATIO=0.7;             // 须建成【可用建筑种类】的最低比例（逼出建筑广度）
const FOOD_PER_POP=0.03;    // 每人每秒消耗食物（人口越多，食物压力越大）
const STARVE_LIMIT=15;      // 食物耗尽持续多少秒后开始减员（每满一次 -1 人口）
function infraReady(){
  const d=defs(); const e=S.era;
  const cap=popCap();
  const needCap=INFRA_POPCAP[e]!=null?INFRA_POPCAP[e]:4;
  if(cap < needCap) return {ok:false, msg:'人口上限需 ≥ '+needCap+'（当前 '+Math.floor(cap)+'，多建草屋/火堆）'};
  const needPop=INFRA_POP[e]!=null?INFRA_POP[e]:0;
  if(S.pop < needPop) return {ok:false, msg:'人口需达 ≥ '+needPop+'（当前 '+Math.floor(S.pop)+'，保证食物产出以繁衍）'};
  const avail=d.bld.filter(b=>visEra(b)&&unlockedBy(b));
  const built=avail.filter(b=>(S.bld[b.id]||0)>=1);
  const needTypes=Math.max(1, Math.ceil(avail.length*INFRA_TYPE_RATIO));
  if(built.length<needTypes) return {ok:false, msg:'需建成至少 '+needTypes+' 种建筑（当前 '+built.length+'/'+avail.length+'）'};
  const total=avail.reduce((a,b)=>a+(S.bld[b.id]||0),0);
  const needLvl=INFRA_LVL[e]!=null?INFRA_LVL[e]:0;
  if(total<needLvl) return {ok:false, msg:'建筑总等级需 ≥ '+needLvl+'（当前 '+total+'）'};
  return {ok:true, msg:''};
}

/* ================= 动作 ================= */
function clickRes(id){
  const d=defs(); const def=d.res[id]; if(!def) return;
  if(!(def.click>0) || !RAW_CLICK.has(id)) return; // 仅基础资源(wood/stone/food)可手动点击，其余须建建筑产出
  // 手动采集为基础产出，不随研究倍率/时代成长：避免"越点越强"的雪球碾压建筑与人口
  let amt=def.click*clickMult();   // 文明商店·采集精通 提供永久点击加成
  let crit=false;
  if(Math.random()<0.10){ amt*=3; crit=true; }
  S.res[id]=(S.res[id]||0)+amt;
  S.totalClick++; S.clicks++; S.focus=id;
  floatFx(id, amt, crit?'暴击!':null);
  render();
}
function floatFx(id, amt, label){
  const btn=document.querySelector('.reschip[data-rid="'+id+'"]')||document.querySelector('.gbtn[data-res="'+id+'"]');
  if(!btn) return;
  const r=btn.getBoundingClientRect(); const fx=$('#fx');
  const el=document.createElement('div'); el.className='fxnum';
  el.textContent=(label? label+' ':'')+'+'+FMT(amt);
  if(label){ el.style.color='#fbbf24'; el.style.fontSize='15px'; }
  el.style.left=(r.left+r.width/2-20+Math.random()*20-10)+'px';
  el.style.top=(r.top-6)+'px';
  fx.appendChild(el); setTimeout(()=>el.remove(),1000);
}
function scale(){ return 1.18; }
function batchCost(cost, level, n){ const out={}; for(let i=0;i<n;i++){ const m=Math.pow(scale(), level+i); Object.entries(cost).forEach(([k,v])=>out[k]=(out[k]||0)+v*m); } return out; }
function buyBuilding(id, n){
  const d=defs(); const b=d.bld.find(x=>x.id===id); if(!b) return;
  if(!unlockedBy(b)) return;
  const lvl=S.bld[id]||0; let bought=0;
  for(let i=0;i<n;i++){ const c=batchCost(b.cost, lvl+bought, 1); if(canAfford(c)){ pay(c); bought++; } else break; }
  if(bought>0){ S.bld[id]=lvl+bought; render(); }
}
function canResearch(rs){
  if(S.resDone[rs.id]) return false;
  if(rs.prereq && rs.prereq.some(p=>!S.resDone[p])) return false;
  if(!visEra(rs)) return false;
  return canAfford(rs.cost);
}
function doResearch(id){
  const d=defs(); const rs=d.rs.find(x=>x.id===id); if(!rs) return;
  if(!canResearch(rs)) return;
  pay(rs.cost); S.resDone[id]=true;
  const ef=rs.effect||{};
  if(ef.autoClick) S.autoClick+=ef.autoClick;
  if(ef.unlockJobs){ S.resDone['language']=true; }
  storyPush('研究','「'+rs.name+'」', rs.desc, rs.icon);
  if(S.branch===null && id==='omen' && !S.choiceShown){ S.choiceShown=true; showChoice(); }
  render();
}
function assignJob(id, delta){
  const d=defs(); const j=d.job.find(x=>x.id===id); if(!j) return;
  let cur=S.jobs[id]||0, next=cur+delta;
  const assigned=Object.values(S.jobs).reduce((a,b)=>a+b,0);
  if(next<0) next=0;
  if(next>cur){ const free=Math.floor(S.pop)-assigned; if(next-cur>free) next=cur+free; }
  S.jobs[id]=next;
  render();
}
/* 减员后把超额分配的职业收回，使已分配人数不超过现有人口 */
function unassignExcess(){
  let assigned=Object.values(S.jobs).reduce((a,b)=>a+b,0);
  const cap=Math.floor(S.pop);
  if(assigned<=cap) return;
  let over=assigned-cap;
  for(const k of Object.keys(S.jobs)){
    if(over<=0) break;
    const cut=Math.min(S.jobs[k], over);
    S.jobs[k]-=cut; over-=cut;
  }
}
function advanceEra(){
  if(!S.branch || !eraReady()) return;
  const inf=infraReady();
  if(!inf.ok){ toast('尚不能晋升：'+inf.msg); return; }
  const c=advanceCost();
  if(!canAfford(c)) return;
  pay(c);
  if(isLastEra()){
    // 终局：记录火种传承
    const b=branchOf(); S.ending=true;
    try{
      const lg=JSON.parse(localStorage.getItem('fireseed_legacy')||'{}');
      lg.count=(lg.count||0)+1; lg.wins=lg.wins||[];
      if(!lg.wins.includes(S.branch)) lg.wins.push(S.branch);
      localStorage.setItem('fireseed_legacy',JSON.stringify(lg));
    }catch(e){}
    storyPush('终局','「'+b.ending.title+'」', b.ending.text, b.icon);
    showDialog({title:'🌅 '+b.ending.title, lines:[{sp:'命运的见证者',icon:b.icon,text:b.ending.text}]});
  } else {
    S.era++;
    const b=branchOf(); const e=b.eras[S.era];
    storyPush('时代','「'+e.name+'」', e.story, e.icon);
    showDialog({title:e.icon+' '+e.name, lines:[{sp:'纪元之声',icon:e.icon,text:e.story}], onClose:showEraChoice});
  }
  render();
}
/* 时代抉择：晋升后二选一，长期生效可叠加 */
function showEraChoice(){
  const box=$('#dialog'); box.classList.remove('hidden');
  box.innerHTML='<div class="dbox"><div class="dtitle">⭐ 时代抉择 · 文明走向</div>'+
    '<div class="dtext" style="min-height:0">新时代开启之际，长老们提出了两条道路——选定后长期生效，且每次晋升可叠加：</div>'+
    '<div class="dbtn" style="justify-content:center">'+
    '<button class="dchoice" data-b="prod"><b>⚙️ 产线精进</b><br><span style="color:var(--dim);font-size:12px">全部资源产出 +15%</span></button>'+
    '<button class="dchoice" data-b="grow"><b>👥 人口兴旺</b><br><span style="color:var(--dim);font-size:12px">人口增长速度 +50%</span></button></div></div>';
  box.querySelectorAll('.dchoice').forEach(btn=>{
    btn.onclick=()=>{
      const b=btn.dataset.b;
      if(b==='prod') S.bonus.prod+=0.15; else S.bonus.grow+=0.5;
      storyPush('抉择','文明抉择 · '+(b==='prod'?'产线精进':'人口兴旺'),
        b==='prod'?'全部资源产出 +15%（当前累计 +'+Math.round(S.bonus.prod*100)+'%）'
                  :'人口增长速度 +50%（当前累计 +'+Math.round(S.bonus.grow*100)+'%）','⭐');
      hideDialog(); render();
    };
  });
}
function chooseBranch(bid){
  if(S.branch) return;
  S.branch=bid; S.era=0; S.tutDone=true; S.choiceShown=true;
  const b=BRANCHES[bid];
  S.story.push({kind:'branch', t:'命运抉择', d:'火种部落追随了「'+b.name+'」的光晕，此路再无回头。', icon:b.icon});
  storyPush('时代','「'+b.eras[0].name+'」', b.eras[0].story, b.eras[0].icon);
  hideDialog();
  showDialog({title:b.icon+' '+b.eras[0].name, lines:[{sp:'纪元之声',icon:b.eras[0].icon,text:b.eras[0].story}]});
  render();
}
function storyPush(kind, title, text, icon){
  S.story.push({kind, t:title, d:text, icon:icon||'📖'});
  if(S.story.length>200) S.story.shift();
}
/* 文明纪事：每隔一段时间随机推送贴合当前分支的短篇叙事，写入史册 */
function maybeLoreEvent(dt){
  _loreCd -= dt;
  if(_loreCd>0) return;
  _loreCd = 50 + Math.random()*40;   // 下次 50~90 秒后
  if(!S.branch) return;
  const pool = (LORE_EVENTS[S.branch]||[]).concat(LORE_EVENTS.generic||[]);
  if(!pool.length) return;
  const e = pool[Math.floor(Math.random()*pool.length)];
  storyPush('纪事', e.t, e.d, e.icon);
  toast('📜 '+e.t+'：'+e.d.slice(0,26)+'…');
}

/* ================= 特殊事件 =================
   与「文明纪事」(纯叙事)不同，特殊事件带真实玩法影响：
   - 限时 buff：prod/click/factory/grow 倍率，持续一段时间后在 UI 条上倒数；
   - 瞬时事件：直接增减资源 / 人口（受库存下限 0 与人口上限保护）。
   触发走独立冷却(3~6 分钟)，按权重抽取，增益多于灾祸，保持乐趣。
   事件 apply 直接运行在本脚本作用域，可访问 S / rates / defs / addBuff 等。 */

/* 当前基础产能规模，用于让瞬时增减的量随时长进度保持有意义 */
function eventScale(){ const rt=rates(); const s=(rt.wood||0)+(rt.stone||0)+(rt.food||0); return Math.max(200, s*60); }

const SPECIAL_EVENTS = [
  // —— 增益 ——
  {id:'goldenHarvest', type:'good', icon:'🌟', t:'黄金丰收', w:3,
    d:'土地异常肥沃，万物生长加速。接下来一段时间，所有资源产出翻倍。',
    apply(){ addBuff('goldenHarvest','🌟 丰收 ×2','prod',2, 45); }},
  {id:'swiftHands', type:'good', icon:'✋', t:'巧手如风', w:2,
    d:'族人今日精神抖擞，手动点击采集效率大增。',
    apply(){ addBuff('swiftHands','✋ 采集 ×2','click',2, 40); }},
  {id:'forgeSurge', type:'good', icon:'🔥', t:'炉火熊熊', w:2,
    d:'锻炉超常运转，建筑产出短时翻倍。',
    apply(){ addBuff('forgeSurge','🔥 工业 ×2','factory',2, 45); }},
  {id:'babyBoom', type:'good', icon:'👶', t:'人丁兴旺', w:2,
    d:'新生儿接连降生，营地充满欢笑，人口增长加速。',
    apply(){ addBuff('babyBoom','👶 人口 ×3 增长','grow',3, 60); const cap=popCap(); if(S.pop<cap) S.pop=Math.min(cap, S.pop+1); }},
  {id:'wandererCache', type:'good', icon:'🎁', t:'旅人遗珍', w:2,
    d:'一支路过的旅队留下补给后匆匆离去，营地凭空多了些物资。',
    apply(){ const a=eventScale(); S.res.wood=(S.res.wood||0)+a; S.res.stone=Math.max(0,(S.res.stone||0)+a*0.7); S.res.food=Math.max(0,(S.res.food||0)+a*0.5); }},
  {id:'starfallBoon', type:'good', icon:'🌠', t:'星陨之赐', w:2,
    d:'又一颗星辰坠落，碎作文明的微光。',
    apply(){ const a=Math.max(5, eventScale()*0.05); S.res.cornerstone=(S.res.cornerstone||0)+a; }},

  // —— 灾祸 ——
  {id:'harshWinter', type:'bad', icon:'❄️', t:'凛冬来袭', w:2,
    d:'寒潮席卷山谷，作物冻伤，产出锐减。',
    apply(){ addBuff('harshWinter','❄️ 产出 ×0.5','prod',0.5, 50); }},
  {id:'plague', type:'bad', icon:'🤒', t:'疫病蔓延', w:1,
    d:'一场疫病在营地蔓延，族人病倒，人口减损。',
    apply(){ addBuff('plague','🤒 人口 ×0.5 增长','grow',0.5, 45); S.pop=Math.max(0,Math.floor(S.pop)-1); unassignExcess(); }},
  {id:'raiders', type:'bad', icon:'🔥', t:'外敌劫掠', w:1,
    d:'邻近部落趁夜劫掠，囤积的木材与石材不翼而飞。',
    apply(){ const a=eventScale()*0.6; S.res.wood=Math.max(0,(S.res.wood||0)-a); S.res.stone=Math.max(0,(S.res.stone||0)-a); }},
  {id:'drought', type:'bad', icon:'🏜️', t:'旱灾', w:1,
    d:'河流干涸，存粮迅速见底。',
    apply(){ const a=Math.max(50, eventScale()*0.4); S.res.food=Math.max(0,(S.res.food||0)-a); }},
  {id:'toolBreak', type:'bad', icon:'🔧', t:'器具损耗', w:1,
    d:'连日劳作让器具接连损坏，建筑产出随之下滑。',
    apply(){ addBuff('toolBreak','🔧 工业 ×0.5','factory',0.5, 40); }},
];

/* 限时效果：kind∈prod|click|factory|grow，mult 为倍率，until 为到期时间戳 */
function buffMult(kind){ if(!S.buffs||!S.buffs.length) return 1; let m=1; for(const b of S.buffs){ if(b.kind===kind) m*=b.mult; } return m; }
function addBuff(id, label, kind, mult, dur, type){
  if(!S.buffs) S.buffs=[];
  const until=Date.now()+dur*1000;
  const ex=S.buffs.find(b=>b.id===id);
  if(ex){ ex.until=until; ex.mult=mult; ex.label=label; ex.kind=kind; ex.type=type; }
  else S.buffs.push({id,label,kind,mult,until,type});
}
function tickBuffs(){   // 到期清理并提示
  if(!S.buffs||!S.buffs.length) return;
  const now=Date.now(), keep=[], expired=[];
  S.buffs.forEach(b=>{ (b.until>now?keep:expired).push(b); });
  if(expired.length){ S.buffs=keep; expired.forEach(b=>toast('⏳ '+(b.label||'效果')+' 结束')); }
}

let _specCd = 0;   // 特殊事件冷却（秒）
function maybeSpecialEvent(dt){
  _specCd -= dt;
  if(_specCd>0) return;
  _specCd = 200 + Math.random()*160;   // 下次 3.3~6 分钟后
  if(!S.branch) return;
  const pool=SPECIAL_EVENTS;
  const tot=pool.reduce((a,e)=>a+(e.w||1),0);
  let r=Math.random()*tot, pick=pool[pool.length-1];
  for(const e of pool){ r-=(e.w||1); if(r<=0){ pick=e; break; } }
  pick.apply();
  storyPush('事件', pick.t, pick.d, pick.icon);
  toast((pick.type==='good'?'✨ ':'⚠️ ')+pick.t+'：'+pick.d.slice(0,24)+'…');
}

/* ================= 对话框 ================= */
let _dlgLines=[], _dlgIdx=0, _dlgChoice=false;
function showDialog(o){
  const box=$('#dialog'); box.classList.remove('hidden');
  _dlgChoice = !!o.choices;
  _dlgLines = (o.lines||[]).slice();
  _dlgIdx = 0;
  let html='<div class="dbox"><div class="dtitle">'+esc(o.title||'')+'</div>';
  html+='<div id="dBody">'+lineHTML(_dlgLines[0])+'</div>';
  html+='<div class="dbtn">';
  if(_dlgChoice){ html+='</div></div>'; box.innerHTML=html; }
  else{ html+='<button id="dNext" class="primary">继续 ▸</button></div></div>'; box.innerHTML=html;
    $('#dNext').onclick=()=>{ _dlgIdx++; if(_dlgIdx<_dlgLines.length){ $('#dBody').innerHTML=lineHTML(_dlgLines[_dlgIdx]); } else { closeDialog(); if(o.onClose) o.onClose(); } };
  }
}
function lineHTML(l){
  if(!l) return '';
  return '<div class="dport"><div class="face">'+esc(l.icon||'✨')+'</div><div><div class="spk">'+esc(l.sp||'')+'</div><div class="dtext">'+esc(l.text||'')+'</div></div></div>';
}
function closeDialog(){ const box=$('#dialog'); box.classList.add('hidden'); box.innerHTML=''; S.dialogClosed=true; }
function hideDialog(){ const box=$('#dialog'); box.classList.add('hidden'); box.innerHTML=''; }

function showChoice(){
  const branches=Object.keys(BRANCHES);
  let opts='';
  branches.forEach(bid=>{ const b=BRANCHES[bid];
    opts+='<button class="dchoice" data-bid="'+bid+'"><b>'+esc(b.icon+' '+b.name)+'</b><br><span style="color:var(--dim);font-size:12px">'+esc(b.tagline)+'</span><br><span style="color:var(--accent2);font-size:11px">'+esc(b.desc)+'</span><br><span style="color:var(--warn);font-size:11px">'+esc(b.whisper||'')+'</span></button>';
  });
  showDialog({title:'🌌 命运抉择', choices:true});
  const box=$('#dialog');
  box.innerHTML='<div class="dbox"><div class="dtitle">🌌 命运抉择 · 星陨七曜</div><div class="dtext" style="min-height:0">那一夜，坠落的星辰在部落旁裂成七道光晕——每一道都指向一条截然不同的未来。部落只能追随其中一道，而你将带领它走到底。<br><b style="color:var(--warn)">此抉择无法回头。</b></div>'+opts+'</div>';
  box.querySelectorAll('.dchoice').forEach(btn=>{ btn.onclick=()=>chooseBranch(btn.dataset.bid); });
}

/* ================= 新手引导 ================= */
const TUTORIAL=[
  {title:'🔥 序章 · 火种部落', d:[
    {sp:'部落长老',icon:'🧓',text:'那是星火尚未熄灭的年代。你，火种部落最年轻的手艺人，在篝火边拾起第一块燧石。'},
    {sp:'部落长老',icon:'🧓',text:'孩子，我们靠双手在荒野求生。试着点击下方的"木材"图标采集——那是我们活下去的第一步。'},
    {sp:'旁白',icon:'📖',text:'提示：屏幕下方会漂浮出 "+3" 的绿色数字，那就是你的收获。'},
  ], check:()=>S.dialogClosed},
  {title:'🪓 石斧', d:[
    {sp:'部落长老',icon:'🧓',text:'够了！攒够 15 份木材，去"研究"页研究【石斧】——磨利的石刃会让双手更有力量。'},
  ], check:()=>S.dialogClosed && (S.res.wood||0)>=15 && !!S.resDone['stone_axe']},
  {title:'🏗️ 伐木屋', d:[
    {sp:'部落长老',icon:'🧓',text:'很好，石斧到手。去"建筑"页建造一座【伐木屋】——让木材自己生长，我们才能腾出手来想别的事。'},
  ], check:()=>S.dialogClosed && (S.bld['lumber']||0)>=1},
  {title:'🪨 石材', d:[
    {sp:'部落长老',icon:'🧓',text:'木材有了，再采些石头吧。石料，是文明的骨头。'},
  ], check:()=>S.dialogClosed && (S.res.stone||0)>=20},
  {title:'🔥 火种', d:[
    {sp:'部落长老',icon:'🧓',text:'现在，去"研究"页研究【火种】。我们不仅要生火，更要留住火。'},
  ], check:()=>S.dialogClosed && !!S.resDone['fire']},
  {title:'🔥 火堆', d:[
    {sp:'部落长老',icon:'🧓',text:'研究完成后，去"建筑"页建造一座【火堆】。它会让部落有稳定的食物，人丁才会兴旺。'},
  ], check:()=>S.dialogClosed && (S.bld['campfire']||0)>=1},
  {title:'🗣️ 语言与分工', d:[
    {sp:'部落长老',icon:'🧓',text:'火堆立起来了。去研究【部落语言】，学会说话，也学会分工。'},
  ], check:()=>S.dialogClosed && !!S.resDone['language']},
  {title:'👥 人口', d:[
    {sp:'部落长老',icon:'🧓',text:'语言会带来人口增长。打开"人口"页，把族人分配到【樵夫】等职业上——让他们各司其职。'},
  ], check:()=>S.dialogClosed && Object.values(S.jobs).some(v=>v>0)},
  {title:'🌠 星陨预兆', d:[
    {sp:'部落长老',icon:'🧓',text:'还有……那一夜的星光，异常地亮。长老们夜观天象，说那是【星陨预兆】。'},
    {sp:'部落长老',icon:'🧓',text:'去研究它吧。或许——命运的岔路，已经在我们脚下展开了。'},
  ], check:()=>S.dialogClosed && !!S.resDone['omen']},
];
function runTutorial(){
  if(S.tutDone || S.branch) { S.tutDone=true; return; }
  const t=TUTORIAL[S.tut];
  if(!t){ S.tutDone=true; return; }
  if(t.d && S.dShown!==S.tut){
    S.dShown=S.tut; S.dialogClosed=false;
    showDialog({title:t.title, lines:t.d});
  }
  if(t.check && t.check()){ S.tut++; S.dShown=-1; S.dialogClosed=false; }
}

/* ================= 渲染 ================= */
let curTab='build';
function render(){
  const d=defs();
  // —— 顶部 ——
  $('#logoIcon').textContent = S.branch? branchOf().icon : '🔥';
  const bb=$('#branchName');
  if(S.branch){ const b=branchOf(); bb.textContent=b.name; document.body.style.setProperty('--accent', b.color); }
  else { bb.textContent='命运未定'; }
  $('#eraName').textContent = eraIcon()+' '+eraName();
  const ms=eraMilestones(), done=ms.filter(r=>S.resDone[r.id]).length;
  const pct=ms.length? (done/ms.length)*100 : 0;
  $('#eraBarFill').style.width=pct+'%';
  let hint='';
  if(!S.branch){ hint='完成【部落语言】与【星陨预兆】，迎接命运抉择'; }
  else if(isLastEra()){ hint=S.ending? '文明已抵达终局 · 可继续游玩' : '研究完成即可抵达时代终局'; }
  else { const nms=ms.filter(r=>!S.resDone[r.id]); hint=nms.length? '还需研究：'+nms.map(r=>r.name).join('、') : '时代已就绪，可晋升'; }
  $('#eraHint').textContent=hint;
  if(S.branch && eraReady() && !(isLastEra()&&S.ending)){
    const ac=advanceCost(); const canPay=canAfford(ac); const inf=infraReady();
    const ok=canPay && inf.ok;
    const acStr=Object.entries(ac).map(([k,v])=>{ const rd=d.res[k]; return (rd?rd.icon+' '+rd.name:k)+' '+FMT(v); }).join('，');
    let extra='';
    if(!canPay) extra=' · 晋升消耗：'+acStr+'（资源不足）';
    else extra=' · 晋升消耗：'+acStr;
    if(!inf.ok) extra+=' · 还需：'+inf.msg;
    hint='⏩ 时代已就绪'+(ok?'，可晋升':extra);
    const readyBtn='<button class="good big" id="btnAdvance" style="margin-left:8px"'+(ok?'':' disabled')+'>'+((isLastEra())?'🌅 抵达终局':'⏩ 晋升时代')+'</button>';
    $('#eraHint').innerHTML=hint+readyBtn;
    const ba=$('#btnAdvance'); if(ba) ba.onclick=advanceEra;
  }
  if(S.ending){
    const nb='<button class="big" id="btnNewRun" style="margin-left:8px">🔁 开启新纪元（火种传承 ×'+(LEGACY.count||0)+'）</button>';
    $('#eraHint').innerHTML=hint+nb;
    const bn=$('#btnNewRun'); if(bn) bn.onclick=newRun;
  }
  // —— 资源条 ——
  const rt=rates();
  const cvInfo=convInfo();   // 精炼厂实时转化（用于资源条诚实显示消耗/产出）
  let rh='';
  Object.keys(d.res).sort((a,b)=>(d.res[a].eraIdx||-1)-(d.res[b].eraIdx||-1)).forEach(id=>{
    const def=d.res[id]; if(!visEra(def)) return;
    const amt=S.res[id]||0;
    let rate=rt[id]||0;
    if(id==='cornerstone') rate+=cvInfo.out;            // 精炼产出
    else if(cvInfo.in[id]) rate-=cvInfo.in[id];         // 精炼消耗
    if(id==='food') rate-=S.pop*FOOD_PER_POP;           // 人口进食消耗
    const clickable=def.click>0 && RAW_CLICK.has(id);
    const cv=clickable?'<div class="cv">点击采集 +'+FMT(def.click)+'</div>':'';
    rh+='<div class="reschip'+(S.focus===id?' focus':'')+(clickable?' cl':'')+'" data-rid="'+id+'"><span class="ic">'+def.icon+'</span><div><div class="nm">'+esc(def.name)+'</div><div class="am">'+FMT(amt)+'</div>'+cv+'</div><span class="rt'+(rate<0?' neg':'')+'">'+FMT(rate)+'/s</span></div>';
  });
  $('#resbar').innerHTML=rh;
  // —— 提示框 ——
  const hintBox=$('#hintBox');
  if(!S.branch){ hintBox.innerHTML='<div class="hb">引导 · 原始时代</div><b>新手引导进行中：</b>跟着长老的指引，点击采集 → 研究 → 建造。当前步骤：'+esc(TUTORIAL[Math.min(S.tut,TUTORIAL.length-1)].title||'')+'</div>'; }
  else {
    const b=branchOf(), e=b.eras[S.era];
    hintBox.innerHTML='<div class="hb">'+(isLastEra()?'终局 · '+e.name:'当前时代 · '+e.name)+'</div>'+esc(e.story)+(S.ending? '<br><b style="color:var(--warn)">🎉 文明终局已达成，你仍可继续建设。</b>':'');
  }
  // —— 资源框点击采集绑定 ——
  $('#resbar').querySelectorAll('.reschip[data-rid]').forEach(c=>{
    const def=d.res[c.dataset.rid];
    if(def && def.click>0 && RAW_CLICK.has(c.dataset.rid)) c.onclick=()=>clickRes(c.dataset.rid);
  });
  // —— 分支专属手艺行（资源条下方）——
  const mactWrap=$('#mactRow');
  if(S.branch && MANUAL_ACT[S.branch]){
    const ma=MANUAL_ACT[S.branch], cd=S.mcd||0, ok=canAfford(ma.need);
    mactWrap.style.display='flex';
    mactWrap.innerHTML='<span class="mact-label">🛠 专属手艺</span><button class="mact-btn'+(cd>0||!ok?' off':'')+'" data-mact="1"><span class="ic">'+ma.icon+'</span><div><div class="mn">'+esc(ma.name)+(cd>0?'（'+Math.ceil(cd)+'s）':'')+'</div><div class="md">'+esc(ma.desc)+' · '+(cd>0?'冷却中…':(ok?'可执行 · 15%暴击':'材料不足'))+'</div></div></button>';
    const mb=mactWrap.querySelector('[data-mact]'); if(mb) mb.onclick=doManualAct;
  } else { mactWrap.style.display='none'; mactWrap.innerHTML=''; }
  // —— 特殊事件生效条 ——
  const fb=$('#fxBar');
  if(S.buffs && S.buffs.length){
    const now=Date.now();
    fb.style.display='flex';
    fb.innerHTML=S.buffs.map(b=>{
      const left=Math.max(0,Math.ceil((b.until-now)/1000));
      const cls=b.type==='good'?' good':' bad';
      return '<div class="fx-chip'+cls+'"><span class="fx-lab">'+esc(b.label||'')+'</span><span class="fx-time">'+left+'s</span></div>';
    }).join('');
  } else { fb.style.display='none'; fb.innerHTML=''; }
  // —— 建筑 ——
  let bl='';
  d.bld.filter(b=>visEra(b)).forEach(b=>{
    const lvl=S.bld[b.id]||0;
    const un=unlockedBy(b);
    let costHtml=Object.entries(b.cost).map(([k,v])=>{ const ok=(S.res[k]||0)>=v*Math.pow(scale(),lvl); return '<span class="'+(ok?'':'no')+'">'+esc((d.res[k]?d.res[k].icon:'❓')+' '+(d.res[k]?d.res[k].name:k)+' '+FMT(v*Math.pow(scale(),lvl)))+'</span>'; }).join('');
    let prodHtml=Object.entries(b.prod||{}).map(([k,v])=>'<b>'+esc((d.res[k]?d.res[k].icon:'')+' +'+FMT(v))+'/'+lvl+'</b>').join('');
    let convHtml='';
    if(b.conv){ const IN=b.conv.in, OUT=b.conv.out.cornerstone;
      convHtml='<div class="row"><span>精炼</span><span><b>+'+FMT(OUT)+'/级·s 🧱</b>｜耗 '+Object.entries(IN).map(([k,v])=>esc((d.res[k]?d.res[k].icon:'❓')+' '+FMT(v))).join(' ')+'</span></div>'; }
    let popHtml=b.pop? '<b>+'+b.pop+' 人口</b>':'';
    const lockText= b.unlockResearch && !un ? '需研究：'+esc((d.rs.find(r=>r.id===b.unlockResearch)||{}).name||b.unlockResearch) : '';
    bl+='<div class="card'+(un?'':' locked')+'"><h4>'+b.icon+' '+esc(b.name)+' <span style="font-size:11px;color:var(--dim)">Lv.'+lvl+'</span></h4><div class="desc">'+esc(b.desc)+'</div>'+
      (lockText? '<div class="desc" style="color:var(--warn);min-height:0">🔒 '+lockText+'</div>':'')+
      '<div class="cost">'+costHtml+'</div><div class="row"><span>产出</span><span>'+prodHtml+' '+popHtml+'</span></div>'+(convHtml?convHtml:'')+
      '<div class="row" style="margin-top:8px"><button '+(un?'':'disabled')+' onclick="buyBuilding(\''+b.id+'\',1)">建造 ×1</button><button '+(un?'':'disabled')+' onclick="buyBuilding(\''+b.id+'\',10)">×10</button></div></div>';
  });
  $('#buildList').innerHTML=bl;
  // —— 研究 ——
  const rsG={};
  d.rs.forEach(rs=>{
    if(!visEra(rs)) return;
    const g=rs.eraIdx<0?'共享·原始':eraGroupName(rs.eraIdx);
    (rsG[g]=rsG[g]||[]).push(rs);
  });
  let rsh='';
  Object.keys(rsG).forEach(g=>{
    const list=rsG[g];
    const total=list.length;
    const doneN=list.filter(rs=>!!S.resDone[rs.id]).length;
    const allDone = doneN===total;
    const collapsed = (S.collapsed[g]!==undefined) ? S.collapsed[g] : allDone; // 全完成默认收起
    rsh+='<div class="rs-group'+(collapsed?' collapsed':'')+'" data-group="'+g+'">';
    rsh+='<div class="rs-group-head" onclick="toggleGroup(this)"><span class="rs-toggle">▾</span><span class="gname">📚 '+esc(g)+'</span><span class="gcount'+(allDone?' all':'')+'">'+doneN+'/'+total+(allDone?' ✅ 已通':(collapsed?' · 收起':' · 展开'))+'</span></div>';
    rsh+='<div class="rs-group-body"><div class="grid" style="margin-bottom:8px">';
    rsG[g].forEach(rs=>{
      const done=!!S.resDone[rs.id];
      const pre=rs.prereq.every(p=>S.resDone[p]);
      const ok=canResearch(rs);
      const preHtml=rs.prereq.length? '前置：'+rs.prereq.map(p=>esc((d.rs.find(r=>r.id===p)||{}).name||p)).join('、') : '';
      let costHtml=Object.entries(rs.cost||{}).map(([k,v])=>{ const o=(S.res[k]||0)>=v; return '<span class="'+(o?'':'no')+'">'+esc((d.res[k]?d.res[k].icon:'')+' '+FMT(v))+'</span>'; }).join('');
      const badge=done? '✅': (rs.milestone? '⭐':'');
      rsh+='<div class="card'+(done?' done':(pre&&ok?'':' locked'))+'"><h4>'+rs.icon+' '+esc(rs.name)+' '+badge+'</h4><div class="desc">'+esc(rs.desc)+'</div>'+
        (preHtml?'<div class="desc" style="min-height:0;color:var(--warn)">🔒 '+preHtml+'</div>':'')+
        '<div class="cost">'+costHtml+'</div><button class="'+(ok?'primary':'')+'" '+(ok?'':'disabled')+' onclick="doResearch(\''+rs.id+'\')">'+(done?'已完成':(ok?'研究':'未满足'))+'</button></div>';
    });
    rsh+='</div></div></div>';
  });
  $('#rsGroup').innerHTML=rsh;
  // —— 人口 ——
  const cap=popCap();
  const assigned=Object.values(S.jobs).reduce((a,b)=>a+b,0);
  const free=Math.max(0,Math.floor(S.pop)-assigned);
  const foodRate=rt['food']||0;
  const eatRate=S.pop*FOOD_PER_POP;
  const netFood=foodRate-eatRate-(cvInfo.in['food']||0);
  const grow=(netFood>0?0.015:0.004);
  const secPerPop = grow>0 ? Math.max(1, Math.ceil(1/grow)) : Infinity;
  const fracPop = S.pop - Math.floor(S.pop);
  const growLabel = netFood>0 ? ('每 '+secPerPop+' 秒 +1') : '停滞';
  const FMTI = n => Math.floor(n).toLocaleString('en-US');
  const starveLeft=Math.max(0,STARVE_LIMIT-(S.starve||0));
  const starveWarn=(S.starve||0)>0 ? ' <span style="color:var(--bad)">⚠ 饥荒 '+Math.ceil(starveLeft)+'s</span>' : '';
  $('#popStat').innerHTML=
    '<div class="it"><b>'+FMTI(S.pop)+'</b>人口 <small style="color:var(--dim)">上限 '+FMTI(cap)+'</small></div>'+
    '<div class="it"><b>'+FMTI(free)+'</b>闲置人口</div>'+
    '<div class="it"><b>'+FMTI(assigned)+'</b>已分配</div>'+
    '<div class="it"><b style="color:var(--dim)">'+FMT(eatRate)+'/s</b>食物消耗 <small style="color:var(--dim)">'+FMTI(S.pop)+'人 × '+FOOD_PER_POP+'</small></div>'+
    '<div class="it"><b style="color:'+(netFood>0?'var(--good)':'var(--bad)')+'">'+growLabel+'</b>人口增长 <small style="color:var(--dim)">下一人 '+Math.floor(fracPop*100)+'% · 净食物'+FMT(netFood)+'/s'+starveWarn+'</small></div>';
  let jl='';
  d.job.filter(j=>visEra(j)&&unlockedBy(j)).forEach(j=>{
    const n=S.jobs[j.id]||0;
    jl+='<div class="jobCard"><span class="ic">'+j.icon+'</span><div class="info"><b>'+esc(j.name)+'</b><small>'+esc(j.desc)+' · 每人 +'+FMT(j.amount*multFactor(j.res))+' '+(d.res[j.res]?d.res[j.res].name:j.res)+'/s</small></div><div class="ctl"><button onclick="assignJob(\''+j.id+'\',-5)">-5</button><button onclick="assignJob(\''+j.id+'\',-1)">-</button><span class="num">'+n+'</span><button onclick="assignJob(\''+j.id+'\',1)">+</button><button onclick="assignJob(\''+j.id+'\',5)">+5</button></div></div>';
  });
  if(!jl) jl='<div style="color:var(--dim)">研究【部落语言】后解锁职业分工。</div>';
  $('#jobList').innerHTML=jl;
  // —— 史册 ——
  let lh='';
  if(S.branch){ const b=branchOf();
    lh+='<div class="entry branch"><div class="t">'+b.icon+' '+esc(b.name)+'</div><div class="d">'+esc(b.desc)+'<br><span style="color:var(--dim)">'+esc(b.eras.map(e=>e.icon+' '+e.name).join(' → '))+'</span></div></div>';
  }
  S.story.slice().reverse().forEach(s=>{
    lh+='<div class="entry"><div class="t">'+esc((s.icon||'')+' '+(s.t||''))+'</div><div class="d">'+esc(s.d)+'</div></div>';
  });
  if(!lh) lh='<div style="color:var(--dim)">文明的历史还很短，去创造吧。</div>';
  $('#loreBox').innerHTML=lh;
  renderShop();
  $('#saveState').textContent = '已保存 '+new Date(S.lastSave).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit'})+(LEGACY.count?' · 🔥 传承×'+LEGACY.count:'');
}
function renderShop(){
  const s=shopState();
  const cs=S.res['cornerstone']||0;
  let h='<div class="shop-bal">当前持有：<b>🧱 '+FMT(cs)+'</b> 文明基石（由精炼厂产出）</div>';
  // 材料兑换
  h+='<div class="panel-title" style="margin-top:14px">📦 材料兑换 <small>用基石兑换本文明的后续材料（含未来时代）· 越后期材料所需基石越多</small></div>';
  const mats=shopMatList();
  if(!S.branch){ h+='<div style="color:var(--dim)">完成命运抉择、选择文明分支后开放材料兑换。</div>'; }
  else if(!mats.length){ h+='<div style="color:var(--dim)">暂无可兑换材料。</div>'; }
  else {
    h+='<div class="grid" id="shopMat">';
    mats.forEach(m=>{
      const maxed=shopMaxed('mat',m.id); const cost=shopCost('mat',m.id);
      const can=cs>=cost && !maxed;
      h+='<div class="card"><h4>'+m.def.icon+' '+esc(m.def.name)+'</h4><div class="desc">'+(m.def.desc?esc(m.def.desc):'')+'</div>'+
         '<div class="cost"><span class="'+(can?'':'no')+'">🧱 '+FMT(cost)+'</span></div>'+
         '<div class="row"><span>已兑换</span><span>'+m.lvl+'/'+SHOP.matMax+'</span></div>'+
         '<button class="'+(can?'primary':'')+'" '+(can?'':'disabled')+' onclick="buyShop(\'mat\',\''+m.id+'\')">'+(maxed?'已达上限':'兑换 ×'+SHOP.matGive)+'</button></div>';
    });
    h+='</div>';
  }
  // 永久加成
  h+='<div class="panel-title" style="margin-top:14px">✨ 永久加成 <small>消耗基石提升，永久生效</small></div>';
  h+='<div class="grid" id="shopUp">';
  SHOP.upgrades.forEach(u=>{
    const lvl=s[u.id]||0; const maxed=shopMaxed('up',u.id); const cost=shopCost('up',u.id);
    const can=cs>=cost && !maxed;
    h+='<div class="card"><h4>'+u.icon+' '+esc(u.name)+' <span style="font-size:11px;color:var(--dim)">Lv.'+lvl+'/'+u.max+'</span></h4><div class="desc">'+esc(u.desc)+'</div>'+
       '<div class="cost"><span class="'+(can?'':'no')+'">🧱 '+FMT(cost)+'</span></div>'+
       '<div class="row"><span>当前加成</span><span>+'+Math.round(u.per*lvl*100)+'%</span></div>'+
       '<button class="'+(can?'primary':'')+'" '+(can?'':'disabled')+' onclick="buyShop(\'up\',\''+u.id+'\')">'+(maxed?'已满级':'购买（+'+(u.per*100)+'%）')+'</button></div>';
  });
  h+='</div>';
  $('#shopBody').innerHTML=h;
}
function eraGroupName(ei){ const b=branchOf(); return b&&b.eras[ei]? b.eras[ei].name : '未知'; }
/* 研究分组（时代节点）收起/展开：状态存入 S.collapsed，全完成的分组默认收起 */
function toggleGroup(headEl){
  const grp=headEl.closest('.rs-group'); if(!grp) return;
  const name=grp.getAttribute('data-group');
  const cur=grp.classList.contains('collapsed');
  S.collapsed[name]=!cur;
  render();
}

/* ================= 主循环 / 存档 / 离线 ================= */
function tick(){
  const now=Date.now();
  let dt=Math.min(now-S.lastTick, 5000)/1000; S.lastTick=now;
  const rt=rates();
  Object.keys(rt).forEach(k=>{ S.res[k]=(S.res[k]||0)+rt[k]*dt; });
  S.res.food=Math.max(0,(S.res.food||0)-S.pop*FOOD_PER_POP*dt);  // 族人进食：人口越多吃得越多
  applyConverter(dt);   // 精炼厂：消耗 wood/stone/food → 文明基石
  if(S.mcd>0) S.mcd=Math.max(0,S.mcd-dt);
  // 人口增长（仅当净食物为正）
  const cap=popCap();
  const netFood=(rt['food']||0)-S.pop*FOOD_PER_POP-(convInfo().in['food']||0);
  const grow=(netFood>0?0.015:0)*dt*(1+(S.bonus?S.bonus.grow:0))*buffMult('grow');
  if(S.pop<cap){ S.pop=Math.min(cap, S.pop+grow); }
  // 饥荒：食物耗尽持续过久 → 减少人口
  if(S.res.food<=0){
    S.starve=(S.starve||0)+dt;
    if(S.starve>=STARVE_LIMIT){
      S.pop=Math.max(0,S.pop-1); S.starve=0; unassignExcess();
      toast('🍂 饥荒蔓延，族人 -1'); storyPush('饥荒','【饥荒】食物断绝','族人离散，人口减少。','🍂');
    }
  } else {
    S.starve=Math.max(0,(S.starve||0)-dt*1.5);   // 吃饱后饥荒计时缓慢回落
  }
  maybeLoreEvent(dt);
  maybeSpecialEvent(dt);
  tickBuffs();
  runTutorial();
  if(!S.branch && S.resDone['omen'] && !S.choiceShown){ S.choiceShown=true; showChoice(); }
  if(now-S.lastSave>5000){ saveGame(); }
  render();
}
function saveGame(){
  S.lastSave=Date.now();
  try{ localStorage.setItem('fireseed_save', JSON.stringify(S)); }catch(e){}
}
function loadGame(){
  try{
    const raw=localStorage.getItem('fireseed_save'); if(!raw) return;
    const o=JSON.parse(raw); const f=freshState();
    S=Object.assign(f, o);
    if(!S.buffs) S.buffs=[];
    else S.buffs=S.buffs.filter(b=>b.until>Date.now());   // 丢弃离线期间已过期的效果
    // 离线收益（最多 8 小时）
    const away=Math.min((Date.now()-(S.lastTick||Date.now()))/1000, 8*3600);
    if(away>30){
      const rt=rates();
      let gains=[];
      Object.keys(rt).forEach(k=>{ if(rt[k]>0){ const g=rt[k]*away; S.res[k]=(S.res[k]||0)+g; gains.push((defs().res[k]?defs().res[k].icon:'')+(defs().res[k]?defs().res[k].name:k)+'+'+FMT(g)); } });
      if(gains.length) toast('⏰ 离线收获：'+gains.join(' '));
      applyConverter(away);   // 离线期间精炼厂也在运转
      S.res.food=Math.max(0,(S.res.food||0)-S.pop*FOOD_PER_POP*away);  // 离线期间族人也进食
    }
    S.lastTick=Date.now(); S.dShown=-1; S.dialogClosed=true;
  }catch(e){ S=freshState(); }
}
function resetGame(){
  if(!confirm('确定要重置一切吗？所有文明进度将被抹去（火种传承保留）。')) return;
  try{ localStorage.removeItem('fireseed_save'); }catch(e){}
  S=freshState(); render();
}
/* 开启新纪元（转生）：清空当前周目，火种传承保留并继续累积。
   直接在当前页面重置，不依赖 confirm()/location.reload()（预览环境常被拦截） */
function newRun(){
  // 终局时 advanceEra 已把 legacy.count +1 写入 localStorage，这里重新读回（内存变量可能滞后）
  try{
    const lg=JSON.parse(localStorage.getItem('fireseed_legacy')||'{}');
    LEGACY.count=lg.count||0; if(lg.wins) LEGACY.wins=lg.wins;
  }catch(e){}
  S=freshState();
  if(LEGACY.count>0){ S.autoClick+=LEGACY.count; S.tutDone=true; } // 已通关过的文明跳过新手引导并继承自动点击
  saveGame();
  render();
  toast('🔁 新纪元开启！火种传承 ×'+LEGACY.count+'（开局自动点击 +'+LEGACY.count+'）');
}
function exportSave(){
  const txt=btoa(unescape(encodeURIComponent(JSON.stringify(S))));
  prompt('复制以下存档（保存好即可）', txt);
}
function importSave(){
  const raw=prompt('粘贴存档内容（base64 或 JSON 均可）');
  if(!raw) return;
  const txt=raw.trim();
  let obj=null;
  // 策略 A：直接就是 JSON 文本
  try{ obj=JSON.parse(txt); }catch(e){}
  // 策略 B/C：base64 解码（兼容各种污染：换行、空格、反引号、提示文字、标点）
  if(!obj){
    // 去除一切非 base64 字符
    let b64=txt.replace(/[^A-Za-z0-9+/=]/g,'');
    // 取最长的连续 base64 片段，避免提示文字中零星字母干扰
    const frags=b64.match(/[A-Za-z0-9+/=]{8,}/g)||[];
    b64=frags.sort((a,b)=>b.length-a.length)[0]||'';
    if(b64.length>=8){
      // 旧式兼容解码（base64 → escape/unescape → UTF-8）
      try{ obj=JSON.parse(decodeURIComponent(escape(atob(b64)))); }catch(e){
        // 兜底：base64 → 字节 → TextDecoder（最稳健的 UTF-8 还原）
        try{
          const bin=atob(b64);
          const bytes=Uint8Array.from(bin, c=>c.charCodeAt(0));
          obj=JSON.parse(new TextDecoder('utf-8').decode(bytes));
        }catch(e2){}
      }
    }
  }
  if(!obj || typeof obj!=='object' || Array.isArray(obj)){ toast('存档无效，请粘贴完整的存档文本'); return; }
  S=Object.assign(freshState(), obj);
  S.lastTick=Date.now();
  if(typeof S.collapsed!=='object'||!S.collapsed) S.collapsed={};
  render(); toast('存档已导入');
}

/* ================= 启动 ================= */
document.querySelectorAll('#tabs button').forEach(b=>{
  b.onclick=()=>{ curTab=b.dataset.tab;
    document.querySelectorAll('#tabs button').forEach(x=>x.classList.toggle('active', x===b));
    ['build','research','pop','shop','lore'].forEach(t=>$('#panel-'+t).classList.toggle('hidden', t!==curTab));
  };
});
$('#btnReset').onclick=resetGame;
$('#btnExport').onclick=exportSave;
$('#btnImport').onclick=importSave;
const hadSave=!!localStorage.getItem('fireseed_save');
try{ LEGACY=JSON.parse(localStorage.getItem('fireseed_legacy'))||LEGACY; }catch(e){}
loadGame();
if(!hadSave && LEGACY.count>0){
  S.autoClick+=LEGACY.count;
  toast('🔥 火种传承：继承 '+LEGACY.count+' 次终局之力（自动点击 +'+LEGACY.count+'）');
}
render();
setInterval(tick, 500);
window.addEventListener('beforeunload', saveGame);

