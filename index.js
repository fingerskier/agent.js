const Ptron = require('ptron')

let net = new Ptron.network([3,1,1])

function arrayAverage(A) {
	return A.reduce((a, b) => a + b) / A.length
}

function arraySum(A) {
	return A.reduce((a,b) => {return a+b});
}

function kernel(A, K) {
	let R = []

	for (let I in A) {
		R[I] = A[I] * K[I]
	}


}

class inputQueue {
	constructor(limit) {
		this.values = []
		this.limit = limit || 10

		return this
	}

	set value(newVal) {
		this.values.push(newVal)

		if (this.values.limit > this.limit) this.values.shift()
	}

	get value() {
		return this.values[this.limit-1]
	}

	get average() {
	}

	get peak() {
		// TODO peak kernel
	}

	get increase() {
		// TODO increase kernel
	}

	get decrease() {
		// TODO decrease kernel
	}
}