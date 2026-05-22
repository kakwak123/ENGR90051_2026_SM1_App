/**
 * Tiny i18n helper. Flat dictionary keyed by string id, value per language.
 *
 * Design uses 3 languages (en/es/vi); this app ships with en/vi/zh/ga.
 * Spanish keys from the source design were dropped — replaced with
 * Mandarin (zh) and Irish (ga) per product decision.
 *
 * Missing keys fall back to English; missing English falls back to the key.
 */

import { type Language, useProfile } from '@/lib/profile';

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'vi', label: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'zh', label: 'Chinese', native: '中文' },
  { code: 'ga', label: 'Irish', native: 'Gaeilge' },
];

type Dict = Record<Language, string>;

const STRINGS = {
  // tabs
  'tab.home': { en: 'Home', vi: 'Trang chủ', zh: '主页', ga: 'Baile' },
  'tab.river': { en: 'River', vi: 'Sông', zh: '河流', ga: 'Abhainn' },
  'tab.street': { en: 'Street', vi: 'Đường phố', zh: '街道', ga: 'Sráid' },
  'tab.lamp': { en: 'Lamp', vi: 'Đèn', zh: '灯', ga: 'Lampa' },
  'tab.call': { en: 'Call', vi: 'Gọi', zh: '通话', ga: 'Glaoigh' },

  // home
  'home.location': {
    en: 'Edgewater Bvd, Maribyrnong',
    vi: 'Đường Edgewater, Maribyrnong',
    zh: 'Edgewater大道,Maribyrnong',
    ga: 'Bóthar Edgewater, Maribyrnong',
  },
  'home.headline.calm': {
    en: 'All clear.',
    vi: 'Tất cả an toàn.',
    zh: '一切平静。',
    ga: 'Gach rud socair.',
  },
  'home.river.title': {
    en: 'River level',
    vi: 'Mực nước sông',
    zh: '河水位',
    ga: 'Leibhéal na habhann',
  },
  'home.street.title': {
    en: 'Your street',
    vi: 'Đường phố của bạn',
    zh: '你的街道',
    ga: 'Do shráid',
  },
  'home.street.tag.calm': {
    en: 'QUIET',
    vi: 'YÊN TĨNH',
    zh: '安静',
    ga: 'CIÚIN',
  },
  'home.street.monitored': {
    en: '12 homes monitored',
    vi: '12 nhà được giám sát',
    zh: '监测中的12户',
    ga: '12 teach á monatóireacht',
  },
  'home.street.risk': {
    en: '0 / 12 at risk',
    vi: '0 / 12 có nguy cơ',
    zh: '0 / 12 处于风险',
    ga: '0 / 12 i mbaol',
  },
  'home.bag': { en: 'GO BAG', vi: 'TÚI ĐỒ', zh: '应急包', ga: 'MÁLA' },
  'home.bag.state': { en: 'Ready', vi: 'Sẵn sàng', zh: '已备好', ga: 'Réidh' },
  'home.bag.sub': {
    en: '● Packed · checked Apr 18',
    vi: '● Đã đóng · kiểm tra 18/4',
    zh: '● 已装好 · 4月18日',
    ga: '● Pacáilte · 18 Aib',
  },
  'home.buddy': { en: 'BUDDY', vi: 'BẠN', zh: '伙伴', ga: 'CARA' },
  'home.buddy.sub': {
    en: '3 min walk',
    vi: '3 phút đi bộ',
    zh: '步行3分钟',
    ga: '3 nóim siúil',
  },
  'home.listen': {
    en: 'Listen to summary',
    vi: 'Nghe tóm tắt',
    zh: '听摘要',
    ga: 'Éist le hachoimre',
  },

  // river
  'river.title': {
    en: 'Maribyrnong River',
    vi: 'Sông Maribyrnong',
    zh: 'Maribyrnong河',
    ga: 'Abhainn Maribyrnong',
  },
  'river.calm': { en: 'Calm.', vi: 'Yên tĩnh.', zh: '平静。', ga: 'Socair.' },
  'river.verdict.calm': {
    en: '4 metres below your street.',
    vi: 'Thấp hơn đường phố 4 m.',
    zh: '比街道低4米。',
    ga: '4 mhéadar faoi do shráid.',
  },
  'river.now': { en: 'Right now', vi: 'Ngay bây giờ', zh: '此刻', ga: 'Anois' },
  'river.future': {
    en: 'In 6 hours',
    vi: 'Trong 6 giờ',
    zh: '6小时后',
    ga: 'I gceann 6 uair',
  },
  'river.note.calm': {
    en: 'No rain today',
    vi: 'Không mưa hôm nay',
    zh: '今天无雨',
    ga: 'Gan bháisteach inniu',
  },
  'river.ago': {
    en: '1 min ago',
    vi: '1 phút trước',
    zh: '1分钟前',
    ga: '1 nóim ó shin',
  },

  // street
  'street.title': {
    en: 'Edgewater Boulevard',
    vi: 'Đường Edgewater',
    zh: 'Edgewater大道',
    ga: 'Bóthar Edgewater',
  },
  'street.sub': {
    en: '12 homes · 4 blocks. Shared with your neighbours.',
    vi: '12 nhà · 4 dãy. Chia sẻ với hàng xóm.',
    zh: '12户 · 4街区。与邻居共享。',
    ga: '12 teach · 4 bhloc. Roinnte le do chomharsana.',
  },
  'street.live': {
    en: '12 homes · live',
    vi: '12 nhà · trực tiếp',
    zh: '12户 · 实时',
    ga: '12 teach · beo',
  },
  'street.legend.ready': { en: 'Ready', vi: 'Sẵn sàng', zh: '已备好', ga: 'Réidh' },
  'street.legend.preparing': {
    en: 'Preparing',
    vi: 'Đang chuẩn bị',
    zh: '准备中',
    ga: 'Ag ullmhú',
  },
  'street.legend.help': {
    en: 'Needs help',
    vi: 'Cần giúp đỡ',
    zh: '需要帮助',
    ga: 'Cabhair ag teastáil',
  },
  'street.legend.noreply': {
    en: 'No reply',
    vi: 'Không trả lời',
    zh: '无回复',
    ga: 'Gan freagra',
  },
  'street.you': { en: 'YOU', vi: 'BẠN', zh: '你', ga: 'TUSA' },
  'street.summary.calm': {
    en: 'All quiet · 12 / 12 at home',
    vi: 'Tất cả yên tĩnh · 12 / 12 ở nhà',
    zh: '一切平静 · 12 / 12 在家',
    ga: 'Gach rud ciúin · 12 / 12 ag baile',
  },

  // lamp
  'lamp.head': { en: 'FloodLamp', vi: 'FloodLamp', zh: 'FloodLamp', ga: 'FloodLamp' },
  'lamp.connected': {
    en: 'Connected.',
    vi: 'Đã kết nối.',
    zh: '已连接。',
    ga: 'Ceangailte.',
  },
  'lamp.sub': {
    en: 'Wakes you when the river rises — even if your phone is in another room.',
    vi: 'Đánh thức bạn khi nước sông dâng — kể cả khi điện thoại ở phòng khác.',
    zh: '当河水上涨时唤醒你——即使你的手机在另一个房间。',
    ga: 'Músclaíonn tú nuair a éiríonn an abhainn — fiú má tá d’fón i seomra eile.',
  },
  'lamp.state.calm': {
    en: 'ALL CLEAR',
    vi: 'TẤT CẢ AN TOÀN',
    zh: '一切平静',
    ga: 'GACH RUD SOCAIR',
  },
  'lamp.why.calm': {
    en: 'Soft green breath',
    vi: 'Ánh xanh dịu',
    zh: '柔和绿光',
    ga: 'Anáil ghlas bog',
  },
  'lamp.test': {
    en: 'Test the light',
    vi: 'Thử đèn',
    zh: '测试灯光',
    ga: 'Tástáil an solas',
  },
  'lamp.row.sound': { en: 'Sound', vi: 'Âm thanh', zh: '声音', ga: 'Fuaim' },
  'lamp.row.sound.value': {
    en: 'On · 70 dB',
    vi: 'Bật · 70 dB',
    zh: '开 · 70 dB',
    ga: 'Air · 70 dB',
  },
  'lamp.row.wake': {
    en: 'Wake hours',
    vi: 'Giờ đánh thức',
    zh: '唤醒时段',
    ga: 'Uaireanta múscailte',
  },
  'lamp.row.wake.value': {
    en: '5:30 — 23:00',
    vi: '5:30 — 23:00',
    zh: '5:30 — 23:00',
    ga: '5:30 — 23:00',
  },
  'lamp.row.battery': { en: 'Battery', vi: 'Pin', zh: '电池', ga: 'Cadhnra' },
  'lamp.row.battery.value': {
    en: 'Charged · 14 days',
    vi: 'Đầy · 14 ngày',
    zh: '已充电 · 14天',
    ga: 'Luchtaithe · 14 lá',
  },
  'lamp.footer': {
    en: 'One lamp per home. Shared with your buddy. Works offline up to 7 days.',
    vi: 'Một đèn mỗi nhà. Chia sẻ với bạn của bạn. Hoạt động ngoại tuyến đến 7 ngày.',
    zh: '每户一盏灯。与你的伙伴共享。可离线工作7天。',
    ga: 'Lampa amháin in aghaidh an tí. Roinnte le do chara. Oibríonn as líne suas le 7 lá.',
  },

  // call
  'call.head': { en: 'Call', vi: 'Gọi', zh: '通话', ga: 'Glaoigh' },
  'call.title': {
    en: 'Who do you call?',
    vi: 'Bạn gọi ai?',
    zh: '你打给谁?',
    ga: 'Cé ar a nglaonn tú?',
  },
  'call.sub': {
    en: 'The people you trusted can help you now.',
    vi: 'Những người bạn tin tưởng có thể giúp bạn.',
    zh: '你信任的人现在可以帮助你。',
    ga: 'Is féidir leis na daoine a bhfuil muinín agat astu cabhrú leat anois.',
  },
  'call.emergency': {
    en: 'Emergency · 000',
    vi: 'Khẩn cấp · 000',
    zh: '紧急 · 000',
    ga: 'Éigeandáil · 000',
  },
  'call.emergency.sub': {
    en: 'Police, fire, ambulance',
    vi: 'Cảnh sát, cứu hỏa, cứu thương',
    zh: '警察、消防、救护车',
    ga: 'Garda, dóiteán, otharcharr',
  },

  // settings
  'settings.head': { en: 'Settings', vi: 'Cài đặt', zh: '设置', ga: 'Socruithe' },
  'settings.title': {
    en: 'Preferences',
    vi: 'Tuỳ chọn',
    zh: '偏好设置',
    ga: 'Sainroghanna',
  },
  'settings.sub': {
    en: 'The choices you made at sign-up. Change them whenever you like.',
    vi: 'Các lựa chọn bạn đã chọn khi đăng ký. Thay đổi bất cứ lúc nào.',
    zh: '你注册时的选择。随时可以更改。',
    ga: 'Na roghanna a rinne tú ag clárú. Athraigh aon uair is mian leat.',
  },
  'settings.row.textsize': {
    en: 'Text size',
    vi: 'Cỡ chữ',
    zh: '字号',
    ga: 'Méid téacs',
  },
  'settings.row.palette': { en: 'Colour', vi: 'Màu', zh: '颜色', ga: 'Dath' },
  'settings.row.language': { en: 'Language', vi: 'Ngôn ngữ', zh: '语言', ga: 'Teanga' },
  'settings.row.readaloud': {
    en: 'Read aloud',
    vi: 'Đọc to',
    zh: '朗读',
    ga: 'Léigh os ard',
  },
  'settings.row.simplify': {
    en: 'Simpler screens',
    vi: 'Màn hình đơn giản',
    zh: '简化界面',
    ga: 'Scáileáin níos simplí',
  },
  on: { en: 'On', vi: 'Bật', zh: '开', ga: 'Air' },
  off: { en: 'Off', vi: 'Tắt', zh: '关', ga: 'As' },

  // onboarding
  'onb.welcome.eyebrow': {
    en: 'VICSES · Flood',
    vi: 'VICSES · Lũ',
    zh: 'VICSES · 洪水',
    ga: 'VICSES · Tuile',
  },
  'onb.welcome.title': {
    en: 'Know before\nthe water comes.',
    vi: 'Biết trước\nkhi nước đến.',
    zh: '在洪水到来之前\n就要知道。',
    ga: 'Bíodh fhios agat\nsular thagann an t-uisce.',
  },
  'onb.welcome.sub': {
    en: "One app for everyone on your street. We'll learn your home, your people, and how you'd like to be told.",
    vi: 'Một ứng dụng cho mọi người trên đường phố. Chúng tôi sẽ tìm hiểu nhà bạn, người thân và cách bạn muốn được thông báo.',
    zh: '为街上每个人提供的一款应用。我们会了解你的家、你的人,以及你希望被告知的方式。',
    ga: 'Aon aip do gach duine ar do shráid. Foghlaimeoimid faoi do bhaile, do dhaoine, agus an chaoi ar mhaith leat scéal a fháil.',
  },
  'onb.welcome.start': {
    en: 'Get started',
    vi: 'Bắt đầu',
    zh: '开始',
    ga: 'Tosaigh',
  },
  'onb.welcome.have': {
    en: 'I already have an account',
    vi: 'Tôi đã có tài khoản',
    zh: '我已经有帐户',
    ga: 'Tá cuntas agam cheana',
  },
  'onb.address.step': {
    en: 'Step 2 of 5',
    vi: 'Bước 2 / 5',
    zh: '第 2 / 5 步',
    ga: 'Céim 2 as 5',
  },
  'onb.address.title': {
    en: 'Where do you\nlive?',
    vi: 'Bạn sống\nở đâu?',
    zh: '你住在\n哪里?',
    ga: 'Cá bhfuil\ncónaí ort?',
  },
  'onb.address.sub': {
    en: 'Used to give you the right warnings. Never shared.',
    vi: 'Dùng để cảnh báo phù hợp. Không chia sẻ.',
    zh: '用于发送相关警报。绝不共享。',
    ga: 'Le rabhaidh chearta a thabhairt duit. Ní roinntear riamh.',
  },
  'onb.address.label': { en: 'Address', vi: 'Địa chỉ', zh: '地址', ga: 'Seoladh' },
  'onb.address.confirm': { en: 'Confirm', vi: 'Xác nhận', zh: '确认', ga: 'Deimhnigh' },

  'onb.access.step': {
    en: 'Step 3 of 5 · Your preferences',
    vi: 'Bước 3 / 5 · Tuỳ chọn của bạn',
    zh: '第 3 / 5 步 · 你的偏好',
    ga: 'Céim 3 as 5 · Do shainroghanna',
  },
  'onb.access.title': {
    en: 'Make it\nread right\nfor you.',
    vi: 'Để nó\nphù hợp\nvới bạn.',
    zh: '让它\n适合\n你阅读。',
    ga: 'Cuir é\nin oiriúint\nduit féin.',
  },
  'onb.access.sub': {
    en: 'You can change any of these later in Settings.',
    vi: 'Bạn có thể thay đổi sau trong Cài đặt.',
    zh: '稍后可在设置中更改。',
    ga: 'Is féidir leat aon cheann díobh seo a athrú níos déanaí i Socruithe.',
  },
  'onb.access.section.text': {
    en: 'Text size',
    vi: 'Cỡ chữ',
    zh: '字号',
    ga: 'Méid téacs',
  },
  'onb.access.section.colour': {
    en: 'Colour',
    vi: 'Màu sắc',
    zh: '颜色',
    ga: 'Dath',
  },
  'onb.access.section.read': {
    en: 'Read in',
    vi: 'Đọc bằng',
    zh: '阅读语言',
    ga: 'Léigh i',
  },
  'onb.access.section.extras': {
    en: 'Helpful extras',
    vi: 'Tiện ích hữu ích',
    zh: '辅助选项',
    ga: 'Breiseanna úsáideacha',
  },
  'onb.access.size.default': {
    en: 'Default',
    vi: 'Mặc định',
    zh: '默认',
    ga: 'Réamhshocrú',
  },
  'onb.access.size.large': { en: 'Large', vi: 'Lớn', zh: '大', ga: 'Mór' },
  'onb.access.size.xlarge': {
    en: 'X-Large',
    vi: 'Rất lớn',
    zh: '特大',
    ga: 'An-mhór',
  },
  'onb.access.palette.default': {
    en: 'Default',
    vi: 'Mặc định',
    zh: '默认',
    ga: 'Réamhshocrú',
  },
  'onb.access.palette.hc': {
    en: 'High contrast',
    vi: 'Tương phản cao',
    zh: '高对比度',
    ga: 'Ardchodarsnacht',
  },
  'onb.access.palette.cb': {
    en: 'CB-safe',
    vi: 'Mù màu',
    zh: '色盲安全',
    ga: 'Slán ó dhaltachas',
  },
  'onb.access.toggle.readaloud': {
    en: 'Read warnings out loud',
    vi: 'Đọc to các cảnh báo',
    zh: '朗读警报',
    ga: 'Léigh rabhaidh os ard',
  },
  'onb.access.toggle.readaloud.sub': {
    en: 'Spoken alerts, not silent buzzes',
    vi: 'Cảnh báo nói, không rung im lặng',
    zh: '语音警报,而非静音震动',
    ga: 'Rabhaidh labhartha, ní crith ciúin',
  },
  'onb.access.toggle.simplify': {
    en: 'Simpler screens',
    vi: 'Màn hình đơn giản',
    zh: '简化界面',
    ga: 'Scáileáin níos simplí',
  },
  'onb.access.toggle.simplify.sub': {
    en: 'Hide secondary detail. Bigger buttons.',
    vi: 'Ẩn chi tiết phụ. Nút lớn hơn.',
    zh: '隐藏次要细节。按钮更大。',
    ga: 'Folaigh mionsonraí. Cnaipí níos mó.',
  },
  'onb.continue': { en: 'Continue', vi: 'Tiếp tục', zh: '继续', ga: 'Lean ar aghaidh' },

  'onb.buddy.step': {
    en: 'Step 4 of 5',
    vi: 'Bước 4 / 5',
    zh: '第 4 / 5 步',
    ga: 'Céim 4 as 5',
  },
  'onb.buddy.title': {
    en: 'Pick one\nperson.',
    vi: 'Chọn\nmột người.',
    zh: '选一\n个人。',
    ga: 'Roghnaigh\nduine amháin.',
  },
  'onb.buddy.sub': {
    en: 'Your buddy gets the same alerts you do — so nobody on your street is alone in a flood.',
    vi: 'Bạn đồng hành sẽ nhận cùng cảnh báo — không ai trên phố cô đơn trong lũ.',
    zh: '你的伙伴会收到相同警报 — 让街上没人在洪水中孤单。',
    ga: 'Faigheann do chara na rabhaidh chéanna — sa chaoi nach mbeidh aon duine ar do shráid leis féin i dtuile.',
  },
  'onb.buddy.continue': {
    en: 'Send Maya an invite',
    vi: 'Mời Maya',
    zh: '邀请Maya',
    ga: 'Seol cuireadh chuig Maya',
  },
  'onb.review.step': {
    en: 'Step 5 of 5',
    vi: 'Bước 5 / 5',
    zh: '第 5 / 5 步',
    ga: 'Céim 5 as 5',
  },
  'onb.review.title': {
    en: 'This is how\nyour app will\nlook.',
    vi: 'Đây là\ngiao diện ứng\ndụng của bạn.',
    zh: '这就是你的\n应用看起来\n的样子。',
    ga: 'Seo mar a\nbheidh d’aip ag\nbreathnú.',
  },
  'onb.review.finish': {
    en: 'Looks good — finish',
    vi: 'Trông tốt — hoàn tất',
    zh: '看起来不错 — 完成',
    ga: 'Tá sé go maith — críochnaigh',
  },
  'onb.review.tweak': {
    en: '← Tweak preferences',
    vi: '← Chỉnh tuỳ chọn',
    zh: '← 调整偏好',
    ga: '← Tweak roghanna',
  },
} satisfies Record<string, Dict>;

export type StringKey = keyof typeof STRINGS;

export function t(key: StringKey, lang: Language): string {
  const entry = STRINGS[key];
  return entry[lang] ?? entry.en ?? (key as string);
}

export function useT() {
  const { profile } = useProfile();
  return (key: StringKey) => t(key, profile.language);
}
