const replace = require('replace-in-file');
const changeCase = require('change-case');

const atomsBasePath =
  './packages/{{componentPackageType}}/src/components/{{componentSrcType}}/{{componentFeatureName}}/{{componentContainerName}}/{{componentType}}/{{pascalCase componentName}}';

const TextReplace = ans =>
  replace({
    files: `./packages/${ans.componentPackageType}/src/components/${
      ans.componentSrcType
    }/${ans.componentFeatureName || '**'}/${ans.componentContainerName || '**'}/${
      ans.componentType
    }/${changeCase.pascal(ans.componentName)}/**/*.*`,
    from: /MyComponent/g,
    to: changeCase.pascal(ans.componentName),
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
    path: `${atomsBasePath}/__tests__/{{pascalCase componentName}}-test.jsx`,
    templateFile: './plop/templates/atom/__tests__/MyComponent-test.jsx',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/__tests__/{{pascalCase componentName}}-test.native.jsx`,
    templateFile: './plop/templates/atom/__tests__/MyComponent-test.native.jsx',
  },
  'Copying style files..',
  {
    type: 'add',
    path: `${atomsBasePath}/styles/{{pascalCase componentName}}.style.js`,
    templateFile: './plop/templates/atom/styles/MyComponent.style.js',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/styles/{{pascalCase componentName}}.style.native.js`,
    templateFile: './plop/templates/atom/styles/MyComponent.style.native.js',
  },
  'Copying view files..',
  {
    type: 'add',
    path: `${atomsBasePath}/views/{{pascalCase componentName}}.jsx`,
    templateFile: './plop/templates/atom/views/MyComponent.jsx',
  },
  {
    type: 'add',
    path: `${atomsBasePath}/views/{{pascalCase componentName}}.native.jsx`,
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
  'Modifying the files...',
  function replaceTextOne(ans) {
    return TextReplace(ans);
  },
];
module.exports = {
  atomsBasePath,
  atomActions,
};
