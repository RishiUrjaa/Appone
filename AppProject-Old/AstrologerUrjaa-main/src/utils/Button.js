import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const SubmitButton = (title, callback) => (
  <TouchableOpacity style={styles.btn_touch} onPress={callback}>
    <View style={styles.btn_lineargradient}>
      <Text style={styles.btn_label}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn_touch: {
    margin: 20,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFC629',
  },
  btn_label: {
    fontFamily: 'AvenirLTStd-Medium',
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
  },
  btn_lineargradient: {
    paddingVertical: 10,
  },
});
