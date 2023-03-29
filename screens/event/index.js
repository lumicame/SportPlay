import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert, Button, Modal, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import styles from './styles'
import 'moment/locale/es'
import moment from 'moment'
import LoadingModal from '../../components/LoadModal'
import { UserContext } from '../../contexts/UserManager'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../assets/colors.json'
import Picker from '../../components/Picker'
import PickerTeam from '../../components/PickerTeam'
import ListPlayers from '../../components/ListPlayers'

import { TEAM_IMAGE } from '../../config'
import SegmentedControlTab from "react-native-segmented-control-tab";
import DateTimePicker from '@react-native-community/datetimepicker';
import { getTeams } from '../../api/team'
import { getTeamsSearch } from '../../api/team'


const searchTeams = async (inputSearch, category, setLoading, setListTeamSearch) => {
    setLoading(true)
    if (inputSearch.trim() == "") {
        Alert.alert('',
            "Escribe algo para buscar", [{ text: 'Volver' }])
        setLoading(false)
        return
    }
    console.log(`search:${inputSearch} - category:${category}`)
    const res = await getTeamsSearch(inputSearch, category)
    if (res.status) {
        setListTeamSearch(res.data)
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

export default function Event({ navigation }) {
    const [eventData, setEventData] = useState({ stadium: '', date: new Date(), min: '', type: '', team: { label: '', value: '', category: '' }, team_v: { label: 'Buscar Equipo...', value: '', category: '' }, optional: '' })
    //const [date, setDate] = useState(new Date())
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [listTeam, setListTeam] = useState([])
    const [listTeamSearch, setListTeamSearch] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [showPLayers, setShowPlayers] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState({})
    const [inputSearch, setInputSearch] = useState('');
    const [btnEnable, setBtnEnable] = useState(false)


    const onChangeHandler = (input, value) => {
        if (input === "type" && value === "vs") {
            setEventData({ ...eventData, [input]: value, team: { label: '', value: '', category: '' }, team_v: { label: 'Buscar Equipo...', value: '', category: '' } })
        }
        else
            setEventData({ ...eventData, [input]: value })
    }
    const onChangeHandlerTeam = (input, value) => {
        setEventData({ ...eventData, [input]: { label: value.label, value: value.value, category: value.category } })
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        if (currentDate)
            setEventData({ ...eventData, ["date"]: currentDate })
    };
    useEffect(() => {
        var s = true
        console.log(eventData)
        switch (eventData.type) {
            case 'vs':

                if (eventData.min.trim() == "" || eventData.stadium.trim() == "")
                    s = false
                break
            case 'equipo':
                if (eventData.min.trim() === "" || eventData.stadium.trim() === "" || eventData.team.category.trim() === "")
                    s = false
                break
            default:
                if (eventData.min.trim() === "" || eventData.stadium.trim() === "" || eventData.team.category.trim() === "" || eventData.team_v.category.trim() === "")
                    s = false
                break
        }
        setBtnEnable(s)
    }, [eventData])
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(async () => {
        const res = await getTeams()
        if (res.status) {
            const array = []
            res.data.forEach(element => {
                array.push({ label: `${element.name} (${element.category.slug})`, value: String(element.id), image: element.image, category: String(element.category.id) })
            });
            console.log(res.data)
            setListTeam(array)
        }
    }, [])


    const _renderItem = ({ item }) => (
        <TouchableOpacity key={item.id} onPress={() => console.log(`Seleccion ${item.id}}`)} style={{ width: "48.5%", marginHorizontal: 3, marginVertical: 3, borderRadius: 20, paddingVertical: 11, paddingHorizontal: 2, elevation: 4, backgroundColor: "#252837", justifyContent: 'center' }}>
            <Image source={{ uri: `${TEAM_IMAGE}${item.image}` }} style={{ marginRight: 10, borderRadius: 25, width: 50, height: 50, alignSelf: 'center' }} />
            <Text style={[{ color: colors.white, textAlign: 'center', marginLeft: 5, fontFamily: 'RubikMedium', fontSize: 17 }]}>{`${item.name} (${item.category.slug})`}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={{ fontFamily: 'RubikMedium', color: colors.midGreen, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>G{'\n'}0</Text>
                <Text style={{ fontFamily: 'RubikMedium', color: colors.orange3, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>E{'\n'}0</Text>
                <Text style={{ fontFamily: 'RubikMedium', color: colors.orange, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>P{'\n'}0</Text>

            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ backgroundColor: colors.darkBg, flex: 1 }}>
            <LoadingModal loading={loading} />
            <ScrollView >
                <View style={styles.container}>
                    <Text style={styles.labelInput}>¿Cual es la cancha?</Text>
                    <TextInput
                        value={eventData.stadium}
                        onChangeText={(v) => onChangeHandler('stadium', v)}
                        style={styles.textInput}
                        placeholder="¿Donde se jugara?"
                        placeholderTextColor='#ffffff50' />
                    <Text style={styles.labelInput}>¿Cuando se jugara?</Text>
                    <TouchableOpacity onPress={showDatepicker} style={{ ...styles.textDate }}>
                        <Text style={{ fontFamily: 'RubikMedium', fontSize: 18, color: "#FFFFFF" }}>
                            {moment(eventData.date).format('dddd[.] DD MMMM  [ - ] YYYY')}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.labelInput}>¿Hora del juego?</Text>
                    <TouchableOpacity onPress={showTimepicker} style={{ ...styles.textDate }}>
                        <Text style={{ fontFamily: 'RubikMedium', fontSize: 18, color: "#FFFFFF", }}>
                            {moment(eventData.date).format('h:mm A')}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.labelInput}>Selecciona modalidad</Text>
                    <Picker
                        values={[{ label: "Aleatorio", value: "vs" }, { label: "VS Equipo Aleatorio", value: "equipo" }, { label: "VS Invitado", value: "invitado" }]}
                        placeholder='Selecciona un tipo'
                        style={[styles.textDate]}
                        onChangeValue={(v) => onChangeHandler('type', v)}
                    />
                    {eventData.type == "vs" ?
                        <>
                            <Text style={styles.labelInput}>Numero de jugadores</Text>
                            <TextInput
                                value={eventData.min}
                                onChangeText={(v) => onChangeHandler('min', v)}
                                style={styles.textInput}
                                placeholder="Cantidad de jugadores"
                                placeholderTextColor='#ffffff50'
                                keyboardType='numeric'
                                maxLength={2} />
                        </>
                        : eventData.type == 'equipo' || eventData.type == 'invitado' ?
                            <>
                                <Text style={styles.labelInput}>Selecciona tu equipo</Text>
                                <PickerTeam
                                    values={listTeam}
                                    placeholder='Selecciona tu equipo'
                                    style={[styles.textDate]}
                                    onChangeValue={(v) => onChangeHandlerTeam('team', v)}
                                />
                                <Text style={styles.labelInput}>Numero de jugadores por equipo</Text>
                                <TextInput
                                    value={eventData.min}
                                    onChangeText={(v) => onChangeHandler('min', v)}
                                    style={styles.textInput}
                                    placeholder="Numero de jugadores por equipo"
                                    placeholderTextColor='#ffffff50'
                                    keyboardType='numeric' />
                                {eventData.type == 'invitado' ?
                                    <>
                                        <Text style={styles.labelInput}>Buscar Equipo</Text>
                                        <TouchableOpacity style={styles.textInputSearch} onPress={() => {
                                            if (eventData.team.category != "")
                                                setModalShow(true)
                                            else
                                                Alert.alert('', 'Selecciona tu equipo primero', [{ text: 'Entendido' }])
                                        }}>
                                            <Text style={{ fontSize: 18, fontFamily: 'RubikMedium', paddingLeft: 10, color: eventData.team_v.value == "" ? "#ffffff50" : "#FFFFFF", }}>
                                                {eventData.team_v.label}
                                            </Text>
                                        </TouchableOpacity>

                                    </> : <></>}
                            </>
                            : <></>
                    }
                    <Text style={styles.labelInput}>Observasiones (Opcional)</Text>
                    <TextInput
                        value={eventData.optional}
                        onChangeText={(v) => onChangeHandler('optional', v)}
                        style={{ ...styles.textInput, height: 100 }}
                        multiline={true}
                        placeholder="Escribe algo que creas, sea relevante para el encuentro"
                        placeholderTextColor='#ffffff50' />
                    <TouchableOpacity style={{ width: "100%" }} disabled={btnEnable ? false : true} onPress={() => console.log("Guardar")}>
                        {btnEnable ?
                            <LinearGradient
                                colors={['#fbb70e', '#dd53db', '#3ba2e2']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Crear Evento</Text>
                            </LinearGradient> :
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Crear Evento</Text>
                            </View>
                        }
                    </TouchableOpacity>
                </View>

            </ScrollView>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={eventData.date}
                    mode={mode}
                    onChange={onChange}
                />
            )}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalShow}
                onRequestClose={() => {
                    //setEventData({ ...eventData, team_v: { label: 'Buscar Equipo...', value: '', category: '' } })
                    setListTeamSearch([])
                    setInputSearch('')
                    setModalShow(false)
                }}>
                <View style={styles.modal}>
                    <TouchableOpacity style={styles.overlay} onPress={() => {
                        //setEventData({ ...eventData, team_v: { label: 'Buscar Equipo...', value: '', category: '' } })
                        setListTeamSearch([])
                        setInputSearch('')
                        setModalShow(false)
                    }} />
                    <View style={{
                        width: '100%',
                        borderRadius: 25,
                        zIndex: 2,
                        position: 'relative', backgroundColor: colors.darkBg
                    }}>
                        <View style={{}}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Buscar Equipo</Text>
                            </View>
                            <View style={{ ...styles.form }}>
                                <Text style={styles.labelInput}>Nombre del equipo</Text>
                                <TextInput
                                    value={inputSearch}
                                    onChangeText={(v) => setInputSearch(v)}
                                    style={styles.textInput}
                                    placeholder="Ingresa nombre del equipo"
                                    placeholderTextColor='#ffffff50' />
                                <Text style={{ textAlign: 'center', fontFamily: 'RubikMedium', fontSize: 17, color: colors.white }}>Resultados</Text>
                                <ScrollView style={{ marginTop: 20, paddingHorizontal: 10, maxHeight: 350 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                                        {listTeamSearch.length > 0 ? listTeamSearch.map((v, i) => (
                                            <TouchableOpacity key={v.id}
                                                onPress={() => console.log(`Seleccion ${v.id}}`)}
                                                onLongPress={() => { 
                                                    setShowPlayers(true) 
                                                    setSelectedTeam(v)
                                                }}
                                                style={{ width: "48.5%", marginHorizontal: 3, marginVertical: 3, borderRadius: 20, paddingVertical: 11, paddingHorizontal: 2, elevation: 4, backgroundColor: "#252837", justifyContent: 'center' }}>
                                                <Image source={{ uri: `${TEAM_IMAGE}${v.image}` }} style={{ marginRight: 10, borderRadius: 25, width: 50, height: 50, alignSelf: 'center' }} />
                                                <Text style={[{ color: colors.white, textAlign: 'center', marginLeft: 5, fontFamily: 'RubikMedium', fontSize: 17 }]}>{`${v.name} (${v.category.slug})`}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                                    <Text style={{ fontFamily: 'RubikMedium', color: colors.midGreen, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>G{'\n'}0</Text>
                                                    <Text style={{ fontFamily: 'RubikMedium', color: colors.orange3, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>E{'\n'}0</Text>
                                                    <Text style={{ fontFamily: 'RubikMedium', color: colors.orange, paddingHorizontal: 10, flex: 1, textAlign: 'center' }}>P{'\n'}0</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )) :
                                            <Text style={{ textAlign: 'center', width: "100%", fontFamily: 'RubikMedium', fontSize: 17, color: "#ffffff70" }}>No hay resultados</Text>
                                        }
                                    </View>
                                </ScrollView>
                            </View>
                            <View style={{ height: 50 }} />
                        </View>
                        <View style={[styles.bottonMenu, styles[`bottomMenuLight`]]}>
                            <TouchableOpacity style={styles.bottonMenuOption} onPress={() => {
                                setModalShow(false)
                                setListTeamSearch([])
                                setInputSearch('')
                            }}>
                                <Text style={styles.bottonMenuCancelText}>CANCELAR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.bottonMenuOption} onPress={() => {
                                searchTeams(inputSearch, eventData.team.category, setLoading, setListTeamSearch)
                            }}>
                                <Text style={styles.bottonMenuOkText}>
                                    BUSCAR
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {selectedTeam.id && 
                        <ListPlayers 
                        showPLayers={showPLayers} 
                        setShowPlayers={setShowPlayers} 
                        selectedTeam={selectedTeam} 
                        setSelectedTeam={setSelectedTeam} />
                    }
        </View>
    )
}