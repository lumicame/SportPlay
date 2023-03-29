import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert, FlatList, Modal,RefreshControl } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import styles from './styles'
import LoadingModal from '../../components/LoadModal'
import { UserContext } from '../../contexts/UserManager'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors.json'
import Picker from '../../components/Picker'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createTeam } from '../../api/team'
import { getTeams } from '../../api/team'
import { updateTeam } from '../../api/team'
import { removeTeam } from '../../api/team'
import { categories } from '../../api/team'
import { TEAM_IMAGE } from '../../config'
import SegmentedControlTab from "react-native-segmented-control-tab";
import * as ImagePicker from 'expo-image-picker';

const saveTeam = async (team, setLoading, setTeam,setModalShow,setRefresh) => {
  setLoading(true)
  for (const e of Object.values(team)) {
    if (e.trim() === '' ) {
      Alert.alert('',
        'Faltan campos por llenar o falta seleccionar una imagen.',
        [
          { text: 'Entendido' }
        ])
      setLoading(false)
      return
    }
  }
  const res = await createTeam(team)
  if (res.status) {
    setLoading(false)
    setRefresh(true)
    setTeam({category:'',name:'',image:''})
    setModalShow(false)
    //setTimeout(() => navigation.navigate('Home'), 1000);
    return console.log(res.data)
  } else {
    if (res.error?.response?.data?.message) {
      Alert.alert('',
        res.error?.response?.data?.message,
        [
          { text: 'Volver' }
        ])
    } else {
      Alert.alert('',
        'Ocurrio un error',
        [
          { text: 'Volver' }
        ])
    }
  }
  setLoading(false)
}
const editTeam = async (team, setLoading, setTeam,setModalShow,setRefresh) => {
  setLoading(true)
  for (const e of Object.values(team)) {
    if (e.trim() === '' ) {
      Alert.alert('',
        'Faltan campos por llenar o falta seleccionar una imagen.',
        [
          { text: 'Entendido' }
        ])
      setLoading(false)
      return
    }
  }
  const res = await updateTeam(team)
  if (res.status) {
    setLoading(false)
    setRefresh(true)
    setTeam({category:'',name:'',image:''})
    setModalShow(false)
    //setTimeout(() => navigation.navigate('Home'), 1000);
    return console.log(res.data)
  } else {
    if (res.error?.response?.data?.message) {
      Alert.alert('',
        res.error?.response?.data?.message,
        [
          { text: 'Volver' }
        ])
    } else {
      Alert.alert('',
        'Ocurrio un error',
        [
          { text: 'Volver' }
        ])
    }
  }
  setLoading(false)
}
const deleteTeam = async (team, setLoading, setTeam,setModalShow,setRefresh) => {
  setLoading(true)
  const res = await removeTeam(team)
  if (res.status) {
    setLoading(false)
    setRefresh(true)
    setTeam({category:'',name:'',image:''})
    setModalShow(false)
    //setTimeout(() => navigation.navigate('Home'), 1000);
    return console.log(res.data)
  } else {
    if (res.error?.response?.data?.message) {
      Alert.alert('',
        res.error?.response?.data?.message,
        [
          { text: 'Volver' }
        ])
    } else {
      Alert.alert('',
        'Ocurrio un error',
        [
          { text: 'Volver' }
        ])
    }
  }
  setLoading(false)
}

export default function Team({ navigation }) {
  const [secureText, setSecureText] = useState(true)
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(true)
  const [team, setTeam] = useState({category:'',name:'',image:''})
  const [listTeam, setListTeam] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [arrayCategory, setArrayCategory] = useState([])

  useEffect(async () => {
    const res = await categories()
    const array=[]
    if (res.status) {
      res.data.forEach(element => {
        array.push({label: element.name, value:String(element.id)})
      });
      setArrayCategory(array)
    }
  }, [])
  useEffect(async () => {
    if(refresh){ 
      const res = await getTeams()
    if (res.status) {
      const array=[]
      array.push({id: 0, name: "", category: "", num: ''})
      array.push(...res.data)
      setListTeam(array)
      setRefresh(false)
    }
    }
  }, [refresh])
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setTeam({ ...team, image: result.uri })
    } else {
      setTeam({ ...team, image: '' })
    } 
  };
  const onChangeHandler = (input, value) => {
    setTeam({ ...team, [input]: value })
  }
  const { user, setUser } = useContext(UserContext)

  const _renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} style={{ width: "47.5%", backgroundColor: '#252837', borderRadius: 25, padding: 10, marginHorizontal: 5, marginVertical: 5 }}
      onPress={() => {
        if (item.id == 0)
          setModalShow(true)
        else {
          setTeam({id:String(item.id),category:String(item.category.id),name:item.name,image:`${TEAM_IMAGE}${item.image}`})
          setModalShow(true)
        }


      }}>
      {item.id == 0 ?
        <View style={{ height: 130, justifyContent: 'center' }}>
          <View style={{ width: 50, height: 50, backgroundColor: colors.greenBg, borderRadius: 25, justifyContent: 'center', alignSelf: 'center' }}>
            <Icon name='plus' color={colors.white} size={32} style={{ alignSelf: 'center' }} />
          </View>
          <Text style={{ fontFamily: 'RubikBold', color: colors.white, alignSelf: 'center', marginVertical: 10 }}>
            Crear Equipo</Text>
        </View >

        :

        <View style={{ height: 130, justifyContent: 'center' }}>
          <Image source={{uri:`${TEAM_IMAGE}${item.image}`}} style={{ width: 50, height: 50, borderRadius: 25, alignSelf: 'center' }} />
          <Text style={{ fontFamily: 'RubikMedium', fontSize: 18, color: colors.white, alignSelf: 'center', marginVertical: 3 }}>{item.name} ({item.category.slug})</Text>
          <Text style={{ fontFamily: 'RubikRegular', fontSize: 14, color: colors.white, alignSelf: 'center', marginVertical: 3 }}>Jugadores (0)</Text>
          <View style={{flexDirection:'row'}}>
                <Text style={{fontFamily:'RubikMedium',color:colors.midGreen,paddingHorizontal:10,flex:1,textAlign:'center'}}>G{'\n'}0</Text>
                <Text style={{fontFamily:'RubikMedium',color:colors.orange3,paddingHorizontal:10,flex:1,textAlign:'center'}}>E{'\n'}0</Text>
                <Text style={{fontFamily:'RubikMedium',color:colors.orange,paddingHorizontal:10,flex:1,textAlign:'center'}}>P{'\n'}0</Text>

              </View>
        </View >

      }

    </TouchableOpacity>
  );
  return (
    <>
      <View style={{ backgroundColor: colors.darkBg, flex: 1 }}>
        <LoadingModal loading={loading} />
        <SegmentedControlTab
          values={["Mis Equipos", "Otros Equipos"]}
          selectedIndex={index}
          onTabPress={setIndex}
          tabsContainerStyle={{height:35,marginHorizontal:10,marginVertical:10}}
          tabTextStyle={{color:colors.white,fontFamily:'RubikMedium',fontSize:20}}
          tabStyle={{marginHorizontal:5,borderRadius:5,padding:0,backgroundColor:"#00000000",borderColor:"#ffffff00"}}
          activeTabStyle={{backgroundColor:colors.midGreen2,borderColor:'#212340',padding:0,borderRadius:5}}
          tabBadgeContainerStyle={{backgroundColor:colors.orange,justifyContent:'center'}}
          tabBadgeStyle={{color:colors.white,textAlign:'center'}}
          activeTabBadgeContainerStyle={{backgroundColor:colors.orange,justifyContent:'center'}}
          activeTabBadgeStyle={{color:colors.white,textAlign:'center'}}
          badges={[0,0]}
        />
        {index==0?
        <FlatList
        ListHeaderComponent={<>
          <View style={{ height: 30, }} />
        </>}
        refreshControl={ 
        <RefreshControl
          tintColor={colors.greenBg}
          title="Loading..."
          titleColor={colors.greenBg}
          colors={[colors.white]}
          progressBackgroundColor={colors.greenBg}
           refreshing={refresh}
           onRefresh={() => setRefresh(true)} />}
        data={listTeam}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ ...styles.container }}
      />
        :
        <View></View>
        }
        
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalShow}
        onRequestClose={() => {
          setTeam({category:'',name:'',image:''})
          setModalShow(false)
        }}>
        <LoadingModal loading={loading} />
        <View style={styles.modal}>
          <TouchableOpacity style={styles.overlay} onPress={() => {
            setTeam({category:'',name:'',image:''})
            setModalShow(false)
          }} />
          <View style={{
            width: '100%',
            borderRadius: 25,
            zIndex: 2,
            position: 'relative', backgroundColor: colors.darkBg
          }}>
            <ScrollView style={styles.formContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{team.id ? "Editar Equipo" : "Agregar Equipo"}</Text>
              </View>
              <View style={{ ...styles.form }}>
                <View style={{ justifyContent: 'center', width: 100, height: 100, alignSelf: 'center' }}>
                  <TouchableOpacity style={{ zIndex: 2, bottom: 2, right: 2, position: 'absolute', width: 36, height: 36, justifyContent: 'center', backgroundColor: colors.greenBg, borderRadius: 18 }} onPress={pickImage}>
                    <Icon name='image' size={20} color={colors.white} style={{ alignSelf: 'center' }} />
                  </TouchableOpacity>
                  {team.image ? <Image source={{ uri: team.image }} style={{ width: 100, height: 100, borderRadius: 50 }} /> :
                    <View style={{ width: 100, height: 100, borderRadius: 50, justifyContent: 'center', backgroundColor: colors.gray }}>
                      <Icon name='image' color={colors.white} size={50} style={{ alignSelf: 'center' }} />
                    </View>}
                </View>


                <Text style={styles.labelInput}>Nombre del equipo</Text>
                <TextInput
                  value={team.name}
                  onChangeText={(v) => onChangeHandler('name', v)}
                  style={styles.textInput}
                  placeholder="Nombre del equipo"
                  placeholderTextColor='#ffffff50' />

                <Text style={styles.labelInput}>Selecciona la categoria</Text>
                <Picker
                  values={arrayCategory}
                  placeholder='Selecciona la categoria'
                  style={[styles.textDate]}
                  onChangeValue={(v) => onChangeHandler('category', v)}
                />
              </View>
              <View style={{ height: 50 }} />
            </ScrollView>
            <View style={[styles.bottonMenu, styles[`bottomMenuLight`]]}>
              {team.id ?
                <TouchableOpacity style={[styles.bottonMenuOption, { flex: 1, marginLeft: 20 }]} onPress={() => {
                  Alert.alert(
                    "Eliminar este equipo",
                    "¿Seguro deseas eliminar este equipo?",
                    [
                      {
                        text: "Cancelar",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "ELIMINAR", onPress: () => {
                        console.log(team) 
                        deleteTeam(team,setLoading,setTeam,setModalShow,setRefresh)
                       } }
                    ]
                  )
                }}>
                  <Icon name="trash-alt" size={20} color="#ffffff" />
                </TouchableOpacity> : <></>
              }

              <TouchableOpacity style={styles.bottonMenuOption} onPress={() => {
                setModalShow(false)
              }}>
                <Text style={styles.bottonMenuCancelText}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bottonMenuOption} onPress={() => {
                if(team.id){
                  console.log('EDITAR '+team) 
                  editTeam(team,setLoading,setTeam,setModalShow,setRefresh) 
                }
                else{
                  console.log('CREAR')
                  console.log(team)
                  saveTeam(team,setLoading,setTeam,setModalShow,setRefresh) //createAreaRequest(setLoading, area, setArea, setIsOpen, updateAreas)
                }
                  }}>
                <Text style={styles.bottonMenuOkText}>
                  {team.id ?
                    "EDITAR"
                    :
                    "GUARDAR"
                  }

                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>

  )
}