/**
 * Created by adama on 5/4/2017.
 * TODO: Complete Class Diagram for this class and implement
 */
'use strict';
const imageProcessingQueue = require('./ImageProcessingQueue');
//Import Sharp??

class ImageProcessingScheduler{

    constructor(){
        this.imageQueue = new imageProcessingQueue();

    }

    //Add Image
    addImageToQueue(){}

    //Process The Image
    processImage(){}
}

module.exports = ImageProcessingScheduler;