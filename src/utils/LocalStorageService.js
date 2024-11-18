class LocalStorageService {
    static setUser(user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true'); // Adicionando o estado de login
    }
  
    static getUser() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  
    static clearUser() {
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn'); // Removendo o estado de login
    }
  
    static isLoggedIn() {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
  }
  
  export default LocalStorageService;