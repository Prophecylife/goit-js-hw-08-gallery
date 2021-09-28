import { galleryItems } from './app.js'

const galleryContainer = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const closeBtn = document.querySelector('[data-action="close-lightbox"]')
const galleryMarkup = createGalleryMarkup(galleryItems);
const overlayArea = document.querySelector('.lightbox__overlay')
const modalImg = document.querySelector('.lightbox__image')






overlayArea.classList.add('js-close-modal');
closeBtn.classList.add('js-close-modal');

// insert gallery markup
galleryContainer.insertAdjacentHTML('afterbegin', galleryMarkup);


//add modal
function addEl(el) {
    el.classList.add('is-open');
}


//remove modal
function removeEl(el) {
    el.classList.remove('is-open');
}


//open modal
galleryContainer.addEventListener('click', (e) => {
    e.preventDefault();
    // console.log(e.target.parentNode.parentNode.nextElementSibling.firstElementChild.href);
    const condition = e.target.className === 'gallery__image';
    if (condition) {
        addEl(modal);
        modalImg.src = e.path[0].dataset.source;
        modalImg.alt = e.path[0].alt;
    }
})


//add li markup function
function createGalleryMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
        <li class="gallery__item">
  <a
    class="gallery__link"
    href=${original}
  >
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>
            `
    }).join('')
};


// universal function to close modal by click
function closeModalByClick(e) {
    if (e.target.classList.contains('js-close-modal')) {
        removeEl(modal)
    }
}


//close modal overlay
modal.addEventListener('click', closeModalByClick);

//close modal Button
closeBtn.addEventListener('click', closeModalByClick)


// close modal Escape
window.addEventListener('keydown', closeModalByEscape);



// universal function to close by key 
function closeModalByEscape(e) {
    if (e.code === 'Escape') {
       removeEl(modal);
    }
}


//arrow left arrow right (next pic, previous pic)


window.addEventListener('keydown', nextArrow)
const gallery = galleryItems.map(({ original }) => {
    return original
})


function nextArrow(e) {
    const currentImgIndex = gallery.indexOf(modalImg.src);
    if (e.code === 'ArrowRight') {
        return currentImgIndex < gallery.length-1 ? modalImg.src = gallery[currentImgIndex + 1] : modalImg.src = gallery[currentImgIndex];
    } else if (e.code === 'ArrowLeft') {
        return currentImgIndex > 0 ? modalImg.src = gallery[currentImgIndex - 1] : modalImg.src = gallery[currentImgIndex];
    }
}





//remove listeners when modal is closed
if (modal.classList.contains('is-open')) {
    window.removeEventListener('keydown', closeModalByEscape);
    modal.removeEventListener('click', closeModalByClick);
    closeBtn.removeEventListener('click', closeModalByClick);
    window.addEventListener('keydown', nextArrow);
}



