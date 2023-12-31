let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winningPattern = [
  [0,1,2],
  [0,3,6],
  [0,4,8],
  [1,4,7],
  [2,5,8],
  [2,4,6],
  [3,4,5]
  [6,7,8]
];

boxes.forEach((box) => {
  box.addEventListener('click', ()=>{
    if (turnO){
      box.innerText = "O";
      turnO = false;
    } else{
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const resetGame = () => {
  turnO = true;
  enableBoxes();
  count = 0;
  msgContainer.classList.add('hide');
};

const enableBoxes = () => {
  for (let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}

const diableBoxes = () => {
  for (let box of boxes){
    box.disabled = true;
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congragulations! Winner is ${winner}`
  msgContainer.classList.remove('hide');
  diableBoxes()
};

const checkWinner = () => {
  for (let pattern of winningPattern){
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
      if (pos1Val == pos2Val && pos2Val == pos3Val){
        console.log("Winner")
        showWinner(pos1Val)
      }

    }
  }
}

newGameBtn.addEventListener('click', resetGame);
resetbtn.addEventListener('click', resetGame);