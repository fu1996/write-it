const resource = {
    "intl3": "aaa {aaa} bbb {bbb} ccc",
};

const t = function(key, obj) {
   let template = resource[key];
   Object.keys(obj).forEach(key => {
    const resplaceKey = `{${key}}`;
    template = template.replace(resplaceKey, obj[key]);
    console.log('template', template, resplaceKey);
   })
   return template;
}

const c = t('intl3', {aaa:1, bbb:2})
console.log(c)

function replacer(match, p1, p2, p3, offset, string) {
    // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    return [p1, p2, p3].join(' - ');
  }
  var newString = 'abc12345#$*%'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
  console.log(newString);  // abc - 12345 - #$*%
  