from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import psycopg2
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

origins=[
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv("DATABASE_URL")
print(DATABASE_URL)

def get_db():
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()
    try:
        yield cursor
    finally:
        conn.commit()
        cursor.close()
        conn.close()


def create_table(cursor):
    cursor.execute(''' CREATE TABLE IF NOT EXISTS users 
                   (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL);''')
    
with psycopg2.connect(DATABASE_URL) as conn:
    with conn.cursor() as cursor:
        create_table(cursor)

class User(BaseModel):
    name: str
    email: str

@app.post("/users/")
def create_user(user: User, cursor: psycopg2.extensions.cursor = Depends(get_db)):
    cursor.execute("INSERT INTO users (name, email) Values ( %s, %s) RETURNING id",
                   (user.name, user.email))
    user_id = cursor.fetchone()[0]
    conn.commit()
    return {"id": user_id, "message": "User created successfully!"}

@app.get("/users/{user_id}")
def get_user(user_id: int, cursor: psycopg2.extensions.cursor = Depends(get_db)): 
    cursor.execute("SELECT * FROM users WHERE id= %s", (user_id,))
    user = cursor.fetchone()
    if user: 
        return {"id": user[0], "name": user[1], "email": user[2]}
    else:
        raise HTTPException(status_code=404, detail="The User you are searching for could not be found")
    
@app.put("/users/{user_id}")
def update_user(user_id: int, user: User, cursor: psycopg2.extensions.cursor = Depends(get_db)):
    cursor.execute("SELECT name, email FROM users WHERE id=%s", (user_id,))
    current_user = cursor.fetchone()

    if not current_user:
        raise HTTPException(status_code=404, detail="User cannot be found")
    
    new_name = user.name if user.name else current_user[0]
    new_email = user.email if user.email else current_user[1]

    cursor.execute("UPDATE users SET name = %s, email = %s WHERE id = %s", 
                   (new_name, new_email, user_id))
    conn.commit()
    return {"message": "User updated successfully"}

@app.delete("/users/{user_id}")
def delete_user(user_id: int, cursor: psycopg2.extensions.cursor = Depends(get_db)):
    cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
    conn.commit()
    return{"message":"User deleted successfully"}