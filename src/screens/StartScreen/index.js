import { View, Text, Image, Button, Pressable } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
export default function StartScreen({navigation}) {
  return (
    <View
      style={{
        backgroundColor: "indigo",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View></View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 250,
        }}
      >
        <Image
          source={require("../../../assets/kisspng-headphones-product-design-pink-m-font-graphics-5cc7f11e924ce6.0779012615566072625993.png")}
          style={{ height: 200, width: 200 }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "mediumvioletred",
            marginVertical: 20,
          }}
        >
          The Sound Of Life
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15, color: "white" }}>
          Music is nit entertainment, but also it is our life
        </Text>
      </View>
      <View>
       <Pressable onPress={()=>navigation.navigate('LibraryScreen')}>
       <LinearGradient colors={['mediumvioletred','mediumslateblue']} align style={{marginBottom:50,backgroundColor:'mediumvioletred',padding:20,borderRadius:100}}>
          <AntDesign name="arrowright" size={40} color="white" />
        </LinearGradient>
       </Pressable>
      </View>
    </View>
  );
}
