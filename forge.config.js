
require('dotenv').config();

module.exports = {
  'packagerConfig': {},
  'publishers': [
    {
      'name': '@electron-forge/publisher-s3',
      'config': {
        'bucket': 'desktop-agent',
        // 'folder': 'releases',
        'region': 'us-east-1',
        // 'public': true,
        'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
        'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
      }
    }
  ],
  'makers': [
    {
      'name': '@electron-forge/maker-squirrel',
      'config': {
        'name': 'loadmill_desktop_agent'
      }
    },
    {
      'name': '@electron-forge/maker-zip',
      'platforms': [
        'darwin'
      ]
    },
    {
      'name': '@electron-forge/maker-deb',
      'config': {}
    },
    {
      'name': '@electron-forge/maker-rpm',
      'config': {}
    }
  ],
  'plugins': [
    [
      '@electron-forge/plugin-webpack',
      {
        'mainConfig': './webpack.main.config.js',
        'renderer': {
          'config': './webpack.renderer.config.js',
          'entryPoints': [
            {
              'html': './src/index.html',
              'js': './src/renderer.ts',
              'name': 'main_window',
              'preload': {
                'js': './src/preload.ts'
              }
            }
          ]
        }
      }
    ],
    [
      '@timfish/forge-externals-plugin',
      {
        'externals': [
          'vm2'
        ],
        'includeDeps': true
      }
    ]
  ]
};
