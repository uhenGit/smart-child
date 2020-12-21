from flask import Flask, render_template, request, make_response, jsonify
from modules.parts import randWord
from modules.parts import setRandArr
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
# app.debug = True

@app.route("/sw.js")
def sw():
    return app.send_static_file('sw.js')

@app.route("/")
def homePage():
    return render_template('index.html')

@app.route("/math", methods=['GET', 'POST'])
def mathPage():
    return render_template('math.html')

@app.route("/translate", methods=['GET'])
def translatePage():
    if request.method == 'GET':
        return render_template('translate.html', data='lang')

@app.route("/translate/lang", methods=['POST'])
def defineLang():
    global compare_word
    if request.method == 'POST' and 'lang' in request.json:
        lang = request.json['lang']
        target_word, compare_word = randWord(lang)
        return make_response(jsonify({'msg': target_word}), 200)

@app.route("/translate/compare", methods=['POST'])
def compareWords():
    if request.method == 'POST' and 'answer' in request.json:
        answer = request.json['answer']
        if answer == compare_word:
            return make_response(jsonify({'msg': 'Great! You\'re right!', 'is_right': True}), 200)
        return make_response(jsonify({'msg': 'Try again', 'is_right': False}), 200)

@app.route("/similar-imgs", methods=['GET'])
def findSimilar():
    if request.method == 'GET':
        img_folder = 'imgs/leaves'
        imgs_list = os.listdir(os.path.join(app.static_folder, img_folder))
        my_arr = setRandArr(len(imgs_list))
        return render_template('similar-imgs.html', array=my_arr)

if __name__ == '__main__':
    app.run()