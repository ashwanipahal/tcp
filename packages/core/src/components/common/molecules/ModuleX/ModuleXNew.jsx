import React, { useState } from 'react';

const ModuleX = ({ html }) => {
  // create new div to modify (won't be rendered to DOM)
  const newDiv = document.createElement('div');
  newDiv.innerHTML = html;
  // extract script tags
  const scripts = Array.prototype.slice.call(newDiv.getElementsByTagName('script'));
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src !== '') {
      // create new script tag
      const tag = document.createElement('script');
      // set new script tag's src
      tag.src = scripts[i].src;
      // make new node for script tag
      tag.appendChild(document.createTextNode(tag));
      tag.innerHTML = null;
      // append new script tag to bottom of body
      document.getElementsByTagName('body')[0].appendChild(tag);
    } else {
      // evaluate inner html of script
      eval(scripts[i].innerHTML);
      scripts[i].appendChild(document.createTextNode(scripts[i]));
      document.getElementsByTagName('body')[0].appendChild(scripts[i]);
    }
  }

  // extract style tags
  const styles = Array.prototype.slice.call(newDiv.getElementsByTagName('style'));

  for (let i = 0; i < styles.length; i++) {
    // create new style tag
    const style = document.createElement('style');
    styles[i].type = 'text/css';
    // make style tag visible in dom
    style.appendChild(document.createTextNode(styles[i]));

    // append to head
    document.getElementsByTagName('head')[0].appendChild(styles[i]);
  }

  useEffect(() => {
    return () => {
      for (let i = 0; i < styles.length; i++) {
        // removes style tags from body
        document.getElementsByTagName('head')[0].removeChild(styles[i]);
        styles[i] = null;
      }

      for (let i = 0; i < scripts.length; i++) {
        // removes last child of body (these scripts are loaded last)
        // last child removal to accommodate src tags

        document.getElementsByTagName('body')[0].lastChild.remove();
      }
    };
  }, [styles, scripts]);

  // render leftover tags to dom (h1, p, div, etc.)
  if (newDiv.innerHTML.length > 1) {
    return <div dangerouslySetInnerHTML={{ __html: newDiv.innerHTML }} />;
  } else {
    return null;
  }
};

export default ModuleX;
