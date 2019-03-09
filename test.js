function assert(truthy, msg) {
	if (truthy) console.log("Pass: ", msg)
	else console.error("Fail: ", msg)
}


const Agent = require('./agent.js')

let agent = new Agent()

// test that inputs are set & retrievable

I1 = [0.1, 0.5, 1.0]
agent.inputs = I1

assert((I1[0] == agent.values[0]) && (I1[1] == agent.values[1]) && (I1[2] == agent.values[2]), "setting and retrieving inputs")


// test reset function ~ should set all weights to 0.5

agent.reset()

assert((agent.values[15]==0.5)&&(agent.values[15]==0.5)&&(agent.values[15]==0.5), "reset function sets weights to 0.5")


// test activate function
agent.activate()
assert((agent.outputs[0]==1.525)&&(agent.outputs[1]==1.625)&&(agent.outputs[2]==1.75),
	"activate function produces correct outputs")


// test train function
let expect = [0.2,0.6,1.1] 
agent.train(expect, 0.01)
console.log(expect, agent.outputs)
