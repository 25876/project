import FadeIn from '../components/FadeIn';

const img = (n: number) => `${import.meta.env.BASE_URL}images/${n}.png`;

interface Chapter {
  num: number;
  title: string;
  body: string;
  img: string;
}

const chapters: Chapter[] = [
  { num: 1, title: '初识HTML——推开网页世界的大门', body: '2021-10-03号 第一次学习HTML这个语言，开始去了解和学习这个语言。', img: img(1) },
  { num: 2, title: '加入篮球社团——球场与社交的新起点', body: '2021-10-13号 加入篮球社团，在闲暇之余还能和社团的朋友学长们交流学习课外知识，提高社交能力。', img: img(2) },
  { num: 3, title: '邂逅CSS——让网页焕然一新的样式魔法', body: '2021-10-20号 第一次学习CSS，彻底的喜欢上了这个语言，发现竟然可以那么方便的就把网页弄的更精美好看且大大的提高了效率。', img: img(3) },
  { num: 4, title: '篮球裁判初体验——走上院系赛场执法', body: '2021-12-22号 在几个月前参加了篮球裁判员', img: img(4) },
  { num: 5, title: '荣获优秀裁判奖——执裁零冲突的圆满赛季', body: '在院系比赛中所管理的比赛无一场出现大的吵闹事件，比赛均顺利进行，获得了优秀裁判奖。', img: img(5) },
  { num: 6, title: '学习JavaScript——赋予网页真实的行为逻辑', body: '2022-03-04号 学习JavaScript编程语言，使自己设计的网页的行为逻辑更真实。', img: img(6) },
  { num: 7, title: '探索Vue.js——用框架搭建自己的网页界面', body: '2022-04-09号 学习如何使用Vue.js框架，搭建自己的网页用户页面，知道如何使用Vue.js实现自己想要的效果。', img: img(7) },
  { num: 8, title: '自学C#与ASP.NET Core——迈向后端开发', body: '2022-09-12号 开始学习C#编程语言，借助 ASP.NET Core 框架，构建高性能的网站和 API 接口', img: img(8) },
  { num: 9, title: '课后实战——模拟设计淘宝风格购物网页', body: '课后作业模拟设计一款类似淘宝的购物网页。', img: img(9) },
  { num: 10, title: '兼职蜜雪冰城——课余时光的奶茶店店员', body: '2022-09-15号 为了减轻学业负担，闲余时间兼职蜜雪冰城店员', img: img(10) },
  { num: 11, title: '奶茶店日常——制作饮品与维护店面整洁', body: '帮忙制作奶茶，备食材、维护店内卫生。', img: img(11) },
  { num: 12, title: '学习SQL——掌握关系型数据库的标准语言', body: '2022-10-26号 学习管理和操作关系型数据库的标准化编程语言SQL，学习怎么对数据进行维护，数据定义、数据查询、数据操作和数据控制等功能。', img: img(12) },
  { num: 13, title: '认识MySQL——建表与数据库维护实践', body: '2022-12-02号 学习如何使用MYSQL关系型数据库管理系统，认识和了解数据库，及建表和维护。', img: img(13) },
  { num: 14, title: '考取网页设计师资格证书——专业能力的正式认证', body: '2023-03-07号 考取网页设计师资格证书，经过以前的学习已经完全掌握了知识点，并顺利的考取到了网页设计师资格证书。', img: img(14) },
  { num: 15, title: '学习计算机网络——从协议到云计算的全景视野', body: '2023-04-21号 学习计算机网络技术，学习网络协议、网络构建、服务器配置、网络安全、云计算等。', img: img(15) },
  { num: 16, title: '毕业设计选题——"游戏论坛"项目立项', body: '2023-05-19号 选毕业设计课题，选到了一个"游戏论坛"', img: img(16) },
  { num: 17, title: '攻坚克难——在挫折中按期完成毕业项目', body: '虽然途中遇到很多挫折，但历经千辛也是在规定时间内完成了。', img: img(17) },
  { num: 18, title: '职场担当——独立负责公司网站搭建与维护', body: '2025-03-05号 因公司团队人手不够，不得不负责起网站的搭建及后期的维护。', img: img(18) },
];

const TimelineSection = () => {
  return (
    <section id="timeline" className="relative z-10 px-6 py-24 md:px-16">
      <div className="mb-16">
        <FadeIn>
          <h2
            className="hero-heading text-center font-bold"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            成长时间线
          </h2>
        </FadeIn>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col gap-20">
        {chapters.map((chapter, i) => {
          const isEven = i % 2 === 0;
          return (
            <FadeIn key={chapter.num} y={40}>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
                <div className={`w-full md:w-3/5 ${isEven ? '' : 'md:order-2'}`}>
                  <div className="overflow-hidden rounded-2xl border border-[#2a2a2a]">
                    <img
                      src={chapter.img}
                      alt={chapter.title}
                      loading="lazy"
                      className="aspect-video w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className={`w-full md:w-2/5 ${isEven ? '' : 'md:order-1'}`}>
                  <span className="mb-2 block text-sm font-light tracking-widest text-[#646973]">
                    CHAPTER {String(chapter.num).padStart(2, '0')}
                  </span>
                  <h3 className="mb-3 text-xl font-semibold leading-snug text-[#BBCCD7] sm:text-2xl">
                    {chapter.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-[#8a95a0] sm:text-base">
                    {chapter.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

export default TimelineSection;
