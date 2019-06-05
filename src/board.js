import {createColumn, getColumns} from './columns.js';
import {createCard, getCards, addCard, removeCard, eventListener} from './cards.js';

export async function outputElements(){

	let objColumn = await getColumns();
	let objCard = await getCards();
	//let objColumn = getColumns();//объекты из хранилища 
	//let objCard = getCards();
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
					let card = createCard(objCard[j]);

					colum.appendChild(card);
				}
			}
		}
		fragment.appendChild(colum);
	}
	parentElement.appendChild(fragment);//добавление в родительский элемент

	let elemWithEventForAdding = document.querySelector('.board');
  	elemWithEventForAdding.addEventListener('click', addCard);

  	let elemWithEventForRemoving = document.querySelector('.board');
  	elemWithEventForRemoving.addEventListener('click', removeCard);


  	let elemWithEventForUpdating = document.querySelector('.board');
  	elemWithEventForUpdating.addEventListener('keypress', eventListener);
}
