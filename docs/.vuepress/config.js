module.exports = {
  theme: 'reco',
  title: "一只黑猫的博客",
  base: '/blog/',
  // 移动端优化
  head: [
    [
      'meta', 
        { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' },
      'link',
        {rel: 'icon', href: 'avatar.png'}
     ]
  ],
  // 主题设置
  themeConfig: {
    type: 'blog',
    author: 'Into the Abyss',
    // 显示在个人信息的头像
    authorAvatar: '/avatar.png',
    // 导航栏左侧logo
    logo: '/avatar.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航及其深度
    subSidebar: 'auto',
    sidebarDepth: 1,
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 项目开始时间
    startYear: '2022',
    // 导航栏配置
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
      { text: 'GitHub', link: 'https://github.com/yinqiyao', icon: 'reco-github' }
    ],
    // 博客配置
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      }
    }
  },
  // 插件配置
  plugins: [
    [
      'permalink-pinyin',
      {
        lowercase: true,
        separator: '-'
      }
    ]
  ],
  // 设置语言
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  }
}