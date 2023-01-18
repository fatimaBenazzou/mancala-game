from flask import Flask, jsonify, request
from flask_cors import CORS
from Classes.MancalaBoard import MancalaBoard
from Classes.Game import Game
from Algorithms.NegaMaxAlphaBetaPruning import NegaMaxAlphaBetaPruning
from Algorithms.MinMaxAlphaBetaPruning import MinMaxAlphaBetaPruning

import random

# initialisation d'un serveur flask
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}}) 

# algorithms routes
@app.route('/negamax', methods=["POST"])
def Negamax():
    state = request.json # reception des valeurs (l'etat du board) du front
    board = MancalaBoard(state["pockets"], state["turn"]) # creation du nouvel etat (board)
    game = Game(board) # creation de la partie
    bestValue, bestPit = NegaMaxAlphaBetaPruning(game, state["turn"]) 

    return jsonify(message="POST request returned", pocket=bestPit) # retourner le meilleur mouvement


@app.route('/minmax', methods=["POST"])
def MinMax():
    state = request.json
    board = MancalaBoard(state["pockets"], state["turn"])
    game = Game(board)
    bestValue, bestPit = MinMaxAlphaBetaPruning(game, state["turn"])
   
    return jsonify(message="POST request returned", pocket=bestPit)
