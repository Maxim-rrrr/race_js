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

  this.render = (car) => {

    if (this.keyDown.left) {
  
      this.position.y -= this.speed / 25 * (Math.cos(((this.rotation % 360) + this.speed * 0.5) * (Math.PI / 180)))
      this.position.x += this.speed / 25 * (Math.sin(((this.rotation % 360) + this.speed * 0.5) * (Math.PI / 180)))
  
      this.rotation -= 0.03 * this.speed
    } else if (this.keyDown.right) {  
      this.position.y -= this.speed / 25 * (Math.cos(((this.rotation % 360) - this.speed * 0.5) * (Math.PI / 180)))
      this.position.x += this.speed / 25 * (Math.sin(((this.rotation % 360) - this.speed * 0.5) * (Math.PI / 180)))
  
      this.rotation += 0.03 * this.speed
    } else {
      this.position.y -= this.speed / 25 * (Math.cos(this.rotation * (Math.PI / 180)))
      this.position.x += this.speed / 25 * (Math.sin(this.rotation * (Math.PI / 180)))
    }

    car.style.top = this.position.y + 'px'
    car.style.left = this.position.x + 'px'
    car.style.transform = `rotate(${this.rotation}deg)`
  }

  this.checkBtnDown = () => {
    if (this.keyDown.space) {
      if (this.speed < 0) {
        this.speed += 4
      } else if (this.speed > 0) {
        this.speed -= 4
      }
    } else if (this.keyDown.up) {
      if (this.speed < 25) {
        this.speed += 1
      } 
  
      if (this.speed < 0) {
        this.speed += 5
      }
    } else if (this.keyDown.bottom) {
      if (this.speed > -25) {
        this.speed -= 1
      }
      if (this.speed > 0) {
        this.speed -= 5
      }
    } else {
      if (this.speed < 0) {
        this.speed += 1
      } else if (this.speed > 0) {
        this.speed -= 1
      }
    }
  }
  
  this.checkOut = (coordinates) => {
    
    let x0 = this.position.x, y0 = this.position.y

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

      

      if (t == 0) {
        res = res && !(l < roadWidth / 2)
      } else {
        res = res && !(l < roadWidth / 2)
      }
    })

    // console.log(!res); // !

    return !res
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
      const point = document.querySelector('.point')
      if (!res) {
        d += step
      } else {
        // point.style.top = y0 + 'px'
        // point.style.left = x0 + 'px'
        //d = Math.sqrt(Math.pow(this.position.x - x0, 2) + Math.pow(this.position.y - y0, 2))
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