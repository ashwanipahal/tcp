let editJSONContainer;

/**
 * Displays a popup allowing editing of a given value. The value is
 * displayed as a json.
 * @param  {string}   title         the title of this popup
 * @param             valueToEdit   the value to display and allow editing of
 * @return {Promise}  If the user presses the "proceed" button, then the promise
 *                       resolves to the value as edited by the user; if the user
 *                       presses the 'Simulate-Error' button, then the promise rejects
 *                       with a generic error string.
 */
export default function editJsonPopup(title, valueToEdit, requestData) {
  // This is set in the ApiToggleForm.jsx
  if (
    !(
      window.localStorage.getItem('isPauseOnApi') === 'true' ||
      !window.localStorage.getItem('isPauseOnApi')
    )
  ) {
    return valueToEdit;
  }

  return new Promise((resolve, reject) => {
    if (!editJSONContainer) {
      editJSONContainer = document.createElement('div');
      editJSONContainer.id = 'editJSONContainer';

      const acceptAll = document.createElement('button');
      acceptAll.innerHTML = 'Continue all';
      acceptAll.onclick = e => {
        e.preventDefault();
        while (editJSONContainer.children.length > 1) {
          editJSONContainer.children[1].children[4].onclick();
        }
      };
      acceptAll.setAttribute(
        'style',
        'margin: 0 5px; background: #000;  color: #fff; padding: 5px;'
      );
      editJSONContainer.appendChild(acceptAll);
    }

    // create elements for the popup form
    const form = document.createElement('form');
    const formTitle = document.createElement('legend');
    const textArea = document.createElement('textArea');
    const edit = document.createElement('button');
    const showRequest = document.createElement('button');
    const proceed = document.createElement('button');
    const simulateError = document.createElement('button');

    const closeEditJSONForm = formObj => {
      formObj.parentNode.removeChild(form);

      if (editJSONContainer.children.length === 1) {
        editJSONContainer.parentNode.removeChild(editJSONContainer);
      }
    };

    // loading title
    formTitle.innerHTML = title;

    // give it a bit of styling
    edit.innerHTML = 'Edit Reply';
    showRequest.innerHTML = 'Show Request';
    simulateError.innerHTML = 'Simulate error';
    proceed.innerHTML = 'Continue';

    editJSONContainer.setAttribute(
      'style',
      'z-index: 999999999; overflow: auto; max-height: calc(100vh - 20px); position: fixed; left: 10px; top: 10px; width: 700px; padding: 10px; background: rgba(240,240,240,.85);'
    );
    form.setAttribute(
      'style',
      'margin: 5px 0; width: 100%; padding: 5px 0; border-top: 1px solid #000;'
    );
    textArea.setAttribute(
      'style',
      'width: 100%; height: 250px; margin-top: 10px; font-size: 13px;'
    );

    const buttonStyle = 'margin: 0 5px; background: #000;  color: #fff; padding: 5px;';
    const buttonDisabledStyle = 'margin: 0 5px; background: #bbb;  color: #ccc; padding: 5px;';
    edit.setAttribute('style', buttonStyle);
    proceed.setAttribute('style', buttonStyle);
    simulateError.setAttribute('style', buttonStyle);

    if (typeof requestData !== 'undefined') {
      showRequest.setAttribute('style', buttonStyle);
    } else {
      showRequest.disabled = true;
      showRequest.setAttribute('style', buttonDisabledStyle);
    }

    textArea.value = JSON.stringify(valueToEdit, null, 4);

    // define click handlers
    edit.onclick = e => {
      e.preventDefault();
      form.appendChild(textArea);
    };

    showRequest.onclick = e => {
      e.preventDefault();
      window.alert(JSON.stringify(requestData, null, 2));
    };

    simulateError.onclick = e => {
      e.preventDefault();
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({
        response: {
          body: {
            ...JSON.parse(textArea.value),
          },
        },
      });
      closeEditJSONForm(form);
    };

    proceed.onclick = e => {
      e.preventDefault();
      resolve(JSON.parse(textArea.value));
      closeEditJSONForm(form);
    };

    // append elements to their parents
    form.appendChild(formTitle);
    form.appendChild(edit);
    form.appendChild(showRequest);
    form.appendChild(simulateError);
    form.appendChild(proceed);
    editJSONContainer.appendChild(form);

    document.body.insertBefore(editJSONContainer, document.body.children[0]);
  });
}
