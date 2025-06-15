import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  getLoadMoreBtn,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = formEl.querySelector('input[name="search-text"]');
const loadMoreBtn = getLoadMoreBtn();

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const PER_PAGE = 15;

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  const query = inputEl.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  await fetchAndRenderImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  await fetchAndRenderImages(true);
});

async function fetchAndRenderImages(isLoadMore = false) {
  showLoader();
  if (isLoadMore) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'Loading images, please wait...';
  }

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const { hits, totalHits: total } = data;

    if (!hits.length) {
      iziToast.info({
        message: 'Sorry, no images found. Try another query!',
        position: 'topRight',
      });
      hideLoadMoreButton();
      return;
    }

    totalHits = total;

    createGallery(hits);

    if (currentPage * PER_PAGE >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }

    if (isLoadMore) {
      scrollPage();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
    if (isLoadMore) {
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = 'Load more';
    }
  }
}

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
