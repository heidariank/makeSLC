# This file provided by Facebook is for non-commercial testing and evaluation
# purposes only. Facebook reserves all rights not expressly granted.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
# ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import json
import os
import time
from flask import Flask, Response, request

app = Flask(__name__, static_url_path='', static_folder='src')
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
app.debug = True


@app.route('/api/makers', methods=['GET', 'POST'])
def makers_handler():
    with open('src/Makers.json', 'r') as file:
        makers = json.loads(file.read())

    print('request: {}'.format(request))

    if request.method == 'POST':
        #newMaker = request.form.to_dict()
        newMaker = request.args.to_dict()
        print('newMaker: {}'.format(newMaker))
        #newMaker['ID'] = int(time.time() * 1000)
        makers.append(newMaker)

        with open('Makers.json', 'w') as file:
            file.write(json.dumps(makers, indent=4, separators=(',', ': ')))

    return Response(json.dumps(makers), mimetype='application/json', headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})

@app.route('/api/projects', methods=['GET', 'POST'])    
def projects_handler():
    return 'Hiiiiiiiiiiiii'



@app.route('/api/comments', methods=['GET', 'POST'])
def comments_handler():

    with open('src/Projects.json', 'r') as file:
        comments = json.loads(file.read())

    if request.method == 'POST':
        newComment = request.form.to_dict()
        print('newComment: {}'.format(newComment))
        newComment['id'] = int(time.time() * 1000)
        comments.append(newComment)

        with open('comments.json', 'w') as file:
            file.write(json.dumps(comments, indent=4, separators=(',', ': ')))

    return Response(json.dumps(comments), mimetype='application/json', headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})

if __name__ == '__main__':
    app.run(port=int(os.environ.get("PORT",3001)))
