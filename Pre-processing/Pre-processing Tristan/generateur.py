import tensorflow as tf
import numpy as np
import pandas as pd

from stateful_scaler import StatefulScaler

class Generateur(tf.keras.utils.Sequence):

    def __init__(self, dataset, batch_size=8, window_size=3):

        self.X , self.y = dataset.drop('Micro-Moment Class', axis=1).to_numpy().astype(np.float32), np.asarray(tf.one_hot(dataset['Micro-Moment Class'], depth=5)).astype(np.float32)
        
        self.batch_size = batch_size
        self.window_size = window_size

        self.t_scaler = StatefulScaler(0.75, np.mean(self.X[:, 1]))
        self.t_fwd_scaler = StatefulScaler(0.9, np.mean(abs(self.X[:, 2])))
        self.t_back_scaler = StatefulScaler(0.9, np.mean(abs(self.X[:, 3])))
        
    def on_epoch_end(self):
        # Reset Stateful mean to dataset mean
        self.t_scaler.reset_stateful_mean()
        self.t_fwd_scaler.reset_stateful_mean()
        self.t_back_scaler.reset_stateful_mean()
        
    def __len__(self):
        return (self.X.shape[0] - self.window_size + 1) // self.batch_size

    def __getitem__(self, idx):

        batch_x = self.X[ (idx * self.batch_size) : (idx + 1) * self.batch_size + self.window_size - 1, : ]
        batch_y = self.y[ (idx * self.batch_size) : (idx + 1) * self.batch_size + self.window_size - 1, : ]

        batch_x, batch_y = self.slide_window([batch_x, batch_y])
        
        # Normalisation de P(t), P(t) - P(t-1) et P(t) - P(t+1)
        for i in range(self.batch_size):
            batch_x[:, :, 1] = self.t_scaler.normalize(batch_x[i, :, 1])
            batch_x[:, :, 2] = self.t_fwd_scaler.normalize(batch_x[i, :, 2])
            batch_x[:, :, 3] = self.t_back_scaler.normalize(batch_x[i, :, 3])

        return np.asarray(batch_x).astype(np.float32) , np.asarray(batch_y).astype(np.float32)

    def slide_window(self, batch, timestep=3):

        batch_x, batch_y = batch

        X, y = [], []
        
        for i in range(batch_x.shape[0]):
            if i <= batch_x.shape[0] - timestep:
                y.append(batch_y[i+(timestep // 2) , :])
                X.append(batch_x[i:i+timestep, :])

        return np.asarray(X).astype(np.float32), np.asarray(y).astype(np.float32)

generateur = Generateur([])