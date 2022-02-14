class UnsplashAPI {
  api = `https://api.unsplash.com/`;
  options = {
    headers: {
      'Accept-Version': 'v1',
      'Authorization': 'Client-ID 8X7VdZvFRG3GTr8f472GyWMfFlwAaVu43IyvzX93MP8',
    }
  };

  constructor() {
    this.searchInput = document.querySelector('.search');
    this.searchInput.addEventListener('submit', (event) => this.handleSearchSubmit(event));

    this.gallery = document.querySelector('.gallery');

    document.querySelector('.search__clear').addEventListener('click', (event) => {
      if (event.currentTarget.id == 'clear') {
        event.stopPropagation();
        document.forms.search.term.value = '';
      }
    })

    this.getInitData();
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    const term = document.forms.search.term.value;
    if (!term) {
      return
    }
    this.searchImages(term);
  }

  async getInitData() {
    const res = await fetch(this.api + `/photos/random?count=9&orientation=squarish`, this.options);
    this.data = await res.json();
    this.renderGallery();
  };

  async searchImages(term) {
    const res = await fetch(this.api + `/search/photos?query=${escape(term)}&per_page=9&orientation=portrait`, this.options);

    const data = await res.json();
    this.data = data.results;

    this.renderGallery();
  }

  renderGallery() {
    if (this.gallery.children.length > 0) {
      for (let child of this.gallery.children) {
        child.remove();
      }
    }

    this.data.forEach(img => {
      const a = document.createElement('A');
      a.href = img.links.html;
      a.target = '_blank';

      const i = document.createElement('IMG');
      i.src = img.urls.small;
      i.alt = (img.src ? img.src : img.id);
      a.append(i);
      this.gallery.append(a);
    });
  }

}

const u = new UnsplashAPI();

//review 
console.log(`
Оценка 55

1) Вёрстка +10
    на странице есть несколько фото и строка поиска +5
    в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5

2) При загрузке приложения на странице отображаются полученные от API изображения +10

3) Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
4) Поиск +30
    при открытии приложения курсор находится в поле ввода +5
    есть placeholder +5
    автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
    поисковый запрос можно отправить нажатием клавиши Enter +5
    после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
    в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
5) Cобственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо +5
  Собрано за полчаса до дедлайна на бутстрапе в старом добром стиле Web 2.0. Наверное выглядит страшно по современным стандартам. 

`);
