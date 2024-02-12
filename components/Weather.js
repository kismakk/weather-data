import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

const api = {
  url: process.env.EXPO_PUBLIC_API_URL,
  key: process.env.EXPO_PUBLIC_API_KEY,
  icons: process.env.EXPO_PUBLIC_ICONS_URL
}

const Weather = (props) => {
  const [temp, setTemp] = useState(0)
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    const url = api.url +
      'lat=' + props.latitude +
      '&lon=' + props.longitude +
      '&units=metric' +
      '&appid=' + api.key

    fetch(url)
      .then(res => res.json())
      .then((json) => {
        setTemp(json.main.temp)
        setDescription(json.weather[0].description)
        setIcon(api.icons + json.weather[0].icon + '@2x.png')
        setCity(json.name)
      })
      .catch((error) => {
        setDescription('Error retrieving weather information')
        console.log(error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.temp}>{temp.toFixed(1)} °C</Text>
      {icon &&
        <Image source={{ uri: icon }} style={{ width: 100, height: 100 }} />
      }
      <Text style={styles.description}>{description}</Text>
    </View>
  )
}

export default Weather

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 45,
    padding: 30,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#230010'
  },
  city: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10
  },
  temp: {
    fontSize: 20,
    fontWeight: '400'
  },
  description: {
    fontSize: 20,
    fontWeight: '300',
    fontStyle: 'italic'
  }
})