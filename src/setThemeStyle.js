export function setThemeStyle(link) {
	//Если ранее была выбрана тема 'dark', то устанавливаются соответствующие стили
	if (localStorage.getItem('themeStyle') == 'dark') {
		link.href = '../css/dark.css';
	}
	//По умолчанию устанавливается тема 'light'
	else {
		link.href = '../css/light.css';
	}
	return link.href;
}