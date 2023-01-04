### 一、介绍

静态模块打包工具。
当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个依赖图，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

核心概念：入口、输出、loader、插件、模式、浏览器兼容性、环境

入口(entry)：指示`webpack`应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，`webpack`会找出有哪些模块和库是入口起点（直接和间接）依赖的。

配置`entry`来指定一个（或多个）不同的入口起点。

```
module.exports = {
    entry: {
        app: './src/main.js'
    }
}
```

输出(output)：在哪里输出它所创建的`bundle`，以及如何命名这些文件。
```
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack.bundle.js'
    }
}
```

loader：webpack 只能理解 JavaScript 和 JSON 文件，loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在 webpack 的配置中，loader 有两个属性：
* test 属性，识别出哪些文件会被转换。
* use 属性，定义出在进行转换时，应该使用哪个 loader。

含义：遇见在require()/import语句中被解析为'.vue'的路径时，在打包它之前，先use对应的loader转换一下。
```
module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack.bundle.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        },{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
}
```

插件(plugin)：用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

想要使用一个插件，你只需要 require() 它，然后把它添加到 plugins 数组中。多数插件可以通过选项(option)自定义。你也可以在一个配置文件中因为不同目的而多次使用同一个插件，这时需要通过使用 new 操作符来创建一个插件实例。
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
    module:{
        rules:[
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    },
    plugins:[
      new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
};
```

模式（model）:通过选择 development, production 或 none 之中的一个，来设置 mode 参数，你可以启用 webpack 内置在相应环境下的优化。
```
module.exports = {
    mode: 'production'
}
```

### 二、入口起点
webpack配置中有很多种方式定义`entry`属性

单个入口语法
用法：`entry: string | [string]`
```
module.exports = {
    entry: './path/to/my/entry/file.js'
}
```
```
module.exports = {
    entry: {
        main: './path/to/my/entry/file.js'
    }
}
```
```
module.exports = {
    entry: ['./src/file1.js', './src/file2.js']
}
```
对象语法
用法：`entry: { <entryChunkName> string | [string]} | {}`
```
module.exports = {
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }
}
```
描述入口的对象
用于描述入口的对象，可以使用以下属性：
* `dependOn`: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。
* `filename`: 指定要输出的文件名称。
* `import`: 启动时需加载的模块。
* `library`: 指定 library 选项，为当前 entry 构建一个 library。
* `runtime`: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。
* `publicPath`: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。

`runtime`和`dependOn`不应在同一个入口上同时使用，所以如下配置无效，并且会抛出错误；另外 dependOn 不能是循环引用的，非则也会出现错误。

```
module.exports = {
    entry: {
        a: './a',
        b: {
            runtime: 'x2',
            dependOn: 'a',
            import: './b'
        }
    }
}
```
实例（分离app（应用程序）和vendor（第三方库）入口）：

webpack.config.js
```
module.exports = {
    entry: {
        main: './src/app.js',
        vendor: './src/vendor.js'
    }
}
```
webpack.prod.js
```
module.exports = {
    output: {
        filename: '[name].[contenthash].bundle.js'
    }
}
```
webpack.dev.js
```
module.exports = {
    output: {
        filename: '[name].bundle.js'
    }
}
```
解析：这是告诉 webpack 配置 2 个单独的入口点；这样就可以在 vendor.js 中存入未做修改的必要 library 或文件，然后将它们打包在一起成为单独的 chunk 。内容哈希保持不变，这使浏览器可以独立地缓存它们，从而减少了加载时间。

### 三、输出
可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。
#### 1、用法
在 webpack 配置中，output 属性的最低要求是，将它的值设置为一个对象，然后为将输出文件的文件名配置为一个 output.filename；
```
module.exports = {
  output: {
    filename: 'bundle.js',
  },
};
```
此配置将一个单独的 bundle.js 文件输出到 dist 目录中。
#### 2、多个入口起点
如果配置中创建出多于一个 "chunk"，则应该使用 占位符(substitutions) 来确保每个文件具有唯一的名称。
```
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
};

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

### 四、loader
#### 1、示例
使用 loader 告诉 webpack 加载 CSS 文件，或者将 TypeScript 转为 JavaScript。为此，首先安装相对应的 loader：
```
npm install --save-dev css-loader ts-loader
```
然后指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader：

webpack.config.js
```
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
};
```
#### 2、使用loader
两种使用loader方式：
* 配置方式：在webpack.config.js文件中指定loader
* 内联方式：在每个import语句中显式指定loader

#### 3、loader特性
* loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
* loader 可以是同步的，也可以是异步的。
* loader 运行在 Node.js 中，并且能够执行任何操作。
* loader 可以通过 options 对象配置。
* 除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块。
* 插件(plugin)可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。

### 五、plugin
