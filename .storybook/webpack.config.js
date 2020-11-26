const path = require('path')
const threadLoader = require('thread-loader')

const jsWorkerCommonOptions = {
  workers: 2,
  workerParallelJobs: 50,
  poolParallelJobs: 50,
}

const babelWorkerOptions = {
  ...jsWorkerCommonOptions,
  name: 'babel-pool',
}

const tsWorkerOptions = {
  ...jsWorkerCommonOptions,
  name: 'ts-pool',
}

const { TsConfigPathsPlugin } = require('awesome-typescript-loader')
const webpack = require('webpack')

module.exports = ({ config, mode }) => {
  if (mode !== 'PRODUCTION') {
    threadLoader.warmup(babelWorkerOptions, ['babel-loader'])
    threadLoader.warmup(tsWorkerOptions, ['babel-loader'])
  }

  config.resolve.plugins = [new TsConfigPathsPlugin({})]
  config.plugins.push(
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'development',
    }),
  )

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      { loader: 'cache-loader' },
      { loader: 'thread-loader', options: tsWorkerOptions },
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-typescript'],
        },
      },
    ],
  })

  // config.module.rules.push({
  //     test: /\.jsx?$/,
  //     include: [
  //         path.resolve(__dirname, '../node_modules/react-native'),
  //         path.resolve(__dirname, '../node_modules/native-base'),
  //         path.resolve(
  //             __dirname,
  //             '../node_modules/react-native-simple-toast',
  //         ),
  //         path.resolve(__dirname, '../node_modules/react-native-router-flux'),
  //         path.resolve(__dirname, '../react-native-fingerprint-scanner'),
  //         path.resolve(__dirname, '../node_modules/react-navigation'),
  //         path.resolve(
  //             __dirname,
  //             '../node_modules/@react-native-community/async-storage',
  //         ),
  //         path.resolve(
  //             __dirname,
  //             '../node_modules/react-native-safe-area-view',
  //         ),
  //         // path.resolve(__dirname, '../node_modules/react-persist'),
  //         // path.resolve(__dirname, "../node_modules/@expo/vector-icons"),
  //         // path.resolve(__dirname, "../node_modules/react-native-ratings"),
  //         // path.resolve(__dirname, "../node_modules/react-native-status-bar-height")
  //     ],
  //     use: [
  //         { loader: 'cache-loader' },
  //         { loader: 'thread-loader', options: babelWorkerOptions },
  //         {
  //             loader: 'babel-loader?cacheDirectory?true',
  //             options: {
  //                 presets: [
  //                     'module:metro-react-native-babel-preset',
  //                     '@babel/preset-flow',
  //                 ],
  //             },
  //         },
  //     ],
  // })

  // config.module.rules.push({
  //     test: /\.story\.tsx?$/,
  //     loaders: [
  //         {
  //             loader: require.resolve('@storybook/addon-storysource/loader'),
  //             options: { parser: 'typescript' },
  //         },
  //     ],
  //     enforce: 'pre',
  // })

  // config.resolve = {
  //     alias: {
  //         'react-native': 'react-native-web',
  //         '@react-native-community/async-storage': 'react-native-web',
  //         'react-native-firebase': 'firebase',
  //         '@react-native-firebase/app': 'firebase',
  //         '@react-native-firebase/analytics': 'firebase',
  //         '@react-native-firebase/app': 'firebase',
  //         '@react-native-firebase/crashlytics': 'firebase',
  //         '@react-native-firebase/database': 'firebase',
  //         '@react-native-firebase/remote-config': 'firebase',
  //         'react-native-simple-toast': 'react-native-web',
  //     },
  //     extensions: ['.web.js', '.js', '.ts', '.web.ts', '.tsx', '.web.tsx'],
  // }
  return config
}