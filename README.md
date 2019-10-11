#  node： 爬虫爬取网页图片

##  1. 依赖介绍

- `superagent`： 是用来发起请求的，是一个轻量、渐进式的`ajax api `，内部依赖`nodejs`原生的请求`api`，使用于`node`环境下，也可以使用`http`发起请求
- `superagent-charset`：防止爬取的数据乱码，更改字符格式
- `cheerio`：为服务器特别定制的，快速、灵活、实施的`jQuery`核心实现。

```javascript
var superagent = require('superagent');
var charset = require('superagent-charset');
charset(superagent);
const cheerio = require('cheerio');
```

##  2. 爬取数据

引入之后就请求网址：[微信头像](https://www.qqtn.com/tx/weixintx_1.html)





``` bash
node index.js
```



