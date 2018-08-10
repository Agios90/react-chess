import React from 'react';
import Utils from './utils';

const { firebase } = window;

var newGame = {};

export default function() {
  return (
    <div className='view row'>
      <div className='column column-60 column-offset-20 cont' style={{textAlign: 'center'}}>
        <div className="tokens" id="tokens" >
          Copy one of the tokens and send it to your friend, then click on the Play button to start the game!
          <br /> <br />
          <label>White token</label>
          <input id="wToken" />
          <button id="wEnter" onClick={enterGameAsWhite} style={{margin:'1rem'}}>Play</button>
          <button id="wClip" onClick={toClipboardWhite}>Copy To Clipboard</button>

          <label>Black token</label>
          <input id="bToken" /> 
          <button id="bEnter" onClick={enterGameAsBlack} style={{margin:'1rem'}}>Play</button>
          <button id="bClip" onClick={toClipboardBlack}>Copy To Clipboard</button>
        </div>
        <button id="createGame" onClick={createGame} style={{textAlign: 'center', width:'38rem'}}>Create a New Game</button>
        <input type="text" id="token" placeholder="Or enter a game token and press Enter" style={{textAlign: 'center', width:'38rem'}}/>
      </div>
    </div>
  );
}

document.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    var input = document.getElementById("token");
    enterGame(input.value);
  }
});

function toClipboardWhite() {
    var copyText = document.getElementById("wToken");
    copyText.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    var btn = document.getElementById("wClip");
    btn.innerText="\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 Copied! \u00a0 \u00a0 \u00a0 \u00a0 \u00a0"
    btn.style.backgroundColor="#00CC00";
    btn = document.getElementById("bEnter")
    btn.style.backgroundColor = "#9b4dca"
    btn = document.getElementById("bClip")
    btn.style.backgroundColor = "#777777"
    btn = document.getElementById("wEnter")
    btn.style.backgroundColor = "#777777"
}

function toClipboardBlack() {
  var copyText = document.getElementById("bToken");
  copyText.select();
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  var btn = document.getElementById("bClip");
  btn.innerText="\u00a0 \u00a0 \u00a0 \u00a0 \u00a0 Copied! \u00a0 \u00a0 \u00a0 \u00a0 \u00a0"
  btn.style.backgroundColor="#00CC00";
  btn = document.getElementById("wEnter")
  btn.style.backgroundColor = "#9b4dca"
  btn = document.getElementById("wClip")
  btn.style.backgroundColor = "#777777"
  btn = document.getElementById("bEnter")
  btn.style.backgroundColor = "#777777"
}

function enterGame(value) {
  window.location.replace(`http://51.15.98.160:8080/chess/enterGame?value=${value}`);
}

function enterGameAsWhite() {
  window.location.replace(`http://51.15.98.160:8080/chess/RegisterGame?playerColor=WHITE&wtoken=${newGame.p1_token}&btoken=${newGame.p2_token}`);
}

function enterGameAsBlack() {
  window.location.replace(`http://51.15.98.160:8080/chess/RegisterGame?playerColor=BLACK&wtoken=${newGame.p1_token}&btoken=${newGame.p2_token}`);
}

function createGame() {
  newGame = {
    p1_token: Utils.token(),
    p2_token: Utils.token()
  };
  var btn = document.getElementById("createGame")
  btn.disabled = "true";
  btn.style.backgroundColor = "#777777"
  document.getElementsByClassName("cont")[0].style.marginTop="33%"
  document.getElementById("tokens").style.display = "block";
  document.getElementById("createGame").style.display = "none";
  document.getElementById("token").style.display = "none";
  document.getElementById("wToken").value=newGame.p1_token;
  document.getElementById("bToken").value=newGame.p2_token;

  const game = firebase.database().ref("games").push();

  game
    .set(newGame)
    .then(() => {
    }, (err) => {
      throw err;
    });
}
