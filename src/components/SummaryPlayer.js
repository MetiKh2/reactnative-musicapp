import { View, Text } from 'react-native'
import React from 'react'
import AudioItem from './AudioItem'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

export default function SummaryPlayer({audio}) {
  return (
  <View style={{bottom:10,paddingHorizontal:40}}>
      <LinearGradient colors={['purple','slateblue']} style={{borderRadius:50}}>
      <View style={{flexDirection:'row',padding:8}}>
      <View style={{padding:10,marginRight:'auto'}}>
      <Feather name="music" size={24} color="white" />
     </View>
     <View style={{marginLeft:15}}>
        <Text style={{fontSize:12,color:'white',maxWidth:250}}>{audio.filename}</Text>
        <Text style={{fontSize:10,color:'grey'}}>{audio.albumId}</Text>
    </View>
      <View style={{padding:10,marginLeft:'auto'}}>
      <Feather name="pause" size={24} color="white" />
     </View>
      </View>
    </LinearGradient>
   
  </View>
  )
}