

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
  let ancestor = [{"weight":[4.961457069513619,-4.162250792126496,-1.5227366416101757,9.811731337571336,9.42776933363486,2.388635684599239,9.682245070945774,-0.15849736491063382,5.333307612215355,4.2394999928358015,10.055554499771933,7.669693645680003,-6.905282560733051,26.881808731420154,4.131877116178002,-2.8670492991860974,1.4532938939648652,8.197317469908828,5.370597026660885,-7.987688766153754,-12.122990180297652,-4.232297852238919,16.136578680204185,8.856207636590756,-4.547934568146296,-9.581045610924502,-1.6539686794305468,-6.488018747405309,-3.2507100546086765,-9.694726092945976,3.880042635229009,13.423917470993185,-5.279242721762053,-6.564595554552691,-13.800881283557041,-12.946838313681674,-3.4579671074357154,-2.6191266803718705,4.296422314714152,7.145761487908581,17.37313185465668,-3.940284885988867],"bias":[-6.735275957341488,-2.3346555538364284,2.3970756155954587,2.0320166691921884,-8.826055687625972,-3.867918499286277,-4.0779159063903805,8.958676420454228,3.1873963298792183,0.5265618058774333,-1.705602606445305,6.134189829262105,2.9438925224768364,5.070003754876792,0.053292277894585016,-2.5315222153851065,1.805638880906283,0.17984297030445084,-4.880089923878803,-5.620482850579514,-0.36533980764261553]},{"weight":[1.0003191643448375,8.232532356897813,-2.2000027601997276,-2.057306538491775,-2.089421600741241,1.791411530262336,0.3849660545727822,10.114276116451787,3.270938962318919,-0.382839496501755,3.9313756784743825,3.032183594630029,1.159897628175135,1.023396795908968,9.133008254808955,8.951318854770177,-3.6800589605841765,-1.6698560273997214,-2.1758551321854025,-3.376326291136346,5.818980929522099,-0.2623226187604608,3.6093889773030523,-4.090136241017923,6.626106265295125,-7.381773099763971,-14.401114760554679,-1.5010053252365836,-12.875153791338988,5.739441392792159,-1.5335200991712115,-12.005353977085306,9.953114030645269,3.3220631683002972,8.003630645229395,0.10390958230194913,0.6978790825246968,9.238937138879857,-10.264622232503665,7.273027978269155,0.28385890381027856,-13.500855947494543],"bias":[-4.467030191466989,-0.8998886632509984,-4.425424317616756,-3.2768950100758776,2.623250962118404,-0.14444927047477885,-1.9152621858889565,5.140730935741113,3.359487295249622,1.1234620095377652,-5.136814192479255,3.3865742598730635,2.9893152581535367,7.118872539696732,-1.8531454081633356,0.66690576862689,-3.8968213203869135,-0.5791925116072636,-3.820386513288659,5.901553280789209,-2.3644587236350514]},{"weight":[4.158528391589197,3.985158031283633,8.104781923579944,2.0061967417229867,4.917860317194389,2.4152494251435632,5.002300852019227,4.9785554400159615,0.40402489015389165,10.143182771251093,18.939297523951993,-4.928194270642432,5.110277308798343,-2.896879850769486,-8.846898484509161,-0.11197132465161186,3.9085803442809617,19.62332935616346,-4.6004034826901625,-3.5359554137969162,10.673938301685224,-3.567844644968422,-7.647837189177704,-2.077610668980262,16.20635759868862,-7.461031973763255,6.212139556859526,3.8214747147006225,-8.764666325749083,-7.930249891946701,-12.38067971519392,-7.186248562651668,-2.410430472392955,2.7483918862374264,1.5162261724320931,-6.39987833395068,-3.03703516751047,-0.7801549194557627,12.107445683379385,8.581529457380366,0.8602322220869638,-4.09029577421116],"bias":[3.260326923036222,-0.7997638938620404,-2.269001961794376,2.621193104028198,3.5217613618127994,4.716127343109868,2.675196241649124,-2.97156079468352,-8.324406932819192,3.5427599107677783,2.084369041806371,-2.0210704404361386,0.878084634888038,-0.37284944458986313,-8.336602480684068,4.665937728519992,-1.434864136920111,-9.218474319523729,-3.8797446233472637,0.432574175389806,1.4354341534625075]}]
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
        restart(JSON.stringify([net_up.getGenome(), net_left.getGenome(), net_right.getGenome()]))
        countRepeat = 0
      }
    })

    panel.innerText = `${net_up.output(distance).toFixed(3)} ${net_left.output(distance).toFixed(3)} ${net_right.output(distance).toFixed(3)}`

    net_up.output(distance) > 0.5 ? car1.keyDown.up = true : car1.keyDown.up = false
    net_left.output(distance) > 0.5 ? car1.keyDown.left = true : car1.keyDown.left = false
    net_right.output(distance) > 0.5 ? car1.keyDown.right = true : car1.keyDown.right = false
    //console.log(car1.keyDown.up, car1.keyDown.left, car1.keyDown.right)
    
    if (countRepeat < 5 && !car1.keyDown.up) {
      restart(JSON.stringify([net_up.getGenome(), net_left.getGenome(), net_right.getGenome()]))
      countRepeat = 0
    }

    countRepeat++
    if (countRepeat > 1500) {
      restart(JSON.stringify([net_up.getGenome(), net_left.getGenome(), net_right.getGenome()]))
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
      } if (unit > 3 && unit < 20) {
        net_up = new Net(ancestor[0])
        net_left = new Net(ancestor[1])
        net_right = new Net(ancestor[2])
      } else if (unit > 21 && unit < 26) {
        
        net_up = new Net(ancestor[0], true, true)
        net_left = new Net(ancestor[1], true, true)
        net_right = new Net(ancestor[2], true, true)
      } else {
        net_up = new Net()
        net_left = new Net()
        net_right = new Net()
      }
    }
    
  }

  function restart(genome) {
    car1.restart()
    new_unit(unit)

    if (score + totalScore - 1 > maxScore) {
      console.log(score + totalScore - 1, maxScore);
      console.log('улучшение');
      console.log('Машина ' + unit);
      console.log('Поколение ' + generation);
      localStorage.removeItem('bestAncestor')
      localStorage.setItem('bestAncestor', genome)
      console.log(genome);
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




