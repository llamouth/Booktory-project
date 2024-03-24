// ! Function to append the children to the parent
const appendElements = (parent, children) => {
    children.forEach(child => parent.append(child));
}

// ! Function to set attributes
const settingAttributes = (element, arrayOfProperties) => {
    element.setAttribute(arrayOfProperties[0], arrayOfProperties[1]);
}

// ! Function to create text context 
const creatingTextContent = (element, text) => {
    element.textContent = text;
}