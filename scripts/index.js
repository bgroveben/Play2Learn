window.addEventListener('load', changeText);

const statement = [];
const source = [];

statement[0] = '"We have to stop optimizing for programmers and start optimizing for users."';
source[0] = "Jeff Atwood";

statement[1] = '"The human spirit must prevail over technology."';
source[1] = "Albert Einstein";

statement[2] = '"Do or do not. There is no try."';
source[2] = "Yoda";

statement[3] = '"Any sufficiently advanced technology is indistinguishable from magic."';
source[3] = "Arthur C.Clarke";

statement[4] = '"Computers are useless. They can only give you answers.';
source[4] = "Pablo Picasso";

statement[5] = '"The computer can\'t tell you the emotional story. It can give you the exact mathematical design."';
source[5] = "Frank Zappa";

setInterval(changeText, 10000);
const quote = document.getElementById("quotes");
let i = 0;
function changeText(){
    quotes.innerHTML=(statement[i] + '<p><i>' + source[i] + '</i></p>');
    if(i === 5)
        i = 0;
    else
        i++;
}
