import axios from 'axios';
import { API } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH = `${API}auth`;
   
  /**
   * Function that query the API to login.
   * @param {Object} credentials Credentials of the user
   * @param {Object} credentials.email Email of the user
   * @param {Object} credentials.password Password of the user
   * @returns {Object}
   */
  export const logIn = async (credentials) => {
    try {
      const options = {
        method: 'POST',
        url: `${AUTH}/login`,
        data: credentials
      }
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      return { status: false, error }
    }
  }
  

export const registerUser = async (userData) => {
  try {
    var data_ = new FormData();
    data_.append('name',userData.name);
    data_.append('email',userData.email);
    data_.append('password',userData.password);
    data_.append('gender',userData.gender);
    data_.append('city',userData.city);
    data_.append('age',userData.age.toISOString().substring(0, 10));
    if(userData.image.includes("file:///")){
       data_.append('file',
      {
         uri:userData.image,
         name:'file',
         type:'image/jpg'
      }); 
      }else
      data_.append('file','')
      
    const options = {
      method: 'POST',
      url: `${AUTH}/registerUser`,
      headers: {'Content-Type': 'multipart/form-data;'},
      data:data_
    }
    console.log(options)

    const res = await axios.request(options)
    console.log(res.data)
    return { status: true, data: res.data }
  } catch (error) {
    console.log("/////////////////////////////////")
    console.log(error.response)
    return { status: false, error }
  }
}

  /**
 * Function that query the API to login.
 * @returns {Object}
 */
export const logInJWT = async () => {
    try {
      const jwt = await AsyncStorage.getItem('@jwt')
      const options = {
        method: 'GET',
        url: `${AUTH}/me`,
        headers: {"Authorization" : `Bearer ${jwt}`}
      }
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      return { status: false, error }
    }
  }

  export const loadCities = async () => {
    try {
      const options = {
        method: 'GET',
        url: `${AUTH}/cities`,
      }
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      return { status: false, error }
    }
  }