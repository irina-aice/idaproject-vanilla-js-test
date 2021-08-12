'use strict';

(function () {
  const form = document.querySelector('.js-form');
  const productList = document.querySelector('.js-product-list');
  const product = document.querySelector('.js-product');
  const productTemplate = document.querySelector('#product-template').content;
  const productButton = document.querySelector('.js-product-button');

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

  productButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    product.setAttribute('data-state', 'close');
  });
})();
