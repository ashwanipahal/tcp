const replace = require('replace-in-file');
const changeCase = require('change-case');

const containerBasePath =
  './packages/{{componentPackageType}}/src/components/features/{{componentFeatureName}}/{{componentContainerName}}/container';

const TextReplace = (ans, from, to) =>
  replace({
    files: `./packages/${
      ans.componentPackageType
    }/src/components/features/${ans.componentFeatureName || '**'}/${ans.componentContainerName ||
      '**'}/container/**/*.*`,
    from,
    to,
  })
    .then(results => {
      return `Replacement results: ${results.filter(f => f.hasChanged).length} files updated`;
    })
    .catch(error => error.toString());

const containerActions = [
  // Add all the template files to the dest folder
  'Copying test files...',
  {
    type: 'add',
    path: `${containerBasePath}/__tests__/{{componentContainerName}}-test.jsx`,
    templateFile: './plop/templates/container/__tests__/MyComponent-test.jsx',
  },
  {
    type: 'add',
    path: `${containerBasePath}/__tests__/{{componentContainerName}}-test.native.jsx`,
    templateFile: './plop/templates/container/__tests__/MyComponent-test.native.jsx',
  },
  {
    type: 'add',
    path: `${containerBasePath}/__tests__/{{componentContainerName}}.container-test.jsx`,
    templateFile: './plop/templates/container/__tests__/MyComponent.container-test.jsx',
  },
  {
    type: 'add',
    path: `${containerBasePath}/__tests__/{{componentContainerName}}.actions-test.js`,
    templateFile: './plop/templates/container/__tests__/MyComponent.actions-test.js',
  },
  {
    type: 'add',
    path: `${containerBasePath}/__tests__/{{componentContainerName}}.reducer-test.js`,
    templateFile: './plop/templates/container/__tests__/MyComponent.reducer-test.js',
  },
  {
    type: 'add',
    path: `${containerBasePath}/__tests__/{{componentContainerName}}.saga-test.js`,
    templateFile: './plop/templates/container/__tests__/MyComponent.saga-test.js',
  },
  'Copying style files..',
  {
    type: 'add',
    path: `${containerBasePath}/styles/{{componentContainerName}}.style.js`,
    templateFile: './plop/templates/container/styles/MyComponent.style.js',
  },
  {
    type: 'add',
    path: `${containerBasePath}/styles/{{componentContainerName}}.style.native.js`,
    templateFile: './plop/templates/container/styles/MyComponent.style.native.js',
  },
  'Copying view files..',
  {
    type: 'add',
    path: `${containerBasePath}/views/{{componentContainerName}}.jsx`,
    templateFile: './plop/templates/container/views/MyComponent.jsx',
  },
  {
    type: 'add',
    path: `${containerBasePath}/views/{{componentContainerName}}.native.jsx`,
    templateFile: './plop/templates/container/views/MyComponent.native.jsx',
  },
  {
    type: 'add',
    path: `${containerBasePath}/views/index.js`,
    templateFile: './plop/templates/container/views/index.js',
  },
  'Copying base files...',
  {
    type: 'add',
    path: `${containerBasePath}/index.js`,
    templateFile: './plop/templates/container/index.js',
  },
  {
    type: 'add',
    path: `${containerBasePath}/{{componentContainerName}}.container.jsx`,
    templateFile: './plop/templates/container/MyComponent.container.jsx',
  },
  {
    type: 'add',
    path: `${containerBasePath}/{{componentContainerName}}.actions.js`,
    templateFile: './plop/templates/container/MyComponent.actions.js',
  },
  {
    type: 'add',
    path: `${containerBasePath}/{{componentContainerName}}.reducer.js`,
    templateFile: './plop/templates/container/MyComponent.reducer.js',
  },
  {
    type: 'add',
    path: `${containerBasePath}/{{componentContainerName}}.saga.js`,
    templateFile: './plop/templates/container/MyComponent.saga.js',
  },
  {
    type: 'add',
    path: `${containerBasePath}/{{componentContainerName}}.constants.js`,
    templateFile: './plop/templates/container/MyComponent.constants.js',
  },
  'Modifying the files...',
  function replaceTextOne(ans) {
    return TextReplace(ans, /MyComponent/g, changeCase.pascal(ans.componentContainerName));
  },
  function replaceTextTwo(ans) {
    return TextReplace(ans, /MY_COMPONENT/g, changeCase.constant(ans.componentContainerName));
  },
];
module.exports = {
  containerBasePath,
  containerActions,
};
