import {url} from './urlServConf.js';

export async function getBgBrightness(){
  const data = await fetch(`${url}/isLightTheme`);
  return data.json();
}
async function pushTheme(isLight){
  let obj= {};
  obj.isLightBg = isLight;
  let response = await fetch(`${url}/isLightTheme`,
  {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
  });
  return await response.json();
}

export async function themeWhenLoadPage(){
  let obj = await getBgBrightness();
  let styleFileName = obj.isLightBg ? 'nightStyle.css' : 'style.css';
  document.querySelector("link").setAttribute('href', styleFileName);
}

export async function themeChanger(event){
  let target = event.target;
  await pushTheme(target.checked);
  let styleFileName = target.checked ? 'nightStyle.css' : 'style.css';
  document.querySelector("link").setAttribute('href', styleFileName);
}
