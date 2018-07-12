module.exports = async (ctx, next) => {
  
  await next();

  ctx.response.body = ctx.response.body || {}
}