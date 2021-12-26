import { AsyncStorage } from 'react-native';
import { API_URL, API_URL1 } from '../../utils/Config';
import { timeoutPromise } from '../../utils/Tools';

export const AUTH_LOADING = 'AUTH_LOADING';
export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const EDIT_INFO = 'EDIT_INFO ';
export const UPLOAD_PROFILEPIC = 'UPLOAD_PROFILEPIC';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_ERROR = 'RESET_ERROR';

import AskingExpoToken from '../../components/Notification/AskingNotiPermission';
import { NOTIFICATIONS } from 'expo-permissions';

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    }),
  );
};

export const SignUp = (fullname, email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`https://pbl6.herokuapp.com/v1/auth/register`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            fullname
          }),
        }),
      );
      // if (!response.ok) {
      //   const errorResData = await response.json();
      //   dispatch({
      //     type: AUTH_FAILURE,
      //   });
      //   throw new Error(errorResData.err);
      // }
      dispatch({
        type: SIGN_UP,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Login
export const Login = (email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    const pushToken = await AskingExpoToken();
    try {
      const response = await timeoutPromise(
        fetch(`https://pbl6.herokuapp.com/v1/auth/login`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            // pushTokens: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIyNTkzMzgwZTY2MjAwMDkxNDhhMGEiLCJpYXQiOjE2MzkwNzgzMTd9.ooYNeUJNItvQ5W7xuwLN1NH4YbxQQW0K7XJAuBq6kr4',
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      const resData = await response.json();
      saveDataToStorage('user', resData);
      dispatch(setLogoutTimer(60 * 60 * 1000));
      dispatch({
        type: LOGIN,
        user: resData,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const EditInfo = (fullName, phoneNumber, address) => {
  return async (dispatch, getState) => {
    const user = getState().auth.user;
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`https://pbl6.herokuapp.com/v1/user/update-information`, {
        // fetch(`${API_URL}/user/${user.userid}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': user.token,
          },
          method: 'PUT',
          body: JSON.stringify({
            fullName,  
            phoneNumber,
            address,
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        Error(errorResData.err);
      }

      dispatch({
        type: EDIT_INFO,
        fullName,
        phoneNumber,
        address,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const UploadProfilePic = (imageUri, filename, type) => {
  return async (dispatch, getState) => {
    dispatch({
      type: AUTH_LOADING,
    });
    const user = getState().auth.user;
    let formData = new FormData();
    // Infer the type of the image
    formData.append('profilePic', {
      uri: imageUri,
      name: filename,
      type,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/photo/${user.userid}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'auth-token': user.token,
          },
          method: 'PATCH',
          body: formData,
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }

      dispatch({
        type: UPLOAD_PROFILEPIC,
        profilePic: imageUri,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const ForgetPassword = (email) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`https://pbl6.herokuapp.com/v1/auth/reset-password`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: FORGET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const ResetPassword = (password, url) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(
          `${API_URL}/user/receive_new_password/${url.userid}/${url.token}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              password,
            }),
          },
        ),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: RESET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Logout
export const Logout = () => {
  return (dispatch) => {
    clearLogoutTimer(); //clear setTimeout when logout
    AsyncStorage.removeItem('user');
    dispatch({
      type: LOGOUT,
      user: {},
    });
  };
};

//Auto log out
let timer;
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(async () => {
      await dispatch(Logout());
      alert('Logout section expired');
    }, expirationTime);
  };
};

// export const getUser = () => {
//     // if(token == null) return null;
//     return fetch('https://cbcf880m45.execute-api.eu-central-1.amazonaws.com/production/v1/user/me', {
//         method: 'GET',
//         // headers: {"Authorization": "Bearer " + token}
//     }).then((response) => {
//       console.log(response.json());
//         return response.json();
//     }).catch((err) => {
//         console.log(err);
//     })
// }
