'use strict'

const memesScreen = (e) => {
    e.preventDefault()
    setMemesData()
    document.querySelector('.canvas-wrap').style="display:none";
    document.querySelector('.gallery-container').style="display:flex;";
    document.querySelector('.gallery').classList.remove('active');
    document.querySelector('.memes').classList.add('active');
    renderMemes()
    renderMemesContent()
}
const renderMemes = () => {
    const elMemes = document.querySelector('.gallery-content')
    const memes = getMemesData()
    const strCanvases = memes.map((meme,index) => {
        return `<div style="padding: 20px;" class="pointer" onclick="onSelectedCanvas('${meme.id}')">
                    <canvas  id="${meme.id}" width="200" height="200" >
                    Update your browser to enjoy canvas!
                    </canvas>
                </div>`;
    })
    elMemes.innerHTML = strCanvases.join('');
}

const renderMemesContent=()=>{
    const memes = getMemesData()
    memes.forEach((meme,index)=>{
        let split=2.5
        let canvas = document.querySelector(`#${meme.id}`);
        let ctx = canvas.getContext('2d')
        drawImgs(meme.selectedImgId, canvas,ctx)
        meme.txts.forEach(txt=>{
            drawTexts(txt.line, txt.size/split, txt.align, txt.color, txt.stroke, txt.strokeSize, txt.fontFamely, txt.offsetX/split, txt.offsetY/split,ctx)
        })
    })
   
}

const onSelectedCanvas=(id)=>{
    let meme=findMemeById(id)
    let img =findPictureById(meme.selectedImgId)
    document.querySelector('.canvas-wrap').style="display:flex";
    document.querySelector('.gallery-container').style="display:none;";
    return initCanvas(meme.selectedImgId,meme,img)
}
