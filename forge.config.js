require('dotenv').config();

module.exports = {
  makers: [
    {
      'config': {
        'name': 'loadmill_desktop_agent'
      },
      'name': '@electron-forge/maker-squirrel',
    },
    {
      'name': '@electron-forge/maker-zip',
      'platforms': [
        'darwin'
      ]
    },
  ],
  packagerConfig: {
    icon: './images/icon',
    osxNotarize: {
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
      teamId: process.env.LOADMILL_KEY_CODE,
      tool: 'notarytool',
    },
    osxSign: {
      entitlements: 'entitlements.plist',
      'entitlements-inherit': 'entitlements.plist',
      'hardened-runtime': true,
      identity: `Developer ID Application: Loadmill LTD (${process.env.LOADMILL_KEY_CODE})`,
      'signature-flags': 'library',
    },
  },
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
  ],
  publishers: [
    {
      config: {
        authToken: process.env.GITHUB_TOKEN,
        draft: false,
        prerelease: false,
        repository: {
          name: 'loadmill-desktop-agent',
          owner: 'loadmill',
        },
      },
      name: '@electron-forge/publisher-github',
    }
  ],
};
