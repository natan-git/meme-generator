'use strict'


const  init=()=>{
    renderGallery()
    setGalleryImgs(document.querySelectorAll('.picture'))
    KeyWordsToRender()
}

const  KeyWordsToRender=()=>{
    const keyWords = document.querySelector('.keyWords')
    let topKeyWords= getTopKeyWords()
    const strSpans = topKeyWords.map( (keyWord,i)=> {
        let fontSize=(27-i*5)
        return `<span style="font-size:${fontSize}px; cursor:pointer;" onclick="setFillterdByClick('${keyWord.value}')">${keyWord.value} &nbsp; </span>`;
    })
    keyWords.innerHTML = strSpans.join('');
    
}

const renderGallery=()=>{
    const elGallery= document.querySelector('.gallery-content')
    const gallery= getGalleryData()
    const strDivs = gallery.map( img=> {
        return `<div class="picture"  onclick="onSelectedPicture(${img.id})">
                    <img id="${img.id}" src=${img.url} alt=${img.id}>
                </div>`;
    })
    elGallery.innerHTML = strDivs.join('');
}

const onSelectedPicture=(imgID)=>{
    document.querySelector('.canvas-wrap').style="display:flex";
    document.querySelector('.gallery-container').style="display:none;";
    initCanvas(imgID)
}

const backToGallery=()=>{
    renderGallery()
    KeyWordsToRender()
    document.querySelector('.gallery').classList.add('active');
    document.querySelector('.memes').classList.remove('active');
    document.querySelector('.canvas-wrap').style="display:none";
    document.querySelector('.gallery-container').style="display:flex;";
}

const onToggleMenu=()=>{
    document.body.classList.toggle('menu-open');
}

const onSearch=()=>{
    let input = document.querySelector('#search').value;
    setFillterdKeyWords(input)
    renderGallery()
}

const setFillterdByClick=(word)=>{
    setFillterdKeyWords(word)
    renderGallery()
}



