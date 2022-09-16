import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av";
import { useAudio } from "../context/AudioContext";
import { playNext } from "../utils/audioController";
import { audioPress } from "../utils/helper";
export default function AudioItem({ audio }) {
  const context = useAudio();
  const { currentAudio } = context;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={async() => {
       await audioPress(context,audio);
        navigation.navigate("AudioScreen", audio);
      }}
    >
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          backgroundColor: currentAudio?.id == audio.id ? "grey" : "indigo",
        }}
      >
        <LinearGradient
          colors={["purple", "blueviolet", "slateblue"]}
          style={{ borderRadius: 100 }}
        >
          <View style={{ padding: 10 }}>
            <Feather name="music" size={24} color="white" />
          </View>
        </LinearGradient>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 14, color: "white" }}>{audio.filename}</Text>
          {/* <Text style={{ fontSize: 10, color: "grey" }}>{audio.albumId}</Text> */}
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {Math.floor(audio.duration / 60) +
              ":" +
              Math.floor(
                ((audio.duration / 60 - Math.floor(audio.duration / 60)) *
                  100 *
                  60) /
                  100
              )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
