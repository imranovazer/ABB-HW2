const button = document.querySelector('.button__nav')

const buttonX = document.querySelector('.button__nav-x')
const drowpdown = document.querySelector('.dropdown')


button.addEventListener('click', () => {
    drowpdown.classList.toggle('dropdown--active');
    button.classList.toggle('button__nav--active');
    buttonX.classList.toggle('button__nav--active');
})

buttonX.addEventListener('click', () => {
    drowpdown.classList.toggle('dropdown--active');
    button.classList.toggle('button__nav--active');
    buttonX.classList.toggle('button__nav--active');
})