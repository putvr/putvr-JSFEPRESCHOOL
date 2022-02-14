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
    // const res = await fetch(window.location.href + '/data.json'); //test! 
    const res = await fetch(this.api + `/photos/random?count=9&orientation=squarish`, this.options);
    this.data = await res.json();
    this.renderGallery();
  };

  async searchImages(term) {
    const res = await fetch(this.api + `/search/photos?query=${escape(term)}&per_page=9&orientation=portrait`, this.options);
    // const res = await fetch(this.api + `/search/photos?query=${escape(term)}&per_page=9&orientation=squarish`, this.options);

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
