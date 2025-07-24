import {useIsFocused} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {timeFormate_mmss} from '../service/Api';

const TimerCounter = ({remainingTime = 0}) => {
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    timeLeft: 0,
  });

  const updateTimeLeft = () => {
    let {timeLeft} = state;
    timeLeft = timeLeft > 0 ? timeLeft - 1 : 0;
    setState({...state, timeLeft});
  };

  useEffect(() => {
    (async () => {
      if (remainingTime > 0) setState({...state, timeLeft: remainingTime});
    })();
    // console.log('timercount');
  }, []);

  useEffect(() => {
    if (isFocused && state.timeLeft > 0) setTimeout(updateTimeLeft, 1000);
  }, [state.timeLeft]);

  return (
    <>
      {state.timeLeft > 0 && (
        <Text style={styles.title}>
          {`Remaining Time : ${timeFormate_mmss(
            Math.round(state.timeLeft),
          )} mins`}
          {/* {state.timeLeft} */}
        </Text>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Avenir-Medium',
    fontWeight: '500',
    fontSize: 14,
    color: '#000',
  },
});
export default TimerCounter;
