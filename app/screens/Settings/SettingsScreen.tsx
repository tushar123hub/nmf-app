import React, { useState } from "react";
import { View, TouchableWithoutFeedback, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ExpoConstants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useDispatch , useSelector } from "react-redux";

import { ImagesAssets } from "constant";
import { Button, Text, SocialMedia, ListItem, ListItemSwitch } from "components";
import { t, platform } from "utils";
import { navigate } from "navigation";
import { NavStatelessComponent } from "interfaces";
import { userPreferences } from "ducks";

import styles from "./SettingsScreen.styles";
import navigationOptions from "./SettingsScreen.navigationOptions";
import quotes from "../../../assets/quotes/quotes.json";




const quoteIndex = Math.floor(Math.random() * Math.floor(quotes.length));

const SettingsScreen: NavStatelessComponent = () => {
  const navigation = useNavigation();
  const navigator = navigate(navigation);
  const dispatch = useDispatch();


  const rowItems = [
   
    {
      isSwitchItem: true,
      title: t("SETTINGS_SCREEN_UNITS"),
      value: useSelector(userPreferences.selectors.getUseMetricUnits),
      get onChange() {return () => {
        dispatch(userPreferences.actions.toggleUnits(!this.value))
      }}
    },
    {
      title: t("SETTINGS_SCREEN_MY_LOCATION"),
      onPress: navigator.openMyLocation,
    },
  ];
  const [steps, setSteps] = useState(0);
  const { version, ios, android } = ExpoConstants.manifest;
  const buildNumber = platform.isIOS ? ios.buildNumber : android.versionCode; 

  return (
    <ScrollView style={styles.container}>
      {rowItems.map((item, index) => {
        if (item.isSwitchItem) {
          return <ListItemSwitch
            key={index}
            showBottomLine={index !== rowItems.length - 1}
            value={item.value}
            onChange={item.onChange}
            title={item.title}
          />
        } else {
          return <ListItem
            key={index}
            showBottomLine={index !== rowItems.length - 1}
            onPress={() => item.onPress()}
            title={item.title}
          />
        }
      })}
      <TouchableWithoutFeedback onPress={() => setSteps(steps + 1)}>
        <View style={styles.logoNMFContainer}>
          <Image style={styles.logoNMF} resizeMode="contain" source={ImagesAssets.logos.nmf} />
        </View>
      </TouchableWithoutFeedback>

      <Text.Tertiary bold lightGray style={styles.appVersionTitle}>
        {t("SETTINGS_SCREEN_APP_VERSION", { version }) + "-" + buildNumber}
      </Text.Tertiary>
      {!__DEV__ && (
        <View style={styles.textContainer}>
          <Text.Secondary darkGray center style={styles.quote}>
            {quotes[quoteIndex].quote}
          </Text.Secondary>
          <Text.Primary bold center style={styles.author}>
            {quotes[quoteIndex].author}
          </Text.Primary>
        </View>
      )}

      {steps > 4 ? (
        <View>
          <Button.Primary
            fullWidth
            style={styles.hiddenBtn}
            text={"Open Storybook"}
            onPress={navigator.openStorybook}
          />
          <Button.Danger
            fullWidth
            style={styles.hiddenBtn}
            text={"Crash test"}
            onPress={() => {
              const date = new Date();
              const timestamp = date.getTime();
              throw new Error("Developer error test: " + timestamp);
            }}
          />
        </View>
      ) : null}
    </ScrollView>
  );
};

SettingsScreen.navigationOptions = navigationOptions();

export default SettingsScreen;
