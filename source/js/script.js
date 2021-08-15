'use strict';

(function () {
  const form = document.querySelector('.js-form');
  const productList = document.querySelector('.js-product-list');
  const productTemplate = document.querySelector('#product-template').content;
  const sortSelect = document.querySelector('.js-sort-select');

  let products = [];

  function sortProducts() {
    let sortFunctionName = "";

    switch (sortSelect.value) {
      case "price-asc":
        sortFunctionName = priceAsc;
        break;
      case "price-desc":
        sortFunctionName = priceDesc;
        break;
      case "title-asc":
        sortFunctionName = titleAsc;
        break;
    }

    //if empty - restore
    if (!sortFunctionName) {
      restoreProducts();
      return false;
    }

    const unSortedProducts = products.slice();
    const sortedProducts = unSortedProducts.sort(sortFunctionName);

    productList.textContent = "";

    console.log(sortedProducts);
    sortedProducts.forEach((sortedProduct) => {
      productList.appendChild(sortedProduct.element);
    });
  }

  function priceAsc(a, b) {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  }

  function priceDesc(a, b) {
    if (a.price > b.price) {
      return -1;
    }
    if (a.price < b.price) {
      return 1;
    }
    return 0;
  }

  function titleAsc(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  }

  function updateProducts() {
    products = [];

    const productElements = productList.querySelectorAll('.js-product');

    productElements.forEach((productElement) => {
      let productPrice = productElement.querySelector('.js-product-price').textContent;
      productPrice = + productPrice.replace(/\D+/gi, '');
      const productTitle = productElement.querySelector('.js-product-title').textContent;
      const productImage = productElement.querySelector('.js-product-image').src;
      const productDescription = productElement.querySelector('.js-product-description').textContent;

      let product = {
        title: productTitle,
        price: productPrice,
        image: productImage,
        description: productDescription,
        element: productElement
      };

      products.push(product);

      sortProducts();
    });
  }

  function restoreProducts() {
    productList.textContent = "";

    products.forEach((product) => {
      productList.appendChild(product.element);
    });
  }

  updateProducts();

  sortSelect.addEventListener("change", () => {
    sortProducts();
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const title = form.querySelector('.js-input-title').value;
    const description = form.querySelector('.js-input-description').value;
    const image = form.querySelector('.js-input-image').value;
    const price = +form.querySelector('.js-input-price').value;

    const productElement = productTemplate.cloneNode(true);

    productElement.querySelector('.js-product-title').textContent = title;
    productElement.querySelector('.js-product-description').textContent = description;
    productElement.querySelector('.js-product-image').src = image;
    productElement.querySelector('.js-product-price').textContent = price;

    productList.appendChild(productElement);

    updateProducts();

    form.reset();
  });

  productList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('js-product-button')) {
      evt.preventDefault();
      const product = evt.target.closest('.js-product');
      product.setAttribute('data-state', 'close');
    }
  });
})();
