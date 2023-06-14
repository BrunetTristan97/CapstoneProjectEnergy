import numpy as np
import pandas as pd
import tensorflow as tf

# fonction pour creer la sliding windows

def slide_window(dataset, window_size=7):
    oc1, oc2, oc3, p1, p2, p3, pt01, pt02, pt03 , ptn01, ptn02, ptn03 , pt11, pt22, ptn33 , ptn11, ptn22, ptn33 ,cl1, cl2, cl3 = [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
    y1 = []

    X, y = [], []
    input ,output =[], []

    # Trouver toutes les sequences de 'window_size' donnees, dans le dataset,
    # ainsi que leur 'y' (target)
    for i in range( dataset.shape[0] - window_size ):
        X = dataset.iloc[ i : i + window_size, : ] 
        y = dataset.iloc[i + window_size, 5] 

        oc1 = X.iloc[0,0], 
        oc2 = X.iloc[1,0], 
        oc3 = X.iloc[2,0], 
        p1 = X.iloc[0,1], 
        p2 = X.iloc[1,1], 
        p3 = X.iloc[2,1], 
        pt01 = X.iloc[0,3], 
        pt02 = X.iloc[1,3], 
        pt03 = X.iloc[2,3],
        pt11 = X.iloc[0,4], 
        pt22 = X.iloc[1,4], 
        pt33 = X.iloc[2,4],
        cl1 = X.iloc[0,5], 
        cl2 = X.iloc[1,5], 
        cl3 = X.iloc[2,5],
        y1 = y

        input.append( [[oc1, oc2, oc3, p1, p2, p3, pt01, pt02, pt03 ,pt11, pt22, pt33 ,cl1, cl2, cl3 ]] )
        output.append( y1 )


    return np.asarray(input).astype(np.float32) , np.asarray(output).astype(np.float32)


from keras.callbacks import Callback,ModelCheckpoint
from keras.models import Sequential,load_model
from keras.layers import Dense, Dropout
from keras.wrappers.scikit_learn import KerasClassifier
import keras.backend as K

# fonction pour calculer le score
def get_f1(y_true, y_pred): #taken from old keras source code
    true_positives = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives = K.sum(K.round(K.clip(y_true, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision = true_positives / (predicted_positives + K.epsilon())
    recall = true_positives / (possible_positives + K.epsilon())
    f1_val = 2*(precision*recall)/(precision+recall+K.epsilon())
    return f1_val

# Normalisation avec stateful:

## classe stateful
class StatefulScaler():
    def __init__(self, epsilon, initial_mean = 0): # e.g. epsilons: {1: 0.1, 2: 0.9}
        self.epsilon = epsilon
        self.stateful_mean = initial_mean
        self.data_mean = initial_mean

    def normalize(self, fenetre, update_mean = True):

        if update_mean:
            self.stateful_mean = (1-self.epsilon) * self.stateful_mean + (self.data_mean * self.epsilon)
        
        factor = (self.stateful_mean-self.data_mean) / (self.data_mean + 1e-7)
        fenetre_norm = (fenetre - fenetre.min()) / ((fenetre.max() - fenetre.min()) + 1e-7) # Ajouter 1e-7 a la moyenne pour éviter la division par 0
        fenetre_norm = fenetre_norm * factor
        
        return fenetre_norm

    def normalize_window(self, window):
        fenetre_norm = np.asarray([self.normalize(window[i]) for i in range(window.shape[0])]).astype(np.float32)
        return fenetre_norm

    def reset_stateful_mean(self):
        self.stateful_mean = self.data_mean

## normalisation avec stateful pour le modele de DML
class Generateur(tf.keras.utils.Sequence):

    def __init__(self, dataset, batch_size=8, window_size=3):

        self.X , self.y = dataset.drop('class_state', axis=1).to_numpy().astype(np.float32), np.asarray(tf.one_hot(dataset['class_state'], depth=5)).astype(np.float32)
        
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
            # print(f"--{batch_x[:, :, 1]}")
            batch_x[:, :, 2] = self.t_fwd_scaler.normalize(batch_x[i, :, 2])
            # print(f"--{batch_x[:, :, 2]}")
            batch_x[:, :, 3] = self.t_back_scaler.normalize(batch_x[i, :, 3])
            # print(f"--{batch_x[:, :, 1]}")

        return np.asarray(batch_x).astype(np.float32) , np.asarray(batch_y).astype(np.float32)

    def slide_window(self, batch, timestep=3):

        batch_x, batch_y = batch

        X, y = [], []
        
        for i in range(batch_x.shape[0]):
            if i <= batch_x.shape[0] - timestep:
                y.append(batch_y[i+(timestep // 2) , :])
                X.append(batch_x[i:i+timestep, :])

        return np.asarray(X).astype(np.float32), np.asarray(y).astype(np.float32)
    
## normalisation avec stateful pour le modele de ML
class DataProcessing():

    def __init__(self, dataset, window_size=3):

        self.X , self.y = dataset.drop('class_state', axis=1).to_numpy().astype(np.float32), np.asarray(dataset['class_state'])
                
        self.window_size = window_size

        print("Les statistiques du dataset:\n")

        self.t_scaler = StatefulScaler(0.75, np.mean(self.X[:, 1]))           # Power
        # print(f"Power_moyennee : {np.mean(self.X[:, 1])}")
        self.t_fwd_scaler = StatefulScaler(0.9, np.mean(abs(self.X[:, 2])))   # Pt+1
        # print(f"t+1_moyenne    : {np.mean(abs(self.X[:, 2]))}")
        self.t_back_scaler = StatefulScaler(0.9, np.mean(abs(self.X[:, 3])))  # Pt-1
        # print(f"t-1_moyenne    : {np.mean(abs(self.X[:, 3]))}\n\n")
              
        
    
    def processing(self):
        batch_x, batch_y = self.slide_window([self.X, self.y])
        input_features = []

        print(f"---\nLes donnees etudiees")
        
        print(f"La shpae des inputs {batch_x.shape}")
        print(f"La shape des outputs {batch_y.shape}")
        print("*******************************************\n")
        
        
        # Normalisation de P(t), P(t) - P(t-1) et P(t) - P(t+1)
         

        for i in range(len(batch_x)):
        # for i in range(20):
        
          print(f"Les valeurs de la fenetre -->\n{batch_x[i]}\n")
          print("%%%%%%%%%%%%%%%%%%%%%  DEBUT  %%%%%%%%%%%%%%%%%%%%\n")

              # pour occupancy
          tmp0 = batch_x[i, :, 0]
          print(tmp0)

                # pour la Power
          tmp1 = self.t_scaler.normalize_window(batch_x[i, :, 1])   # batch_x[i, :, 1] #
          print(tmp1)             
          

                # pour Pt+1
          tmp2 = self.t_fwd_scaler.normalize_window(batch_x[i, :, 2])  #  batch_x[i, :, 2] # 
          # print("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
          print(tmp2)  

                # pour Pt-1
          tmp3 = self.t_back_scaler.normalize_window(batch_x[i, :, 3])  #  batch_x[i, :, 3] # 
          # print("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
          print(tmp3)  

          # print(batch_y[i])
          # print("=================")
          print()

          input = np.concatenate([ tmp0 , tmp1 , tmp2 , tmp3 ] )
          input = np.asarray(input).astype(np.float32) 
          input_features.append(input)

          # print(tmp0.shape)
          # print(tmp1.shape)
          # print(tmp2.shape)
          # print(tmp3.shape)
          print(input)
          print("%%%%%%%%%%%%%%%%%%%%%%%%%  FIN  %%%%%%%%%%%%\n\n")
          
          

        return np.asarray(input_features).astype(np.float32) , np.asarray(batch_y).astype(np.float32)
        

    def slide_window(self, batch, timestep=3):
        # le balayage de la sliding window pour une batch recue
        batch_x, batch_y = batch
        X, y = [], []

        for i in range(batch_x.shape[0]):
            if i <= batch_x.shape[0] - timestep:
                y.append(batch_y[i+(timestep // 2) ])
                X.append(batch_x[i:i+timestep, :])
        # print(X)

        return np.asarray(X).astype(np.float32), np.asarray(y).astype(np.float32)
    
