import 'react-native-gesture-handler';
import React, { createContext, useContext, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  TextInput,
  ScrollView,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Picker } from '@react-native-picker/picker';
import QRCode from 'react-native-qrcode-svg';
import * as Haptics from 'expo-haptics';

// >>> TABLE OF CONTENTS <<<
// COMPONENTS
// SCREENS
// --> STANDS SCREEN
// --> PITS SCREEN
// --> SETTINGS SCREEN
// NAVIGATION
// STYLES

// >>> COMPONENTS <<<

const ShortTextInput = ({
  label,
  placeholder,
  onChangeText,
  keyboardType,
  maxLength,
  value,
}) => (
  <View style={styles.criteriaContainer}>
    <Text style={styles.criteriaText}>{label}</Text>
    <TextInput
      style={styles.criteriaTextInput}
      placeholder={placeholder}
      onChangeText={onChangeText}
      placeholderTextColor="#959595"
      keyboardType={keyboardType}
      maxLength={maxLength}
      value={value}
    />
  </View>
);

const DropdownInput = ({
  label,
  options,
  selectedOption,
  setSelectedOption,
}) => (
  <View style={styles.criteriaContainer}>
    <Text style={styles.criteriaText}>{label}</Text>
    <View style={{
      borderWidth: 1,
      borderColor: '#fff',
      marginTop: 10,
      height: Platform.OS === 'ios' ? 60 : undefined,
      overflow: Platform.OS === 'ios' ? 'hidden' : undefined,
      justifyContent: Platform.OS === 'ios' ? 'center' : undefined,
    }}>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
        dropdownIconColor={'#fff'}
      >
        {options.map((option, index) => (
          <Picker.Item
            key={index}
            label={option}
            value={option}
            color='#fff'
          />
        ))}
      </Picker>
    </View>
  </View>
);

// >>> SCREENS <<<
// >>> --> STANDS SCREEN <<<

function StandsScreen() {
  const [teamNumber, setTeamNumber] = useState(0);
  const [matchNumber, setMatchNumber] = useState(0);
  const [playoffs, setPlayoffs] = useState(false);
  const [mobility, setMobility] = useState(false);
  const [autonStrategyDetails, setAutonStrategyDetails] = useState("");
  const [playstyle, setPlaystyle] = useState("Offensive")
  const [scoringType, setScoringType] = useState("Speaker")
  const [strategyDescription, setStrategyDetails] = useState("");
  const [scoringAccuracy, setScoringAccuracy] = useState("Sometimes misses")
  const [intakeAbility, setIntakeAbility] = useState("Weak intake (often fumbles)")
  const [cycleSpeed, setCycleSpeed] = useState("Average (15s-20s)")
  const [driverSkill, setDriverSkill] = useState("");
  const [climb, setClimb] = useState(false);
  const [trap, setScoredTrap] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [comments, setComments] = useState("");
  
  const [QRData, setQRData] = useState("EMPTY QR")

  const { userName, userTeamNumber, competition } = useContext(MyContext);

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <View style={styles.criteriaHorzContainer}>
        <ShortTextInput
          label="Team Number"
          placeholder="8257"
          onChangeText={setTeamNumber}
          style={{ marginTop: "6%" }}
          keyboardType="numeric"
          maxLength={4}
        />

        <ShortTextInput
          label="Match Number"
          placeholder="24"
          onChangeText={setMatchNumber}
          style={{ marginTop: "6%" }}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <Pressable
        style={[
          styles.headerResetButton, styles.criteriaContainer,
          {
            backgroundColor: playoffs ? "#007d23" : "#7d0000",
            padding: 10,
            alignItems: 'center',
            borderRadius: 15
          },
        ]}
        onPress={() => setPlayoffs(!playoffs)}
        android_ripple={{color: '#232323'}}
      >
        <Text style={styles.generalText}>
          Playoffs
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.headerResetButton, styles.criteriaContainer,
          {
            backgroundColor: mobility ? "#007d23" : "#7d0000",
            padding: 10,
            alignItems: 'center',
            borderRadius: 15
          },
        ]}
        onPress={() => setMobility(!mobility)}
        android_ripple={{color: '#232323'}}
      >
        <Text style={styles.generalText}>
          Mobility
        </Text>
      </Pressable>

      <ShortTextInput
        label="Auton Strategy"
        placeholder="Scores preloaded note into speaker."
        onChangeText={setAutonStrategyDetails}
      />

      <DropdownInput
        label="Playstyle"
        options={["Offensive", "Defensive", "Feeder", "Other"]}
        selectedOption={playstyle}
        setSelectedOption={setPlaystyle}
      />

      <DropdownInput
        label="Scoring Type"
        options={["Speaker", "Amp", "Both", "Neither"]}
        selectedOption={scoringType}
        setSelectedOption={setScoringType}
      />

      <ShortTextInput
        label="Strategy Description"
        placeholder="Takes fed pieces and scores into speaker."
        onChangeText={setStrategyDetails}
      />

      <DropdownInput
        label="Scoring Accuracy"
        options={["Never misses", "Rarely misses", "Sometimes misses", "Often misses", "Never scores"]}
        selectedOption={scoringAccuracy}
        setSelectedOption={setScoringAccuracy}
      />

      <DropdownInput
        label="Intake Ability"
        options={["Quick intake (usually first try)", "Decent intake (occassional fumble)", "Weak intake (often fumbles)", "Doesn't intake"]}
        selectedOption={intakeAbility}
        setSelectedOption={setIntakeAbility}
      />

      <DropdownInput
        label="Cycle Speed"
        options={["Quick (<15s)", "Average (15s-20s)", "Slow (>20s)", "Doesn't cycle"]}
        selectedOption={cycleSpeed}
        setSelectedOption={setCycleSpeed}
      />

      <ShortTextInput
        label="Driver Skill"
        placeholder="Efficient maneuvering."
        onChangeText={setDriverSkill}
      />

      <Pressable
        style={[
          styles.headerResetButton, styles.criteriaContainer,
          {
            backgroundColor: climb ? "#007d23" : "#7d0000",
            padding: 10,
            alignItems: 'center',
            borderRadius: 15
          },
        ]}
        onPress={() => setClimb(!climb)}
        android_ripple={{color: '#232323'}}
      >
        <Text style={styles.generalText}>
          Climb
        </Text>
      </Pressable>

      <View style={styles.criteriaContainer}>
        <View style={[styles.criteriaHorzContainer, {justifyContent: 'space-between'}]}>
          <Pressable
          style={{
            backgroundColor: trap ? "#007d23" : "#7d0000",
            padding: 10,
            width: '44%',
            alignItems: 'center',
            borderRadius: 15
          }}
          android_ripple={{color: '#232323'}}
          onPress={() => setScoredTrap(!trap)}
          >
            <Text style={styles.generalText}>Trap</Text>
          </Pressable>
          <Pressable
          style={{
            backgroundColor: spotlight ? "#007d23" : "#7d0000",
            padding: 10,
            width: '44%',
            alignItems: 'center',
            borderRadius: 15
          }}
          android_ripple={{color: '#232323'}}
          onPress={() => setSpotlight(!spotlight)}
          >
            <Text style={styles.generalText}>Spotlight</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Additional Comments</Text>
        <TextInput
          style={styles.criteriaTextInput}
          placeholder={"Bot broke down for a few seconds."}
          onChangeText={setComments}
          placeholderTextColor="#959595"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={[styles.criteriaContainer, {alignItems: 'center', backgroundColor: '#fff', marginTop: "4%", padding: Platform.OS === 'ios' ? '9.5%' : 20}]}>
          <QRCode value={QRData} size={300} />
      </View>

      <Pressable
        style={[styles.criteriaButton2, { marginBottom: "10%", marginTop: "3%" }]}
        onPress={
          () => setQRData(JSON.stringify({
            "type": "stands",
            "scouterName": userName,
            "scouterTeam": userTeamNumber,
            "compName": competition,
            "teamNum": teamNumber,
            "matchNum": matchNumber,
            "playoffs": playoffs,
            "mobility": mobility,
            "autonStrategyDetails": autonStrategyDetails,
            "playstyle": playstyle,
            "scoringType": scoringType,
            "strategyDesc": strategyDescription,
            "scoringAccuracy": scoringAccuracy,
            "intakeAbility": intakeAbility,
            "cycleSpeed": cycleSpeed,
            "driverSkill": driverSkill,
            "climb": climb,
            "trap": trap,
            "spotlight": spotlight,
            "comments": comments,
          }))
        }
        android_ripple={{color: '#007d23'}}
      >
        <Text>Generate QR</Text>
      </Pressable>

      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
}

// >>> --> PITS SCREEN <<<

function PitsScreen() {
  const [teamNumber, setTeamNumber] = useState(0)
  const [drivetrain, setDrivetrain] = useState("Swerve")
  const [length, setLength] = useState(0)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [scoringPreference, setScoringPreference] = useState("Speaker")
  const [scoringAccuracy, setScoringAccuracy] = useState("Sometimes misses")
  const [intakeAbility, setIntakeAbility] = useState("Weak intake (often fumbles)")
  const [playstyle, setPlaystyle] = useState("Offensive")
  const [cycleSpeed, setCycleSpeed] = useState("Average (15s-20s)")
  const [autonStrategyDetails, setAutonStrategyDetails] = useState("")
  const [endgameStrategyDetails, setEndgameStrategyDetails] = useState("")
  const [canFitUnderStage, setCanFitUnderStage] = useState(false)
  const [canHarmonize, setCanHarmonize] = useState(false)
  const [comments, setComments] = useState("")

  const [QRData, setQRData] = useState("EMPTY QR")

  const { userName, userTeamNumber, competition } = useContext(MyContext);

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <ShortTextInput
        label="Team Number"
        placeholder="3161"
        onChangeText={setTeamNumber}
        style={{ marginTop: "6%" }}
        keyboardType="numeric"
        maxLength={4}
      />

      <DropdownInput
        label="Drivetrain"
        options={["Swerve", "Tank", "Other"]}
        selectedOption={drivetrain}
        setSelectedOption={setDrivetrain}
      />

      <ShortTextInput
        label="Length"
        placeholder="30 (in inches)"
        onChangeText={setLength}
        keyboardType="numeric"
      />
      
      <ShortTextInput
        label="Width"
        placeholder="40 (in inches)"
        onChangeText={setWidth}
        keyboardType="numeric"
      />
      
      <ShortTextInput
        label="Height"
        placeholder="120 (in inches)"
        onChangeText={setHeight}
        keyboardType="numeric"
      />

      <DropdownInput
        label="Scoring Type"
        options={["Speaker", "Amp", "Both", "Neither", "Other"]}
        selectedOption={scoringPreference}
        setSelectedOption={setScoringPreference}
      />

      <DropdownInput
        label="Scoring Accuracy"
        options={["Never misses", "Rarely misses", "Sometimes misses", "Often misses", "Never scores"]}
        selectedOption={scoringAccuracy}
        setSelectedOption={setScoringAccuracy}
      />

      <DropdownInput
        label="Intake Ability"
        options={["Quick intake (usually first try)", "Decent intake (occassional fumble)", "Weak intake (often fumbles)", "Doesn't intake"]}
        selectedOption={intakeAbility}
        setSelectedOption={setIntakeAbility}
      />

      <DropdownInput
        label="Playstyle"
        options={["Offensive", "Defensive", "Feeder", "Other"]}
        selectedOption={playstyle}
        setSelectedOption={setPlaystyle}
      />

      <DropdownInput
        label="Cycle Speed"
        options={["Quick (<15s)", "Average (15s-20s)", "Slow (>20s)", "Doesn't cycle"]}
        selectedOption={cycleSpeed}
        setSelectedOption={setCycleSpeed}
      />

      <ShortTextInput
        label="Auton Strategy"
        placeholder="Scores preloaded note into speaker."
        onChangeText={setAutonStrategyDetails}
      />

      <ShortTextInput
        label="Endgame Strategy"
        placeholder="Takes fed pieces and scores speaker."
        onChangeText={setEndgameStrategyDetails}
      />

      <View style={styles.criteriaContainer}>
        <View style={[styles.criteriaHorzContainer, {marginTop: "3%"}]}>
          <Pressable
          style={{
            backgroundColor: canFitUnderStage ? "#007d23" : "#7d0000",
            padding: 10,
            width: '45%',
            alignItems: 'center',
            borderRadius: 15
          }}
          onPress={() => {setCanFitUnderStage(!canFitUnderStage); Haptics.selectionAsync()}}
          android_ripple={{color: '#232323'}}
          >
            <Text style={styles.generalText}>Under Stage</Text>
          </Pressable>
          <Pressable
          style={{
            backgroundColor: canHarmonize ? "#007d23" : "#7d0000",
            padding: 10,
            width: '45%',
            alignItems: 'center',
            borderRadius: 15
          }}
          onPress={() => {setCanHarmonize(!canHarmonize); Haptics.selectionAsync()}}
          android_ripple={{color: '#232323'}}
          >
            <Text style={styles.generalText}>Harmonize</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.criteriaContainer}>
        <Text style={styles.criteriaText}>Additional Comments</Text>
        <TextInput
          style={styles.criteriaTextInput}
          placeholder={"Bot has battery issues."}
          onChangeText={setComments}
          placeholderTextColor="#959595"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={[styles.criteriaContainer, {alignItems: 'center', backgroundColor: '#fff', padding: 20}]}>
          <QRCode value={QRData} size={300} />
      </View>

      <Pressable
        style={[styles.criteriaButton2, { marginBottom: "5%", marginTop: "3%" }]}
        onPress={
          () => setQRData(JSON.stringify({
            "type": "pits",
            "scouterName": userName,
            "scouterTeam": userTeamNumber,
            "compName": competition,
            "teamNum": teamNumber,
            "drivetrain": drivetrain,
            "length": length,
            "width": width,
            "height": height,
            "scoringPreference": scoringPreference,
            "scoringAccuracy": scoringAccuracy,
            "intakeAbility": intakeAbility,
            "playstyle": playstyle,
            "cycleSpeed": cycleSpeed,
            "autonStrategyDetails": autonStrategyDetails,
            "endgameStrategyDetails": endgameStrategyDetails,
            "canFitUnderStage": canFitUnderStage,
            "canHarmonize": canHarmonize,
            "comments": comments,
          }))
        }
        android_ripple={{color: '#007d23'}}
      >
        <Text>Generate QR</Text>
      </Pressable>

      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
}

// >>> --> SETTINGS SCREEN <<<

function SettingsScreen({ navigation }) {
  const { userName, userTeamNumber, competition, updateParams } = useContext(MyContext);

  const [newParam1, setNewParam1] = useState("");
  const [newParam2, setNewParam2] = useState("");
  const [newParam3, setNewParam3] = useState("");

  const updateParamsWithTextInput = () => {
    updateParams({
      userName: newParam1 || userName,
      userTeamNumber: newParam2 || userTeamNumber,
      competition: newParam3 || competition,
    });
    navigation.navigate("homeScreen");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <ScrollView style={styles.scoutingScreenContainer}>
      <ShortTextInput
        label="Scouter Name"
        placeholder={userName}
        onChangeText={setNewParam1}
      />
      <ShortTextInput
        label="Scouter Team"
        keyboardType="numeric"
        maxLength={4}
        placeholder={userTeamNumber}
        onChangeText={setNewParam2}        
      />
      <DropdownInput
        label="Competition"
        options={["Humber College", "Centennial College", "McMaster University", "Provincial Championship", "FIRST Championship"]}
        selectedOption={newParam3}
        setSelectedOption={setNewParam3}
      />
      <Pressable
        style={[styles.criteriaButton2, { marginTop: "5%" }]}
        onPress={updateParamsWithTextInput}
        android_ripple={{color: '#007d23'}}
      >
        <Text>Save Settings</Text>
      </Pressable>

      <StatusBar barStyle="light-content" />
    </ScrollView>
  );
}

// >>> NAVIGATION <<<

function HomeScreen({ navigation }) {
  const { userTeamNumber, competition } = useContext(MyContext);

  return (
    <View style={styles.homeContainer}>
      <Image
        style={styles.homeCrescendoImage}
        source={require("./assets/crescendo.png")}
      />

      <View style={[styles.generalText, styles.homeTitleText]}>
        <Text
          style={[styles.generalText, { fontSize: 55, fontWeight: "bold" }]}
        >
          {userTeamNumber}
        </Text>
        <Text style={[styles.generalText, { fontSize: 30 }]}>
          {competition}
        </Text>
      </View>

      <View style={styles.homeNavigationButtonContainer}>
        <Pressable
          style={[styles.homeNavigationButton, { backgroundColor: "#c3423f" }]}
          onPress={() => {navigation.navigate("standsScreen"); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}}
          android_ripple={{color: '#000'}}
        >
          <Text style={styles.homeNavigationButtonText}>Stands</Text>
        </Pressable>

        <Pressable
          style={[styles.homeNavigationButton, { backgroundColor: "#5bc0eb" }]}
          onPress={() => {navigation.navigate("pitsScreen"); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}}
          android_ripple={{color: '#000'}}
        >
          <Text style={styles.homeNavigationButtonText}>Pits</Text>
        </Pressable>

        <Pressable
          style={[styles.homeNavigationButton, { backgroundColor: "#959595" }]}
          onPress={() => {navigation.navigate("settingsScreen"); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)}}
          android_ripple={{color: '#000'}}
        >
          <Text style={styles.homeNavigationButtonText}>Settings</Text>
        </Pressable>
      </View>

      <StatusBar barStyle="light-content" />
    </View>
  );
}

const Stack = createStackNavigator();
const MyContext = createContext();

export default function App() {
  const [params, setParams] = useState({
    userName: "Satoshi Nakamoto",
    userTeamNumber: "9999",
    competition: "McMaster University",
  });

  const updateParams = (newParams) => {
    setParams({ ...params, ...newParams });
  };

  return (
    <NavigationContainer>
      <MyContext.Provider value={{ ...params, updateParams }}>
        <Stack.Navigator initialRouteName="homeScreen">
          <Stack.Screen
            name="homeScreen"
            component={HomeScreen}
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="standsScreen"
            component={StandsScreen}
            options={{
              title: "Stands",

              headerStyle: {
                backgroundColor: "#191919",
                borderBottomColor: "#fff",
                borderWidth: 1,
              },

              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="pitsScreen"
            component={PitsScreen}
            options={{
              title: "Pits",

              headerStyle: {
                backgroundColor: "#191919",
                borderBottomColor: "#fff",
                borderWidth: 1,
              },

              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="settingsScreen"
            component={SettingsScreen}
            options={{
              title: "Settings",

              headerStyle: {
                backgroundColor: "#191919",
                borderBottomColor: "#fff",
                borderWidth: 1,
              },

              headerTintColor: "#fff",
            }}
          />
        </Stack.Navigator>
      </MyContext.Provider>
    </NavigationContainer>
  );
}

// >>> STYLES <<<

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#191919",
  },

  homeCrescendoImage: {
    flex: 3,
    top: 30,
    width: "80%",
    objectFit: "contain",
  },

  homeNavigationButtonContainer: {
    flex: 3,
    width: "80%",
    justifyContent: "space-evenly",
  },

  homeNavigationButton: {
    height: "18%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  homeNavigationButtonText: {
    color: "#fff",
    fontSize: 28,
    textShadowOffset: {
      height: 2,
    },
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowRadius: 5,
  },

  headerResetButton: {
    backgroundColor: "#959595",
    minHeight: '2%',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
  },

  scoutingScreenContainer: {
    flex: 1,
    backgroundColor: "#191919",
  },

  generalText: {
    color: "#fff",
    textShadowOffset: {
      height: 2,
    },
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowRadius: 5,
  },

  criteriaContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },

  criteriaText: {
    color: "#fff",
    fontSize: 20,
  },

  criteriaTextInput: {
    padding: 5,
    paddingLeft: 12,
    marginTop: 10,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
  },

  criteriaHorzContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  homeTitleText: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },

  criteriaButton2: {
    backgroundColor: "#fff",
    padding: "3%",
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
});
