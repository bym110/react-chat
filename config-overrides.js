const { override, fixBabelImports, addLessLoader,addDecoratorsLegacy } = require('customize-cra');


module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({ // antd自定义 主题颜色
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#FDBE32',
            '@link-color':'#FDBE32'
        },
    }),
    addDecoratorsLegacy() // 支持mobx @修饰符
);