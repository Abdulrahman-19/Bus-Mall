'use strict';

let leftIndex;
let rightIndex;
let centerIndex;
let maxNumOfClicks=0;
// let arr= [];
const product = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass'
];

const leftImage = document.getElementById('left-image');
const centerImage = document.getElementById('center-image');
const rightImage = document.getElementById('right-image');
const section = document.getElementById('images-section');
const button = document.getElementById('btn');


function Mall(productName){
  this.productName = productName;
  this.path = `./assets/${productName}.jpg`;
  this.votes = 0;
  this.views = 0;
  Mall.all.push(this);
}
Mall.all =[];

for (let i = 0; i<product.length;i++){
  new Mall(product[i]);
}
console.log(Mall.all);

function render(){

  leftIndex = randomNumber(0,Mall.all.length-1);
  leftImage.src = Mall.all[leftIndex].path;
  leftImage.alt =Mall.all[leftIndex].productName;
  leftImage.title = Mall.all[leftIndex].productName;
  rightIndex = randomNumber(0,Mall.all.length-1);
  rightImage.src = Mall.all[rightIndex].path;
  rightImage.alt =Mall.all[rightIndex].productName;
  rightImage.title = Mall.all[rightIndex].productName;
  centerIndex = randomNumber(0,Mall.all.length-1);
  centerImage.src = Mall.all[centerIndex].path;
  centerImage.alt =Mall.all[centerIndex].productName;
  centerImage.title = Mall.all[centerIndex].productName;


}

section.addEventListener('click',clicking);
function clicking(event){
  let x = event.detail;
  // if((rightImage.src !== leftImage.src) && (leftImage.src !== centerImage.src) && (centerImage.src !== rightImage.src)){
  if(event.target.id !== 'images-section'){
    if(event.target.id ===rightImage.id){
      Mall.all[rightIndex].votes++;
      Mall.all[leftIndex].views++;
      Mall.all[rightIndex].views++;
      Mall.all[centerIndex].views++;
      maxNumOfClicks++;
    }
    else if (event.target.id === leftImage.id){
      Mall.all[leftIndex].votes++;
      Mall.all[leftIndex].views++;
      Mall.all[rightIndex].views++;
      Mall.all[centerIndex].views++;
      maxNumOfClicks++;
    }
    else{
      Mall.all[centerIndex].votes++;
      Mall.all[leftIndex].views++;
      Mall.all[rightIndex].views++;
      Mall.all[centerIndex].views++;
      maxNumOfClicks++;
    }
  }
  if (maxNumOfClicks<=5){
    console.log(x);
    render();
  }
  else{
    section.removeEventListener('click', clicking);
  }

}
button.addEventListener('click',results);
function results(){
  const articleEL = document.getElementById('article');
  const ul = document.createElement('ul');
  articleEL.appendChild(ul);
  for (let i = 0; i<product.length;i++){
    const li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = `${Mall.all[i].productName} had ${Mall.all[i].votes} votes, and was seen ${Mall.all[i].views} times.`;
  }
}
// }



// console.table(Mall.all);
function randomNumber(min, max) {
  // let rand=Math.floor(Math.random() * (max - min + 1) ) + min;
  // arr.push(rand);
  // for (let i = 0 ; i<2;i++){
  //   rand=Math.floor(Math.random() * (max - min + 1) ) + min;
  //   if (rand !== arr[0]){
  //     arr.push(rand);
  //   }
  // }
  // console.log(arr);
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

render();


