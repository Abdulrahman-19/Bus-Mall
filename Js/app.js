'use strict';

let leftIndex;
let rightIndex;
let centerIndex;
let maxNumOfClicks=0;
let myVotes =[];
let myViews =[];
// let arr= [];
const product = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg',
  'sweep.png',
  'usb.gif'
];

const leftImage = document.getElementById('left-image');
const centerImage = document.getElementById('center-image');
const rightImage = document.getElementById('right-image');
const section = document.getElementById('images-section');
const button = document.getElementById('btn');


function Mall(productName){
  this.productName = productName;
  this.path = `./assets/${productName}`;
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
  centerIndex = randomNumber(0,Mall.all.length-1);
  rightIndex = randomNumber(0,Mall.all.length-1);
  if(leftIndex !== rightIndex && leftIndex!== centerIndex && rightIndex!==centerIndex){
    leftImage.src = Mall.all[leftIndex].path;
    leftImage.alt =Mall.all[leftIndex].productName;
    leftImage.title = Mall.all[leftIndex].productName;

    rightImage.src = Mall.all[rightIndex].path;
    rightImage.alt = Mall.all[rightIndex].productName;
    rightImage.title = Mall.all[rightIndex].productName;

    centerImage.src = Mall.all[centerIndex].path;
    centerImage.alt =Mall.all[centerIndex].productName;
    centerImage.title = Mall.all[centerIndex].productName;
  }



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
  if (maxNumOfClicks<=25){
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
    myVotes.push(Mall.all[i].votes);
    myViews.push(Mall.all[i].views);
  }
  chartFun();
}
// }
console.log('votes',myViews);
console.log('viewes',myVotes);


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

function chartFun() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: product,
      datasets: [{
        label: 'Product votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: myVotes
      },
      {
        label: 'Product views',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: myViews
      }]
    },

    // Configuration options go here
    options: {}
  });
}
