import 'material-icons/iconfont/material-icons.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ImagesApiService } from './services/ImagesApiService';
import { LoadMoreBtn } from './services/LoadMoreBtn';
import { createImagesMarkup } from './services/markup';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
}
let lightbox = null;

const imagesApiService = new ImagesApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
});
loadMoreBtn.hide();

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMore);

async function onSearch(e) {
    e.preventDefault();
    refs.gallery.innerHTML = '';
    imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (!imagesApiService.query) {
        loadMoreBtn.hide();
        return Notify.info("Please, fill in the field!");
    }
    
    imagesApiService.resetPage();

    try {
        loadMoreBtn.show();
        await initGetImages();
    } catch (error) {
        loadMoreBtn.hide();
        Notify.failure(error.message);
    }

    lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
    
    refs.form.reset();
}

async function onLoadMore() {
    await initGetImages();
    scrollPage();
    lightbox.refresh();
}

async function initGetImages() {
    loadMoreBtn.disable();
    const images = await imagesApiService.getImages();
    renderImagesMarkup(images);
    
    if (imagesApiService.endOfHits) {
        loadMoreBtn.hide();
        return;
    }
    
    loadMoreBtn.enable();
}

function renderImagesMarkup(images) {
    const markup = createImagesMarkup(images)
    refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function scrollPage() {
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}
