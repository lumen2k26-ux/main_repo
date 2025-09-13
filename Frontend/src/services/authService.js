// Mock user database
const mockUsers = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin',
      name: 'Admin User'
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
      password: 'user123',
      role: 'user',
      name: 'John Doe'
    },
    {
      id: 3,
      username: 'user2',
      email: 'user2@example.com',
      password: 'user123',
      role: 'user',
      name: 'Jane Smith'
    }
  ];
  
  // Simulate API delay
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  export const authService = {
    async login(credentials) {
      await delay(1000); // Simulate network delay
      
      const { username, password } = credentials;
      
      const user = mockUsers.find(u => 
        (u.username === username || u.email === username) && u.password === password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      const token = `mock_token_${user.id}_${Date.now()}`;
      
      return {
        token,
        role: user.role,
        userInfo: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username
        }
      };
    },
  
    async register(userData) {
      await delay(1000); // Simulate network delay
      
      const { username, email, password, role } = userData;
      
      const existingUser = mockUsers.find(u => 
        u.username === username || u.email === email
      );
      
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      const newUser = {
        id: mockUsers.length + 1,
        username,
        email,
        password,
        role: role || 'user',
        name: username
      };
      
      mockUsers.push(newUser);
      
      const token = `mock_token_${newUser.id}_${Date.now()}`;
      
      return {
        token,
        role: newUser.role,
        userInfo: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username
        }
      };
    },
  
    async logout() {
      await delay(500); // Simulate network delay
      return { success: true };
    },
  
    async verifyToken(token) {
      await delay(500);
      
      if (!token || !token.startsWith('mock_token_')) {
        throw new Error('Invalid token');
      }
      
      const userId = parseInt(token.split('_')[2]);
      const user = mockUsers.find(u => u.id === userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return {
        role: user.role,
        userInfo: {
          id: user.id,
          name: user.name,
          email: user.email,
          username: user.username
        }
      };
    }
  };
  
  