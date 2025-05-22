import { useDB } from './db.js'
import {hashPassword} from './../utils/hashs.js'

export async function initDB() {
  const db = await useDB()

  // Create posts table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL
    );
  `)

  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL -- store hashed passwords ideally
    );
  `)

  // insert a test user if none exists
  // admin username is the only admin of the blog
  const existing = await db.get(`SELECT COUNT(*) as count FROM users`)
  if (existing.count === 0) {
    await db.run(`
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `, ['admin', hashPassword('admin')])// need to change this pass 
  
  }
// Seed posts if in dev mode
if (process.env.NODE_ENV === 'development') {
    const postCount = await db.get(`SELECT COUNT(*) as count FROM posts`)
    if (postCount.count === 0) {
      const posts = [
        [
          'SQL Injection: Breaking Login Forms and Dumping Databases (Ethically)',
          `SQL Injection (SQLi) remains one of the most notorious and impactful web application vulnerabilities. Despite being a well-documented threat, SQLi continues to appear in real-world breaches due to insecure coding practices and a lack of proper input validation.
      
      SQLi allows attackers to manipulate the queries an application sends to its database. A simple payload like ' OR '1'='1 can bypass logins and expose sensitive user data. In this post, we walk through classic examples, use DVWA to test them, and offer prevention tips including the use of prepared statements, input validation, and least-privilege principles.`
        ],
        [
          'Cross-Site Scripting (XSS): The Art of Sneaky Scripts',
          `XSS occurs when attackers inject malicious scripts into content delivered to users. There are three types: Reflected, Stored, and DOM-based. Attackers often use XSS to steal cookies, deface pages, or redirect users.
      
      A simple payload like <script>alert('Hacked')</script> can lead to severe consequences if the application doesn't sanitize output. Prevent XSS with output encoding, using frameworks that auto-sanitize, and enforcing Content Security Policies (CSPs).`
        ],
        [
          'Broken Authentication: When Sessions Are not Safe',
          `Authentication vulnerabilities let attackers compromise accounts or impersonate users. Common issues include predictable session IDs, missing logout mechanisms, and weak password policies.
      
      We explore how attackers hijack sessions, brute-force login pages, or exploit session fixation. Developers should rotate session tokens after login, enforce strong password rules, and use HTTPS and secure cookies to mitigate these risks.`
        ],
        [
          'Insecure Deserialization: When Data Becomes Dangerous',
          `Deserialization bugs allow attackers to inject malicious objects into applications. If a server blindly unserializes data from user input, it can lead to remote code execution.
      
      We demonstrate how insecure unserialize() usage in PHP can open backdoors. Best practices include switching to JSON, validating data types, and avoiding unserialization of untrusted input.`
        ],
        [
          'Build Your Own Vulnerable Web App for Ethical Hacking Practice',
          `Creating your own vulnerable lab is a safe way to learn web hacking. We guide you through building a PHP/MySQL web app with intentional flaws like SQLi, XSS, and insecure file uploads.
      
      Always run your test environments in isolated VMs or Docker containers and never expose them to the public internet. Practicing on your own lab sharpens both offensive and defensive skills.`
        ]
      ]
      for (const [title, content] of posts) {
        await db.run(
          `INSERT INTO posts (title, content) VALUES (?, ?)`,
          [title, content]
        )
      }
      console.log('🧪 Inserted 4 test posts.')
    }
}
  await db.close()
  console.log('✅ Database schema initialized.')
}
