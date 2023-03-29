import axios from 'axios';
import { API } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage';

const TEAM = `${API}auth/team`;

  /**
 * Function that query the API to login.
 * @returns {Object}
 */
export const createTeam = async (team) => {
    try {
      const jwt = await AsyncStorage.getItem('@jwt')
      var data_ = new FormData();
      data_.append('category_id',team.category);
      data_.append('name',team.name);
      data_.append('file',
      {
         uri:team.image,
         name:'file',
         type:'image/jpg'
      });
      const options = {
        method: 'POST',
        url: `${TEAM}/create`,
        headers: {"Authorization" : `Bearer ${jwt}`, 'Content-Type': 'multipart/form-data;',},
        data:data_
      }
      
      console.log(options)
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      console.log("/////////////////////////////////")
      console.log(error.response)
      return { status: false, error }
    }
  }
  export const updateTeam = async (team) => {
    try {
      const jwt = await AsyncStorage.getItem('@jwt')
      var data_ = new FormData();
      data_.append('category_id',team.category);
      data_.append('name',team.name);
      if(team.image.includes("file:///")){
       data_.append('file',
      {
         uri:team.image,
         name:'file',
         type:'image/jpg'
      }); 
      }else
      data_.append('file','')
      
      const options = {
        method: 'POST', 
        url: `${TEAM}/update/${team.id}`,
        headers: {"Authorization" : `Bearer ${jwt}`,'Content-Type': 'multipart/form-data;',},
        data:data_
      }
      //return console.log(options)
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      console.log(error.response)
      return { status: false, error }
    }
  }
  export const removeTeam = async (team) => {
    try {
      const jwt = await AsyncStorage.getItem('@jwt')
      const options = {
        method: 'POST', 
        url: `${TEAM}/delete/${team.id}`,
        headers: {"Authorization" : `Bearer ${jwt}`}
      }
      //return console.log(options)
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      console.log(error.response)
      return { status: false, error }
    }
  }
export const categories = async () => {
    try { 
      const jwt = await AsyncStorage.getItem('@jwt')
      const options = {
        method: 'GET', 
        url: `${TEAM}/categories`,
        headers: {"Authorization" : `Bearer ${jwt}`}
      }
      //return console.log(options)
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      console.log(error)
      return { status: false, error }
    }
  }
  export const getTeams = async () => {
    try {
      const jwt = await AsyncStorage.getItem('@jwt')
      const options = {
        method: 'GET', 
        url: `${TEAM}/get`,
        headers: {"Authorization" : `Bearer ${jwt}`}
      }
      //return console.log(options)
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      console.log(error.response)
      return { status: false, error }
    }
  }
  export const getTeamsSearch = async (search,category) => {
    try {
      const jwt = await AsyncStorage.getItem('@jwt')
      const options = {
        method: 'POST', 
        url: `${TEAM}/search`,
        headers: {"Authorization" : `Bearer ${jwt}`},
        data:{
          "search":search,
          "category":category}
      }
      //return console.log(options)
      const res = await axios.request(options)
      return { status: true, data: res.data }
    } catch (error) {
      console.log(error.response)
      return { status: false, error }
    }
  }
  