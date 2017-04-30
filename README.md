

# SketchFoo Neural Network Manager
--------------------------------
## Classes
----------

### Image Processing Scheduler
The Image Processing Scheduler is tracking the status of processing jobs taking place both on the Neural Network Manager(NNM) Master and NNM Clients. As images are sent to to be processed, the status of the connected NNMs will be checked to find out what one will be available soonest.  This information will be tracked within the processingQueues array.

>  **Entities**
>processingQueue[] : processingQueues
> int : queueCursor
> 
> void : addImage(int _queueIndex)
> void : removeImage(int _queueIndex, int _imageIndex)

### Image Processing Queue
The Image Processing Queue maintains the queue of images that are to be processed. It is responsible for passing images into the Neural Network and Emailing the resultant image to the user that submitted the image.

>  **Entities**
>image[] : imageQueue
> 
> queueStatus : getStatus()
> void : addImage()
> void : removeImage(int _imageIndex)
> childProcess : processImage(image _imageToBeProcessed

### More Be Added

----------
 The main project page is available [Here](https://github.com/Rehket/SketchFoo).
 The Coding Standards for this project are available [Here](https://github.com/Rehket/SketchFoo-Coding-Standards).

----------
 Written with [StackEdit](https://stackedit.io/).