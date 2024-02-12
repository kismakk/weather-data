import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Weather from './Weather'
import * as Location from 'expo-location'

const Position = () => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [message, setMessage] = useState('Retrieving location...')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      console.log(status)
      try {
        if (status != 'granted') {
          setMessage('Location not permitted')
        } else {
          const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          setMessage('Location retrieved succesfully')
        }
      } catch (error) {
        setMessage('Error retrieving location')
        console.log(error)
      }
      setIsLoading(false)
    })()
  }, [])

  return (
    <View style={styles.container}>
      {isLoading === false &&
        <Weather
          latitude={latitude}
          longitude={longitude}
        />
      }
      <Text style={styles.coords}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  )
}

export default Position

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  coords: {
    fontSize: 16,
    fontWeight: '400'
  },
  message: {
    fontSize: 12,
    fontWeight: '300'
  }
})