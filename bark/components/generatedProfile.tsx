import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableHighlight,
  Dimensions,
  ImageBackground,
  Alert,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { get as databaseGet, ref as databaseRef } from "@firebase/database";
import { getDownloadURL, ref as storageRef } from "@firebase/storage";
import {
  FIREBASE_AUTH,
  FIREBASE_DATABASE,
  FIREBASE_STORAGE,
} from "../FirebaseConfig";

const dimensions = Dimensions.get("window");

export default function GeneratedProf({
  uuid,
  accept,
  deny,
}: {
  uuid: string;
  accept: Function;
  deny: Function;
}) {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [dogName, setDogName] = useState<string>("");
  const [image0, setImage0] = useState<string>();
  const [image1, setImage1] = useState<string>();
  const [image2, setImage2] = useState<string>();
  const [image3, setImage3] = useState<string>();
  const [image4, setImage4] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [denyAccept, setDenyAccept] = useState<boolean>(false);
  const [scaleValue1] = useState(new Animated.Value(1));
  const [scaleValue2] = useState(new Animated.Value(1));

  const animatedButton1 = () => {
    Animated.timing(scaleValue1, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue1, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };
  const animatedButton2 = () => {
    Animated.timing(scaleValue2, {
      toValue: 0.8,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue2, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const userRef = databaseRef(FIREBASE_DATABASE, `users/${uuid}/`);

  databaseGet(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        setName(snapshot.val().name);
        setBio(snapshot.val().bio);
        setDogName(snapshot.val().dogName);
      }
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("Failed to generate profile");
    });
  function loadScreen() {
    setIsLoading(true);
  }

  function setRightImage(uri: string, index: number) {
    switch (index) {
      case 0:
        setImage0(uri);
        break;
      case 1:
        setImage1(uri);
        break;
      case 2:
        setImage2(uri);
        break;
      case 3:
        setImage3(uri);
        break;
      case 4:
        setImage4(uri);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const getImage = async () => {
      for (let i = 0; i < 5; i++) {
        const imgRef = storageRef(
          FIREBASE_STORAGE,
          `images/${uuid}/profileImage${i}`
        );

        await getDownloadURL(imgRef)
          .then((response) => {
            setRightImage(response, i);
          })
          .catch((error) => {
            setRightImage("", i);
          });
      }
      setIsLoading(false);
    };
    getImage();
  }, [uuid]);

  return isLoading ? (
    <ScrollView>
      {denyAccept && (
        <View style={styles.acceptScreen}>
          <FontAwesome name="paw" size={24} color="black" />
        </View>
      )}
      {!denyAccept && (
        <View style={styles.denyScreen}>
          <FontAwesome name="remove" size={24} color="black" />
        </View>
      )}
    </ScrollView>
  ) : (
    <ScrollView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.dogNameContainer}>
          {/* Name of dog at top of screen */}
          <Text style={styles.dogNameText}>{dogName}</Text>
        </View>

        <View>
          <ScrollView
            horizontal={true}
            centerContent={true}
            pagingEnabled={true}
          >
            {/* Images uploaded by other users seen on Home Page */}
            <View style={styles.dogPicsContainer}>
              {image0 && (
                <Image style={styles.dogPics} source={{ uri: image0 }} />
              )}
              {image1 && (
                <Image style={styles.dogPics} source={{ uri: image1 }} />
              )}
              {image2 && (
                <Image style={styles.dogPics} source={{ uri: image2 }} />
              )}
              {image3 && (
                <Image style={styles.dogPics} source={{ uri: image3 }} />
              )}
              {image4 && (
                <Image style={styles.dogPics} source={{ uri: image4 }} />
              )}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            {/* Red button for not matching */}
            <TouchableHighlight
              onPress={() => {
                deny();
                // setDenyAccept(false);
                // loadScreen();
                animatedButton2();
              }}
              underlayColor="transparent"
            >
                {/* Image for red button and animation */}
              <Animated.View
                style={[styles.view2, { transform: [{ scale: scaleValue2 }] }]}
              >
                <FontAwesome name="remove" size={24} color="black" />
              </Animated.View>
            </TouchableHighlight>
            {/* Green button for matching */}
            <TouchableHighlight
              onPress={() => {
                accept();
                // setDenyAccept(true);
                // loadScreen();
                animatedButton1();
              }}
              underlayColor="transparent"
            >
                {/* Image for green button and animation*/}
              <Animated.View
                style={[styles.view, { transform: [{ scale: scaleValue1 }] }]}
              >
                <FontAwesome name="paw" size={24} color="black" />
              </Animated.View>
            </TouchableHighlight>
          </View>

          <View style={styles.bioContainer}>
            <View style={styles.bioBox}>
              {/* Text heading for bio */}
              <Text style={styles.headings}>Bio:</Text>
              {/* Dog bio text */}
              <Text style={styles.dogBio}>{bio}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#EADDCA",
  },
  userInfoContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  bioContainer: {
    marginHorizontal: 10,
  },
  bioBox: {
    backgroundColor: "#A67B5B",
    borderWidth: 5,
    borderColor: "#A67B5B",
    borderRadius: 25,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 30,
    marginBottom: 90,
  },
  dogBio: {
    fontSize: 16,
    color: "whitesmoke",
    fontFamily: "Apple SD Gothic Neo",
  },
  headings: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Apple SD Gothic Neo",
    color: "whitesmoke",
    marginBottom: 5,
  },
  dogPicsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  dogPics: {
    width: dimensions.width - 20,
    height: 400,
    alignSelf: "center",
    resizeMode: "cover",
    borderRadius: 10,
    paddingBottom: 5,
    marginRight: 15,
    marginLeft: 3,
    justifyContent: "center",
  },
  view: {
    width: 150,
    height: 50,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginHorizontal: 30,
  },
  view2: {
    width: 150,
    height: 50,
    backgroundColor: "#FF3131",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  dogNameContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  dogBoneImage: {
    width: 100,
    height: 50,
  },
  dogNameText: {
    fontSize: 25,
    color: "#825D09",
    fontWeight: "bold",
  },
  acceptScreen: {
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    top: 0,
  },
  denyScreen: {
    backgroundColor: "#FF3131",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    top: 0,
  },
});
