var express = require('express')
var superagent = require('superagent')
var charset = require('superagent-charset')
var cheeio = require('cheerio')

var app = express()

charset(superagent)

var baseUrl = 'https://www.qqtn.com/'; //输入任何网址都可以
app.get('/index', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  var type = req.query.type || 'weixin'
  var page = req.query.page || '1'
  var route = `tx/${type}tx_${page}.html`

  // 网页页面信息是gb2312，所以chaeset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
  superagent.get(baseUrl + route)
    .charset('gb2312')
    .end(function (err, res1) {
      var items = [];
      if (err) {
        console.log('Err:' + err);
        res.json({
          code: 400,
          msg: err,
          data: items
        })
      }

      var $ = cheeio.load(res1.text)
      $('div.g-main-bg ul.g-gxlist-imgbox li a').each(function (idx, element) {
        var $element = $(element);
        var $subElement = $element.find('img');
        var thumbImgSrc = $subElement.attr('src');
        items.push({
          title: $(element).attr('title'),
          href: $element.attr('href'),
          thumbSrc: thumbImgSrc
        });
      })

      res.json({ code: 200, msg: 'success', data: items });
    })
})

app.listen(3000);