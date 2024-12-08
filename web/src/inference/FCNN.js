export class FCNN {
	constructor(weights_biases) {
		this.net = {
			fc1: nj.float32(weights_biases["fc1.weight"]),
			fc1_b: nj.float32(weights_biases["fc1.bias"]),
			fc2: nj.float32(weights_biases["fc2.weight"]),
			fc2_b: nj.float32(weights_biases["fc2.bias"]),
			fc3: nj.float32(weights_biases["fc3.weight"]),
			fc3_b: nj.float32(weights_biases["fc3.bias"]),
		};
		this.cache = {};
	}

	relu(x) {
		// ReLU: max(0, x)
		return nj.array(x.tolist().map((value) => Math.max(0, value)));
	}

	forward(x) {
		this.cache.input = nj.float32(x).flatten();

		// Layer 1
		this.cache.Z1 = nj
			.dot(this.net.fc1, this.cache.input)
			.add(this.net.fc1_b);
		this.cache.A1 = this.relu(this.cache.Z1);

		// Layer 2
		this.cache.Z2 = nj.dot(this.net.fc2, this.cache.A1).add(this.net.fc2_b);
		this.cache.A2 = this.relu(this.cache.Z2);

		// Layer 3 (Output layer)
		this.cache.Z3 = nj.dot(this.net.fc3, this.cache.A2).add(this.net.fc3_b);

		return {
			prediction: nj.softmax(this.cache.Z3).tolist(),
			A1: nj.softmax(this.cache.A1).tolist(),
			A2: nj.softmax(this.cache.A2).tolist(),
		};
	}
}
