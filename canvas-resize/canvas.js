var canvas = document.querySelector('canvas');

// entire screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// // (x ->, y ^, width, height)
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);

// // Line

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = 'blue';
// c.stroke();


// // Arc / circle (x, y, radius, startAngle, endAngle, boolean) Radian intro KhanAca(https://bit.ly/2KWN4tj);

// for (var i = 0; i < 5; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'red';
//     c.stroke();
// };

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;

// // скорость движения 
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;

// рисуем окружность и каждую иттерацию сдвигаем ее на 1px по оси Х со скоростью dx

// c.beginPath();
// c.arc(x, y, radius, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

//   x += движение по координате + вправо.  x -= dx по координате - влево
// эффект отбивания от края. В условии - если окружность дошла до максимального значения ширины в сторону + => начать движение в сторону -


function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;


    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
    };

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }

}
var circles = [];
for (var i = 0; i < 50; i++) {
    var radius = 30;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;

    // скорость движения 
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    
    circles.push(new Circle(x, y, dx, dy, radius));
}


function animate() {
    requestAnimationFrame(animate);

    // удаляет перед отрисовкой новой окружности предыдущую. Создает иллюзию движения без шлейфа
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
    }
}

animate();