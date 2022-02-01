run:
	sass --watch src/scss/main.scss style.css & 
	pug --watch src/index.pug -o . &
	tsc --watch src/player.ts --outDir .