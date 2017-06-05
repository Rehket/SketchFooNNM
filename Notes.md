

# SketchFoo Neural Network Manager Notes
## User Image Submission Pipeline
When a user first connects to to the web interface, they will view the available options for 
information, image submission, and feedback. 

### Image Processing Scheduler
The Image Processing Scheduler is tracking the status of processing jobs taking place both on the Neural Network Manager(NNM) Master and NNM Clients. As images are sent to to be processed, the status of the connected NNMs will be checked to find out what one will be available soonest.  This information will be tracked within the processingQueues array.

>  **Entities**<br>
>processingQueue[] : processingQueues<br>
> int : queueCursor<br>
> 
> void : addImage(int _queueIndex)<br>
> void : removeImage(int _queueIndex, int _imageIndex)<br>

### Image Processing Queue
The Image Processing Queue maintains the queue of images that are to be processed. It is responsible for passing images into the Neural Network and Emailing the resultant image to the user that submitted the image.

>  **Entities**<br>
>image[] : imageQueue <br>
> 
> queueStatus : getStatus()<br>
> void : addImage()<br>
> void : removeImage(int _imageIndex)<br>
> childProcess : processImage(image _imageToBeProcessed<br>

### More Be Added

----------
 The main project page is available [Here](https://github.com/Rehket/SketchFoo).
 The Coding Standards for this project are available [Here](https://github.com/Rehket/SketchFoo-Coding-Standards).
----------