'use strict'


const gKeywords = { 'happy': 12, 'funny puk': 1 }
const gStickers = [{ id: 1, url: 'img/gilad.webp' },
{ id: 2, url: 'img/turtule.webp' },
{ id: 3, url: 'img/supreme.webp' },
{ id: 4, url: 'img/louis.webp' },
{ id: 5, url: 'img/pothead.webp' }]
let gIndexSticker = 0
const gImgs = [{ id: 1, url: 'img/003.jpg', keywords: ['trump', 'angry', 'speach'] },
{ id: 2, url: 'img/004.jpg', keywords: ['dog', 'cute', 'happy', 'love', 'kiss'] },
{ id: 3, url: 'img/005.jpg', keywords: ['dog', 'baby', 'happy', 'smile'] },
{ id: 4, url: 'img/5.jpg', keywords: ['sad', 'baby'] },
{ id: 5, url: 'img/006.jpg', keywords: ['cat', 'sleep'] },
{ id: 6, url: 'img/8.jpg', keywords: ['hat', 'clown', 'man', 'smile'] },
{ id: 7, url: 'img/9.jpg', keywords: ['lol', 'baby', 'happy', 'smile'] },
{ id: 8, url: 'img/12.jpg', keywords: ['tv show', 'old', 'happy', 'smile'] },
{ id: 9, url: 'img/Ancient-Aliens.jpg', keywords: ['ancient', 'history', 'happy', 'smile'] },
{ id: 10, url: 'img/img5.jpg', keywords: ['kid', 'black', 'happy', 'smile'] },
{ id: 11, url: 'img/img11.jpg', keywords: ['president', 'black', 'happy', 'smile', 'obama'] },
{ id: 12, url: 'img/img12.jpg', keywords: ['kiss', 'black', 'love', 'smile', 'happy'] },
{ id: 13, url: 'img/leo.jpg', keywords: ['wine', 'glass', 'happy', 'smile', 'actor'] },
{ id: 14, url: 'img/meme1.jpg', keywords: ['sunglasess', 'black', 'sad', 'actor'] },
{ id: 16, url: 'img/One-Does-Not-Simply.jpg', keywords: ['actor'] },
{ id: 17, url: 'img/patrick.jpg', keywords: ['old'] },
{ id: 18, url: 'img/putin.jpg', keywords: ['putin', 'president', 'russia'] },
{ id: 19, url: 'img/X-Everywhere.jpg', keywords: ['toy', 'story', 'movie', 'game'] }];
let gMeme = {
    id: 0,
    selectedImgId: 1, selectedTxtIdx: 0,
    txts: []
}
let gCanvas
let ctx
let gImg
let gFillteredKeyWords = "";
let gDragMode;
let gPrevEvent;


const resizeCanvas = () => {
    const elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth - 100
    gCanvas.height = elContainer.offsetHeight - 100
}

const setGlobalVar = (imgID, meme, img) => {
    gCanvas = document.querySelector('#my-canvas');
    ctx = gCanvas.getContext('2d')
    gImg = img
    gDragMode = false
    gPrevEvent = {}
    gIndexSticker = 0
    if (meme) {
        gMeme = meme
        gMeme.id = gMeme.id + 'q'
        return
    }
    gMeme.selectedImgId = imgID
    gMeme.selectedTxtIdx = 0
    gMeme.txts = []
    gMeme.id = getRandomID()
}

const findImgById = (imgID) => {
    return gImgs.find((img) => {
        return img.id === imgID
    });
}

const getGalleryData = () => {
    let imgs = gImgs
    imgs = getFillterdKeyWords(imgs)
    return imgs
}

const getCurrentElementCanvas=()=>{
    return gMeme.txts[gMeme.selectedTxtIdx]
}

const getEmojiesToRender = () => {
    let stickers = []
    for (let i = 0; i < 4; i++) {
        stickers.push(gStickers[(gIndexSticker + i) % gStickers.length])
    }
    return stickers
}

const changeIndexSticker = (diff) => {

    gIndexSticker += diff
    if (gIndexSticker < 0) gIndexSticker = gStickers.length - 1
    if (gIndexSticker === gStickers.length) gIndexSticker = 0
}

const getTxts = () => { return gMeme.txts }

const setFillterdKeyWords = (input) => {
    gFillteredKeyWords = input;
}

const getFillterdKeyWords = (imgs) => {
    return imgs.filter(img => {
        for (let i = 0; i < img.keywords.length; i++) {
            if (img.keywords[i].toLowerCase().includes(gFillteredKeyWords)) return img
        }
    })
}


const drawImg = (imgID) => {
    if (gImg)
        ctx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    else {
        gImg = new Image()

        let img = findImgById(imgID)
        gImg.onload = () => {
            ctx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
        };

        gImg.src = img.url
    }
}



const changeTxt = (line) => {
    gMeme.txts[gMeme.selectedTxtIdx].line = line
}
const setWidthTxt = (txt) => {
    gMeme.txts[gMeme.selectedTxtIdx].width = ctx.measureText(txt).width;
}

const addText = () => {
    gMeme.selectedTxtIdx = gMeme.txts.length
    let newTxt = createTxt()
    if (gMeme.selectedTxtIdx === 0) newTxt.offsetY = 0 + newTxt.size
    else if (gMeme.selectedTxtIdx === 1) newTxt.offsetY = gCanvas.height
    gMeme.txts.push(newTxt)
}


const createTxt = (line = '', size = 40, color = 'white', stroke = 'black', strokeSize = 4, fontFamely = 'impact', offsetX = gCanvas.width / 2, offsetY = gCanvas.height / 2, type = "txt") => {
    return { line, size, color, stroke, strokeSize, fontFamely, offsetX, offsetY, type }
}

const addStiker = id => {
    gMeme.selectedTxtIdx = gMeme.txts.length
    let sticker = findStickerById(id)
    let newSticker = createSticker(sticker.url)
    gMeme.txts.push(newSticker)
}

const createSticker = (url) => {
    let type = "sticker"
    let offsetX = 50
    let offsetY = 50
    let width = 100
    let size = 100
    let img = new Image()
    img.src = url
    img.onload = () => {
        ctx.save();
        ctx.drawImage(img, offsetX, offsetY, width, size)
        ctx.restore();
    }
    return { type, offsetX, offsetY, width, size, img }
}

const drawSticker = (sticker) => {
    ctx.save();
    if(!sticker.img.src){
        let src=sticker.img
        sticker.img=new Image()
        sticker.img.src=src
        sticker.img.onload=()=>{
            ctx.drawImage(sticker.img, sticker.offsetX, sticker.offsetY, sticker.width, sticker.size)
        }

    }
    else{
        ctx.drawImage(sticker.img, sticker.offsetX, sticker.offsetY, sticker.width, sticker.size)
    }
   
    ctx.restore();
}
const drawstickerBG = (sticker) => {
    ctx.save();

    ctx.textBaseline = 'Bottom';
    drawSticker(sticker)
    ctx.fillStyle = 'transparent';
    ctx.strokeStyle = 'black'
    ctx.beginPath();
    ctx.rect(sticker.offsetX - 10, sticker.offsetY - 10, sticker.width + 20, sticker.size + 20)
    ctx.stroke()
    ctx.closePath()
    ctx.restore();
}



const findStickerById = (stickerID) => {
    return gStickers.find((sticker) => {
        return sticker.id === stickerID
    });
}


const drawText = (txt, size, color, stroke, strokeSize, fontFamely, x, y) => {
    ctx.save()
    ctx.strokeStyle = stroke
    ctx.fillStyle = color
    ctx.font = `${size}px ${fontFamely}`;
    ctx.textAlign = 'left';
    ctx.lineWidth = strokeSize;
    ctx.strokeText(txt, x, y);
    ctx.fillText(txt, x, y);
    ctx.restore()
}

const drawTextBG = (txt, font, color, stroke, strokeSize, fontFamely, x, y) => {
    ctx.save();
    ctx.font = `${font}px ${fontFamely}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'Bottom';
    ctx.fillStyle = 'transparent';
    ctx.strokeStyle = 'black'
    setWidthTxt(txt)
    let width = gMeme.txts[gMeme.selectedTxtIdx].width
    ctx.beginPath();
    ctx.rect(x - 10, y - font, width + 20, font + 10)
    ctx.stroke()
    ctx.closePath()
    ctx.fillStyle = color;
    ctx.strokeStyle = stroke
    ctx.lineWidth = strokeSize;
    ctx.strokeText(txt, x, y);
    ctx.fillText(txt, x, y);
    ctx.restore();
}

const setXbyAling = (x, align, width) => {
    if (align === 'center') x = x - (width / 2)
    else if (align === 'right') x = x - width
    return x
}

const changeFontSize = (num) => {
    gMeme.txts[gMeme.selectedTxtIdx].size += num
    if (gMeme.txts[gMeme.selectedTxtIdx].size === 0) gMeme.txts[gMeme.selectedTxtIdx].size = 1
}

const changeLine = (num) => {
    let index = gMeme.selectedTxtIdx
    gMeme.txts[index].offsetY += num
    if (gMeme.txts[index].offsetY < 0) gMeme.txts[gMeme.selectedTxtIdx].offsetY = 0
    if (gMeme.txts[index].offsetY > gCanvas.height + gMeme.txts[index].size) gMeme.txts[index].offsetY = gCanvas.height + gMeme.txts[index].size
}

const getCurrSelectedTxtIdx = () => { return gMeme.selectedTxtIdx }

const changeSelectedTxtIdx = (index) => {
    if (index >= 0) gMeme.selectedTxtIdx = index
    else gMeme.selectedTxtIdx = (gMeme.selectedTxtIdx + 1) % gMeme.txts.length
}

const deleteTxt = () => {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1)
}

const getCurrentTxt = () => {
    return gMeme.txts[gMeme.selectedTxtIdx].line
}
const getCurrentfontFamely = () => {
    return gMeme.txts[gMeme.selectedTxtIdx].fontFamely
}
const setColor = (color) => {
    gMeme.txts[gMeme.selectedTxtIdx].color = color;
}

const setStrokeColor = (color) => {
    gMeme.txts[gMeme.selectedTxtIdx].stroke = color;
}

const setFontFamely = (font) => {
    gMeme.txts[gMeme.selectedTxtIdx].fontFamely = font;
}

const toggleStroke = () => {
    if (gMeme.txts[gMeme.selectedTxtIdx].strokeSize === 4) gMeme.txts[gMeme.selectedTxtIdx].strokeSize = 0
    else gMeme.txts[gMeme.selectedTxtIdx].strokeSize = 4
}

const changeAlign = (align) => {
    let txt = gMeme.txts[gMeme.selectedTxtIdx]
    if (align === "left") txt.offsetX = 10
    else if (align === "right") txt.offsetX = gCanvas.width - txt.width
    else txt.offsetX = (gCanvas.width / 2) - (txt.width / 2)

}

const getTopKeyWords = () => {
    let keywords = getArrKeyWords()
    let mapKeyWords = getMapKeyWords(keywords)
    let keywordsMapAsArray = getMapToArray(mapKeyWords)
    let sortedKeyWords = getSortedKeyWords(keywordsMapAsArray)
    return sortedKeyWords.splice(0, 5)
}
const getArrKeyWords = () => {
    let keywords = []
    gImgs.forEach(img => {
        keywords.push(...img.keywords)
    })
    return keywords
}
const getMapKeyWords = (keywords) => {

    let mapValues = keywords.reduce((valueMap, value) => {
        valueMap[value] = (valueMap[value] || 0) + 1
        return valueMap
    }, {})
    return mapValues
}

const getMapToArray = (mapKeyWords) => {
    let mapToArray = []
    for (let value in mapKeyWords) {
        let keyWord = { value, count: mapKeyWords[value] }
        mapToArray.push(keyWord)
    }
    return mapToArray
}

function getSortedKeyWords(keyWords) {
    return keyWords.sort(function (keyword1, keyword2) {
        return keyword1['count'] < keyword2['count'] ? 1 :
            (keyword1['count'] > keyword2['count'] ? -1 : 0)
    })
}



const setDragMode = (flag) => {
    gDragMode = flag
}

const checkDragMode = () => {
    return gDragMode
}
const checkIfTxtInRange = (ev) => {
    
    for (let i = 0; i < gMeme.txts.length; i++) {
        let txt = gMeme.txts[i]
        if (txt.type === 'txt') {
            if (txt.offsetX <= ev.offsetX && (txt.offsetX + txt.width) >= ev.offsetX && txt.offsetY >= ev.offsetY && txt.offsetY - txt.size <= ev.offsetY) {
                changeSelectedTxtIdx(i)
                return true
            }
        }
        else if(txt.type==='sticker'){
            if(txt.offsetX-7<=ev.offsetX && txt.offsetX+10+txt.width>=ev.offsetX&&txt.offsetY-7<=ev.offsetY&&txt.offsetY+10+txt.size>=ev.offsetY){
                changeSelectedTxtIdx(i)
                return true
            }
        }
    }

    return false
}

const moveTxt = (ev) => {
    if (gPrevEvent.offsetX) {
        gMeme.txts[gMeme.selectedTxtIdx].offsetX += getDiff(gPrevEvent.offsetX, ev.offsetX)
        gMeme.txts[gMeme.selectedTxtIdx].offsetY += getDiff(gPrevEvent.offsetY, ev.offsetY)
    }
    setPrevEvent(ev)
}
const setPrevEvent = (ev) => {
    if (!ev) {
        gPrevEvent.offsetX = null
        gPrevEvent.offsetY = null
    }
    else {
        gPrevEvent.offsetX = ev.offsetX
        gPrevEvent.offsetY = ev.offsetY
    }
}
const saveCanvas = () => {
    let memes = loadFromStorage('memes', [])
    setImgToSave()
    memes.push(gMeme)
    saveToStorage('memes', memes)
}

const setImgToSave=()=>{
    gMeme.txts.forEach((element,index)=>{
        if(element.type==="sticker"){
            element.img=element.img.src
        }
    })
}
