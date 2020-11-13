

let roadWidth = 100
const canv = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

canv.width = window.innerWidth
canv.height = window.innerHeight

ctx.lineWidth = roadWidth


// Координатыы трассы
let coordinates = localStorage.getItem('coordinates') ? JSON.parse(localStorage.getItem('coordinates')) : []

function drowRoad() {
  coordinates.forEach((coor, index) => {

    if (index + 1 !== coordinates.length) {
      ctx.beginPath();       
      ctx.moveTo(coor[0], coor[1]);    
      ctx.lineTo(coordinates[index + 1][0], coordinates[index + 1][1]);  
      ctx.stroke();          
      ctx.closePath()
      ctx.arc(coordinates[index + 1][0], coordinates[index + 1][1], roadWidth / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    } else {
      ctx.beginPath();       
      ctx.moveTo(coor[0], coor[1]);    
      ctx.lineTo(coordinates[0][0], coordinates[0][1]);  
      ctx.stroke();          
      ctx.closePath()
      ctx.arc(coordinates[0][0], coordinates[0][1], roadWidth / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    }
  })
}

let tempCoor = []
drowRoad()


if (coordinates.length === 0) {
  document.addEventListener('click', e => {
    e.target 
    console.dir(e.target);
    if (e.target.id = 'canvas') {
      tempCoor.push([e.clientX, e.clientY])
    }
  })
  document.addEventListener('keydown', e => {
    if (e.code === 'KeyB') {
      coordinates = tempCoor
      localStorage.setItem('coordinates', JSON.stringify(tempCoor))
      drowRoad()
    }
  })
}

const car = document.querySelector('.car')
let car1
if (coordinates.length !== 0) {
  car1 = new Car(coordinates[0][0], coordinates[0][1])
}

car1.render(car)

// Нажатия на кнопок
document.addEventListener('keydown', e => {
  if (e.code == 'KeyW') {
    car1.keyDown.up = true
  }

  if (e.code == 'KeyS') {
    car1.keyDown.bottom = true
  }

  if (e.code == 'KeyD') {
    car1.keyDown.right = true
  }

  if (e.code == 'KeyA') {
    car1.keyDown.left = true
  }

  if (e.code == 'Space') {
    car1.keyDown.space = true
  }

})

// Отжимание кнопок
document.addEventListener('keyup', e => {
  if (e.code == 'KeyW') {
    car1.keyDown.up = false
  }

  if (e.code == 'KeyS') {
    car1.keyDown.bottom= false
  }

  if (e.code == 'KeyD') {
    car1.keyDown.right = false
  }

  if (e.code == 'KeyA') {
    car1.keyDown.left = false
  }

  if (e.code == 'Space') {
    car1.keyDown.space = false
  }

})

// Проверка нажатых кнопок и изменение скорости
setInterval(() => {
  car1.checkBtnDown()

}, 100)

// Отрисовка движений
setInterval(() => {
  car1.render(car)
})

// Проверка не выйхала ли машина за трассу
setInterval(() => {
  let distanses = []
  let angels = [-120, -90, -30, 0, 30, 90, 120]
  angels.forEach(angel => {
    distanses.push(car1.checkDistance(coordinates, 1, angel))
  })

  distanses.forEach(d => {
    if (d < 0) {
      car1.restart()
    }
  })
  
  console.log(distanses);
}, 10)
