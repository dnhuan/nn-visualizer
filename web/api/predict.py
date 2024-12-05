import json
import numpy as np
from flask import Flask, request

app = Flask(__name__)


@app.route('/api/predict', methods=['POST'])
def predict():
    input_data = request.json
    flatten_data = np.array(input_data).flatten()
    if flatten_data.size != 784:
        return {"error": "Invalid input data size"}, 400

    with open("data/weights.json", "r") as f:
        weights_biases = json.load(f)
        net = FCNN(weights_biases)
        prediction = net.forward(flatten_data)
        np.set_printoptions(suppress=True, formatter={'float_kind': '{:f}'.format})
        return {"prediction": softmax(prediction["Z3"]).tolist(), "A1": softmax(prediction["A1"]).tolist(), "A2": softmax(prediction["A2"]).tolist()}


def softmax(x):
    return np.exp(x) / np.sum(np.exp(x), axis=0)


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
        return {"Z3": self.cache["Z3"], "A1": self.cache["A1"], "A2": self.cache["A2"]}
