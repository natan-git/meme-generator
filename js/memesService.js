'use strict'

let gMemes;
let gCurrImg;
let gPictures;

const setMemesData=()=>{
    gCurrImg=null
 gMemes=loadFromStorage('memes', [])
}

const setGalleryImgs=(imgs)=>{
    gPictures=[]
    imgs.forEach(img=>{
        gPictures.push(img.childNodes[0].nextElementSibling)
    })
}

const findPictureById = (imgID) => {
    return gPictures.find((img) => {
        return parseInt(img.id) === imgID
    });
}

const findMemeById=memeId=>{
    return gMemes.find((meme) => {
        return meme.id === memeId
    });
}


const getMemesData=()=>{
    return gMemes
}


const drawImgs = (imgID, canvas,ctx) => {
    let img =findPictureById(imgID)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
}

const drawTexts = (txt, size, align, color, stroke, strokeSize, fontFamely, x, y,ctx) => {
    ctx.save()
    ctx.strokeStyle = stroke
    ctx.fillStyle = color
    ctx.font = `${size}px ${fontFamely}`;
    ctx.textAlign = align;
    ctx.lineWidth = strokeSize;
    ctx.strokeText(txt, x, y);
    ctx.fillText(txt, x, y);
    ctx.restore()
}

