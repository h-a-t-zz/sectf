import os
import json
from elasticsearch import Elasticsearch
from flask import Flask, send_file, request, send_from_directory, render_template

app = Flask(__name__)


@app.route("/register", methods=['POST'])
def register():
    errors = []
    results = {}
    if request.method == "POST":
        # get url that the user has entered
        #   name: name,
        #phone: phone,
        #email: email,
        #message: message
        try:
            info = request.get_json()
            print(info)
            timestmp = info['timestamp']
            es = Elasticsearch([{'host': 'elk', 'port': 9200}])
            es.index(index='lustig', doc_type='mark', id=timestmp, body=request.get_json())
            return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

        except:
            errors.append(
                "Unable to get ES. Please make sure it's up and try again."
            )
            print errors
            return json.dumps({'success':False}), 400, {'ContentType':'application/json'}

@app.route('/', defaults={'path': 'index.html'})
@app.route("/<path:path>", methods=['GET'])
def catch_all(path):
    return send_from_directory('static', path)





if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)
