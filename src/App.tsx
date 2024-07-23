import React, { useState, useEffect, useRef } from 'react';
import CameraMicAccessPopup from './CameraMicAccessPopup';
import styles from './CameraMicAccessPopup.module.css'; 

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [isLive, setIsLive] = useState(true); 
  const mediaStreamsRef = useRef<MediaStream[]>([]);

  const stopMediaStreams = () => {
    mediaStreamsRef.current.forEach(stream => {
      if (stream && stream.getTracks) { 
        stream.getTracks().forEach(track => {
          track.stop();
          console.log('Track stopped:', track.kind, 'ID:', track.id);
        });
      }
    });
    mediaStreamsRef.current = []; 
  };

  useEffect(() => {
    const checkPermissions = async () => {
      let audioGranted = false;
      let videoGranted = false;
      const streams: MediaStream[] = [];
      
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioGranted = true;
        streams.push(audioStream);
      } catch (err) {
        console.log('Microphone access denied', err);
      }
      
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoGranted = true;
        streams.push(videoStream);
      } catch (err) {
        console.log('Camera access denied', err);
      }
      
      mediaStreamsRef.current = streams;
      
      if (audioGranted || videoGranted) {
        setPermissionsGranted(true);
      } else {
        setPermissionsGranted(false);
        setIsModalOpen(true);
      }
    };

    checkPermissions();

    return () => {
      stopMediaStreams();
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      stopMediaStreams();
      event.preventDefault(); 
      event.returnValue = ''; 
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleEndLive = () => {
    stopMediaStreams();
    setIsLive(false);
    setPermissionsGranted(false); //
  };

  return (
    <div>
      <h1>Live Session</h1>
      {!isLive && (
        <p className={styles.welcome}>Live session ended</p>
      )}
      {permissionsGranted ? (
        <div>
          {isLive ? (
            <p className={styles.welcome}>Welcome to the live session!</p>
          ) : (
            <p className={styles.welcome}>Live session ended</p>
          )}
          {isLive && (
            <div className={styles.centered}> 
            <button className={styles.endLiveButton} onClick={handleEndLive}>
              End Live 
            </button>
          </div>
          )}
        </div>
      ) : (
        <CameraMicAccessPopup
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
