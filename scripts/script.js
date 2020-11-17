

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


const scoreBox = document.querySelector('.score')
const panel = document.querySelector('.panel')
const generationBox = document.querySelector('.generation')
const auto = document.querySelector('.auto')


// Счёт
let totalScore = 0
let scorePoint = []
let score = 0

function startLearning() {
  let ancestor = []
  let maxScore = 0
  let generation = 1
  let unit = 1
  
  new_unit()

  let countRepeat = 0
  setInterval(() => {
    // Дистанция 
    let distance = [car1.speed * 4];
    [0, 30, -30].forEach(angel => {
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
        restart(JSON.stringify([net_up.getGenome(), net_rotation.getGenome()]))
        countRepeat = 0
      }
    })

    panel.innerText = `${net_up.output(distance).toFixed(3)} ${((net_rotation.output(distance) - 0.5) * 2).toFixed(3)}`


    car1.pressUp = net_up.output(distance)
    car1.rudder = (net_rotation.output(distance) - 0.5) * 2

    car1.render(car)
    
    if (countRepeat < 40 && car1.pressUp < 0.3) {
      restart(JSON.stringify([net_up.getGenome(), net_rotation.getGenome()]))
      countRepeat = 0
    }

    countRepeat++
    if (countRepeat > 1500) {
      restart(JSON.stringify([net_up.getGenome(), net_rotation.getGenome()]))
      countRepeat = 0
    }

  }, 25)

  function new_unit(unit) {
    if (!ancestor) {
      net_up = new Net()
      net_rotation = new Net()
    } else {
      if (unit <= 2) {
        net_up = new Net(ancestor[0], false)
        net_rotation = new Net(ancestor[1], false)
      } if (unit > 3 && unit < 20) {
        net_up = new Net(ancestor[0])
        net_rotation = new Net(ancestor[1])
      } else if (unit > 21 && unit < 26) {
        
        net_up = new Net(ancestor[0], true, true)
        net_rotation = new Net(ancestor[1], true, true)
      } else {
        net_up = new Net()
        net_rotation = new Net()
      }
    }
    
  }

  function restart(genome) {
    car1.restart()
    new_unit(unit)

    if (score + totalScore - 1 > maxScore) {
      console.log(score + totalScore - 1);
      console.log('улучшение на ', (score + totalScore - 1) - maxScore);
      console.log('Поколение ' + generation);
      console.log('Машина ' + unit);
      localStorage.removeItem('bestAncestor')
      localStorage.setItem('bestAncestor', genome)
      // console.log(genome);
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




