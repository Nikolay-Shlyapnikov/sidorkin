class Message {
	constructor(author, text, time) {
		this.author = author;
		this.text = text;
		this.time = time;
	}
}


const button = document.querySelector('.button');
button.addEventListener('click', ()=>{
	const userName = document.querySelector('.input.user').value;
	const scammerName = document.querySelector('.input.scammer').value;
	const chat = document.querySelector('.textarea').value;
	const [messages] = parseMessages(chat, userName, scammerName);
	const scammerMessages = messages.filter(elem => elem.author == scammerName);
	const linkArray = [
		'Ссылка',
		'Ссылки',
		'Ссылку',
		'http://',
		'Ссылочка',
		'Ссылочки',
		'Ссылочку',
	];
	const moneyArray = [
		'Деньги',
		'Денег',
		'Денежку',
		'Долг',
		'Одолжи',
		'Бабки',
		'Кэш',
	];
	const cardArray = [
		'Данные карты',
		'Карточка',
		'Карточки',
		'Карта',
		'cvc код',
		'информация карты',
		'банковский счёт',
	];
	
	scammerMessages.forEach(message => {
		linkArray.forEach(word => {
			if (message.text.toLowerCase().includes(word.toLowerCase()))
				message.danger = 'link';
		});
		moneyArray.forEach(word => {
			if (message.text.toLowerCase().includes(word.toLowerCase()))
				message.danger = 'money';
		});
		cardArray.forEach(word => {
			if (message.text.toLowerCase().includes(word.toLowerCase()))
				message.danger = 'card';
		});
	});

	const messageTemplate = document.querySelector('#message__template').content.querySelector('.message__item');
	const messageList = document.querySelector('.message__list');
	const renderMessage = (messageArray) => {
		for (const message of messageArray) {
			messageElement = messageTemplate.cloneNode(true);
			messageElement.querySelector('.message__author').innerHTML = message.author;
			messageElement.querySelector('.message__text').innerHTML = message.text;
			messageElement.querySelector('.message__time').innerHTML = message.time;
			if (message.danger === 'money') {
				messageElement.classList.add('money');
				messageElement.classList.add('danger');
			}
			if (message.danger === 'link') {
				messageElement.classList.add('link');
				messageElement.classList.add('danger');
			}
			if (message.danger === 'card') {
				messageElement.classList.add('card');
				messageElement.classList.add('danger');
			}
			if (message.author === scammerName) {
				messageElement.classList.add('scammer');
			}
			if (message.author === userName) {
				messageElement.classList.add('user');
			}
	
			messageList.append(messageElement);
		}
		
	}
	const userWindow = document.querySelector('.window');
	
	renderMessage(messages);
	const addInformationClick = () => {
		messageList.addEventListener('click', (evt) => {
			if(evt.target.matches('.information')){
				if (evt.target.closest('.card')) {
					userWindow.querySelector('.window__text').innerHTML = 'Никто не имеет права требовать у вас данные вашей карточки, сотрудникам банка всё что нужно для работы и так известно';
					userWindow.classList.add('active');
				}
				if (evt.target.closest('.link')) {
					userWindow.querySelector('.window__text').innerHTML = 'Никогда не перехдоите по ссылкам, присланным незнакомыми людьми, также по ссылкам http(без S) - это означает, что страница не сертифицированна и небезопасна для использования';
					userWindow.classList.add('active');
				}
				if (evt.target.closest('.money')) {
					userWindow.querySelector('.window__text').innerHTML = 'Никогда не отправляйте незнакомым людям деньги, отменить перевод банковские сотрудники не могут, а также злоумышленники могут украсть таким способом Ваши персональные данные';
					userWindow.classList.add('active');
				}
	
			}
		
		});
	}
	addInformationClick();
	userWindow.addEventListener('click', (evt) =>{
		if(!evt.target.matches('.window__inner')){
			userWindow.classList.toggle('active');
		}
	});
});
function parseMessages(chat, userName, scammerName) {
	const timeRegEx = /\b([01][0-9]|2[0-3]):[0-5][0-9]\b/g;
	const lines = chat.split("\n");
	let result = [];
	let i = 0;
	let author;
	let time;
	let message;
	while (i < lines.length) {
		if (lines[i] === userName || lines[i] === scammerName) {
			author = lines[i];
			time = lines[i + 1].match(timeRegEx);
			i = i + 2
			continue
		}
		message = lines[i]
		result.push(new Message(author, message, time));
		i++;
	}
	return [result];
}


