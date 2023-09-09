import { Slider } from '@draftbit/ui';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const SeekBar = ({ trackDuration, currentPosition, onSeek }) => {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    setSliderValue((currentPosition / trackDuration) * 100);
  }, [trackDuration, currentPosition]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    onSeek((value / 100) * trackDuration);
  };

  return (
    <View style={{width:200}}>
      <Slider
        value={sliderValue}
        // onValueChange={handleSliderChange}
        minimumValue={0}
        maximumValue={100}
        step={0.1}
      />
    </View>
  );
};

export default SeekBar;
