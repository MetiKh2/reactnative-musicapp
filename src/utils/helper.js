import { Audio } from 'expo-av';
import { playNext } from './audioController';
export const convertTime = minutes => {
    if (minutes) {
      const hrs = minutes / 60;
      const minute = hrs.toString().split('.')[0];
      const percent = parseInt(hrs.toString().split('.')[1].slice(0, 2));
      const sec = Math.ceil((60 * percent) / 100);
      if (parseInt(minute) < 10 && sec < 10) {
        return `0${minute}:0${sec}`;
      }
  
      if (sec == 60) {
        return `${minute + 1}:00`;
      }
  
      if (parseInt(minute) < 10) {
        return `0${minute}:${sec}`;
      }
  
      if (sec < 10) {
        return `${minute}:0${sec}`;
      }
  
      return `${minute}:${sec}`;
    }
  };

  export const audioPress = async (context,audio) => {
    const {
      setCurrentAudioIndex,
      setIsPlaying,
      setPlayBack,
      audios,
      setSoundObj,
      soundObj,
      playBack,
      currentAudio,
      setCurrentAudio,
      onPlaybackStatusUpdate,
    }= context;
    if (soundObj == null) {
      const playbackObj = new Audio.Sound();
      const index = audios.findIndex(({ id }) => id === audio.id);
      const status = await playbackObj.loadAsync(
        { uri: audio?.uri },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
      );
      playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      setSoundObj(status);
      setPlayBack(playbackObj);
      setCurrentAudio(audio);
      setCurrentAudioIndex(index);
      setIsPlaying(true);
    } else if (
      soundObj?.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await playBack.setStatusAsync({ shouldPlay: false });
      setSoundObj(status);
      setIsPlaying(false);
    } else if (
      soundObj?.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id == audio.id
    ) {
      const status = await playBack.playAsync();
      setSoundObj(status);
      setIsPlaying(true);
    } else if (soundObj.isLoaded && currentAudio.id !== audio.id) {
      const status = await playNext(playBack, audio?.uri);
      const index = audios.findIndex(({ id }) => id === audio.id);
      // updateState(context, {
      //   currentAudio: audio,
      //   soundObj: status,
      //   isPlaying: true,
      //   currentAudioIndex: index,
      //   isPlayListRunning: false,
      //   activePlayList: [],
      //   ...playListInfo,
      // });
      setCurrentAudioIndex(index);
      setCurrentAudio(audio);
      setIsPlaying(true);
      setSoundObj(status);
    }
  
  };