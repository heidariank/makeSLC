import sqlite3 as sqlite3
import sys

makerList = (
	(	"Bob", 
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		"/images/Frink.jpg", 
		"123", 
		"theRock@awesome.com"),
	("Bobert", "Some text", "/images/samer.jpg", "123,1234", "theRock@awesome.com")
)

conn = sqlite3.connect('makeSLC.db')

with conn:
	cur = conn.cursor()

	cur.execute("DROP TABLE IF EXISTS makers")
	cur.execute("CREATE TABLE makers(ID INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, blurb TEXT, image TEXT, projects TEXT, email TEXT)")
	cur.execute("INSERT INTO makers (name, blurb, image, projects, email) VALUES('Bob', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '/images/Frink.jpg', '123', 'theRock@awesome.com')")