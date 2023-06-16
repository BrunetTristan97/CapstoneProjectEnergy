import numpy as np
class StatefulScaler():
    def __init__(self, epsilon, initial_mean = 0): # e.g. epsilons: {1: 0.1, 2: 0.9}
        self.epsilon = epsilon
        self.stateful_mean = initial_mean
        self.data_mean = initial_mean

    def normalize(self, fenetre, update_mean = True):

        mean = np.mean(fenetre)

        if update_mean:
            self.stateful_mean = (1-self.epsilon) * self.stateful_mean + (mean * self.epsilon)

        factor = (self.stateful_mean-mean) / (mean + 1e-7)
        fenetre_norm = (fenetre - fenetre.min()) / ((fenetre.max() - fenetre.min()) + 1e-7) # Ajouter 1e-7 a la moyenne pour éviter la division par 0
        fenetre_norm = abs(fenetre_norm * factor)
        
        return fenetre_norm

    def normalize_batch(self, batch):
        batch_norm = np.asarray([self.normalize(batch[i]) for i in range(batch.shape[0])]).astype(np.float32)
        return batch_norm

    def reset_stateful_mean(self):
        self.stateful_mean = self.data_mean
