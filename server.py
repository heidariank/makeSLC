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
# from sqlite3 import dbapi2 as sqlite3
# from flask import Flask, Response, request, session, g, redirect, url_for, abort, \
#      render_template, flash
import sqlite3
from flask import *
# import pdb; pdb.set_trace()

DATABASE = 'makeSLC.db'

app = Flask(__name__, static_url_path='', static_folder='src')
app.config.from_object(__name__) #TODO: move this to a seperate config file with passwords and stuff
app.add_url_rule('/', 'root', lambda: app.send_static_file('index.html'))
app.debug = True

# def connect_db():
#     return sqlite3.connect(app.config['DATABASE'])

def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

@app.route('/api/get_makers', methods=['GET'])
def get_makers():
    g.db = connect_db()
    cur = g.db.execute('select name, ID, blurb, image, projects, email from makers')
    mList = [dict(name=row[0], ID=row[1], blurb=row[2], image=row[3], projects=row[4], email=row[5]) for row in cur.fetchall() ]
    g.db.close()

    #convert project string into List
    for item in mList:
        if item['projects'] is not None:
            item['projects'] = item['projects'].split(',')
            for proj in item['projects']:
                proj = int(proj)
        else:
            item['projects'] = []

    return Response(json.dumps(mList), mimetype='application/json', headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})

@app.route('/api/post_maker', methods=['POST', 'GET'])
def post_maker():
    msg = "method type was not POST "
    if request.method == 'POST':
    #try:
        # print(request.files['file'])
        # image = request.files['file']
        # print(1)
        newMaker = json.loads(request.form['json'])
        name = newMaker['name']
        blurb = newMaker['blurb']
        # print(u'name')
        # print("blurb   : ".format(blurb))
        email = newMaker['email']
        imagePath = newMaker['image']
        # ID = newMaker['ID']
        # projects = newMaker['projects']
        # print("projects: ".format(type(projects)))
        db = get_db()
        db.execute('INSERT INTO makers (name,blurb,image,email) VALUES (?,?,?,?)',
            (name,blurb,imagePath,email))

        db.commit()
        #flash('New entry was successfully posted')
        #cur.execute("INSERT INTO makers (name,blurb,image,email) VALUES (?,?,?,?)",(name,blurb,imagePath,email) )
        ID = query_db("SELECT last_insert_rowid()").pop(0)[0]
        return Response(str(ID))
'''
        with sqlite3.connect(app.config['DATABASE']) as con:
            cur = con.cursor()

            cur.execute("INSERT INTO makers (name,blurb,image,email) VALUES (?,?,?,?)",(name,blurb,imagePath,email) )
            ID = query_db("SELECT last_insert_rowid()")
            print("ID: ".format(ID))
            con.commit()
            msg = "Record successfully added"
    #except:
        print("problemo")
        con.rollback()
        print("problemo2")
        msg = "error in insert operation"
  
    #finally:
        print(1)
        return Response(status=msg)
        print(2)
        con.close()'''

#I'm pretty sure I have no use for this. Just being careful in keeping it around.
    # newMaker = request.form.to_dict()
    
    # print('newMaker type: {}'.format(type(newMaker)))
    # print(newMaker)



@app.route('/api/makers', methods=['GET', 'POST'])
def makers_handler():
    g.db = connect_db()
    cur = g.db.execute('select name, ID, blurb, image, projects, email from makers')

    mList = [dict(name=row[0], ID=row[1], blurb=row[2], image=row[3], projects=row[4], email=row[5]) for row in cur.fetchall() ]
    g.db.close()
    print('makers: {}'.format(type(mList)))

    for item in mList:
        item['projects'] = item['projects'].split(',')
        for proj in item['projects']:
            proj = int(proj)
            print('proj type: {}'.format(type(proj)))
        print(item['projects'])

    with open('src/Makers.json', 'r') as file:
        makers = json.loads(file.read())

    print('request: {}'.format(request))

    if request.method == 'POST':
        #newMaker = request.form.to_dict()
        newMaker = request.args.to_dict()
        print('newMaker: {}'.format(newMaker))
        #newMaker['ID'] = int(time.time() * 1000)
        makers.append(newMaker)

        with open('src/Makers.json', 'w') as file:
            file.write(json.dumps(makers, indent=4, separators=(',', ': ')))

    return Response(json.dumps(mList), mimetype='application/json', headers={'Cache-Control': 'no-cache', 'Access-Control-Allow-Origin': '*'})

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
