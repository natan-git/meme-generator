'use strict'

const initCanvas = (imgID, meme = null, img = null) => {
    setGlobalVar(imgID, meme, img)
    document.querySelector('#text').value = ''
    drawImg(imgID)
    renderStickers()
    if (!meme) addText()
    renderCanvas()
}

const renderCanvas = (downloadMode) => {
    const txts = getTxts()
    drawImg()
    txts.forEach((txt, index) => {
        if (txt.type === 'txt') {
            if (getCurrSelectedTxtIdx() === index && !downloadMode) drawTextBG(txt.line, txt.size, txt.color, txt.stroke, txt.strokeSize, txt.fontFamely, txt.offsetX, txt.offsetY)
            else drawText(txt.line, txt.size, txt.color, txt.stroke, txt.strokeSize, txt.fontFamely, txt.offsetX, txt.offsetY)
        }
        else if(txt.type==='sticker'){
            if (getCurrSelectedTxtIdx() === index && !downloadMode)drawstickerBG(txt)
            else drawSticker(txt)
        }
        

    })

}

const renderStickers = () => {
    let elEmojiContainer = document.querySelector('.emoji-container')
    let stickers = getEmojiesToRender()
    let strHtml = ` <img class="arrow-btn left" src="./img/buttons/left-btn.png" alt="" onclick="onChangeIndexSticker(-1)" >
    <img class="arrow-btn right" src="./img/buttons/right-btn.png" alt="" onclick="onChangeIndexSticker(1)" >`
    let strImgs = stickers.map((sticker) => `<img class="stricker" src="${sticker.url}" alt="WebP rules." onclick="onSelectedSticker(${sticker.id})"/>`)
    strHtml += strImgs.join('')
    elEmojiContainer.innerHTML = strHtml;
}

const onSelectedSticker = (id) => {
    addStiker(id)
    renderCanvas()
}

const onChangeIndexSticker = (diff) => {
    changeIndexSticker(diff)
    renderStickers()
}

const onChangeText = () => {
    let elText = document.querySelector('#text')
    changeTxt(elText.value)
    renderCanvas()
}


const onChangeFontSize = (num) => {
    changeFontSize(num)
    renderCanvas()
}

const onChangeLine = (num) => {
    changeLine(num)
    renderCanvas()
}

const onAddText = () => {
    let elText = document.querySelector('#text')
    elText.value = ''
    addText()
    renderCanvas()
}

const onSwitchText = () => {

    changeSelectedTxtIdx()
    changeInputsValue()
    renderCanvas()
}

const changeInputsValue = () => {
    let elText = document.querySelector('#text')
    let elFontList = document.querySelector('#font-list')
    if(getCurrentElementCanvas().type==='sticker'){
        elText.value = ''
        return
    }
    if (getTxts().length === 0) {
        elText.value = ''
        addText()
    }
    elFontList.value = getCurrentfontFamely()
    elText.value = getCurrentTxt()
}

const onDelete = () => {
    deleteTxt()
    onSwitchText()
}
const onChangeColor = () => {
    let elColor = document.querySelector('#color')
    setColor(elColor.value)
    renderCanvas()
}

const onChangeStrokeColor = () => {
    let elStrokeColor = document.querySelector('#stroke-color')
    setStrokeColor(elStrokeColor.value)
    renderCanvas()
}

const onDownload = (elLink) => {
    renderCanvas(true)
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme.png'
    renderCanvas()
}

const onChangeFontFamely = () => {
    let elFontFamely = document.querySelector('.font-famely')
    setFontFamely(elFontFamely.value)
    renderCanvas()
}

const onChangeStrokeSize = () => {
    toggleStroke()
    renderCanvas()
}

const onChangeAlign = (align) => {
    changeAlign(align)
    renderCanvas()
}

const onPublish = (ev) => {
    ev.target.innerText = ""
}


function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
        })
}

const onMouseDown = (event) => {
    if (checkIfTxtInRange(event)) {
        setDragMode(true)
        changeInputsValue()
    }
    renderCanvas()
}
const onMove = (event) => {
    if (checkDragMode()) {
        let elCanvas = document.querySelector('#my-canvas')
        elCanvas.classList.remove('grab')
        elCanvas.classList.add('grabbing')
        moveTxt(event)
        renderCanvas()
    }
}

const moveTouch = (ev) => {
    ev.preventDefault()
    let event = { offsetX: ev.touches[0].clientX - gCanvas.offsetLeft, offsetY: ev.touches[0].clientY - gCanvas.offsetTop }
    if (checkIfTxtInRange(event)) {
        moveTxt(event)
    } else {
        setPrevEvent(null)
    }
    renderCanvas()
}

const onMouseUp = (event) => {
    let elCanvas = document.querySelector('#my-canvas')
    if (elCanvas.classList.contains('grabbing')) {
        elCanvas.classList.remove('grabbing')
        elCanvas.classList.add('grab')
    }
    setDragMode(false)
    setPrevEvent(null)
    renderCanvas()
}

const onSaveCanvas = () => {
   
    saveCanvas()
}

