from flask import Flask, send_file, request, send_from_directory
app = Flask(__name__, static_url_path='')

@app.route("/register", methods=['GET','POST'])
def register():
    errors = []
    results = {}
    if request.method == "POST":
        # get url that the user has entered
        try:
            url = request.form['url']
            r = requests.get(url)
            print(r.text)
        except:
            errors.append(
                "Unable to get URL. Please make sure it's valid and try again."
            )
    return render_template('index.html', errors=errors, results=results)


@app.route("/<path:path>")
def main():
    return send_from_directory('static', path)


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)
