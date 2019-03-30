function sigmoid(X) {
	return 1 / (1 + Math.exp(X))
}

function RELU(X) {
	return Math.max(0, X)
}

const arrayMax = arr => {
	let result = 0

	for (let X of arr) 
		if (Math.abs(X) > result) result = X

	return result
}

module.exports = class Agent {
	constructor(x=3, y=3, bias=0.01, rate=0.1,r recurse=0) {
		this.values = []
		
		this.width = x
		this.height = y
		this.depth = y + 1

		this.bias = bias
		this.rate = rate
	}
	
	coord(x,y,z) {
		return y + (x * this.height) + (z * this.height * this.depth)
	}
	
	getElement(x,y,z) {
		return this.values[this.coord(x,y,z)]
	}

	setElement(x,y,z,value) {
		this.values[this.coord(x,y,z)] = value
	}

	get controls() {
		let result = []

		for (let y = 0; y < this.height; y++) {
			result.push(this.getElement(this.width-2, y, 0))
		}
	}

	set inputs(valueArray) {
		for (let y = 0; y < this.height; y++) {
			this.setElement(0, y, 0, valueArray[y])
		}	
	}	

	get model() {
		return JSON.stringify(this.values)
	}

	set model(valueArray) {
		this.values = JSON.parse(valueArray)
	}

	get outputs() {
		let result = []

		for (let y = 0; y < this.height; y++) {
			result.push(this.getElement(this.width-1, y, 0))
		}

		return result
	}

	reset() {
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				for (let z = 1; z < this.depth; z++) {
					this.setElement(x,y,z,0.5) 
				}
			}
		}
	}

	activate() {
		if (this.recurse) {
			// copy 'recurse' number of elements from the hidden-control-layer to the bottom of the input vector
		}

		for (let x = 1; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				for (let z = 1; z < this.depth; z++) {
					let input = this.getElement(x-1, y, 0)
					let weight = this.getElement(x,y,z)
					let signal = input * weight + this.bias

					this.setElement(x,y,0, signal > 0 ? signal : 0)
				}
			}
		}
	}

	cost() {
	}
	
	train(expected, targetError=0.1) {
		let errors = [1]

		if (!expected) {
			console.error("no expected values given")
			return
		}

		if (this.recurse) {
			// make the bottom 'recurse' expectations 1 to pad for the controls
		}

		while (Math.abs(arrayMax(errors)) > targetError) {
			// calculate errors
			for (let x = 0; x < this.width; x++) {
				errors[x] = this.bias + expected[x] - this.getElement(this.width-1,x,0)
			}

			// calculate and apply diffs
			for (let x = 1; x < this.width; x++) {
				for (let y = 0; y < this.height; y++) {
					for (let z = 1; z < this.depth; z++) {
						let thisn = this.getElement(x,y,z)
						let diff = errors[y] * this.getElement(x-1,y,0) * this.rate
						
						this.setElement(x,y,z, thisn + diff)
					}
				}
			}

			this.activate()
		}
	}
}
