import {View, Text, StatusBar, TouchableOpacity, Image} from 'react-native';

import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {GiftedChat} from 'react-native-gifted-chat';
import {SimpleHeader} from '../utils/Header';
import {StatusBarLight} from '../utils/CustomStatusBar';
import {globStyle} from '../styles/style';

const ChatScreen = ({navigation}) => {
  const [state, setState] = useState({
    messages: [],
  });
  const onSend = (messages = []) => {
    setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  };

  return (
    <SafeAreaProvider style={globStyle.safeAreaView}>
      <StatusBarLight />
      {SimpleHeader('Chat History', () => navigation.goBack())}

      <GiftedChat
        messages={state.messages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaProvider>
  );
};

export default ChatScreen;
