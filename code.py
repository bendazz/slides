import torch

#Use floats.  Instead of inputting 2, use 2.0, for example.

X = torch.tensor([
    [2.0]
])

w = torch.tensor([
    [.5]
])

b = torch.tensor([
    [1.0]
])

Yhat = X @ w + b