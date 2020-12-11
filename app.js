const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new KoaRouter();

// json pretty
app.use(json());

app.use(bodyParser());

// 给上下文ctx添加属性     即ctx.user
app.context.user = 'violateer';

// DB
const things = [
    { name: 'my family' },
    { name: 'programming' },
    { name: 'music' }
];

// 配置模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
});

// 路由跳转
router.get('/', index);
router.get('/add', showAdd);
router.get('/test/:id', ctx => ctx.body = ctx.params.id);

// 函数声明
async function index (ctx) {
    await ctx.render('index', {
        title: 'Things i love...',
        things
    });
};

async function showAdd (ctx) {
    await ctx.render('add');
};

// 添加路由方法
router.post('/add', add);

async function add (ctx) {
    const body = ctx.request.body;
    things.push({ name: body.thing.toString() });
    ctx.redirect(('/'));
};

// 配置路由模块
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server start');
});