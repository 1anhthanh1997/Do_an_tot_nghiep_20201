import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import tripDetailStyles from './TripDetailStyles';
import SlidingUpPanel from 'rn-sliding-up-panel';

const TripDetail = () => {
  return (
    <View style={tripDetailStyles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={tripDetailStyles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
      <SlidingUpPanel
        ref={(c) => c}
        draggableRange={{top: 600, bottom: 120}}
        // animatedValue={this._draggedValue}
        showBackdrop={true}>
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
          </View>
          <View style={styles.container}>
            <Text>Bottom Sheet Content</Text>
          </View>
        </View>
      </SlidingUpPanel>
    </View>
  );
};

export default TripDetail;

// import React from 'react';
// import {Text, View, Dimensions} from 'react-native';
//
// import SlidingUpPanel from 'rn-sliding-up-panel';
//
// const {height} = Dimensions.get('window');
//
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1,
  },
};
//
// class TripDetail extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Hello world</Text>
//         <SlidingUpPanel
//           ref={(c) => (this._panel = c)}
//           draggableRange={{top: height / 1, bottom: 120}}
//           animatedValue={this._draggedValue}
//           showBackdrop={true}>
//           <View style={styles.panel}>
//             <View style={styles.panelHeader}>
//               <Text style={{color: '#FFF'}}>Bottom Sheet Peek</Text>
//             </View>
//             <View style={styles.container}>
//               <Text>Bottom Sheet Content</Text>
//             </View>
//           </View>
//         </SlidingUpPanel>
//       </View>
//     );
//   }
// }
//
// export default TripDetail;
