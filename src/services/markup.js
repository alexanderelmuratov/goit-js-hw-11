export function createImagesMarkup(images) {
    return images
        .map(({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => {
            return `
            <a class="gallery__link" href="${largeImageURL}">          
              <div class="gallery__card">              
                <div class="gallery__wrapper">
                  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
                </div>
                <div class="gallery__info">
                  <p class="gallery__info_item">
                    <b>Likes</b> ${likes}
                  </p>
                  <p class="gallery__info_item">
                    <b>Views</b> ${views}
                  </p>
                  <p class="gallery__info_item">
                    <b>Comments</b> ${comments}
                  </p>
                  <p class="gallery__info_item">
                    <b>Downloads</b> ${downloads}
                  </p>
                </div>              
              </div>          
            </a>                   
            `;
        })
        .join('');   
}