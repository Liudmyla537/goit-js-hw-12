import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const inputEl = formEl.querySelector('input[name="search-text"]');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loaderText = document.querySelector('.loader');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let loadedHits = 0;

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
  loadedHits = 0;

  clearGallery();
  hideLoadMoreBtn();
  showLoaderText();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.info({
        message: 'No images found.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    loadedHits += data.hits.length;

    if (loadedHits < totalHits) {
      await delay(1000);
      hideLoaderText();
      showLoadMoreBtn();
    } else {
      await delay(1000);
      hideLoaderText();
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong.',
      position: 'topRight',
    });
    console.error(error);
    hideLoaderText();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  hideLoadMoreBtn();
  showLoaderText();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    loadedHits += data.hits.length;

    scrollPage();

    if (loadedHits < totalHits) {
      await delay(1000);
      hideLoaderText();
      showLoadMoreBtn();
    } else {
      await delay(1000);
      hideLoaderText();
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
    });
    console.error(error);
    hideLoaderText();
  }
});

function showLoaderText() {
  loaderText.classList.remove('hidden');
}

function hideLoaderText() {
  loaderText.classList.add('hidden');
}

function showLoadMoreBtn() {
  loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtn.classList.add('hidden');
}

function scrollPage() {
  const firstCard = galleryEl.querySelector('.gallery-item');
  if (!firstCard) return;
  const { height } = firstCard.getBoundingClientRect();
  window.scrollBy({ top: height * 2, behavior: 'smooth' });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
