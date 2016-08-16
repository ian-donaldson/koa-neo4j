// Start using koa2 as normal

import Koa from 'koa';
import Router from 'koa-router';
import * as logic from './logic'

const app = new Koa();
const router = new Router();
app.use(router.routes());



let methods = {
    'POST': router.post,
    'GET': router.get
};

function* properties(obj) {
    for (let key of Object.keys(obj)) {
        yield obj[key];
    }
}

for (let model of properties(logic)) {
    let handler = async (ctx, next) => {
        ctx.body = await model.body(ctx.request);
        await next();
    };
    methods[model.method].apply(router, [model.route, handler])
}

// router.get('/', async (ctx, next) => {
// 	ctx.body = '';
// 	await next();
// });

app.listen(3000, () => {
	console.log('App listening on port 3000.');
});
