/*
MIT LICENSE

Copyright 2017 Adam Albright, aalbright425@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Example page using the library:
 * Make sure to Put script tags around the code if you plan on using it as is.
 * If you do not want to override/replace the initialization I am using, you will need all the same
 * DOM elements.
 *
<!DOCTYPE html>

 <head>
 <meta charset="utf-8">
 <title>Submit Images To the NN</title>
 <link rel="stylesheet" type="text/css" href="http://rehket.asuscomm.com:3000/static/styles/main.css">
 <script src="http://rehket.asuscomm.com:3000/static/js/base64ArrayBuffer.js"></script>
 <script type="text/JavaScript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
 <script type="text/JavaScript" src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
 <script type="text/JavaScript" src="https://code.createjs.com/easeljs-0.8.2.min.js"></script>

 </head>
 <body id="body" onload="makePainter()">

 <h1>Draw a face in the left window. See the results in the right.</h1>


 <div class="container-div">
 <input id="mySubmitButton" type="button" value="Submit" onclick = "painter.packImage()">
 <input id="clearButton" type="button" value="Clear Canvas" onclick = "painter.clear()">
 <input id="myFile" name="myFile" type="file" onchange=painter.loadImageToCanvas(event)>
 <select id = "modelSelection" name="models" onchange="painter.setModelDescription()">
 <!--Filled Dynamically with the function from getModels.js-->
 </select>
 <select id = "size_selector" name="size_selector" onchange="painter.setStrokeSize(value)">
 <option value="1">Tiny</option>
 <option value="2">Small</option>
 <option value="5">Medium</option>
 <option value="8">Large</option>
 </select>
 <select id = "color_selector" name="color_selector" onchange="painter.setStrokeColor(value)">

 <option value="black">Black</option>
 <option value="white">White/Eraser</option>
 </select>
 <label>


 <p><input id="includeTemplate" type="checkbox" onchange="painter.setPackTemplate()">Pack background image into request? Check if you are uploading an image.</p>

 </label>
 <div>
 <p id="modelDescription">The Model info!</p>
 </div>
 </div>
 <div class="canvas-container">
 <div class="container-div">
 <div class="input-div">
 <canvas id="TemplateCanvas" width="512" height="512"
 style="z-index: 0;"></canvas>
 <canvas id="InputCanvas" width="512" height="512"
 style="z-index: 1;"></canvas>
 </div>

 </div>
 <div class="container-div">
 <div class="output-div">
 <canvas id="ResultCanvas" width="512" height="512"></canvas>
 </div>
 </div>

 </div>

 </body>
 *
 */

// 'use strict';
let painter = null;

// Painter class to hold all the variables.
function SketchFoo() {
    this.inputCanvas =  null;
    this.templateCanvas =  null;
    this.templateContext = null;
    this.stage = null;
    this.drawingCanvas = null;
    this.oldPoint = null;
    this.oldMidPoint = null;
    this.midPoint = null;
    this.fillColor = '#fff';
    this.stroke = 1;
    this.colors = {white: '#fff', black: '#000'};
    this.color = this.colors.black;
    this.models = null;
    this.submissionCanvas = null;
    this.submissionContext = null;
    this.targetModel = null;
    this.submissionInProgress = false; //TODO: Implement waiting
    this.resultCanvas = null;
    this.resultContext = null;
    this.modelSelector = null;
    this.modelDescription = null;


    this.targetURL = 'http://rehket.asuscomm.com:8000/api/image/';
    this.packTemplateSwitch = null;
    this.packTemplate = true;


    // Initialize the initial variables for the class.
    this.Initialize = () => {
        if (document.getElementById('InputCanvas') !== null) {
            console.log("Input Canvas Found");
            this.inputCanvas = document.getElementById('InputCanvas');
            this.inputCanvas.width = 512;
            this.inputCanvas.height = 512;

            // Requires CreateJs
            this.stage = new createjs.Stage(this.inputCanvas);
            console.log(this.stage);
            this.stage.autoClear = false;
            this.stage.enableDOMEvents(true);

            createjs.Touch.enable(this.stage);
            createjs.Ticker.framerate = 24;

            this.drawingCanvas = new createjs.Shape();
            this.drawingCanvas.name = 'Drawing_Canvas';
            this.stage.addEventListener('stagemousedown', this.handleMouseDown);
            this.stage.addEventListener('stagemouseup', this.handleMouseUp);
            this.stage.addChild(this.drawingCanvas);
            this.stage.update();

        }

        if (document.getElementById('TemplateCanvas') !== null) {
            console.log("Template Canvas Found");
            this.templateCanvas = document.getElementById('TemplateCanvas');
            this.templateContext = this.templateCanvas.getContext('2d');
            this.templateContext.fillStyle = this.fillColor;
            this.templateContext.fillRect(0,0, this.templateCanvas.width, this.templateCanvas.height);

        }
        if (document.getElementById('ResultCanvas') !== null) {
            console.log("Result Canvas Found");
            this.resultCanvas = document.getElementById('ResultCanvas');
            this.resultContext = this.resultCanvas.getContext('2d');
            this.resultContext.fillStyle = this.fillColor;
            this.resultContext.fillRect(0,0, this.resultCanvas.width, this.resultCanvas.height);

        }

        this.submissionCanvas = document.createElement('canvas');
        this.submissionCanvas.width = 256;
        this.submissionCanvas.height = 256;
        this.submissionContext = this.submissionCanvas.getContext('2d');

        if (document.getElementById('modelDescription') !== null) {
            this.modelDescription = document.getElementById('modelDescription');
        }

        if (document.getElementById('modelSelection') !== null) {
            this.modelSelector = document.getElementById('modelSelection');
            this.getModels();

        }

        if (document.getElementById('includeTemplate') !== null) {
            this.packTemplateSwitch = document.getElementById('includeTemplate');
            this.packTemplate = this.packTemplateSwitch.checked;
        }


    };

    // Take care of mouse down events.
    this.handleMouseDown = (event) => {
        if (!event.primary) { return; }
        // This marks where the mouse down event happens.
        this.oldPoint = new createjs.Point(this.stage.mouseX, this.stage.mouseY);
        this.oldMidPoint = this.oldPoint.clone();
        this.stage.addEventListener("stagemousemove", this.handleMouseMove);
    };

    // Take care of mouse move events
    this.handleMouseMove = (event) => {
        //console.log('Move Fired...' + stage.mouseX + ' ' + stage.mouseY);
        if (!event.primary) { return; }
        this.midPoint = new createjs.Point( this.oldPoint.x + this.stage.mouseX >> 1,
            this.oldPoint.y + this.stage.mouseY >> 1);

        this.drawingCanvas.graphics.clear().setStrokeStyle(this.stroke, 'round', 'round')
            .beginStroke(this.color).moveTo(this.midPoint.x, this.midPoint.y)
            .curveTo(this.oldPoint.x, this.oldPoint.y, this.oldMidPoint.x, this.oldMidPoint.y);

        this.stage.setChildIndex(this.drawingCanvas, 0);
        this.oldPoint.x = this.stage.mouseX;
        this.oldPoint.y = this.stage.mouseY;

        this.oldMidPoint.x = this.midPoint.x;
        this.oldMidPoint.y = this.midPoint.y;

        this.stage.update();
    };

    // Take care of the mouse up event.
    this.handleMouseUp = (event) => {
        if (!event.primary) { return; }
        this.stage.removeEventListener("stagemousemove", this.handleMouseMove);

    };

    this.setStrokeSize = (size) => {
        this.stroke = size;
    };

    // Sets the color parameter for drawing.
    this.setStrokeColor = (color) => {
        console.log(color);
        if(color === "white") {
            this.color = this.colors.white;
        }
        else {
            this.color = this.colors.black;
        }
    };

    this.clear = () => {
        console.log("Clearing...");
        // Remove the shape from the stage.
        this.stage.removeAllChildren();
        // Clear the stage Canvas
        this.stage.clear();
        // Update the canvas to reflect the changes.
        this.stage.update();

        // Add a drawing shape back to the stage.
        this.drawingCanvas = new createjs.Shape();
        this.drawingCanvas.name = 'Drawing_Canvas';
        this.stage.addChild(this.drawingCanvas);

        // Then clear template canvas.
        this.templateContext.fillStyle = this.fillColor;
        this.templateContext.fillRect(0,0, this.resultCanvas.width, this.resultCanvas.height);


    };

    // Load Image to Template Canvas.
    this.loadImageToCanvas = (event) => {
        let reader = new FileReader();
        let img = new Image();

        reader.onload = (event) => {

            img.onload = () => {
                this.templateContext.drawImage(img, 0, 0, img.width, img.height,
                    0, 0, this.templateCanvas.width, this.templateCanvas.height);
            };

            img.src = event.target.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    this.setPackTemplate = () => {
        console.log(this.packTemplateSwitch.checked);
        this.packTemplate = this.packTemplateSwitch.checked;
    };

    this.packImage = () =>{
        if (this.targetModel === null){
            console.log('No model selected.');
            return;
        }

        //  Include template image?
        if (this.packTemplate) {
            let img = new Image();
            // Once the image is ready, pack it up to be sent for processing.

            img.onload = () => {
                // Draw the template to the submission canvas
                this.submissionContext.drawImage(this.templateCanvas , 0, 0, this.templateCanvas.width, this.templateCanvas.height,
                    0, 0, this.submissionCanvas.width, this.submissionCanvas.height);
                // Then draw the new image into the canvas
                this.submissionContext.drawImage(img , 0, 0, this.inputCanvas.width, this.inputCanvas.height,
                    0, 0, this.submissionCanvas.width, this.submissionCanvas.height);

                this.createRequest();

            };

            img.src = this.stage.toDataURL(null, 'image/png');
        }

        else if(!this.packTemplate) {
            let img = new Image();
            // Once the image is ready, pack it up to be sent for processing.
            img.onload = () => {
                this.submissionContext.drawImage(img , 0, 0, this.inputCanvas.width, this.inputCanvas.height,
                    0, 0, this.submissionCanvas.width, this.submissionCanvas.height);
                this.createRequest();
            };
            img.src = this.stage.toDataURL('#fff', 'image/png');
        }
    };

    /***
     * TODO: Set up submission in progress.
     * */
    this.createRequest = () =>{
        console.log('Building request for ' + this.targetModel + '.\n')
        let request = new XMLHttpRequest();

        request.open('POST', this.targetURL, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.responseType = 'json';
        request.timeout = 45000;

        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 201) {

                console.log(request.response);
                let result = request.response[0];
                // console.log(result.image);
                let img = new Image();

                img.onload = () => {
                    // console.log('Image Loaded');
                    this.resultContext.drawImage(img, 0, 0, img.width, img.height,
                        0, 0, this.resultCanvas.width, this.resultCanvas.height);
                };

                img.onerror = function() {

                    console.log('An Error occurred.');
                };

                img.src = "data:image\/png;base64," + result.image;

            }
        };
        let pack = JSON.stringify([{image: this.submissionCanvas.toDataURL("img/png"), model: this.targetModel}]);

        request.send(pack);

    };

    this.getModels = () => {
        let modelRequest = new XMLHttpRequest();
        modelRequest.open('GET', 'http://rehket.asuscomm.com:3000/status/models', true);

        modelRequest.onreadystatechange = () => {

            // When the request is complete and if it was a success, get the models and...

            if(modelRequest.readyState === XMLHttpRequest.DONE && modelRequest.status === 200) {

                // ...Parse the response into a json object.
                this.models = JSON.parse(modelRequest.responseText);
                this.updateModels();
            }
        };

        modelRequest.send();
    };

    this.updateModels = () => {
        // Build the selector using the names and targets of the models.
        let index = 0;

        for (index; index < this.models.length; index ++ ){
            let model = this.models[index];
            // console.log('Call ' + model['name'] + ' : ' + model['target']);
            let opt = document.createElement('option');
            opt.setAttribute('value', index);
            let text = document.createTextNode(model['name']);
            opt.appendChild(text);
            this.modelSelector.appendChild(opt);
        }
        this.setModelDescription();
    };


    this.setModelDescription = () => {

        if (this.models !== null && this.modelDescription !== null) {
            this.targetModel = this.models[this.modelSelector.value].target;
            this.modelDescription.innerHTML = this.models[this.modelSelector.value].description;
        }
    }


}

function makePainter() {
    painter = new SketchFoo('Painter');
    painter.Initialize();
}
