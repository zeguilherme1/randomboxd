from flask import Flask, request, jsonify, render_template

from letterboxdpy import user
import random


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_movie", methods=["POST"])

def get_movie():
	data = request.get_json()
	username = data.get("username")
	
	user_instance = user.User(username)
	watchlist = user_instance.get_watchlist()
	print(watchlist)
	watchlist_movies = ([movie["name"] for movie in watchlist["data"].values()])
 
	if not watchlist_movies:
		return jsonify({"Error:": "Your watchlist is empty"})

	movies = (watchlist_movies)
	return jsonify({"movies": movies})

if __name__ == "__main__":
    app.run(debug=True, port=3001)