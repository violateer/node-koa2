const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');

const app = new Koa();
const router = new KoaRouter();

// json pretty
app.use(json());

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
router.get('/', async ctx => {
    await ctx.render('index', {
        title: 'Things i love...',
        things
    });
});

// 配置路由模块
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('server start');
});