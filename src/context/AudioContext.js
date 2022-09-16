/* eslint-disable prettier/prettier */
import React, { useContext, createContext, useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import { playNext } from "../utils/audioController";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [favorites, setFavorites] = useState();
  const [audios, setAudios] = useState();
  const [playBack, setPlayBack] = useState();
  const [soundObj, setSoundObj] = useState();
  const [currentAudio, setCurrentAudio] = useState();
  const [playbackDuration, setPlaybackDuration] = useState();
  const [playbackPosition, setPlaybackPosition] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState();
  const [search, setSearch] = useState("");
  const [showAudios, setShowAudios] = useState();
  const [isLoop, setIsLoop] = useState(false);
  useEffect(() => {
    if (search)
      setShowAudios(
        audios.filter((item) =>
          item.filename.toLowerCase().includes(search.toLowerCase())
        )
      );
    else setShowAudios(audios);
  }, [search]);

  const permissionAlert = () => {
    Alert.alert("Permission Required", "This app needs to read audio files!", [
      {
        text: "I am ready",
        onPress: () => getPermission(),
      },
      { text: "cancel", onPress: () => permissionAlert() },
    ]);
  };
  const getAudioFiles = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
    });
    setAudios(media.assets);
    setShowAudios(media.assets);
  };
  async function getPermission() {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (permission.granted) {
      getAudioFiles();
    }
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status == "denied" && canAskAgain) {
        permissionAlert();
      }
      if (status == "granted") {
        getAudioFiles();
      }
      if (status == "denied" && !canAskAgain) {
        permissionAlert();
      }
    }
  }
  const onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      setPlaybackPosition(playbackStatus.positionMillis);
      setPlaybackDuration(playbackStatus.durationMillis);
      return;
    }

    // if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
    //   storeAudioForNextOpening(
    //     this.state.currentAudio,
    //     this.state.currentAudioIndex,
    //     playbackStatus.positionMillis
    //   );
    // }

    // if (playbackStatus.didJustFinish) {
    //   console.log("lelel");
    //   // if (this.state.isPlayListRunning) {
    //   //   let audio;
    //   //   const indexOnPlayList = this.state.activePlayList.audios.findIndex(
    //   //     ({ id }) => id === this.state.currentAudio.id
    //   //   );
    //   //   const nextIndex = indexOnPlayList + 1;
    //   //   audio = this.state.activePlayList.audios[nextIndex];

    //   //   if (!audio) audio = this.state.activePlayList.audios[0];

    //   //   const indexOnAllList = this.state.audioFiles.findIndex(
    //   //     ({ id }) => id === audio.id
    //   //   );

    //   //   const status = await playNext(this.state.playbackObj, audio.uri);
    //   //   return this.updateState(this, {
    //   //     soundObj: status,
    //   //     isPlaying: true,
    //   //     currentAudio: audio,
    //   //     currentAudioIndex: indexOnAllList,
    //   //   });
    //   // }
    //   let nextAudioIndex;
    //   if(isLoop)
    //    nextAudioIndex= currentAudioIndex ;
    //    else nextAudioIndex=currentAudioIndex+1;
    //   // there is no next audio to play or the current audio is the last
    //   if (nextAudioIndex >= audios?.length) {
    //     await playBack.unloadAsync();

    //     setSoundObj(null);
    //     setCurrentAudio(audios[0]);
    //     setIsPlaying(false);
    //     setCurrentAudioIndex(0);

    //     setPlaybackPosition(null);
    //     setPlaybackDuration(null);
    //     return;
    //     //return await storeAudioForNextOpening(this.state.audioFiles[0], 0);
    //   }
    //   // otherwise we want to select the next audio
    //   const audio = audios[nextAudioIndex];
    //   //console.log(currentAudioIndex);
    //   const status = await playNext(playbackStatus, audio?.uri);

    //   setSoundObj(status);
    //   // setCurrentAudio(audio)
    //   setIsPlaying(true);
    //   // setCurrentAudioIndex(nextAudioIndex)
    //   //await storeAudioForNextOpening(audio, nextAudioIndex);
    // }
  };
  useEffect(() => {
    getPermission();
    addFavorite(null);
  }, []);
  const addFavorite = async (item) => {
    console.log("add");
    const favoriteAudiosString =
      (await AsyncStorage.getItem("favorite-audios")) || "[]";
    const favoriteAudios = JSON.parse(favoriteAudiosString);
    if (item) {
      favoriteAudios.push(item);
      await AsyncStorage.setItem(
        "favorite-audios",
        JSON.stringify(favoriteAudios)
      );
    }
    setFavorites(favoriteAudios);
  };
  const removeFavorite = async (item ) => {
    console.log("del");
    const favoriteAudiosString =
      (await AsyncStorage.getItem("favorite-audios")) || "[]";
    const favoriteAudios = JSON.parse(favoriteAudiosString);
   const newFavorites= favoriteAudios.filter((favorite) => favorite.id != item.id);
     await AsyncStorage.setItem(
        "favorite-audios",
        JSON.stringify(newFavorites)
      );
    setFavorites(newFavorites);
  };
  return (
    <AudioContext.Provider
      value={{
        isLoop,
        setIsLoop,
        showAudios,
        setShowAudios,
        search,
        setSearch,
        currentAudioIndex,
        setCurrentAudioIndex,
        playbackDuration,
        setPlaybackDuration,
        playbackPosition,
        setPlaybackPosition,
        isPlaying,
        setIsPlaying,
        audios,
        setPlayBack,
        setSoundObj,
        soundObj,
        playBack,
        currentAudio,
        setCurrentAudio,
        onPlaybackStatusUpdate,
        addFavorite,
        favorites,
        removeFavorite,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
