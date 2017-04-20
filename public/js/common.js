// The Common module is designed as an auxiliary module
// to hold functions that are used in multiple other modules
/* eslint no-unused-vars: "off" */

var Common = (function() {
	var classes = {
    hide: 'hide'
  };
  // Publicly accessible methods defined
  return {
    buildDomElement: buildDomElementFromJson,
    fireEvent: fireEvent,
    listForEach: listForEach,
    hide: hide,
    show: show,
    addClass: addClass,
    removeClass: removeClass,
    toggleClass: toggleClass
  };

  // Take in JSON object and build a DOM element out of it
  // (Limited in scope, cannot necessarily create arbitrary DOM elements)
  // JSON Example:
  //  {
  //    "tagName": "div",
  //    "text": "Hello World!",
  //    "className": ["aClass", "bClass"],
  //    "attributes": [{
  //      "name": "onclick",
  //      "value": "alert("Hi there!")"
  //    }],
  //    "children: [{other similarly structured JSON objects...}, {...}]
  //  }
  function buildDomElementFromJson(domJson) {
    // Create a DOM element with the given tag name
    var element = document.createElement(domJson.tagName);

    // Fill the "content" of the element
    if (domJson.text) {
      element.innerHTML = domJson.text;
    } else if (domJson.html) {
      element.insertAdjacentHTML('beforeend', domJson.html);
    }

    // Add classes to the element
    if (domJson.classNames) {
      for (var i = 0; i < domJson.classNames.length; i++) {
        element.classList.add(domJson.classNames[i]);
      }
    }
    // Add attributes to the element
    if (domJson.attributes) {
      for (var j = 0; j < domJson.attributes.length; j++) {
        var currentAttribute = domJson.attributes[j];
        element.setAttribute(currentAttribute.name, currentAttribute.value);
      }
    }
    // Add children elements to the element
    if (domJson.children) {
      for (var k = 0; k < domJson.children.length; k++) {
        var currentChild = domJson.children[k];
        element.appendChild(buildDomElementFromJson(currentChild));
      }
    }
    return element;
  }

  // Trigger an event to fire
  function fireEvent(element, event) {
    var evt;
    if (document.createEventObject) {
      // dispatch for IE
      evt = document.createEventObject();
      return element.fireEvent('on' + event, evt);
    }
    // otherwise, dispatch for Firefox, Chrome + others
    evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
  }

  // A function that runs a for each loop on a List, running the callback function for each one
  function listForEach(list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback.call(null, list[i]);
    }
  }
  
   function hide(element) {
    addClass(element, classes.hide);
  }

  // Removes the 'hide' class from a given element, removing its CSS display value of 'none'
  function show(element) {
    removeClass(element, classes.hide);
  }
  // Auxiliary function for adding a class to an element
  // (to help mitigate IE's lack of support for svg.classList)
  function addClass(element, clazz) {
    if (element.classList) {
      element.classList.add(clazz);
    } else {
      ieSvgAddClass(element, clazz);
    }
  }

  // Auxiliary function for removing a class from an element
  // (to help mitigate IE's lack of support for svg.classList)
  function removeClass(element, clazz) {
    if (element.classList) {
      element.classList.remove(clazz);
    } else {
      ieSvgRemoveClass(element, clazz);
    }
  }
   // Auxiliary function for toggling a class on an element
  // (to help mitigate IE's lack of support for svg.classList)
  function toggleClass(element, clazz) {
    if (element.classList) {
      element.classList.toggle(clazz);
    } else {
      ieSvgToggleClass(element, clazz);
    }
  }
}());
