// Initialize the script when the window is loaded
window.addEventListener('load', () => {
    
    // Variables for DOM elements
    const textColor = document.getElementById('text-color');
    const backgroundColor = document.getElementById('background-color');
    const brushSize = document.getElementById('brush-size');
    const clearButton = document.getElementById('clear-button');
    const retriveButton = document.getElementById('retrive-button');
    const saveButton = document.getElementById('save-button');
    const canvasArea = document.getElementById('canvas-area');
    const context = canvasArea.getContext('2d');

    // Set canvas size
    canvasArea.width = 845;
    canvasArea.height = 500;

    // Variables for drawing
    let isDrawing = false;
    let isEraser = false;
    let lastX = 0;
    let lastY = 0;
    
    // Set default line width and color
    context.lineWidth = 2;
    context.strokeStyle = '#000000';

    // Check localstorage for saved image
    const dataURL = localStorage.getItem('canvasImage');

    // Start drawing
    canvasArea.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    // Stop drawing
    canvasArea.addEventListener("mouseup", () => (isDrawing = false));
    canvasArea.addEventListener("mouseout", () => (isDrawing = false));

    // Draw on canvas
    canvasArea.addEventListener('mousemove', (e) => {
        
        if (!isDrawing) return;

        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        context.closePath();

        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    // Stroke color
    textColor.addEventListener('change', () => {
        context.strokeStyle = textColor.value;
    });

    // Canvas background color
    backgroundColor.addEventListener('change', () => {
        canvasArea.style.backgroundColor = backgroundColor.value;
    });

    // Brush size
    brushSize.addEventListener('change', () => {
        context.lineWidth = brushSize.value;
    });

    // Clear canvas
    clearButton.addEventListener('click', () => {
        context.clearRect(0, 0, canvasArea.width, canvasArea.height);
    });

    // Save canvas
    saveButton.addEventListener('click', () => {
        const dataURL = canvasArea.toDataURL();

        // Save dataUrl to localstorage
        localStorage.setItem('canvasImage', dataURL);

        // Save image as png
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = 'signature.png';
        a.click();

    });

    // Retrive saved image from localstorade
    retriveButton.addEventListener('click', () => {
        const dataURL = localStorage.getItem('canvasImage');
        
        if(!dataURL) return;

        const img = new Image();
        img.src = dataURL;

        img.onload = () => {
            context.drawImage(img, 0, 0);
        }
    });
});