import React, {useState} from 'react';
import {Modal, ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLOR} from '../../constants';
import PropTypes from 'prop-types';

const LoadingView = ({visible}) => {
  LoadingView.propTypes = {
    visible: PropTypes.bool.isRequired,
  };
  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <View style={styles.screenView}>
        <ActivityIndicator size={'large'} color={COLOR.red} />
      </View>
    </Modal>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: COLOR.black_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
