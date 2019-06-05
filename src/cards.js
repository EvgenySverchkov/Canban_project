export function getCards(){
	const url = 'http://localhost:8089/api/card';
	return fetch(url).then(data=>data.json());
}
//////////////////////////////создание DOM элемента/////////////////////////////////////////////////
export function createCard(infoOfCard){

	let newCard = document.createElement('div');//создаем элемент карточки
	newCard.id = infoOfCard.id;//добавляем id карточки
	//newCard.textContent = infoOfCard.title;//узел текста карточки
	newCard.className = 'card';//добаляем класс (для css) карточки

	let contentNode = document.createElement('p');
	contentNode.className = 'cardContent';
	contentNode.contentEditable = 'true';
	contentNode.textContent = infoOfCard.title;

	let removeButton = document.createElement('button');//кнопка удаления карточки
	removeButton.className = 'removeButton';
  
	newCard.setAttribute("data-column", infoOfCard.columnId);//добавляем атрибут для поиска соотвецтвующей коллонки
	removeButton.setAttribute("data-card-id", infoOfCard.id);//атрибут для обнаружения в какой карточке находится кнопка

	newCard.appendChild(removeButton);
	newCard.appendChild(contentNode);

	return newCard;
}
//////////////////////////////Обработчик добавления карточки по нажатию на кнопку, в колонку/////////////////////////////////////////////////
export async function addCard(event){
	if(event.target.className==='addButton'){//исключение всплытия
  		let text = prompt("Eneter text for new card");
  		if(text === null || text===''){
  			return;
  		}

  		document.querySelector('.addButton').removeEventListener('focusout', updateCard);
  		
  		let saveToStorage = await createNewArrCardObj(text, event.target.closest('.columns').id);//объект нового элемента

  		let addNewCardObj = fetch('http://localhost:8089/api/card', 
  			{
  				method:'post',
  				headers: { 'Content-Type': 'application/json' },
  				body: JSON.stringify(saveToStorage)
  			});
  	
  		let newElem = createCard(saveToStorage);//создаем новый элемент DOM по новому объекту

    	/*let string = JSON.stringify(saveToStorage);//добавляем новый объект в хранилище
    	localStorage.setItem('arrCardsObj', string);*/

    	event.target.parentNode.appendChild(newElem);//добавляем элемент DOM в колонку
    }
    else
    	return;
}
//////////////////////////////функция возврата массива с новым объектом элемента/////////////////////////////////////////////////
async function createNewArrCardObj(text, columnId){
	let arrObj = await getCards();//массив объектов из хранилища
  	let newId;

  	if(arrObj.length==0)
  	{
  		console.log('null');
  		newId=1;
  	}
  	else{
  		let arrId = arrObj.map((item)=>item.id);//получаем массив id
  		newId = arrId[arrId.length-1]+1;
  	}


  	
  	/*while(arrId.indexOf(newId)!==-1){//генерируем новое id
  		console.log('lalka');
  		newId++;
  		if(arrId.indexOf(newId)===-1){
  			break;
  		}	
  	}*/
  	//console.log(newId);
  	let objForStorage = {};//обьект для данных о элементе
    objForStorage.id = newId;
    objForStorage.title = text;

   	objForStorage.columnId = +columnId;
   	console.log(newId);
   	return objForStorage;
   
    
   	//arrObj.push(objForStorage);//добавление нового объекта к массиву объектов из хранилища
    
}
//////////////////////////////удаление карточки/////////////////////////////////////////////////
export async function removeCard(event){
    if(event.target.parentNode.id == event.target.getAttribute("data-card-id"))//проверка для исключения всплытия
    {
      let idCard = event.target.getAttribute("data-card-id");
      let arrOfObjCards = await getCards();

      let removingObjFromStorage = arrOfObjCards.filter((item)=>item.id!=event.target.getAttribute("data-card-id"));//удаление инф. о DOM элементе из хранилища 

      fetch(`http://localhost:8089/api/card/${idCard}`, {method:'delete'});

      /*let strObjForStorage = JSON.stringify(removingObjFromStorage);
      localStorage.setItem('arrCardsObj', strObjForStorage);*/
      event.target.closest(".card").remove();//удаление из доски
    }
}

export async function eventListener(event){
	if(event.target.className == 'cardContent'){
		
		let idCard = +event.target.closest(".card").id;
		let text = event.target.textContent;
		if(event.keyCode === 13){
		event.preventDefault();
		updateCard(idCard, text);
	}
	}

}


async function updateCard(cardId, text){
	let arr = await getCards();
	
	let i = 0;
	while(arr[i].id!==cardId)
	{
		i++;
	}
	//arr[i].title = text;
	let buff = {title: text};

	fetch(`http://localhost:8089/api/card/${cardId}`, {
		method:'PATCH', 
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: JSON.stringify(buff)
	});
	/*let string = JSON.stringify(arr);
	localStorage.setItem('arrCardsObj', string);*/
}
