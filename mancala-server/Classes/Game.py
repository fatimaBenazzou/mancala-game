class Game:
    def __init__(self, state):
        self.state = state  # board

    def gameOver(self):
        # verifier si au moins un cotÃ© est a 0 si c le cas alors ajouter tt les graines restantes au store du joueur en qst
        for x in range(2):
            endGame = True
            i = 7*x
            while i != 6 and i < 13 and endGame:
                if self.state.pockets[i] > 0:
                    endGame = False
                i += 1
                
            if (endGame):
                return True

        return False

    # inutile car on gere les etats dans le front directement
    # def findWinner(self):
    #     return 0 if self.state.pockets[6] > self.state.pockets[13] else 1

# heuristique
    def evaluate(self, win):
        # vððð¢ð(ð) = ððððððð ðð¡ððð(computer) â ððððððð ðð¡ððð(human)
        val = self.state.pockets[6] - self.state.pockets[13]

        # changer l'ordre si on veut que le 1er joueur gagne
        return val if win == 0 else -val
