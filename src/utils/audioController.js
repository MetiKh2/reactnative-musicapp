
// play audio
export const play = async (playbackObj, uri, lastPosition) => {
  try {
    if (!lastPosition)
      return await playbackObj.loadAsync(
        { uri },
        { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
      );

    // but if there is lastPosition then we will play audio from the lastPosition
    await playbackObj.loadAsync(
      { uri },
      { progressUpdateIntervalMillis: 1000 }
    );

    return await playbackObj.playFromPositionAsync(lastPosition);
  } catch (error) {
    console.log('error inside play helper method', error.message);
  }
};

// pause audio
export const pause = async playbackObj => {
  try {
    return await playbackObj.setStatusAsync({
      shouldPlay: false,
    });
  } catch (error) {
    console.log('error inside pause helper method', error.message);
  }
};

// resume audio
export const resume = async playbackObj => {
  try {
    return await playbackObj.playAsync();
  } catch (error) {
    console.log('error inside resume helper method', error.message);
  }
};

// select another audio
export const playNext = async (playbackObj, uri) => {
  try {
     playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    return await play(playbackObj, uri);
  } catch (error) {
    console.log('error inside playNext helper method', error.message);
  }
};

export const selectAudio = async (audio, context, playListInfo = {}) => {
  const {
    soundObj,
    setSoundObj,
    playBack,
    currentAudio,
    setCurrentAudio,
    audios,
    onPlaybackStatusUpdate,
    setPlaybackPosition,
    setCurrentAudioIndex,
    currentAudioIndex,
    setIsPlaying
  } = context;
  try {
    // playing audio for the first time.
    if (soundObj === null) {
      const status = await play(playBack, audio?.uri, audio.lastPosition);
      const index = audios.findIndex(({ id }) => id === audio.id);
        setCurrentAudio(audio),
        setSoundObj(status)
        setIsPlaying(true)
        setCurrentAudioIndex(index)
        // isPlayListRunning: false,
        // activePlayList: [],
      playBack.setOnPlaybackStatusUpdate((p)=>onPlaybackStatusUpdate(p));
      return//return storeAudioForNextOpening(audio, index);
    }

    // pause audio
    if (
      soundObj.isLoaded &&
      soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await pause(playBack);
        setPlaybackPosition(status.positionMillis)
      setSoundObj(status)
      setIsPlaying(true)
    }

    // resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playBack);
      setSoundObj(status)
      setIsPlaying(true)
    }

    // select another audio
    if (soundObj.isLoaded && currentAudio.id !== audio.id) {
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
      setCurrentAudio(audio),
      setSoundObj(status)
      setIsPlaying(true)
      setCurrentAudioIndex(index)
      // return storeAudioForNextOpening(audio, index);
    }
  } catch (error) {
    console.log('error inside select audio method.', error.message);
  }
};

// const selectAudioFromPlayList = async (context, select) => {
//   const { activePlayList, currentAudio, audioFiles, playbackObj, updateState } =
//     context;
//   let audio;
//   let defaultIndex;
//   let nextIndex;

//   const indexOnPlayList = activePlayList.audios.findIndex(
//     ({ id }) => id === currentAudio.id
//   );

//   if (select === 'next') {
//     nextIndex = indexOnPlayList + 1;
//     defaultIndex = 0;
//   }

//   if (select === 'previous') {
//     nextIndex = indexOnPlayList - 1;
//     defaultIndex = activePlayList.audios.length - 1;
//   }
//   audio = activePlayList.audios[nextIndex];

//   if (!audio) audio = activePlayList.audios[defaultIndex];

//   const indexOnAllList = audioFiles.findIndex(({ id }) => id === audio.id);

//   const status = await playNext(playbackObj, audio.uri);
//   return updateState(context, {
//     soundObj: status,
//     isPlaying: true,
//     currentAudio: audio,
//     currentAudioIndex: indexOnAllList,
//   });
// };

export const changeAudio = async (context, select) => {
  const {
    playBack,
    currentAudioIndex,
    onPlaybackStatusUpdate,
    // totalAudioCount,
    audios,
    setCurrentAudio,
    setSoundObj,
    setIsPlaying,
    setCurrentAudioIndex,
    setPlaybackPosition,
    setPlaybackDuration
    // isPlayListRunning,
  } = context;
  const totalAudioCount=audios.length;
  console.log(totalAudioCount);
  // if (isPlayListRunning) return selectAudioFromPlayList(context, select);

  try {
    const { isLoaded } = await playBack.getStatusAsync();
    const isLastAudio = currentAudioIndex + 1 === totalAudioCount;
    const isFirstAudio = currentAudioIndex <= 0;
    let audio;
    let index;
    let status;

    // for next
    if (select === 'next') {
      audio = audios[currentAudioIndex + 1];
      if (!isLoaded && !isLastAudio) {
        index = currentAudioIndex + 1;
        status = await play(playBack, audio?.uri);
        playBack.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }

      if (isLoaded && !isLastAudio) {
        index = currentAudioIndex + 1;
        status = await playNext(playBack, audio?.uri);
      }

      if (isLastAudio) {
        index = 0;
        audio = audios[index];
        if (isLoaded) {
          status = await playNext(playBack, audio?.uri);
        } else {
          status = await play(playBack, audio?.uri);
        }
      }
    }

    // for previous
    if (select === 'previous') {
      audio = audios[currentAudioIndex - 1];
      if (!isLoaded && !isFirstAudio) {
        index = currentAudioIndex - 1;
        status = await play(playBack, audio?.uri);
        playBack.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }

      if (isLoaded && !isFirstAudio) {
        index = currentAudioIndex - 1;
        status = await playNext(playBack, audio?.uri);
      }

      if (isFirstAudio) {
        index = totalAudioCount - 1;
        audio = audios[index];
        if (isLoaded) {
          status = await playNext(playBack, audio?.uri);
        } else {
          status = await play(playBack, audio?.uri);
        }
      }
    }

      setCurrentAudio(audio);
      setSoundObj(status);
      setIsPlaying(true);
      setCurrentAudioIndex(index);
      setPlaybackPosition(null)
      setPlaybackDuration(null);
    // storeAudioForNextOpening(audio, index);
  } catch (error) {
    console.log('error inside cahnge audio method.', error.message);
  }
};

export const moveAudio = async (context, value) => {
  const { soundObj, isPlaying, playBack, setSoundObj,setPlaybackPosition } = context;
  if (soundObj === null || !isPlaying) return;

  try {
    const status = await playBack.setPositionAsync(
      Math.floor(soundObj.durationMillis * value)
    );
      setSoundObj(status)
      setPlaybackPosition( status.positionMillis)

    await resume(playBack);
  } catch (error) {
    console.log('error inside onSlidingComplete callback', error);
  }
};