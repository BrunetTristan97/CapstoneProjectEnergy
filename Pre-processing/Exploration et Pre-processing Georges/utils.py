import numpy as np
import pandas as pd

# fonction pour creer la sliding windows

def slide_window(dataset, window_size=7):
    oc1, oc2, oc3, p1, p2, p3, pn1, pn2, pn3, pt01, pt02, pt03 , ptn01, ptn02, ptn03 , pt11, pt22, ptn33 , ptn11, ptn22, ptn33 ,cl1, cl2, cl3 = [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
    y1, y2, y3 = [], [], []

    X, y = [], []
    input ,output =[], []

    # Trouver toutes les sequences de 'window_size' donnees, dans le dataset,
    # ainsi que leur 'y' (target)
    for i in range( dataset.shape[0] - window_size ):
        X = dataset.iloc[ i : i + window_size, : ] 
        y = dataset.iloc[i + window_size, -1] 

        oc1 = X.iloc[0,0], 
        oc2 = X.iloc[1,0], 
        oc3 = X.iloc[2,0], 
        p1 = X.iloc[0,1], 
        p2 = X.iloc[1,1], 
        p3 = X.iloc[2,1], 
        pn1 = X.iloc[0,2], 
        pn2 = X.iloc[1,2], 
        pn3 = X.iloc[2,2], 
        pt01 = X.iloc[0,3], 
        pt02 = X.iloc[1,3], 
        pt03 = X.iloc[2,3],
        pt11 = X.iloc[0,4], 
        pt22 = X.iloc[1,4], 
        pt33 = X.iloc[2,4],
        cl1 = X.iloc[0,5], 
        cl2 = X.iloc[1,5], 
        cl3 = X.iloc[2,5],
        ptn01 = X.iloc[0,6], 
        ptn02 = X.iloc[1,6], 
        ptn03 = X.iloc[2,6],
        ptn11 = X.iloc[2,7], 
        ptn22 = X.iloc[2,7], 
        ptn33 = X.iloc[2,7],
        y1 = y

        input.append( [[oc1, oc2, oc3, p1, p2, p3, pn1, pn2, pn3, pt01, pt02, pt03 ,pt11, pt22, pt33 ,cl1, cl2, cl3 , ptn01, ptn02, ptn03 , ptn11, ptn22, ptn33 ]] )
        output.append( y1 )


    return np.asarray(input).astype(np.float32) , np.asarray(output).astype(np.float32)