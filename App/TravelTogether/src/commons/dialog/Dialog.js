import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import {COLOR} from '../../constants';
import PropTypes from 'prop-types';

const Dialog = ({
  visible,
  isDisplayTitle,
  title,
  isDisplayNegativeButton,
  negativeButtonText,
  isDisplayPositiveButton,
  positiveButtonText,
  onPressPositiveButton,
  onPressNegativeButton,
  renderContent,
}) => {
  Dialog.propTypes = {
    visible: PropTypes.bool.isRequired,
    isDisplayTitle: PropTypes.bool,
    title: PropTypes.string,
    isDisplayNegativeButton: PropTypes.bool,
    negativeButtonText: PropTypes.string,
    isDisplayPositiveButton: PropTypes.bool,
    positiveButtonText: PropTypes.string,
    onPressNegativeButton: PropTypes.func,
    onPressPositiveButton: PropTypes.func,
    renderContent: PropTypes.shape({}).isRequired,
  };
  Dialog.defaultProps = {
    isDisplayTitle: false,
    title: '',
    isDisplayNegativeButton: false,
    negativeButtonText: '',
    isDisplayPositiveButton: true,
    positiveButtonText: 'Đóng',
    onPressNegativeButton: () => {},
    onPressPositiveButton: () => {},
  };

  const renderTitle = () => {
    if (isDisplayTitle) {
      return (
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
      );
    }
  };

  const renderBody = () => {
    return <View style={styles.bodyView}>{renderContent}</View>;
  };

  const renderButton = () => {
    if (isDisplayNegativeButton && isDisplayPositiveButton) {
      return (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.negativeButton}
            onPress={onPressNegativeButton}>
            <Text style={styles.negativeButtonTextStyle}>
              {negativeButtonText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.positiveButton}
            onPress={onPressPositiveButton}>
            <Text style={styles.positiveButtonTextStyle}>
              {positiveButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (isDisplayNegativeButton) {
      return (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={[
              styles.negativeButton,
              {width: '100%', borderRightWidth: 0},
            ]}
            onPress={onPressNegativeButton}>
            <Text style={styles.negativeButtonTextStyle}>
              {negativeButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (isDisplayPositiveButton) {
      return (
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={[styles.positiveButton, {width: '100%', borderLeftWidth: 0}]}
            onPress={onPressPositiveButton}>
            <Text style={styles.positiveButtonTextStyle}>
              {positiveButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <View style={styles.screenView}>
        <View style={styles.containerView}>
          {renderTitle()}
          {renderBody()}
          {renderButton()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
    backgroundColor: COLOR.black_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerView: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  titleView: {
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bodyView: {
    width: '100%',
    minHeight: 100,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
  },
  buttonView: {
    width: '100%',
    flexDirection: 'row',
  },
  negativeButton: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
    borderRightColor: '#E2E2E2',
    borderRightWidth: 1,
  },
  negativeButtonTextStyle: {
    fontSize: 16,
    color: '#1475E1',
  },
  positiveButton: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
    borderLeftColor: '#E2E2E2',
    // borderLeftWidth: 0.5,
  },
  positiveButtonTextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1475E1',
  },
});

export default Dialog;
