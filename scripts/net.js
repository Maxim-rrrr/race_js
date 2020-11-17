function rand(min, max) {
  return Math.random() * (max - min) + min;
}



let Net = function(ancestor, mutation = true) {
  this.weight = []
  this.bias = []

  // Инициализация весов и смещений
  if (!ancestor) {
    // Если предка нет то рандомим все значения
    for (let i = 0; i < 42; i++) {
      this.weight.push(rand(-10, 10))
    }

    for (let i = 0; i < 21; i++) {
      // this.bias.push(rand(-100, 100))
      this.bias.push(0)
    }
  } else {
    // Если же предок есть то смотрем включена ли мутация
    if (mutation) {
      // Мутация включена рандомно меняем немного гены предка
      this.weight = ancestor.weight.slice()
      this.weight.forEach((item, index) => {
        this.weight[index] += rand(-5, 5)
      })

      this.bias = ancestor.bias.slice()
      this.bias.forEach((item, index) => {
        this.bias[index] += rand(-3, 3)
      })
    } else {
      // Иначе делаем точную копию
      this.weight = ancestor.weight.slice()
      this.bias = ancestor.bias.slice()
    }
  }

  // Получение генова сетки
  this.getGenome = () => {
    return {
      weight: this.weight,
      bias: this.bias
    }
  }

  this.neuron = (w1, w2, b, input_1, input_2) => {
    return (1 / (Math.exp(input_1 * w1 + input_2 * w2 + b) + 1))
  } 

  this.output = input => {
    let layer_1 = [
      this.neuron(this.weight[0], this.weight[1], this.bias[0],
        input[0], input[1]
      ),
      this.neuron(this.weight[2], this.weight[3], this.bias[1],
        input[0], input[1]
      ),

      this.neuron(this.weight[4], this.weight[5], this.bias[2],
        input[2], input[3]
      ),
      this.neuron(this.weight[6], this.weight[7], this.bias[3],
        input[2], input[3]
      ),

      this.neuron(this.weight[8], this.weight[9], this.bias[4],
        input[4], input[5]
      ),
      this.neuron(this.weight[10], this.weight[11], this.bias[5],
        input[4], input[5]
      ),

      this.neuron(this.weight[12], this.weight[13], this.bias[6],
        input[6], input[7]
      ),
      this.neuron(this.weight[14], this.weight[15], this.bias[7],
        input[6], input[7]
      ),
    ]

    let layer_2 = [
      this.neuron(this.weight[16], this.weight[17], this.bias[8],
        layer_1[0], layer_1[1]
      ),
      this.neuron(this.weight[18], this.weight[19], this.bias[9],
        layer_1[2], layer_1[3]
      ),
      this.neuron(this.weight[20], this.weight[21], this.bias[10],
        layer_1[4], layer_1[5]
      ),
      this.neuron(this.weight[22], this.weight[23], this.bias[11],
        layer_1[6], layer_1[7]
      )
    ]

    let layer_3 = [
      this.neuron(this.weight[24], this.weight[25], this.bias[12],
        layer_2[0], layer_2[1]
      ),
      this.neuron(this.weight[26], this.weight[27], this.bias[13],
        layer_2[0], layer_2[1]
      ),
      this.neuron(this.weight[28], this.weight[29], this.bias[14],
        layer_2[2], layer_2[3]
      ),
      this.neuron(this.weight[30], this.weight[31], this.bias[15],
        layer_2[2], layer_2[3]
      )
    ]

    let layer_4 = [
      this.neuron(this.weight[32], this.weight[33], this.bias[16],
        layer_3[0], layer_3[1]
      ),
      this.neuron(this.weight[34], this.weight[35], this.bias[17],
        layer_3[2], layer_3[3]
      )
    ]

    let layer_5 = [
      this.neuron(this.weight[36], this.weight[37], this.bias[18],
        layer_4[0], layer_4[1]
      ),
      this.neuron(this.weight[38], this.weight[39], this.bias[19],
        layer_4[0], layer_4[1]
      )
    ]

    return this.neuron(this.weight[40], this.weight[41], this.bias[20], layer_5[0], layer_5[1])
  }
  
}

