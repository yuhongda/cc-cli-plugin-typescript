const path = require('path');
const fs = require('fs');

module.exports = (webpackConfig) => {

    webpackConfig.resolve
      .extensions
        .merge(['.ts', '.tsx'])

    const tslintRule = config.module.rule('tslint')
    const tsRule = config.module.rule('ts')

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
    
    const configPath = path.resolve(__dirname, `./node_modules/cc-cli-plugin-typescript/tsconfig.json`)
    if (fs.existsSync(configPath)) {
        const tsconfig = fs.readFileSync(configPath, 'utf-8');
        fs.writeFileSync('./tsconfig.json', tsconfig);
    }

}
