// import { query } from '@/lib/db';

// // GET all items
// export async function GET() {
//   try {
//     const users = await query('SELECT * FROM users ORDER BY id DESC');
//     // console.log('FULL users result object:', users);
//     // console.log('users.rows (actual data):', users.rows);
    
//     const roles = await query('SELECT DISTINCT role FROM users');
//     // console.log('FULL roles result object:', roles);
//     // console.log('roles.rows (actual data):', roles.rows);
    
//     return Response.json({ users: users.rows, availableRoles: roles.rows });
//   } catch (error) {
//     console.error('Database error:', error);
//     return Response.json({ error: 'Failed to fetch users', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
//   }
// }

// // POST new user
// export async function POST(request: Request) {
//   try {
//     const { name, email, password, role } = await request.json();
    
//     const result = await query(
//       'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
//       [name, email, password, role]
//     );
    
//     // console.log('FULL insert result object:', result);
//     // console.log('result.rows (actual data):', result.rows);
//     // console.log('result.rows[0] (new user):', result.rows[0]);
    
//     return Response.json(result.rows[0], { status: 201 });
//   } catch (error) {
//     console.error('Insert error:', error);
//     return Response.json({ error: 'Failed to create user' }, { status: 500 });
//   }
// }