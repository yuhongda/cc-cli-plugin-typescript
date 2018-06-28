const path = require('path');
const fs = require('fs');

module.exports = (webpackConfig) => {

    webpackConfig.resolve
      .extensions
        .merge(['.ts', '.tsx'])

    const tslintRule = webpackConfig.module.rule('tslint')
    const tsRule = webpackConfig.module.rule('ts')

    tslintRule
        .pre()
        .exclude
            .add(/node_modules/)
            .end()
        .test(/\.ts(x?)$/)
        .use('tslint-loader')
            .loader('tslint-loader')
            .options({})

    tsRule
        .exclude
            .add(/node_modules/)
            .end()
        .test(/\.ts(x?)$/)
        .use('awesome-typescript-loader')
            .loader('awesome-typescript-loader')
            .options({
                appendTsSuffixTo: [/\.vue$/]
            })
    
    const configPath = path.resolve(__dirname, `./tsconfig.json`)
    if (fs.existsSync(configPath)) {
        const tsconfig = fs.readFileSync(configPath, 'utf-8');
        fs.writeFileSync(path.resolve(__dirname, `../../tsconfig.json`), tsconfig);
    }

}
