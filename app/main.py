import os
import json
from flask import Flask, send_file, request, send_from_directory, render_template

app = Flask(__name__, static_url_path='')

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
        except:
            errors.append(
                "Unable to get URL. Please make sure it's valid and try again."
            )
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@app.route("/<path:path>", methods=['GET'])
def main():
    return send_from_directory('static', path)



if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)
