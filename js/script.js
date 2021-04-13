'use strict';

const shape = document.getElementById('shape');
const settings = document.getElementById('settings');
const workSpace = document.getElementById('workspace');
const btnGenerate = document.getElementById('generate');
const output = document.getElementById('output');

// ranges
const rangeSize = document.getElementById('range-size');
const rangeRadius = document.getElementById('range-radius');
const rangeDistance = document.getElementById('range-distance');

// radio
const radioShadow = document.getElementById('shadow-inset');


// Initial values
let currentColor = ['#F5F7F9', '#e0e5ec', '#CBD3DF'] // [светлый, основной, тёмный]
// for shape
let sizeDistance = '12'; // Default Size Distace
let currentShadow = `inset -12px -12px 24px #f5f7f9, inset 12px 12px 24px #cbd3df`
// Для результата. Иной вариант - window.getComputedStyle(shadow).backgroundColor



// Resizing the shape
rangeSize.oninput = (e) => {
  shape.style.width = `${e.target.value}px`;
  shape.style.height = `${e.target.value}px`;
};


// Border-radius shape change
rangeRadius.oninput = (e) => shape.style.borderRadius = `${e.target.value}px`


// changing the distance of the glow
rangeDistance.oninput = function (e) {
  sizeDistance = e.target.value;
  renderShape()
};


// Render Shape
const renderShape = () => {
  if (radioShadow.checked) {
    // Проверка на направление света должна быть здесь
    currentShadow =
      `inset -${sizeDistance}px -${sizeDistance}px ${sizeDistance * 2}px ${currentColor[0]},
      inset ${sizeDistance}px ${sizeDistance}px ${sizeDistance * 2}px ${currentColor[2]}`

  } else {
    // Проверка на направление света должна быть здесь
    currentShadow =
      `-${sizeDistance}px -${sizeDistance}px ${sizeDistance * 2}px ${currentColor[0]},
      ${sizeDistance}px ${sizeDistance}px ${sizeDistance * 2}px ${currentColor[2]}`

  }
  
  shape.style.boxShadow = currentShadow
  shape.style.backgroundColor = currentColor[1] // for shape
  workSpace.style.backgroundColor = currentColor[1] // for background

}


// click on a radio - rerender
settings.addEventListener('click', (e) => {

  // radio shadow
  if (e.target.id === 'shadow-drop' || e.target.id === 'shadow-inset') {
    renderShape(); // Rerender shape
  }

  // color btn
  if (e.target.classList.contains('btn-color')) {

    switch (e.target.id) {

      case 'color-white':
        currentColor = ['#f5f7f9', '#e0e5ec', '#cbd3df']
        break

      case 'color-blackLight':
        currentColor = ['#5b5b5b', '#4a4a4a', '#393939']
        break

      case 'color-black':
        currentColor = ['#222', '#111', '#000']
        break

      case 'color-blue':
        currentColor = ['#26c7fe', '#04befe', '#01a6df']
        break

      case 'color-blueDark':
        currentColor = ['#6396ee', '#4481eb', '#256ce8']
        break

      case 'color-orange':
        currentColor = ['#f2a639', '#F09819', '#d9860e']
        break

      case 'color-red':
        currentColor = ['#ff7a7a', '#ff5858', '#ff3636']
        break

      case 'color-purple':
        currentColor = ['#483097', '#3c287d', '#302063']
        break

      default: break

    }
    renderShape()
  }

});


// Generate CSS
btnGenerate.onclick = () => {
  document.getElementById('output-width')
    .textContent = rangeSize.value
  document.getElementById('output-height')
    .textContent = rangeSize.value // Лишний код, можно зарефакторить
  document.getElementById('output-border-radius')
    .textContent = rangeRadius.value
  document.getElementById('output-background')
    .textContent = currentColor[1]
  document.getElementById('output-shadow')
    .textContent = currentShadow
  output.style.display = 'flex'
}


// Закрытие окна Generate при нажатии на крестик или область вне generate
output.addEventListener('mousedown', function (e) {
  if (e.target.id === 'output-close' || e.target.classList.contains('output')) {
    output.style.display = 'none'
  }
})

