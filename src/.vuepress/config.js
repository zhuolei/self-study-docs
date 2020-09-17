/**
 * 主要实现:
 *
 * 1. 文件目录结构 --> 导航栏结构  (每个顶级父目录为 nav 标题,  子目录为下拉列表)
 * 2. 文本文档 ---> 侧边栏导航结构  (每个最低级子目录对应一个页面, 对应一个sidebar)
 */


/**
 * 修改配置, 直接修改 config 对象即可
 *
 * 1. 站点LOGO
 * 2. 服务器端口
 * 3. 主题配置: 侧边栏 , 导航条
 * 4. Other ...
 */
const fs = require('fs');
const path = require("path");
const rootpath = path.dirname(__dirname);

/**
 * string比较工具类
 */
const str = {
    contains: function (string, substr, isIgnoreCase)
    {
        if (isIgnoreCase)
        {
            string = string.toLowerCase();
            substr = substr.toLowerCase();
        }

        var startChar = substr.substring(0, 1);
        var strLen = substr.length;

        for (var j = 0; j<string.length - strLen + 1; j++)
        {
            if (string.charAt(j) == startChar)  //如果匹配起始字符,开始查找
            {
                if (string.substring(j, j+strLen) == substr)  //如果从j开始的字符与str匹配，那ok
                {
                    return true;
                }   
            }
        }
        return false;
    }  
};

/**
 * 文件助手: 主要用于读取当前文件下的所有目录和文件
 */
const filehelper = {
    getAllFiles: function (rpath) {
        let filenames = [];
        fs.readdirSync(rpath).forEach(file => {
            fullpath = rpath + "/" + file;
            var fileinfo = fs.statSync(fullpath);
            // 过滤 .DS_Store
            if (fileinfo.isFile() && !str.contains(file,"DS_Store",true) && file.endsWith('md')) {
                if (file === 'README.md' || file === 'readme.md') {
                    file = '';
                } else {
                    file = file.replace('.md', '');
                }
                filenames.push(file);
            }
        });
        filenames.sort();
        return filenames;
    },
    getAllDirs: function getAllDirs(mypath = '.') {
        const items = fs.readdirSync(mypath);
        let result = [];
        // 遍历当前目录中所有文件夹
        items.map(item => {
            let temp = path.join(mypath, item);           
            // 过滤无关的文件夹
            if (fs.statSync(temp).isDirectory() && !item.startsWith(".") && !str.contains(item,"DS_Store",true)) {
                let path = mypath + "/" + item + "/";
                console.log(':::path:::', path);
                result.push(path);
                result = result.concat(getAllDirs(temp));
            }

        });
        return result;
    },

};

// nav的链接路径
var navLinks = [];

// 侧边栏
var sidebar = {};

// 导航栏
var nav = getNav();

function genSideBar() {
    var sidebars = {};
    var allDirs = filehelper.getAllDirs(rootpath);
    console.log(':::alldirs:::', allDirs);

    allDirs.forEach(item => {
        let dirFiles = filehelper.getAllFiles(item);
        let dirname = item.replace(rootpath, "");
        if (dirname.startsWith('\\')) {
            dirname = dirname.replace('\\', '\/');
        }
        console.log(':::dirname:::', dirname);
        if(!dirname.endsWith('img/') && !dirname.startsWith('/asset')) navLinks.push(dirname);
        if ((dirFiles.length > 1)) {
            sidebars[dirname] = dirFiles;
        }
    });

    sidebar = sidebars
}

/**
 * 先生成所有nav文件链接;
 * @param filepaths
 * @returns {Array}
 */
function genNavLink(filepaths) {
    genSideBar();
    var navLinks = [];
    console.log(':::filepaths:::', filepaths);
    filepaths.forEach(p => {
        var ss = p.toString().split("/");
        var name = ss[ss.length - 2];
        var parent = p.replace(name + "/", "");
        navLinks.push({
            text: name,
            link: p,
            items: [],
            parent: parent
        });

    });

    return navLinks;

}

/**
 * 自定义排序文件夹
 * @param a
 * @param b
 * @returns {number}
 */
function sortDir(a, b) {
    let al = a.parent.toString().split("/").length;
    let bl = b.parent.toString().split("/").length;
    if (al > bl) {
        return 1;
    }
    if (al === bl) {
        return 0;
    }
    if (al < bl) {
        return -1;
    }
}


/**
 * 生成最终的 nav配置信息
 * @param navLinks
 * @returns {Array}
 */

function getNav() {
    console.log(':::navLinks:::', navLinks);
    let nnavs = genNavLink(navLinks);
    nnavs.sort(sortDir);
    var iniMap = {};
    var result = [];
    var delMap = {};
    nnavs.forEach(l => {
        iniMap[l.link] = l;
    });
    nnavs.forEach(l => {
        var parentLink = l.parent;
        if (parentLink !== "/") {
            iniMap[parentLink].items.push(l);
            delMap[l.link] = l;
        }
    });
    for (var k in iniMap) {
        if (delMap[k] != null) {
            delete iniMap[k];
            continue;
        }
        result.push(iniMap[k])
    }

    return result;
}

/**
 * Vuepress 最终需要的配置信息, 修改其他信息在此处配置
 */
console.log(':::nav:::', JSON.stringify(nav));
console.log(':::sidebar:::', sidebar);
var config = {
  title: 'Self Study',
  dest: 'docs',
  docsDir: 'src',
  themeConfig: {
    nav: nav,
    sidebar: sidebar,
    sidebarDepth: 3
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@pic': '../../assets',
        '@home': './assets'
      }
    }
  },
  plugins: [
    'vuepress-plugin-export',
    ['demo-code', {
      jsLibs: [
          // umd
          'https://unpkg.com/tua-storage/dist/TuaStorage.umd.js',
      ],
      cssLibs: [
          'https://unpkg.com/animate.css@3.7.0/animate.min.css',
      ],
      showText: 'show code',
      hideText: 'hide',
      styleStr: 'text-decoration: underline;',
      minHeight: 200,
      onlineBtns: {
          codepen: true,
          jsfiddle: true,
          codesandbox: true,
      },
      codesandbox: {
          deps: { 'lodash': 'latest' },
          json: '',
          query: '',
          embed: '',
      },
      demoCodeMark: 'demo-code',
      copyOptions: {},
    }]
  ],
}
module.exports = config;