let body = document.querySelector('body');

const basket = document.querySelector('.basket');
const overlay = document.querySelector('.overlay');
const backbutton = document.querySelector('.back-button');

let active = false;

basket.addEventListener('click', () => {
  overlay.style.display = 'flex';
});

backbutton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

const cross = document.getElementById("cross-aka");

fetch("https://6b041e869e7cafb37dbfeb6a.mockapi.io/api2/v1/Sneakers")
  .then((res) => {
    if (!res.ok) throw new Error("Ошибка сервера: " + res.status);
    return res.json();
  })
  .then((data) => {
    data.forEach((element) => {
      console.log(data[0])

      const card = document.createElement("div");
      card.style.position = 'relative';

      let favorite = document.createElement('img');
      favorite.src = './icons/favorite.svg'
      favorite.style.width = '16px';
      favorite.style.position = 'absolute';
      favorite.style.top = '24px'
      favorite.style.cursor = 'pointer';

      const img = document.createElement("img");
      img.src = `./image/cros${element.id}.svg`;
      img.alt = element.name;
      img.width = 150;

      const title = document.createElement("p");
      title.textContent = element.name;

      const price = document.createElement("div");
      price.style.marginLeft = '5px';

      let priceString = document.createElement('p')
      priceString.textContent = 'ЦЕНА:'
      priceString.style.color = '#BDBDBD';
      priceString.style.display = 'flex';
      priceString.style.justifyContent = 'start';
      priceString.style.fontSize = '15px';
      priceString.style.marginTop = '14px';


      let orderIMG = document.createElement('img');
      orderIMG.src = './icons/order.svg'
      orderIMG.style.width = '32px';
      orderIMG.style.cursor = 'pointer';

      const priceValue = document.createElement('b');
      priceValue.textContent = `${element.price} руб.`;
      priceValue.style.display = 'flex';
      priceValue.style.justifyContent = 'space-between';
      // priceValue.style.alignItems = 'center';
      priceValue.style.fontSize = '9px';
      priceValue.style.textDecoration = 'line-through';

      let discountPrice = element.price - (element.price * element.discount / 100);

      const newPrice = document.createElement('b');
      newPrice.textContent = `${Math.round(discountPrice)} руб.`;
      newPrice.style.fontSize = '14px';
      newPrice.style.color = 'black';
      newPrice.style.display = 'flex';
      newPrice.style.position = 'absolute';
      newPrice.style.top = '228px';
      newPrice.style.justifyContent = 'start';

      priceValue.append(orderIMG);
      price.append(priceString, priceValue, newPrice);

      card.append(favorite, img, title, price);
      cross.append(card);

      orderIMG.addEventListener('click', () => {
        if (active === false) {
          orderIMG.src = './icons/activeOrder.svg';
          active = true;
        } else {
          orderIMG.src = './icons/order.svg';
          active = false;
        }
      });

      favorite.addEventListener('click', () => {
        if (active === false) {
          favorite.src = './icons/activeLove.svg';
          active = true;
        } else {
          favorite.src = './icons/favorite.svg';
          active = false;
        }
      });

    });
  })
  .catch((err) => console.error(err));