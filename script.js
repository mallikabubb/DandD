"use strict";

// NOTE: in VSCode, install the "Live Server" extension
// To display the page, press Ctrl-Shift-P and choose "Open with Live Server"

window.onload = () => {
    function readStr() {
        return new Promise((res, rej) => {
            document.querySelector('input[type=submit]').disabled = false;
            document.querySelector('form').onsubmit = (e) => {
                e.preventDefault();
                document.querySelector('input[type=submit]').disabled = true;
                res(document.querySelector('#textentry').value);
                return false;
            }
        });
    }

    function playVideo(url) {
        write(`<video autoplay controls src='${url}'></video>`);
    }

    function playAudio(url) {
        write(`<audio autoplay controls src='${url}'></audio>`);
    }

    function write(str) {
        var newParagraph = document.createElement('p');
        newParagraph.innerHTML = str;
        document.querySelector('#rpg-text').appendChild(newParagraph);
        document.querySelector('#rpg-text').scrollTop = document.querySelector('#rpg-text').scrollHeight;
        return newParagraph;
    }

    async function test() {
        write('Enter a video URL');
        var videoUrl = await readStr();
        playVideo(videoUrl);
        
        write('Enter an audio URL');
        var audioUrl = await readStr();
        playAudio(audioUrl);

        var lastStr = 'got';
        for (var i = 0; i < 10; i++) {
            lastStr += ' ' + await readStr();
            var newRowElem = write(lastStr);
            newRowElem.style.fontFamily = 'cursive';
            newRowElem.style.color = 'red';
            newRowElem.style.fontWeight = 'bold';
            newRowElem.style.fontStyle = 'italic';
        }

    }

    test();
}