const r = document.querySelector(':root');
const hueColor = getComputedStyle(r).getPropertyValue('--hueColor');
const mainColor = `hsl(${hueColor}, 92%, 53%)`;
const chartBarColor = `hsl(${hueColor}, 100%, 75%)`;