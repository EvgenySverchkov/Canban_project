import {createColumn, getColumns} from './columns.js';
import {createCardElement, getCards, addCard, removeCard, eventPressingEnterListener} from './cards.js';
import {dragStartListener, dragOverListener, dropListener} from './dragNdrop.js';
import {toogleTheme} from './toogleTheme.js';
import {themeWhenLoadPage, themeChanger} from './serviseForChangeTheme.js'

export async function outputElements(){

	document.body.appendChild(toogleTheme());

	themeWhenLoadPage();//эта функция не должна менять тему?
	let objColumn = await getColumns();
	let objCard = await getCards();

	let parentElement = document.querySelector('.board');//главный (родитель) элемент доски
	let fragment = document.createDocumentFragment();//содаем фрагмент

	for(let i =0; i<objColumn.length; i++)//блок добавления елементов из сервера
	{
		let colum = createColumn(objColumn[i]);

		if(objCard)//если карточек нет, ничего не делать
		{
			for(let j =0; j<objCard.length; j++)
			{
				if(+colum.id === objCard[j].columnId){
					let card = createCardElement(objCard[j]);
					colum.appendChild(card);
				}
			}
		}
		fragment.appendChild(colum);
	}
	parentElement.appendChild(fragment);//добавление в родительский элемент

	let mainTableElement = document.querySelector('.board');
	mainTableElement.addEventListener('click', addCard);
	mainTableElement.addEventListener('click', async event=>{
		if(event.target.parentNode.id == event.target.getAttribute("data-card-id"))//проверка для исключения всплытия
		{
			const cardId = event.target.getAttribute("data-card-id");
			removeCard(cardId);
			event.target.closest(".card").remove();//удаление из доски
		}
	});
	mainTableElement.addEventListener('keypress', eventPressingEnterListener);
	mainTableElement.addEventListener('focusout', eventPressingEnterListener);
	mainTableElement.addEventListener('mouseup', eventPressingEnterListener);

	document.addEventListener("dragstart", dragStartListener);
	document.addEventListener("dragover", dragOverListener);
	document.addEventListener("drop", dropListener);
	let toogle = document.querySelector('.toogle_checkbox');
	toogle.addEventListener('click', themeChanger);
}
