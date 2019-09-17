const replace = require('replace-in-file');
const changeCase = require('change-case');

const hocBasePath =
  './packages/{{componentPackageType}}/src/components/{{componentSrcType}}/{{componentFeatureName}}/{{componentContainerName}}/{{componentType}}/{{hocName}}';

const TextReplace = (ans, from, to) =>
  replace({
    files: `./packages/${ans.componentPackageType}/src/components/${
      ans.componentSrcType
    }/${ans.componentFeatureName || '**'}/${ans.componentContainerName || '**'}/${
      ans.componentType
    }/${changeCase.camel(ans.hocName)}/**/*.*`,
    from,
    to,
  })
    .then(results => {
      return `Replacement results: ${results.filter(f => f.hasChanged).length} files updated`;
    })
    .catch(error => error.toString());

const hocActions = [
  // Add all the template files to the dest folder
  'Copying test files...',
  {
    type: 'add',
    path: `${hocBasePath}/__tests__/{{hocName}}-test.jsx`,
    templateFile: './plop/templates/hoc/__tests__/MyHoc-test.jsx',
  },
  'Copying HOC files..',
  {
    type: 'add',
    path: `${hocBasePath}/{{hocName}}.jsx`,
    templateFile: './plop/templates/hoc/MyHoc.jsx',
  },
  {
    type: 'add',
    path: `${hocBasePath}/index.js`,
    templateFile: './plop/templates/hoc/index.js',
  },
  'Modifying the files...',
  function replaceTextOne(ans) {
    return TextReplace(ans, /MyHoc/g, changeCase.camel(ans.hocName));
  },
];
module.exports = {
  hocBasePath,
  hocActions,
};
