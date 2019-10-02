export function toogleTheme(){
  let elem = document.createElement('div');
  elem.className = 'toggle_btn';
  elem.id = '_1st-toggle-btn';

  let input = document.createElement('input');
  input.type="checkbox";
  input.className = "toogle_checkbox";

  let span = document.createElement('span');

  let section = document.createElement('section')

  let fragment = document.createDocumentFragment();

  fragment.appendChild(input);
  fragment.appendChild(span);

  elem.appendChild(fragment);

  return elem;
}
