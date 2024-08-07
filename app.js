// Створюємо змінну для перевірки поточного ходу гравця
let step = "";
// Змінна де буде вписуватись хто саме ходить
let spanWho = document.getElementById('spanWho');
let winner = "";
// функція яка буде визначати чий хід
const who = ()=>{
   if (step == "circle"){
      step = "krest";
      spanWho.innerText = 'Хрестики';
   }else{
      step = "circle"
      spanWho.innerText = 'Нулики';
   }
}
who()//одразу запускаємо цю ф-ю, тому що при запуску гри маємо одразу визначити чий хід
// Отримуємо всі клітинки
let blockItem = document.querySelectorAll('.blockItem')
let counter = 0;// створили лічильник
blockItem.forEach((item)=>{
   item.addEventListener('click',()=>{
      if(!item.classList.contains('circle') && !item.classList.contains('krest')){// якщо НЕ
         item.classList.add(step);
         if(step == 'krest'){
            item.innerText = 'X'
            spanWho.style.color = 'rgb(47, 226, 47)'
         };
         if(step == 'circle'){
            item.innerText = '0'
            spanWho.style.color = 'rgb(139, 175, 229)'
         };
      };
      who() //при кожному кліку нам потрібно, щоб спрацьовувала ф-я з поточним кроком гравця
      counter++ // збільшуємо лічильник щоб в майбутньому він міг підраховувати к-ть натиснутих клітинок
      krestWin();
      circleWin();
      noWin();
   });
});

// Створимо ф-ю яка буде визнчати перемогу Х або 0
// Спершу масив з переможними комбінаціями
let win = [
   [0,1,2],
   [0,4,8],
   [2,4,6],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8]
];
// ф-я на перемогу нуликів
let circleWin = ()=>{
for (let i =0; i<win.length; i++){
   if(
      blockItem[win[i][0]].classList.contains('circle')&&// i-це увесь масив win 0-перша комбінація
      blockItem[win[i][1]].classList.contains('circle')&&
      blockItem[win[i][2]].classList.contains('circle')
   ){
      blockItem[win[i][0]].classList.add('winColor');
      blockItem[win[i][1]].classList.add('winColor');
      blockItem[win[i][2]].classList.add('winColor');
      winner = 'Нулики';
      endGame(winner);
   return 1 // перевіряємо якщо перемога 0 або Х , то вони повертають 1 і це значить, що хтось переміг, а якщо немає повернення 1 то нічия

   }

}
};
// ф-я на перемогу хрестиків
let krestWin = ()=>{
   for (let i =0; i<win.length; i++){
      if(
         blockItem[win[i][0]].classList.contains('krest')&&// i-це увесь масив win 0-перша комбінація
         blockItem[win[i][1]].classList.contains('krest')&&
         blockItem[win[i][2]].classList.contains('krest')
      ){
         blockItem[win[i][0]].classList.add('winColor');
         blockItem[win[i][1]].classList.add('winColor');
         blockItem[win[i][2]].classList.add('winColor');
         winner = 'Хрестики';
         endGame(winner);
      return 1 // перевіряємо якщо перемога 0 або Х , то вони повертають 1 і це значить, що хтось переміг, а якщо немає повернення 1 то нічия
      }
   }
   };
// Ств ф-ю нічиї
let noWin = ()=>{
   //коли 1 повертається, ф-я krestWin() повертає значення true. !krestWin() означає НЕ true
if(!krestWin() && !circleWin()&& (counter >= 9)) { 
winner = 'Нічия';
   endGame(winner);
};
};
// Ств ф-ю звкінчення гри
let blockWinner = document.getElementById('blockWinner');
let spanWinner = document.getElementById('spanWinner');
let btnNewGame = document.getElementById('btnNewGame');
// для блокування ігрового поля дістаємо blockArea
let blockArea = document.getElementById('blockArea');
let endGame = (winner)=>{
   blockArea.style.pointerEvents = "none";//блокуємо любу взаємодію з мишкою
   blockWinner.style.display = "flex";//поява блока при кінці гри
   spanWinner.innerText = winner;
   // при натисканні на кнопку сторінка буде перезавантажуватись
   btnNewGame.addEventListener('click',()=>{
      document.location.reload();
   });
};