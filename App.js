import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import ZoomableView from "./ZoomableView";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const LOGO = require("./.expo/snack-static/react-native.png");
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }) {

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount((c) => c + 1)} title="Update count" />
      ),
    });
  }, [navigation]);


  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Details"
        onPress={() => {
          /* 1. Navigate to the Details route with params */
          navigation.navigate("Details", {
            itemId: 86,
            otherParam: "anything you want here",
            name: "Teste Nome",
          });
        }}
      />
      <Button
        title="Create post"
        onPress={() => navigation.navigate("CreatePost")}
      />
      <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
      <Button
        title="Go to Settings"
        onPress={() =>
          navigation.navigate("Root", {
            screen: "Settings",
            params: { user: "jane" },
          })
        }
      />
      <Text>Count: {count}</Text>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId, otherParam } = route.params;
  const [search, setSearch] = React.useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => setSearch(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
      <Button
        title="Go to Details... again"
        onPress={() =>
          navigation.push("Details", {
            itemId: Math.floor(Math.random() * 100),
          })
        }
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Update the title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

function SettingsScreen({ route, navigation }) {
  const { user } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Settings Screen</Text>
      <Text>userParam: {JSON.stringify(user)}</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

function Feed({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Feed</Text>
      <Button
        title="Go to Profile"
        onPress={() =>  navigation.navigate("CreatePost", {
          params: { user: "jane" },
        })}
      />
    </View>
  );
}

function Messages({ route, navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Messages</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  return (
    <>
      <TextInput
        multiline
        placeholder="What's on your mind?"
        style={{ height: 200, padding: 10, backgroundColor: "white" }}
        value={postText}
        onChangeText={setPostText}
      />
      <Button
        title="Done"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: "Home",
            params: { post: postText },
            merge: true,
          });
        }}
      />
    </>
  );
}

function LogoTitle() {
  return <Image style={{ width: 50, height: 50 }} source={LOGO} />;
}

function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

// navigation.navigate('Account', {
//   screen: 'Settings',
//   params: { user: 'jane' },
// });

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Root">
//         <Drawer.Screen name="Root" component={Root} />
//         <Drawer.Screen name="Home" component={HomeScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

function HomeTab() {
  return(
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Messages" component={Messages} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerBlurEffect: true,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeTab}
          options={{
            title: "Home",
            headerTitle: (props) => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                title="Info"
                color="green"
              />
            ),
            // headerStyle: {
            //   backgroundColor: "#f4511e",
            // },
            // headerTintColor: "#fff",
            // headerTitleStyle: {
            //   fontWeight: "bold",
            // },
          }}
        />
        <Stack.Screen name="Zoom" component={ZoomableView} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({ route }) => ({
            title: route.params.name,

          })}
        />
        <Stack.Screen name="CreatePost" options={{
            headerBackTitle: 'Custom Back',
            headerBackTitleStyle: { fontSize: 40 }
          }}
          component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
