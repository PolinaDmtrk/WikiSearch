export function changeThemeStyle(link) {
	//Информация о выбранной теме сохраняется в локальном хранилище
	if (localStorage.getItem('themeStyle') == 'light') {
		link.href = '../css/dark.css';
		localStorage.setItem('themeStyle', 'dark');
	}
	else {
		link.href = '../css/light.css';
		localStorage.setItem('themeStyle', 'light');
	}
}