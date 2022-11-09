require('dotenv').config();

module.exports = {
  packagerConfig: {
    // osxSign: {
    //   identity: `Developer ID Application: Loadmill LTD (${process.env.LOADMILL_KEY_CODE})`,
    //   'hardened-runtime': true,
    //   entitlements: 'entitlements.plist',
    //   'entitlements-inherit': 'entitlements.plist',
    //   'signature-flags': 'library'
    // },
    // osxNotarize: {
    //   tool: 'notarytool',
    //   appleId: process.env.APPLE_ID,
    //   appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
    //   teamId: process.env.LOADMILL_KEY_CODE,
    // }
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'loadmill',
          name: 'loadmill-desktop-agent'
        },
        // authToken: process.env.GITHUB_TOKEN
        // prerelease: true
      }
    }
  ],
  makers: [
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
    // {
    //   'name': '@electron-forge/maker-deb',
    //   'config': {}
    // },
    // {
    //   'name': '@electron-forge/maker-rpm',
    //   'config': {}
    // }
  ],
  plugins: [
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
