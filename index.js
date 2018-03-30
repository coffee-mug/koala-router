const Koa = require('koa'),
      app = new Koa(),
      router = require('./src/router.js').create();

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// Routes
console.log(router);

// Handle file references
router.add('/', "./src/static/index.html");

router.add('/lol', async ctx => {
  ctx.body = "POL";
});

router.add('/dol', async ctx => {
  ctx.body = "dol";
});

router.add('/test/*/', async (ctx, variablePart) => {
  ctx.body = variablePart;
});

// Call the router
app.use(router.handleRequests.bind(router));
app.listen(8000);
