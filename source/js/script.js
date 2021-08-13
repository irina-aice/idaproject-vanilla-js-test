'use strict';

(function () {
  const form = document.querySelector('.js-form');
  const productList = document.querySelector('.js-product-list');
  const productTemplate = document.querySelector('#product-template').content;

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const inputTitle = form.querySelector('.js-input-title');
    const inputDescription = form.querySelector('.js-input-description');
    const inputImage = form.querySelector('.js-input-image');
    const inputPrice = form.querySelector('.js-input-price');
    const productElement = productTemplate.cloneNode(true);
    productElement.querySelector('.js-product-title').textContent = inputTitle.value;
    productElement.querySelector('.js-product-description').textContent = inputDescription.value;
    productElement.querySelector('.js-product-image').src = inputImage.value;
    productElement.querySelector('.js-product-price').textContent = inputPrice.value;

    productList.appendChild(productElement);
  });

  productList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('js-product-button')) {
      evt.preventDefault();
      const product = evt.target.closest('.js-product');
      product.setAttribute('data-state', 'close');
    }
  });
})();
