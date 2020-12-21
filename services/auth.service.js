export default function useAuth() {
    const loggedIn = localStorage.getItem('auth-user') != null;
  
    const login = ({user, password}) => {  if(user == process.env.USER && process.env.PWD == password) {
        localStorage.setItem('auth-user', user);
    } };

    return {
      loggedIn,
      login
    };
}