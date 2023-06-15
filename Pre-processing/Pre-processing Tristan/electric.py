import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 1. Read the file
dataframe = pd.read_csv('QUD.csv')
dataframe = list(dataframe.to_numpy()[:,1])

# 2. Creer des sliding windows

# 2.1 Extraire les caracteristiques du dataset en entier
data_mean = np.mean(np.asarray(dataframe))
data_cov = np.cov(np.asarray(dataframe))

print(f"Stats : \n\tMoyenne : {data_mean}\n\tMin: {np.min(np.asarray(dataframe))}\n\tMax: {np.max(np.asarray(dataframe))}")

standard_deviations = []

stateful_mean = np.mean(np.asarray(dataframe))
epsilon = 0.1

WINDOW_SIZE = 3
for i in range(len(dataframe)-WINDOW_SIZE+1):
    
    fenetre = np.asarray(dataframe[ i : i+WINDOW_SIZE])
    
    #fenetre_norm =  (fenetre - fenetre.min()) / (fenetre.max() - fenetre.min())
    mean = np.mean(np.asarray(fenetre))
    stateful_mean  = (1-epsilon) * stateful_mean + (mean * epsilon)
    
    factor = (stateful_mean-mean) / (mean)
    fenetre_norm = (fenetre - fenetre.min()) / (fenetre.max() - fenetre.min())
    fenetre_norm = fenetre_norm * factor
    #fenetre = (fenetre-data_mean + fenetre - mean) / (data_mean + mean)
    
    #standard_deviation = np.std(np.asarray(fenetre))
    #covariance = np.cov(fenetre)
    
    #standard_deviations.append(standard_deviation)
    #fenetre = (fenetre-data_mean + fenetre - mean) * standard_deviation / (data_mean + mean)
    
    
    print(f'Fenetre ({i+1}) : {np.round(fenetre,4)} -> {np.round(fenetre_norm,4)} -- Stat. Mean : {stateful_mean} - Factor : {factor}')
    #print(f'\tDiff. : {')
    #print(f'\tStandard deviation : {standard_deviation}')
    #print(f'Fen. Normalis. : {mean}')
    #print(f'\tPop. Cov : {data_cov}')
    #print(f'\tSample Cov : {covariance}')
    if i >= 100:
        break
    
#plt.plot(standard_deviations)
#plt.show()