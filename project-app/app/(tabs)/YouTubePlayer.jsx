import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const YouTubePlayer = ({videoUrl}) => {
    const [playing, setPlaying] = useState(false);

    // Extract the video ID from the YouTube URL
    const getVideoId = (url) => {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('v');
    };
  
    const videoId = getVideoId(videoUrl);
  
    return (
      <View style={{}}>
        {videoId ? (
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={videoId}
            onChangeState={(event) => setPlaying(event === 'playing')}
          />
        ) : (
          <Text>Invalid YouTube URL</Text>
        )}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
  });

export default YouTubePlayer;
