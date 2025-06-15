import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a');

// Динамічне створення кнопки "Load more"
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('load-more', 'hidden');
galleryEl.insertAdjacentElement('afterend', loadMoreBtn);

export function getLoadMoreBtn() {
  return loadMoreBtn;
}

export function createGallery(images) {
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p><b>Likes</b> ${img.likes}</p>
        <p><b>Views</b> ${img.views}</p>
        <p><b>Comments</b> ${img.comments}</p>
        <p><b>Downloads</b> ${img.downloads}</p>
      </div>
    </li>
  `
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
