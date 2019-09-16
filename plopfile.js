/* eslint-disable dot-notation */
/**
 * A Plop JS based generator to create components in TCP project
 * Types of generators:
 * - Component
 * - Feature
 */
const glob = require('glob');
const path = require('path');
const { atomActions } = require('./plop/utils/atomActions');

module.exports = function plopCli(plop) {
  // The types of packages in the monorepo
  const packageChoices = [
    { value: 'core', name: 'Core' },
    { value: 'mobileapp', name: 'Mobile App' },
    { value: 'web', name: 'Web' },
  ];

  // Source types
  const sourceChoices = [
    { value: 'features', name: 'Features' },
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
        when: ans => ans.componentSrcType === 'features',
      },
      {
        type: 'confirm',
        name: 'createNewContainer',
        message: 'Dou you want to create new container?',
        when: ans => ans.componentSrcType === 'features',
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
        when: ans => !ans.createNewContainer && ans.componentSrcType === 'features',
      },
      {
        type: 'input',
        name: 'componentContainerName',
        message: 'Container Name',
        when: ans => ans.createNewContainer && ans.componentSrcType === 'features',
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
      let actions = [];
      if (
        data.componentType === 'atoms' ||
        data.componentType === 'molecules' ||
        data.componentType === 'organisms'
      ) {
        actions = [...actions, ...atomActions];
      }
      return actions;
    }, // array of actions
  });
};
