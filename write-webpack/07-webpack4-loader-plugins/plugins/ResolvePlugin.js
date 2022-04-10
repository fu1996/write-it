var path = require('path');
var assign = require('object-assign');
var forEachBail = require('enhanced-resolve/lib/forEachBail');
var basename = require('enhanced-resolve/lib/getPaths').basename;

module.exports = function (options) {
  var optionsToUse = (typeof options === 'boolean') ? { honorIndex: options } : (options || {});
  var mainFields = optionsToUse.honorPackage,
      exclude = optionsToUse.exclude,
      include = optionsToUse.include;
  optionsToUse.mainFields = mainFields !== false && !Array.isArray(mainFields) ? ["main"] : mainFields;
  // make exclude array if not
  optionsToUse.exclude = exclude && !Array.isArray(exclude) ? [exclude] : exclude;
  // make include array if not
  optionsToUse.include = include && !Array.isArray(include) ? [include] : include;
  return {
    apply: doApply.bind(this, optionsToUse)
  };
};

function stringIncludes(string, maybeString) {
  // String.includes throws if the argument is not a string
  return typeof maybeString === 'string' ? string.includes(maybeString) : false;
}

function doApply(options, resolver) {
  const {targetFileSuffix = '', includeFileSuffix = []} = options;
  // file type taken from: https://github.com/webpack/enhanced-resolve/blob/v4.0.0/test/plugins.js
  var target = resolver.ensureHook("undescribed-raw-file");
  // 在存在 文件夹之前
  resolver.getHook("before-existing-file")
    .tapAsync("DirectoryNamedWebpackPlugin", (request, resolveContext, callback) => {
      if (options.ignoreFn && options.ignoreFn(request)) {
        return callback();
      }
  
      var dirPath = request.path;
      var dirName = basename(dirPath); // foo.js
      var attempts = [];
  
      // return if path matches with excludes
      if (options.exclude && options.exclude.some(function(exclude) {
        return dirPath.search(exclude) >= 0 || stringIncludes(dirPath, exclude);
      })) {
        return callback();
      }
  
      // return if path doesn't match with includes
      if (options.include && !options.include.some(function(include) {
        return dirPath.search(include) >= 0 || stringIncludes(dirPath, include);
      })) {
        return callback();
      }
  
      if (options.mainFields) {
        try {
          var pkg = require(path.resolve(dirPath, "package.json"));
          options.mainFields.forEach(function(field) {
            pkg[field] && attempts.push(pkg[field]);
          });
        } catch (e) {
          // No problem, this is optional.
        }
      }
  
      if (options.honorIndex) {
        const joinSuffix = includeFileSuffix.map(fileSuffix => `.${targetFileSuffix}${fileSuffix}`)
        attempts.push(...joinSuffix);
      }
  
      // if (options.transformFn) {
      //   var transformResult = options.transformFn(dirName, dirPath, request);
  
      //   if (!Array.isArray(transformResult)) {
      //     transformResult = [transformResult];
      //   }
  
      //   transformResult = transformResult.filter(function (attemptName) {
      //     return typeof attemptName === 'string' && attemptName.length > 0;
      //   });
  
      //   attempts = attempts.concat(transformResult);
      // } else {
      //   attempts.push(dirName+ '.h5');
      // }
  
      forEachBail(
        attempts,
  
        function (fileName, innerCallback) {
          // approach taken from: https://github.com/webpack/enhanced-resolve/blob/v4.0.0/lib/CloneBasenamePlugin.js
          const splitFileName = path.extname(dirPath) // .js
          dirPath = dirPath.replace(dirName,'')
          var filePath = resolver.join(dirPath, dirName.replace(splitFileName, fileName));  
          var obj = assign({}, request, {
            path: filePath,
            relativePath: request.relativePath && resolver.join(request.relativePath.replace(dirName,''), dirName.replace(splitFileName, fileName))
          });
          resolver.doResolve(target, obj, "using path: " + filePath, resolveContext, innerCallback);
        },
        
        callback
      );
    });
}
