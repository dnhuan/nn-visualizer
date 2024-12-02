import json

if __name__ == "__main__":
    with open("results/example_data.json", "r") as f:
        example_data = json.load(f)
    print(example_data)
