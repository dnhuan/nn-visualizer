# MNIST Neural Network Visualizer

-   [x] Model training
-   [x] Model inference on python
-   [x] Phase 1: Model inference Cloud Function
    -   [x] React client to draw digits
        -   [x] Mouse pointer events are not publishing consistently, adding (Bresenham's line algorithm)[https://www.wikiwand.com/en/articles/Bresenham%27s_line_algorithm] to fill in the gaps
        -   <strike> Consider using html canvas instead of divs </strike>
    -   [x] Send image to endpoint (with debounce)
        -   [x] Setup REST API endpoint
        -   [x] Read weights from json file
        -   [x] Rebuild network structure
            -   [x] Layers
            -   [x] ReLU
            -   [x] Softmax
        -   [x] Load weights into network
        -   [x] Run inference
        -   [x] Return prediction and Tensor values to React client
    -   [x] Display prediction
-   [x] Phase 2: Client side inference
    -   [x] Setup numjs
    -   [x] Load weights
    -   [x] Run inference directly in browser
    -   [x] Display prediction
    -   [x] Display Tensor values

### Resources

https://nextjournal.com/gkoehler/pytorch-mnist
https://stackoverflow.com/questions/26432492/chessboard-html5-only
https://www.wikiwand.com/en/articles/Bresenham%27s_line_algorithm
https://github.com/lionelmessi6410/Neural-Networks-from-Scratch
https://sim51.github.io/react-sigma/

### License

GNU General Public License v3.0
