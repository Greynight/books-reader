import axios from 'axios';

const config = {
  withCredentials: true
};

// TODO move this to separate class and extend it
axios.interceptors.response.use((response) => {
  // TODO
  return response;
}, (error) => {
  const status = error.response.status;

  switch (status) {
    case 401:
      return {
        isUnAuthenticated: true
      };
  }
});

class User {
  static async signIn(data) {
    const res = await axios.post(process.env.REACT_APP_SIGN_IN_URL, data, config);
    return res.isUnAuthenticated;
  }

  static async signUp(data) {
    const res = await axios.post(process.env.REACT_APP_SIGN_UP_URL, data);
    return res.isUnAuthenticated;
  }

  static async getCurrentUser() {
    const res = await axios.get(process.env.REACT_APP_GET_CURRENT_USER, config);
    return !!res.isUnAuthenticated;
  }
}

export default User;
