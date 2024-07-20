
import React, { useState, useEffect } from 'react';
import CameraMicAccessPopup from './CameraMicAccessPopup';
import styles from './CameraMicAccessPopup.module.css'; 

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        console.log('Permissions granted');
        setPermissionsGranted(true);
      } catch (err) {
        console.log('Permissions denied', err);
        setPermissionsGranted(false);
        setIsModalOpen(true);
      }
    };

    checkPermissions();
  }, []);

  return (
    <div>
      <h1>Live Session</h1>
      {permissionsGranted ? (
        <p  className={styles.welcome} >Welcome to the live session!</p> 
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
