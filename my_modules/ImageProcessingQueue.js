/**
 * Created by adama on 5/4/2017.
 * The Image processing queue is responsible for tracking images as they are waiting to be processed.
 */

// Import Sharp?

class ImageProcessingQueue{

    constructor(){
        this.images = new Array();
    }

    //getLength returns the number of images within the queue.
    getLength(){
        return this.images.length;
    }

    //addImage adds an image to the end of the array representing the queue.
    addImage(_image) {
        this.images.push(_image);
    }

    //getNextImage removes an image from the beginning of the array and returns it.
    getNextImage() {
        return this.images.shift()
    }
}

module.exports = ImageProcessingQueue;