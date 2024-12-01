import { useState } from 'react';
import { ParticleNetwork } from '@particle-network/auth';

// Particle Networkの設定
const particle = new ParticleNetwork({
  projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID,
  clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY,
  appId: import.meta.env.VITE_PARTICLE_APP_ID,
  chainName: 'ethereum',
  chainId: 1,
  wallet: {
    displayWalletEntry: true,
  }
});

function App() {
  const [userInfo, setUserInfo] = useState<any>(null);

  const handleLogin = async () => {
    try {
      const response = await particle.auth.login({
        preferredAuthType: 'discord',
      });
      console.log('Login success:', response);
      setUserInfo(response);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await particle.auth.logout();
      setUserInfo(null);
      console.log('Logout success');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Particle Auth Test</h1>
      {!userInfo ? (
        <button 
          onClick={handleLogin}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#7289DA', // Discordカラー
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Discord でログイン
        </button>
      ) : (
        <div>
          <p>ログイン中: {userInfo.uuid}</p>
          <button 
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#DD4B4B',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ログアウト
          </button>
        </div>
      )}

      {/* デバッグ情報 */}
      {userInfo && (
        <pre style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5' }}>
          {JSON.stringify(userInfo, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;