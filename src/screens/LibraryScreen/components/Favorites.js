import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useAudio } from "../../../context/AudioContext";
import { useNavigation } from "@react-navigation/native";
import { audioPress } from "../../../utils/helper";

const data = [
    {
        ReleaseDate: "2013-09-27T02:00:00+02:00",
        Genres: ["Electronic / Dance"],
        Id: "0",
        Name: "Aleph",
        ImageUrl:
          "https://www.recordoftheday.com/mag/wp-content/uploads/2016/09/music-album-06.jpg",
        Link: "https://music.microsoft.com/Album/26ebea07-0100-11db-89ca-0019b92a3933?partnerID=AwesomePartner",
        Source: "Collection",
        CompatibleSources: "Catalog, Collection",
      },
      {
        ReleaseDate: "2013-05-09T02:00:00+02:00",
        Genres: ["Pop"],
        Id: "1",
        Name: "Random Access Memories",
        ImageUrl:
          "https://mychannels.ir/img/channels/1591810833_8361.jpg",
        Link: "https://music.microsoft.com/Album/b13eb907-0100-11db-89ca-0019b92a3933?partnerID=AwesomePartner",
        Source: "Collection",
        CompatibleSources: "Catalog, Collection",
      },{
        ReleaseDate: "2013-09-27T02:00:00+02:00",
        Genres: ["Electronic / Dance"],
        Id: "2",
        Name: "Aleph",
        ImageUrl:
          "https://www.recordoftheday.com/mag/wp-content/uploads/2016/09/music-album-06.jpg",
        Link: "https://music.microsoft.com/Album/26ebea07-0100-11db-89ca-0019b92a3933?partnerID=AwesomePartner",
        Source: "Collection",
        CompatibleSources: "Catalog, Collection",
      },
      {
        ReleaseDate: "2013-05-09T02:00:00+02:00",
        Genres: ["Pop"],
        Id: "3",
        Name: "Random Access Memories",
        ImageUrl:
          "https://mychannels.ir/img/channels/1591810833_8361.jpg",
        Link: "https://music.microsoft.com/Album/b13eb907-0100-11db-89ca-0019b92a3933?partnerID=AwesomePartner",
        Source: "Collection",
        CompatibleSources: "Catalog, Collection",
      },{
        ReleaseDate: "2013-09-27T02:00:00+02:00",
        Genres: ["Electronic / Dance"],
        Id: "4",
        Name: "Aleph",
        ImageUrl:
          "https://www.recordoftheday.com/mag/wp-content/uploads/2016/09/music-album-06.jpg",
        Link: "https://music.microsoft.com/Album/26ebea07-0100-11db-89ca-0019b92a3933?partnerID=AwesomePartner",
        Source: "Collection",
        CompatibleSources: "Catalog, Collection",
      },
      {
        ReleaseDate: "2013-05-09T02:00:00+02:00",
        Genres: ["Pop"],
        Id: "5",
        Name: "Random Access Memories",
        ImageUrl:
          "https://mychannels.ir/img/channels/1591810833_8361.jpg",
        Link: "https://music.microsoft.com/Album/b13eb907-0100-11db-89ca-0019b92a3933?partnerID=AwesomePartner",
        Source: "Collection",
        CompatibleSources: "Catalog, Collection",
      },
];

export default function Favorites() {
  const context = useAudio();
  const { favorites } = context;
  const navigation = useNavigation();
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
        Favorites
      </Text>
      <FlatList keyExtractor={(item)=>item.id} data={favorites} horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item})=>(
      <Pressable style={{marginHorizontal:10}} onPress={async ()=>{
       await audioPress(context,item)
       navigation.navigate("AudioScreen", item);
      }}>
         {/* <Image source={{uri:item.ImageUrl}} style={{width:150, height:200,borderRadius:30}}/> */}
         <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'grey',width:150, height:200,borderRadius:30}}>
          <Text style={{fontWeight:'bold',fontSize:45}}>{item.filename[0]}</Text>
         </View>
         <Text
        style={{
          padding: 10,
          color: "white",
          maxWidth:150,
          lineHeight:20
        }}
      >
        {item.filename}
      </Text><Text
        style={{
          paddingHorizontal: 10,
          color: "grey",
          maxWidth:150,
          fontSize:11
        }}
      >
       <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {Math.floor(item.duration / 60) +
              ":" +
              Math.floor(
                ((item.duration / 60 -
                  Math.floor(item.duration / 60)) *
                  100 *
                  60) /
                  100
              )}
          </Text> 
      </Text>
      </Pressable>
      )} />
    </View>
  );
}
