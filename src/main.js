import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  initLoadMoreButton,
  getLoadMoreButton,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
initLoadMoreButton();

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) {
    iziToast.warning({ message: 'Enter a search query', position: 'topRight' });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { hits, totalHits: total } = await getImagesByQuery(
      currentQuery,
      currentPage
    );
    if (!hits.length) {
      iziToast.info({ message: 'No results found.', position: 'topRight' });
      return;
    }
    totalHits = total;
    createGallery(hits);
    if (currentPage * PER_PAGE < total) showLoadMoreButton();
  } catch (err) {
    iziToast.error({ message: 'Error loading images.', position: 'topRight' });
    console.error(err);
  } finally {
    hideLoader();
  }
});

const loadMoreBtn = getLoadMoreButton();
loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const { hits } = await getImagesByQuery(currentQuery, currentPage);
    createGallery(hits);

    if (currentPage * PER_PAGE >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    const card = document.querySelector('.gallery-item');
    if (card) {
      const { height } = card.getBoundingClientRect();
      window.scrollBy({ top: height * 2, behavior: 'smooth' });
    }
  } catch (err) {
    iziToast.error({ message: 'Error loading more.', position: 'topRight' });
    console.error(err);
  } finally {
    hideLoader();
  }
});
