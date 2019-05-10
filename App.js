import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import PlaceInput from './src/components/PlaceInput/PlaceInput';
import PlaceList from './src/components/PlaceList/PlaceList';
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'

export default class App extends Component{
  state = {
    places: [],
    selectedPlace: null
  }

  placeSubmitHandler = placeName => {
    if(placeName.trim() === ""){ // "   Alvin    " "Alvin" || "      " ""
      return // berhenti
    }

    // setState diberikan function, property yg masuk adalah data state sebelumnya
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random().toString(),
          value: placeName,
          image: {
            uri: 'https://i.servimg.com/u/f64/15/74/75/57/logo410.png'
          }
        })
      }
    })
  }

  placeSelectedHandler = (key) => {
    this.setState (prevState => {
      return {
        selectedPlace: prevState.places.find(place => {
            return place.key === key
        })
      }
    })
  }

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return{
        places: prevState.places.filter(place => {
            return place.key !== prevState.selectedPlace.key
        }),
        selectedPlace: null
      }
    })
  }

  modalCloseHandler = () => {
    this.setState({
      selectedPlace: null
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          modalClosed = {this.modalCloseHandler}
          onDeletedItem = {this.placeDeletedHandler}
          selectedPlace = {this.state.selectedPlace}
        />
        <PlaceInput onSubmitHandler = {this.placeSubmitHandler}/>
        <PlaceList 
          places = {this.state.places}
          onItemSelected = {this.placeSelectedHandler}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 26
    }
})