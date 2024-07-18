const demoSection = document.getElementById('demo');
var model = undefined;
cocoSsd.load().then(function (loadedModel){
    model = loadedModel;
    demoSection.classList.remove('invisible');
});
const imageContainers = document.getElementsByClassName('classify');
for(let i = 0; i<imageContainers.length; i++){
    imageContainers[i].children[0].addEventListener('click', handleclick);
}


function handleclick(event){
    if(!model){
        console.log('Wait for Model before Clicking');
        return;
    }
    model.detect(event.target).then(function (predictions){
        console.log(predictions);
        for(let n=0; n<predictions.length; n++){
            const p = document.createElement('p');
            p.innerText = predictions[n].class + '-with' + Math.round(parseFloat(predictions[n].score)*100) + '% confidence';
            p.style = 'left:' + predictions[n].bbox[0] + 'px;' + 'top:' + predictions[n].bbox[1] + 'px;' + 'width:' + (predictions[n].bbox[2]-10) + 'px;' ;
            const highlighter = document.createElement('div');
            highlighter.setAttribute('class', 'highlighter');
            highlighter.style = 'left:' + predictions[n].bbox[0] + 'px;' + 'top:' + predictions[n].bbox[1] + 'px;' + 'width:' + (predictions[n].bbox[2]) + 'px;' + 'height:' + predictions[n].bbox[3] + 'px;' ;
            event.target.parentNode.appendChild(highlighter);
            event.target.parentNode.appendChild(p);
        }
    });
}
