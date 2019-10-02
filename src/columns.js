import {url} from './urlServConf.js';

export function getColumns(){
	const data = `${url}/column`;
	return fetch(data).then(objs=>objs.json());
}

export function createColumn(InfoOfColumn){
	let newCol = document.createElement('div');//создаем елемнт колонки
	newCol.className = 'columns';//добавляем имя класса (для css)
	newCol.id = InfoOfColumn.id;//добаляем id (для добавления соотвецвующих карточек)

	let headline = document.createElement('p');//создаем елемент в котором будет заголовок
	headline.className = 'headline';
	headline.textContent = InfoOfColumn.title;//добавляем текст в узел заголовка

	let buttonAdd = document.createElement('button');//кнопка для добавление карточек
	buttonAdd.className = 'addButton';
	buttonAdd.textContent = 'Add';

	newCol.appendChild(headline);//добавляем в каждую колонку заголовок
	newCol.appendChild(buttonAdd);//добавляем кнопку добавления карточек

	return newCol;//вернули массив с созданными колонками
}
