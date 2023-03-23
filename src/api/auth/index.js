import { createResourceId } from 'src/utils/create-resource-id';
import { decode, JWT_EXPIRES_IN, JWT_SECRET, sign } from 'src/utils/jwt';
import { wait } from 'src/utils/wait';
import { users } from './data';
// import { useNavigate } from "react-router-dom";

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async signIn(request) {
    const { email, password } = request;

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": email,
  "password": password
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

var response = await fetch("http://127.0.0.1:8000/api/auth/signin/", requestOptions)
              .then(response => response.text())
              .then(result => {
                return result;
              })
              .catch(error => {
                console.log('error', error);
                return error;
            });
              await wait(500);
              var res = JSON.parse(response);
              console.log(res, 'res');
              if (res.status == 'OK') {
                return new Promise((resolve, reject) => {
                  try {
                    // Merge static users (data file) with persisted users (browser storage)
                    var login_user = [
                      {
                      id: res.data.id,
                      avatar: '/assets/avatars/avatar-anika-visser.png',
                      name: res.data.first_name,
                      plan: 'Premium'
                    }]

                    persistUser(login_user);

                    const mergedUsers = [
                      ...users,
                      ...getPersistedUsers()
                    ];
            
                    // Create the access token
                    // var access_token = res.data.token.access;
                    const accessToken = sign({ userId: login_user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            
                    resolve({ accessToken });
                  } catch (err) {
                    console.error('[Auth Api]: ', err);
                    reject(new Error('Internal server error'));
                  }
                });
              }
  }

  async signUp(request) {
    const { email, name, password, confirm_password, fname } = request;
    console.log("signup")
    console.log(email, password, confirm_password)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email,
      "password": password,
      "first_name": fname,
      "last_name": "B2",
      "is_staff": true,
      "is_active": true,
      "is_superuser": true,
      "is_super_admin": true
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://127.0.0.1:8000/api/auth/signup/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    await wait(1000);
    console.log("api finish")
    return new Promise((resolve, reject) => {
      try {
        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];

        // Check if a user already exists
        let user = mergedUsers.find((user) => user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: undefined,
          email,
          name,
          password,
          confirm_password,
          plan: 'Standard'
        };

        persistUser(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve({ accessToken });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(request) {
    const { accessToken } = request;

    return new Promise((resolve, reject) => {
      try {
        // Decode access token
        const decodedToken = decode(accessToken);

        // Merge static users (data file) with persisted users (browser storage)
        const mergedUsers = [
          ...users,
          ...getPersistedUsers()
        ];

        // Find the user
        const { userId } = decodedToken;
        const user = mergedUsers.find((user) => user.id === userId);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          avatar: user.avatar,
          email: user.email,
          name: user.name,
          plan: user.plan
        });
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();