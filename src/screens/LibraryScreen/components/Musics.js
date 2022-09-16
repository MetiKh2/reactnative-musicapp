import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { useAudio } from "../../../context/AudioContext";
import AudioItem from "../../../components/AudioItem";

export default function Musics() {
    const {showAudios}=useAudio()
  return (
    <View>
    <Text
      style={{
        padding: 20,
        fontSize: 24,
        letterSpacing: 0.8,
        color: "white",
        marginVertical: 10,
      }}
    >
      Musics
    </Text>
    {/* <FlatList keyExtractor={(item)=>item.id} data={audios}  
      renderItem={({item})=>(
    <AudioItem audio={item}/>
      )} /> */}
      {showAudios?.map(audio=>(
        <AudioItem audio={audio} key={audio.id}/>
      ))}
  </View>
  )
}