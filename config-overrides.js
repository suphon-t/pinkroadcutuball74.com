const { override, fixBabelImports, addLessLoader } = require('customize-cra')
const path = require('path')

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { 
      '@primary-color': '#EE7398',
      '@link-color': '#EE7398' 
    },
  }),
  config => {
    const alias = config.resolve.alias || {};
    alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './src/icons.js');
    config.resolve.alias = alias;
    return config;
  },
)
