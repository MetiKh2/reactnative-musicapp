import { View, Text, TextInput, Alert, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { EvilIcons } from "@expo/vector-icons";
import PlayLists from "./components/Favorites";
import SummaryPlayer from "../../components/SummaryPlayer";
import { useAudio } from "../../context/AudioContext";
import Musics from "./components/Musics";

export default function LibraryScreen() {
  const { setSearch, search } = useAudio();
  return (
    <View style={{ backgroundColor: "indigo",flex:1 }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            position: "relative",
          }}
        >
          <Text
            style={{
              padding: 20,
              fontSize: 30,
              letterSpacing: 0.8,
              fontWeight: "bold",
              color: "mediumvioletred",
              marginVertical: 20,
            }}
          >
            Library
          </Text>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              padding: 20,
              marginHorizontal: 20,
              borderRadius: 50,
              flexDirection: "row",
              alignItems:'center'
            }}
          >
            <EvilIcons name="search" size={30} color="grey" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              style={{ color: "white", flex: 1 ,paddingVertical:5}}
              placeholderTextColor="grey"
              placeholder="Song or artist"
            />
          </View>
          <PlayLists />
          <Musics />
          {/* <SummaryPlayer audio={audios[5]}/> */}
        </View>
      </ScrollView>
    </View>
  );
}
