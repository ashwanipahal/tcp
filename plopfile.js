/* eslint-disable dot-notation */
/**
 * A Plop JS based generator to create components in TCP project
 * Types of generators:
 * - Component
 * - Feature
 */
const glob = require('glob');
const path = require('path');
const replace = require('replace-in-file');

module.exports = function plopCli(plop) {
  // Component Path Base
  const componentPathBase =
    './packages/{{componentPackageType}}/src/components/{{componentSrcType}}/{{containerName}}/{{componentType}}/{{pascalCase componentName}}';

  // The types of packages in the monorepo
  const packageChoices = [
    { value: 'core', name: 'Core' },
    { value: 'mobileapp', name: 'Mobile App' },
    { value: 'web', name: 'Web' },
  ];

  // Source types
  const sourceChoices = [
    { value: 'feature', name: 'Feature' },
    { value: 'common', name: 'Common' },
  ];

  // Atomic types
  const atomicTypes = [
    { value: 'atoms', name: 'Atom' },
    { value: 'molecules', name: 'Molecule' },
    { value: 'hoc', name: 'HOC' },
    { value: 'organisms', name: 'Organism' },
  ];

  // create your generators here
  plop.setGenerator('Component', {
    description: 'Create a React/React Native component following the TCP guidelines',
    prompts: [
      {
        type: 'rawlist',
        name: 'componentPackageType',
        message: 'In which package are you creating the component?',
        choices: packageChoices,
        default: 0,
      },
      {
        type: 'rawlist',
        name: 'componentSrcType',
        message: 'Is it a common or feature component?',
        choices: sourceChoices,
        default: 0,
      },
      {
        type: 'rawlist',
        name: 'componentFeatureName',
        message: 'Which feature does it belong to?',
        choices: ans =>
          glob
            .sync(`./packages/${ans.componentPackageType}/src/components/features/*`)
            .map(f => path.basename(f)),
        when: ans => ans.componentSrcType === 'feature',
      },
      {
        type: 'confirm',
        name: 'createNewContainer',
        message: 'Dou you want to create new container?',
        when: ans => ans.componentSrcType === 'feature',
      },
      {
        type: 'rawlist',
        name: 'componentContainerName',
        message: 'Which feature does it belong to?',
        choices: ans =>
          glob
            .sync(
              `./packages/${ans.componentPackageType}/src/components/features/${
                ans.componentFeatureName
              }/*`
            )
            .map(f => path.basename(f)),
        when: ans => !ans.createNewContainer && ans.componentSrcType === 'feature',
      },
      {
        type: 'input',
        name: 'containerName',
        message: 'Container Name',
        when: ans => ans.createNewContainer && ans.componentSrcType === 'feature',
      },
      {
        type: 'rawlist',
        name: 'componentType',
        message: 'What type of component are you creating?',
        choices: atomicTypes,
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Component Name',
      },
    ], // array of inquirer prompts
    actions: data => {
      const actions = [];
      const atomActions = [
        // Add all the template files to the dest folder
        'Copying test files...',
        {
          type: 'add',
          path: `${componentPathBase}/__tests__/{{pascalCase componentName}}-test.jsx`,
          templateFile: './plop-templates/atom/__tests__/MyComponent-test.jsx',
        },
        {
          type: 'add',
          path: `${componentPathBase}/__tests__/{{pascalCase componentName}}-test.native.jsx`,
          templateFile: './plop-templates/atom/__tests__/MyComponent-test.native.jsx',
        },
        'Copying style files..',
        {
          type: 'add',
          path: `${componentPathBase}/styles/{{pascalCase componentName}}.style.js`,
          templateFile: './plop-templates/atom/styles/MyComponent.style.js',
        },
        {
          type: 'add',
          path: `${componentPathBase}/styles/{{pascalCase componentName}}.style.native.js`,
          templateFile: './plop-templates/atom/styles/MyComponent.style.native.js',
        },
        'Copying view files..',
        {
          type: 'add',
          path: `${componentPathBase}/views/{{pascalCase componentName}}.jsx`,
          templateFile: './plop-templates/atom/views/MyComponent.jsx',
        },
        {
          type: 'add',
          path: `${componentPathBase}/views/{{pascalCase componentName}}.native.jsx`,
          templateFile: './plop-templates/atom/views/MyComponent.native.jsx',
        },
        {
          type: 'add',
          path: `${componentPathBase}/views/index.js`,
          templateFile: './plop-templates/atom/views/index.js',
        },
        {
          type: 'add',
          path: `${componentPathBase}/index.js`,
          templateFile: './plop-templates/atom/index.js',
        },
        'Modifying the files...',
        ans =>
          replace({
            files: `./packages/${ans.componentPackageType}/src/components/${ans.componentSrcType}/${
              ans.containerName
            }/${ans.componentType}/**/*.*`,
            from: /MyComponent/g,
            to: 'bar',
          })
            .then(results => {
              console.log('Replacement results:', results);
            })
            .catch(error => {
              console.error('Error occurred:', error);
            }),
      ];
      if (
        data.componentType === 'atoms' ||
        data.componentType === 'molecules' ||
        data.componentType === 'organisms'
      ) {
        actions.push(atomActions);
      }
      return actions;
    }, // array of actions
  });
};
