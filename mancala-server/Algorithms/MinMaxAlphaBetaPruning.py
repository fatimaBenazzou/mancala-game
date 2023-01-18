from math import inf
import copy

 
def MinMaxAlphaBetaPruning(game, Min, depth=16, alpha=-inf, beta=+inf):
    #  game est une instance de la classe Game et player = COMPUTER ou HUMAN
    if game.gameOver() or depth == 1:
        bestValue = game.evaluate(Min)
        bestPit = None
        return bestValue, bestPit

    bestPit = None
    if game.state.playerSide != Min:
        bestValue = -inf
        # childrens = possibleMoves[]
        for pit in game.state.possibleMoves():
            child_game = copy.deepcopy(game)
            child_game.state.doMove(pit)
            value, _ = MinMaxAlphaBetaPruning(
                child_game, Min, depth-1, alpha, beta)

            if value > bestValue:
                bestValue = value
                bestPit = pit

            if bestValue > alpha:
                alpha = bestValue

            if beta <= alpha:
                break
    else:
        bestValue = +inf
        # childrens = possibleMoves[]
        for pit in game.state.possibleMoves():
            child_game = copy.deepcopy(game)
            child_game.state.doMove(pit)
            value, _ = MinMaxAlphaBetaPruning(
                child_game, Min, depth-1, alpha, beta)

            if value < bestValue:
                bestValue = value
                bestPit = pit

            if bestValue < beta:
                beta = bestValue

            if beta <= alpha:
                break
    return bestValue, bestPit
