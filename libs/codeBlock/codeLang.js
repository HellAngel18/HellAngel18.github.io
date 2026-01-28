// 代码块语言识别

/*$(function () {
  var $highlight_lang = $('<div class="code_lang" title="代码语言"></div>');

  $('pre').before($highlight_lang);
  $('pre').each(function () {
    var code_language = $(this).attr('class');

    if (!code_language) {
      return true;
    };
    var lang_name = code_language.replace("line-numbers", "").trim().replace("language-", "").trim();

    // 首字母大写
    // lang_name = lang_name.slice(0, 1).toUpperCase() + lang_name.slice(1);
    
    $(this).siblings(".code_lang").text(lang_name);
  });
});*/

// 代码块语言识别
$(function () {
  // 1. 给 pre 标签包裹一层 div (为了显示红黄绿圆点)
  // 注意：如果 codeBlockFuction.js 里已经有了 wrap 操作，这里可以省略，但为了保险起见，保留判断
  $('pre').each(function () {
    if (!$(this).parent().hasClass('code-area')) {
       $(this).wrap('<div class="code-area" style="position: relative"></div>');
    }
  });

  // 2. 插入语言名称标签
  var $highlight_lang = $('<div class="code_lang" title="代码语言"></div>');
  
  $('pre').after($highlight_lang);
  
  $('pre').each(function () {
    var code_language = "";
    var lang_name = "";

    // 优先尝试从 code 标签获取 class (Prism 的标准做法)
    var $code = $(this).find('code');
    if ($code.length > 0) {
        code_language = $code.attr('class');
    }
    
    // 如果 code 没找到，尝试从 pre 找
    if (!code_language) {
        code_language = $(this).attr('class');
    }

    if (!code_language) {
      lang_name = "Code"; // 没找到语言时的默认显示
    } else {
      // 提取 language- 后面的名字
      lang_name = code_language.replace("line-numbers", "").trim();
      if (lang_name.indexOf("language-") !== -1) {
         lang_name = lang_name.split("language-")[1];
      }
    }

    // 首字母大写
    if (lang_name && lang_name !== "Code") {
        lang_name = lang_name.slice(0, 1).toUpperCase() + lang_name.slice(1);
    }
    
    // 将语言名称填入对应的标签
    $(this).siblings(".code_lang").text(lang_name);
  });
});
