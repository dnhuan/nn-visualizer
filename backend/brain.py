import json
import numpy as np


with open("files/3.json", "r") as f:
    example_data = json.load(f)


def softmax(x):
    return np.exp(x) / np.sum(np.exp(x), axis=0)

# input layer: 784 nodes in, 16 nodes for ReLU activation
# hidden layer: 16 nodes in, 16 nodes for ReLU activation
# output layer: 16 nodes in, 10 nodes out for softmax


class FCNN:
    def __init__(self, weights_biases):
        self.input_layer_size = 784
        self.hidden_layer_size = 16
        self.output_layer_size = 10
        self.net = {
            "fc1": np.array(weights_biases["fc1.weight"]),
            "fc1_b": np.array(weights_biases["fc1.bias"]),
            "fc2": np.array(weights_biases["fc2.weight"]),
            "fc2_b": np.array(weights_biases["fc2.bias"]),
            "fc3": np.array(weights_biases["fc3.weight"]),
            "fc3_b": np.array(weights_biases["fc3.bias"])
        }
        self.cache = {}

    def forward(self, x):
        self.cache["input"] = x
        self.cache["Z1"] = np.dot(self.net["fc1"], x) + self.net["fc1_b"]
        self.cache["A1"] = np.maximum(0, self.cache["Z1"])
        self.cache["Z2"] = np.dot(self.net["fc2"], self.cache["A1"]) + self.net["fc2_b"]
        self.cache["A2"] = np.maximum(0, self.cache["Z2"])
        self.cache["Z3"] = np.dot(self.net["fc3"], self.cache["A2"]) + self.net["fc3_b"]
        self.returnCache = {"A1": self.cache["A1"], "A2": self.cache["A2"]}

        return self.cache["Z3"], self.returnCache


if __name__ == "__main__":
    with open("files/weights.json", "r") as f:
        weights_biases = json.load(f)

        fcnn = FCNN(weights_biases)
        np.set_printoptions(suppress=True)

        prediction, cache = fcnn.forward(np.array(example_data).flatten())
        print(prediction.tolist())
        print(cache["A1"].tolist())
        print(cache["A2"].tolist())
