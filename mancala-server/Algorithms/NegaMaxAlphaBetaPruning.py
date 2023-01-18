from math import inf
import copy


def NegaMaxAlphaBetaPruning(game, Max, depth=8, alpha=-inf, beta=+inf):
    #  game est une instance de la classe Game 
    if game.gameOver() or depth == 1:
        # evaluer l'etat du jeu en prenons en consideration le joueur que l'on veut qu'il gagne (Max)
        bestValue = game.evaluate(Max)
        bestPit = None

        # si joueur current est le joueur qui va minimiser le gain  on change la valeur (-)
        if game.state.playerSide != Max:
            bestValue = - bestValue
        return bestValue, bestPit

    bestValue = -inf
    bestPit = None

    # childrens = possibleMoves[]
    # pour chaque fausse de possible moves[], on copie l'etat (aka the board) et on applique le mouvement 
    for pit in game.state.possibleMoves(): 
        child_game = copy.deepcopy(game)
        child_game.state.doMove(pit)

        # chacker si le joueur joue des tours supplementaire ou pas
        if game.state.playerSide != child_game.state.playerSide: 
            # switcher le min et le max (ne rejoue pas)
            value, _ = NegaMaxAlphaBetaPruning(
                child_game, Max, depth-1, -beta, -alpha)
            value = - value 
        else:
            value, _ = NegaMaxAlphaBetaPruning(
                child_game, Max, depth-1, alpha, beta) # on garde l'etat d'alpha et beta

        if value > bestValue:
            bestValue = value
            bestPit = pit

        if bestValue > alpha:
            alpha = bestValue

        if beta <= alpha: # elagage alpha
            break

    return bestValue, bestPit
