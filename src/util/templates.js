export const createElement = (templateString) => {
  const template = document.createElement('template');
  templateString = templateString.trim();
  template.innerHTML = templateString;

  return template.content.firstChild;
};
