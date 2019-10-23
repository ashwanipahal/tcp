const replace = require('replace-in-file');
const changeCase = require('change-case');

const atomsBasePath =
  './packages/{{componentPackageType}}/src/components/{{componentSrcType}}/{{componentFeatureName}}/{{componentContainerName}}/{{componentType}}/{{componentName}}';

const TextReplace = (ans, from, to) =>
  replace({
    files: `./packages/${ans.componentPackageType}/src/components/${
      ans.componentSrcType
    }/${ans.componentFeatureName || '**'}/${ans.componentContainerName || '**'}/${
      ans.componentType
    }/${changeCase.pascal(ans.componentName)}/**/*.*`,
    from,
    to,
  })
    .then(results => {
      return `Replacement results: ${results.filter(f => f.hasChanged).length} files updated`;
    })
    .catch(error => error.toString());

const atomActions = [
  // Add all the template files to the dest folder
  'Copying test files...',
  {
    type: 'add',
    path: `${atomsBasePath}/__tests__/{{componentName}}-test.jsx`,
    templateFile: './plop/templates/atom/__tests__/MyComponent-test.jsx',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/__tests__/{{componentName}}-test.native.jsx`,
    templateFile: './plop/templates/atom/__tests__/MyComponent-test.native.jsx',
  },
  'Copying style files..',
  {
    type: 'add',
    path: `${atomsBasePath}/styles/{{componentName}}.style.js`,
    templateFile: './plop/templates/atom/styles/MyComponent.style.js',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/styles/{{componentName}}.style.native.js`,
    templateFile: './plop/templates/atom/styles/MyComponent.style.native.js',
  },
  'Copying view files..',
  {
    type: 'add',
    path: `${atomsBasePath}/views/{{componentName}}.jsx`,
    templateFile: './plop/templates/atom/views/MyComponent.jsx',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/views/{{componentName}}.native.jsx`,
    templateFile: './plop/templates/atom/views/MyComponent.native.jsx',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/views/index.js`,
    templateFile: './plop/templates/atom/views/index.js',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/index.js`,
    templateFile: './plop/templates/atom/index.js',
  },
  'Copying story files..',
  {
    type: 'add',
    path: `${atomsBasePath}/stories/{{componentName}}.stories.jsx`,
    templateFile: './plop/templates/atom/stories/MyComponent.stories.jsx',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/stories/{{componentName}}.stories.native.jsx`,
    templateFile: './plop/templates/atom/stories/MyComponent.stories.native.jsx',
  },
  'Modifying the files...',
  function replaceTextOne(ans) {
    return TextReplace(ans, /MyComponent/g, changeCase.pascal(ans.componentName));
  },
  function replaceTextTwo(ans) {
    return TextReplace(ans, /MY_COMPONENT/g, changeCase.constant(ans.componentName));
  },
];
module.exports = {
  atomsBasePath,
  atomActions,
};
