import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { useAudio } from "../../context/AudioContext";
import { convertTime } from "../../utils/helper";
import color from "../../utils/color";
import {
  changeAudio,
  pause,
  play,
  resume,
  selectAudio,
  playNext,
} from "../../utils/audioController";
import { moveAudio } from "./../../utils/audioController";
export default function AudioScreen({ route }) {
  const { filename, uri } = route?.params;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const { width } = Dimensions.get("window");
  const context = useAudio();
  const {
    playbackPosition,
    onPlaybackStatusUpdate,
    playbackDuration,
    currentAudio,
    isPlaying,
    playBack,
    setSoundObj,
    setCurrentAudio,
    setIsPlaying,
    soundObj,
    addFavorite,
    favorites,
    removeFavorite
  } = context;
  const calculateSeebBar = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
    }

    if (currentAudio.lastPosition) {
      return currentAudio.lastPosition / (currentAudio.duration * 1000);
    }

    return 0;
  };
  useEffect(() => {
    if (playbackPosition / playbackDuration >= 0)
      setSliderPosition(playbackPosition / playbackDuration);
  }, [playbackPosition]);

  const handlePlayPause = async () => {
    await selectAudio(currentAudio, context);
    // play
    if (context.soundObj === null) {
      const audio = context.currentAudio;
      const status = await play(playBack, uri);
      playBack.setOnPlaybackStatusUpdate((status) =>
        onPlaybackStatusUpdate(status)
      );
      setSoundObj(status);
      setCurrentAudio(audio);
      setIsPlaying(true);
      // currentAudioIndex: context.currentAudioIndex,
    }
    // pause
    if (soundObj && soundObj.isPlaying) {
      const status = await pause(playBack);
      setSoundObj(status);
      setIsPlaying(false);
    }
    // resume
    if (context.soundObj && !context.soundObj.isPlaying) {
      const status = await resume(playBack);
      setSoundObj(status);
      setIsPlaying(true);
    }
  };

  const handleNext = async () => {
    await changeAudio(context, "next");
  };

  const handlePrevious = async () => {
    await changeAudio(context, "previous");
  };

  return (
    <View
      style={{
        backgroundColor: "indigo",
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignSelf: "flex-end", padding: 20 }}>
        <Ionicons
          name={
            favorites.filter((favorite) => favorite.id == currentAudio.id)
              .length > 0
              ? "heart"
              : "heart-outline"
          }
          size={30}
          color="white"
          onPress={async()=>favorites.filter(favorite=>favorite.id==currentAudio.id).length>0?await removeFavorite(currentAudio):await addFavorite(currentAudio)}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 140,
        }}
      >
        {/* <Image
          source={{
            uri: "https://coveroriginal.ir/wp-content/uploads/2021/10/hirad.jpg",
          }}
          style={{ height: 200, width: 200, borderRadius: 100 }}
        /> */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 150,
            width: 150,
            borderRadius: 100,
            backgroundColor: "grey",
          }}
        >
          <Text style={{ fontSize: 45, fontWeight: "bold" }}>
            {currentAudio.filename[0]}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "mediumvioletred",
            marginVertical: 20,
            textAlign: "center",
            marginHorizontal: 20,
          }}
        >
          {currentAudio.filename}
        </Text>
        <Slider
          style={{ width: width - 30, height: 40, backgroundColor: "purple" }}
          minimumValue={0}
          maximumValue={1}
          value={sliderPosition}
          minimumTrackTintColor={color.FONT_MEDIUM}
          maximumTrackTintColor={color.ACTIVE_BG}
          onValueChange={(value) => {
            setCurrentPosition(convertTime(value * currentAudio.duration));
          }}
          onSlidingStart={async () => {
            if (!isPlaying) return;

            try {
              await pause(playBack);
            } catch (error) {
              console.log("error inside onSlidingStart callback", error);
            }
          }}
          onSlidingComplete={async (value) => {
            await moveAudio(context, value);
            setSliderPosition(value);
          }}
        />
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            width: width - 45,
          }}
        >
          <Text style={{ color: "grey", fontWeight: "bold" }}>
            {currentPosition}
          </Text>
          <Text style={{ color: "grey", fontWeight: "bold" }}>
            {Math.floor(currentAudio.duration / 60) +
              ":" +
              Math.floor(
                ((currentAudio.duration / 60 -
                  Math.floor(currentAudio.duration / 60)) *
                  100 *
                  60) /
                  100
              )}
          </Text>
        </View>
        {/* <Text style={{ textAlign: "center", fontSize: 14, color: "white",maxWidth:300 }}>
          Music is nit entertainment, but also it is our life
        </Text> */}
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: 150,
          paddingHorizontal: 15,
        }}
      >
        <FontAwesome
          onPress={() => moveAudio(context, 0)}
          // onPress={()=>setIsLoop(prev=>!prev)}
          name={true ? "refresh" : "long-arrow-right"}
          size={24}
          color="white"
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="play-skip-back-outline"
            size={30}
            color="white"
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              paddingRight: 50,
              paddingVertical: 10,
              paddingLeft: 15,
              borderBottomLeftRadius: 40,
              borderTopLeftRadius: 40,
            }}
            onPress={handlePrevious}
          />
          <LinearGradient
            colors={["mediumvioletred", "mediumslateblue"]}
            align
            style={{ padding: 10 }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={30}
              color="white"
              style={{ marginHorizontal: 15 }}
              onPress={handlePlayPause}
            />
          </LinearGradient>

          <Ionicons
            name="play-skip-forward-outline"
            size={30}
            color="white"
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              paddingRight: 15,
              paddingVertical: 10,
              paddingLeft: 50,
              borderBottomRightRadius: 40,
              borderTopRightRadius: 40,
            }}
            onPress={handleNext}
          />
        </View>
        <FontAwesome name="volume-up" size={24} color="white" />
      </View>
    </View>
  );
}
