(function() {

    let canvas  = document.querySelector('#canvas');
    let context = canvas.getContext('2d');

    let squares     = [];

    let bigSquare   = new Element(50, 175, 50, 50, '#f60');
    bigSquare.speed = 5;
    squares.push(bigSquare);

    let square1     = new Element(500, 10, 20, 20, '#0f6');
    squares.push(square1);

    let square2     = new Element(300, 300, 120, 20, '#06f');
    squares.push(square2); 

    let moveLeft    = false;
    let moveUp      = false;
    let moveRight   = false;
    let moveDown    = false;

    window.addEventListener('keydown', (evt) => {
        switch(evt.keyCode)
        {
            case 65:
            case 37:
                moveLeft = true;
                break;
            case 68:
            case 39:
                moveRight = true;
                break;
            case 87:
            case 38:
                moveUp = true;
                break;
            case 83:
            case 40:
                moveDown = true;
                break;
        }
    }, false);

    window.addEventListener('keyup', (evt) => {
        switch(evt.keyCode)
        {
            case 65:
            case 37:
                moveLeft = false;
                break;
            case 68:
            case 39:
                moveRight = false;
                break;
            case 87:
            case 38:
                moveUp = false;
                break;
            case 83:
            case 40:
                moveDown = false;
                break;
        }
    }, false);

    function loop(){
        window.requestAnimationFrame(loop, canvas);

        update();

        display();
    }

    function update()
    {
        if(moveLeft && !moveRight)
        {
            bigSquare.x -= bigSquare.speed;
        }

        if(!moveLeft && moveRight)
        {
            bigSquare.x += bigSquare.speed;
        }

        if(moveUp && !moveDown)
        {
            bigSquare.y -= bigSquare.speed;
        }
        
        if(!moveUp && moveDown)
        {
            bigSquare.y += bigSquare.speed;
        }

        bigSquare.x = Math.max(0, Math.min(canvas.width - bigSquare.w, bigSquare.x));
        bigSquare.y = Math.max(0, Math.min(canvas.height - bigSquare.h, bigSquare.y));

    }

    function display()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
        squares.forEach((square) => {
            if(square.visibility)
            {
                context.fillStyle = square.color;
                context.fillRect(square.x, square.y, square.w, square.h);
            }
        });
    }

    loop();

}());