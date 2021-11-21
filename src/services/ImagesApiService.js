import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '24423897-12eb64b2c015c5a46d7d8ecad';
const PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

export class ImagesApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
        this.totalHits = null;
        this.totalPages = null;
        this.endOfHits = false;
    }

    async getImages() {
        const response = await axios.get(`/?key=${API_KEY}&q=${this.searchQuery}&${PARAMS}&page=${this.page}&per_page=${this.perPage}`);
        const data = await response.data;
        const images = data.hits;
        this.totalHits = data.totalHits;
        this.totalPages = Math.ceil(this.totalHits / this.perPage);
        
        if (this.totalHits === 0) {
            throw Error("Sorry, there are no images matching your search query. Please try again!");            
        }
        
        this.notifyOnFirstPage();
        this.notifyOnLastPage();
        this.incrementPage();
        return images;        
    }

    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }    

    notifyOnFirstPage() {
        if (this.page === 1) {
            Notify.success(`Hooray! We found ${this.totalHits} images.`);
        }
    }
    
    notifyOnLastPage() {
        if (this.page === this.totalPages) {
            this.endOfHits = true;
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
    }
}












// import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api';
// const API_KEY = '24423897-12eb64b2c015c5a46d7d8ecad';
// const PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
// let page = 1;
// const perPage = 40;

// export async function getImages(query) {
//     const response = await axios.get(`/?key=${API_KEY}&q=${query}&${PARAMS}&page=${page}&per_page=${perPage}`);
//     const images = response.data.hits;
//     const totalHits = response.data.totalHits;
//     const totalPages = Math.ceil(totalHits / perPage);
//     page += 1;
//     console.log(response.data);    
//     return {
//         images,
//         totalHits,
//         hasNextPage: page > totalPages,
//         hasOnlyOnePage: totalHits <= perPage,
//         hasNoPage: totalHits === 0,
//         pageReset() {
//             page = 1;
//         }
//     }
// }