run:
	sass --watch src/scss/main.scss style.css & 
	pug --watch src/index.pug -O '{"pretty": true}' -o . &
	tsc --watch src/player.ts --target es6 --outDir .