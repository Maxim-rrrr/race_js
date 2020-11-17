

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

const scoreBox = document.querySelector('.score')
const panel = document.querySelector('.panel')
const generationBox = document.querySelector('.generation')
const auto = document.querySelector('.auto')


// Счёт
let totalScore = 0
let scorePoint = []
let score = 0

function startLearning() {
  let ancestor
  let maxScore = 0
  let generation = 1
  let unit = 1
  
  new_unit()

  let countRepeat = 0
  setInterval(() => {
    // Дистанция 
    let distance = [car1.speed * 4];
    [0, 30, -30, 90, -90, 120, -120].forEach(angel => {
      distance.push(car1.checkDistance(coordinates, 1, angel))
    })

    coordinates.forEach((coor, index) => {
      if (!scorePoint.includes(coor)) {
        if (Math.abs(coor[0] - car1.position.x) < roadWidth / 2 && Math.abs(coor[1] - car1.position.y) < roadWidth / 2) {
  
          if (index !== coordinates.length - 1) {
            scorePoint.push(coor)
            score++
          }
  
          if (index === coordinates.length - 1 && score > 1) {
            totalScore += score + 1
            score = 0
            scorePoint = []
          }
          scoreBox.innerText = score + totalScore - 1
        }
      }
    })

    distance.forEach(d => {
      if (d < 0) {
        restart()
        countRepeat = 0
      }
    })

    panel.innerText = `${net_up.output(distance).toFixed(3)} ${net_left.output(distance).toFixed(3)} ${net_right.output(distance).toFixed(3)}`

    net_up.output(distance) > 0.5 ? car1.keyDown.up = true : car1.keyDown.up = false
    net_left.output(distance) > 0.5 ? car1.keyDown.left = true : car1.keyDown.left = false
    net_right.output(distance) > 0.5 ? car1.keyDown.right = true : car1.keyDown.right = false
    //console.log(car1.keyDown.up, car1.keyDown.left, car1.keyDown.right)
    
    if (countRepeat < 5 && !car1.keyDown.up) {
      restart()
      countRepeat = 0
    }

    countRepeat++
    if (countRepeat > 400) {
      restart()
      countRepeat = 0
    }

  }, 25)

  function new_unit(unit) {
    if (!ancestor) {
      net_up = new Net()
      net_left = new Net()
      net_right = new Net()
    } else {
      if (unit <= 2) {
        // console.log(ancestor);
        net_up = new Net(ancestor[0], false)
        net_left = new Net(ancestor[1], false)
        net_right = new Net(ancestor[2], false)
        // console.log([net_up.getGenome(), net_left.getGenome(), net_right.getGenome()]);
      } if (unit > 3 && unit < 10) {
        net_up = new Net()
        net_left = new Net()
        net_right = new Net()
      } else {
        net_up = new Net(ancestor[0])
        net_left = new Net(ancestor[1])
        net_right = new Net(ancestor[2])
      }
    }
    
  }

  function restart() {
    car1.restart()
    new_unit(unit)

    if (score + totalScore - 1 > maxScore) {
      console.log(score + totalScore - 1, maxScore);
      console.log('улучшение');
      console.log('Машина ' + unit);
      console.log('Поколение ' + generation);
      localStorage.setItem('bestAncestor', JSON.stringify([net_up.getGenome(), net_left.getGenome(), net_right.getGenome()]))
      // console.log([net_up.getGenome(), net_left.getGenome(), net_right.getGenome()]);
      maxScore = score + totalScore - 1
    }

    totalScore = 0
    scorePoint = []
    score = 0
    scoreBox.innerText = score + totalScore - 1

    if (unit < 30) {
      unit++
      //console.log('Машина ' + unit);
    } else {
      unit = 1
      generation++ 
      //console.log('Поколение ' + generation);
      ancestor = JSON.parse(localStorage.getItem("bestAncestor"))
      // console.log(ancestor);
    }

    auto.innerText = unit + ' Машина'
    generationBox.innerText = generation + ' Поколение'
  }

  
  //console.log(net_up.getGenome());

}




