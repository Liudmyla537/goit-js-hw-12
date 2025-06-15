import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = formEl.querySelector('input[name="search-text"]');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalPages = 0;

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  query = inputEl.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits } = await getImagesByQuery(query, page);
    if (hits.length === 0) {
      iziToast.info({
        message: 'Sorry, no images found. Try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
    totalPages = Math.ceil(totalHits / 15);

    if (page < totalPages) showLoadMoreButton();
  } catch (error) {
    iziToast.error({ message: 'Something went wrong.', position: 'topRight' });
    console.error(error);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page++;
  showLoader();
  hideLoadMoreButton();

  try {
    const { hits } = await getImagesByQuery(query, page);
    createGallery(hits);
    scrollGallery();

    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});

function scrollGallery() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
