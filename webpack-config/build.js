const ora = require('ora');
const webpack = require('webpack');
const env = process.env.NODE_ENV;
const webpackProdConfig = require('./webpack.prod');
const spinner = ora(`building for ${env}...`);

const queue = [{ compile: webpack(webpackProdConfig), name: env }];

function build() {
  if (!queue.length) {
    console.log('打包完成');
    return;
  }
  const { compile, name } = queue.shift();
  console.log(`${name}开始打包代码`);
  compile.run((err, stats) => {
    console.log(`============  webpack build ${name} complete ============`);
    console.log(
      stats.toString({
        colors: true,
        all: false,
        assets: true,
        errors: true,
        warnings: true,
        timings: true,
      })
    );
    if (err || stats.hasErrors()) {
      spinner.stop();
    }
    build();
  });
}

spinner.start();
build();
