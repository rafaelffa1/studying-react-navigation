import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

const ZoomableView = () => {
    const scale = useSharedValue(1);
    const MAX_SCALE = 3;  // Limite máximo de zoom
    const MIN_SCALE = 0.5;  // Limite mínimo de zoom
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
      };
    });
  
    const onPinchGestureEvent = (event) => {
      scale.value = Math.max(MIN_SCALE, Math.min(MAX_SCALE, event.scale));
    };
  
    const onPinchHandlerStateChange = (event) => {
      if (event.nativeEvent.state === 5) { // State.END
        // Normaliza a escala para dentro dos limites
        scale.value = withSpring(Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale.value)), { damping: 20 });
      }
    };
  
    const zoomIn = () => {
      scale.value = withSpring(Math.min(MAX_SCALE, scale.value * 1.2), { damping: 20 });
    };
  
    const zoomOut = () => {
      scale.value = withSpring(Math.max(MIN_SCALE, scale.value / 1.2), { damping: 20 });
    };
  return (
    <GestureHandlerRootView style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}
      >
        <Animated.View style={[styles.box, animatedStyle]} />
      </PinchGestureHandler>
      <View style={styles.controls}>
        <Button title="Zoom In" onPress={zoomIn} />
        <Button title="Zoom Out" onPress={zoomOut} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 50,
  },
});

export default ZoomableView;
