function resizeCanvas(e) {
    let data = myCanvas.toDataURL();


    myCanvas.width = myCanvas.width*2;


    let myImage = new Image();

    myImage.src = data;
    myImage.onload = function(){
        myContext.fillStyle = '#000000';
        myContext.fillRect(0, 0, myCanvas.width, myCanvas.height);
        myContext.rect(0, 0, myCanvas.width, myCanvas.height);
        myContext.drawImage(myImage, 0, 0);
    };




}

function redraw() {
    console.log('Redraw called...');
    myContext.fillStyle = '#ffffff';
    myContext.fillRect(0, 0, myCanvas.width, myCanvas.height);
    myContext.rect(0, 0, myCanvas.width, myCanvas.height);
}

function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
        let img = new Image();
        img.onload = function(){
            //htmlCanvas.width = img.width;
            //htmlCanvas.height = img.height;
            myContext.drawImage(img,0,0, myCanvas.width, myCanvas.height);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
}

class ImageBuffer {
    position = {
        x: 0,
        y: 0
    };
    canvas = document.createElement('canvas');
    context;

    constructor (position, size) {
        this.position.x = position.x;
        this.position.y = position.y;
        this.canvas.width = size.width;
        this.canvas.height = size.height;
        this.context = canvas.getContext('2d');
    }
}

// Editor class used to make a drawing space.
class Editor {
    name;
    url;
    mode = 'line';
    size = {
        width : 256,
        height : 256
    };
    imageBuffers = [];
    constructor(config) {
        this.name = config.name;
        this.url = config.url;
        this.mode = config.mode;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    addImageBuffer(image) {
        this.imageBuffers.append(image)
    }



}
