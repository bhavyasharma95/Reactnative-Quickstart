import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import tracker from "./API/tracker";
import React from "react";
import { useQuery } from "react-query";

const fetchRandom = async () => {
  const response = await fetch(
    "http://4130-2402-e280-221b-1e0-3c8a-d1a1-feaa-32ac.ngrok.io/posts"
  );
  return response.json();
};

const Home = ({ navigation }) => {
  const { data, status } = useQuery("fetch", fetchRandom);

  const renderList = ({ item }) => {
    return <Text>{item.Post.title}</Text>;
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <View>{status === "loading" && <Text>loading...</Text>}</View>
      <View>{status === "error" && <Text>Error...</Text>}</View>
      <View style={styles.textcontainer}>
        {status === "success" && (
          <View>
            <FlatList
              pagingEnabled={true}
              data={data}
              keyExtractor={(item) => item.Post.id}
              renderItem={renderList}
            />
          </View>
        )}
      </View>
      <Button title="Post" onPress={() => navigation.navigate("Post")} />
      {console.log(data)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textcontainer: {
    height: 100,
    width: 200,
  },
});
export default Home;
