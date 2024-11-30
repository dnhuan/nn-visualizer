# MNIST Neural Network Visualizer

-   [x] Model training
-   [x] Model inference on python
-   [ ] Phase 1:Model inference Cloud Function
    -   [x] React client to draw digits
        -   [x] Mouse pointer events are not publishing consistently, adding (Bresenham's line algorithm)[https://www.wikiwand.com/en/articles/Bresenham%27s_line_algorithm] to fill in the gaps
        -   <strike> Consider using html canvas instead of divs </strike>
    -   [ ] Send image to endpoint (with debounce)
    -   [ ] Return prediction and Tensor values to React client
    -   [ ] Build network of Tensor values
    -   [ ] Display prediction
    -   [ ] Display Tensor values
-   [ ] Phase 2: Client side inference
    -   [ ] Tensorflow.js
    -   [ ] Convert weights to Tensorflow.js format
    -   [ ] Load weights
    -   [ ] Instead of sending image to Cloud Function, run inference directly in browser
    -   [ ] Display prediction
    -   [ ] Display Tensor values

### Resources

https://nextjournal.com/gkoehler/pytorch-mnist
https://stackoverflow.com/questions/26432492/chessboard-html5-only
https://www.wikiwand.com/en/articles/Bresenham%27s_line_algorithm

### License

GNU General Public License v3.0
