let Car = function (x = 100, y = 100) {
  this.keyDown = {
    up: false,
    bottom: false,
  
    right: false,
    left: false,
  
    space: false
  }

  

  this.position = {
    x: x,
    y: y
  }

  this.rotation = 40
  this.speed = 0
  this.rudder = 0
  this.pressUp = 0

  this.render = (car) => {
    if (this.speed < 40 * this.pressUp) {
      this.speed += 1 * this.pressUp
    } else if (this.speed > 40 * this.pressUp) {
      this.speed -= 1
    }

    this.rotation += 0.25 * this.rudder * this.speed

    this.position.y -= this.speed / 3 * (Math.cos((this.rotation % 360) * (Math.PI / 180)))
    this.position.x += this.speed / 3 * (Math.sin((this.rotation % 360) * (Math.PI / 180)))

    car.style.top = this.position.y + 'px'
    car.style.left = this.position.x + 'px'
    car.style.transform = `rotate(${this.rotation}deg)`
  }
  
  this.checkDistance = (coordinates, step = 1, angle = 0) => {
    let d = 0
 
    while (1 === 1) {
      let x0 = this.position.x + (step + d) * Math.sin((this.rotation + angle) * (Math.PI / 180))
      let y0 = this.position.y + (step - d) * Math.cos((this.rotation + angle) * (Math.PI / 180))

      let res = true
      coordinates.forEach((coor, index) => {
        let x1 = coor[0], y1 = coor[1], x2, y2

        if (index + 1 !== coordinates.length) {
          x2 = coordinates[index + 1][0]
          y2 = coordinates[index + 1][1]
        } else {
          x2 = coordinates[0][0]
          y2 = coordinates[0][1]
        }

        let t = ((x0 - x1) * (x2 - x1) + (y0 - y1) * (y2 - y1)) / (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

        if (t > 1) t = 1
        if (t < 0) t = 0

        let l = Math.sqrt(Math.pow(x1 - x0 + (x2 - x1) * t, 2) + Math.pow(y1 - y0 + (y2 - y1) * t, 2))

        
        res = res && !(l < roadWidth / 2)
        
      })

      // point.style.top = this.position.y - 5  + 'px'
      // point.style.left = this.position.x - 5  + 'px'
      const point = document.querySelectorAll('.point')
      if (!res) {
        d += step
      } else {
        if (angle == -30) {
          point[0].style.top = y0 + 'px'
          point[0].style.left = x0 + 'px'
        } else if (angle == 30) {
          point[1].style.top = y0 + 'px'
          point[1].style.left = x0 + 'px'
        } else {
          point[2].style.top = y0 + 'px'
          point[2].style.left = x0 + 'px'
        }


        break
      }
    }
    
    d -= 20
    if (d > 100) {
      d = 100
    }

    return d
  }

  this.restart = () => {
    this.position.x = x
    this.position.y = y
    this.rotation = 40
    this.speed = 0
  }
}