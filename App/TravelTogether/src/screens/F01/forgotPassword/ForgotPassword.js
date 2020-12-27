import ReactNativeAN from 'react-native-alarm-notification';
import React, {useEffect} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {SOCKET} from '../../../constants';
const socket = SOCKET.socket;

const fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 10000)); // set the fire date for 1 second from now

const alarmNotifData = {
  title: 'Alarm',
  message: 'Stand up',
  vibrate: true,
  play_sound: true,
  schedule_type: 'once',
  channel: 'wakeup',
  data: {content: 'my notification id is 22'},
  loop_sound: true,
  has_button: true,
};

const ForgotPassword = () => {
  // Create WebSocket connection.
  useEffect(() => {
    socket.on('room', async (data) => {
      console.log('room join');
      console.log(data);
      ReactNativeAN.sendNotification(alarmNotifData);
      // Schedule Future Alarm
      const alarm = await ReactNativeAN.scheduleAlarm({
        ...alarmNotifData,
        fire_date: fireDate,
      });
    });
  }, []);
  const createAlarm = async () => {
    socket.emit('join', {room: 'test-room'});
    // socket.send('Hello');
    // ReactNativeAN.sendNotification(alarmNotifData);
    //Schedule Future Alarm
    // const alarm = await ReactNativeAN.scheduleAlarm({
    //   ...alarmNotifData,
    //   fire_date: fireDate,
    // });
    // console.log(alarm); // { id: 1 }
    // //Delete Scheduled Alarm
    // ReactNativeAN.deleteAlarm(alarm.id);
    //
    // //Delete Repeating Alarm
    // ReactNativeAN.deleteRepeatingAlarm(alarm.id);
    //
    // //Stop Alarm
    // ReactNativeAN.stopAlarmSound();
    //Send Local Notification Now
    // ReactNativeAN.sendNotification(alarmNotifData);
    //
    // //Get All Scheduled Alarms
    // const alarms = await ReactNativeAN.getScheduledAlarms();
    //
    // //Clear Notification(s) From Notification Center/Tray
    // ReactNativeAN.removeFiredNotification(alarm.id);
    // ReactNativeAN.removeAllFiredNotifications();
  };

  return (
    <TouchableOpacity style={{height: 50, width: 100}} onPress={createAlarm}>
      <Text>Hello</Text>
    </TouchableOpacity>
  );
};

export default ForgotPassword;
