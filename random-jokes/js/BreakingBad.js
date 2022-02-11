class BreakingBad {
  constructor() {
    this.apiEndpoind = window.location.href;
    this.quotesPath = '/data/BreakingBad-quotes.json';
    this.charactersPath = '/data/BreakingBad-characters.json';

    this.quotes;
    this.characters;

    this.currentQuote = 0;

    this.quoteElement = document.querySelector('.quote');
    this.author = document.querySelector('.quote__author');
    this.text = document.querySelector('.quote__text');
    this.nextBtn = document.querySelector('.quote__next');

    this.nextBtn.addEventListener('click', () => this.nextQuote());
    document.body.addEventListener('keypress', (event) => {
      if (event.which == 13) {
        this.nextQuote();
      }
    });

  }

  randomNumber(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async nextQuote() {
    this.nextBtn.disabled = true;
    this.quoteElement.classList.add('loading');

    if (!this.quotes) {
      this.quotes = await fetch(this.apiEndpoind + this.quotesPath).then(res => res.json());
    }
    if (!this.characters) {
      this.characters = await fetch(this.apiEndpoind + this.charactersPath).then(res => res.json());
    }
    this.author.src = '';
    this.currentQuote = this.randomNumber(this.quotes.length);

    const {
      quote,
      author
    } = this.quotes[this.currentQuote];

    this.text.textContent = quote;

    this.author.alt = author;
    const authorData = this.characters.filter(person => person.name == author)[0];
    const newImgSrc = authorData ? authorData.img : './assets/img/unknown.png';

    this.author.src = newImgSrc;
    this.nextBtn.disabled = false;
    this.quoteElement.classList.remove('loading');
  }

}
export default BreakingBad;
