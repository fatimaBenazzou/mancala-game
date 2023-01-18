class MancalaBoard:
    def __init__(self, pockets, playerSide):
        self.pockets = pockets  # board
        self.playerSide = playerSide # current player

    #  determiner selon le joueur les fausses a graines => liste de fausses encfore contenant des graines
    def possibleMoves(self):
        possibleM = []
        i = 7*self.playerSide
        while i != 6 and i < 13: #| !stores
            if self.pockets[i] > 0:
                possibleM.append(i)
            i += 1

        return possibleM

    # => changer l'etat du board
    def doMove(self, move):
        # prend la valeur de la fausse jouer
        value = self.pockets[move] 
        self.pockets[move] = 0 # vider la fausse 

        i = move # index de la fausse jouer
        while value > 0: 
            value -= 1 # decrementer le nombre de pierre ramasser
            i = (i + 1) % 14 # aller a l'index suivant

            # ne pas mettre de pierre dans le store de l'adversaire 
            if (self.playerSide == 0 and i == 13) or (self.playerSide == 1 and i == 6):
                i = (i + 1) % 14

            self.pockets[i] += 1 # disperser les pierres

        # si l'emplacement de la derniere pierre ! in store
        if i != 13 and i != 6:
            if (self.playerSide == 0 and i < 6) or (self.playerSide == 1 and i > 6):
                # s'il s'arrete dans une fausse vide on recupere les pierres en face (12 - i)
                if self.pockets[i] == 1:
                    self.pockets[6 + (self.playerSide * 7)] += self.pockets[12 - i] 
                    self.pockets[12 - i] = 0 # vider la fausse en face

            # changer le joueur courant au joueur suivant    
            self.playerSide = (self.playerSide + 1) % 2

    # for debug
    def __str__(self):
        return str({"pockets": self.pockets, "playerSide": self.playerSide})
