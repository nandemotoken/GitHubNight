<script>
  import { onMount } from 'svelte';

  let isGymActive = false;
  let isGameActive = false;
  let powerPoints = 0;
  let gymStartTime = null;
  let gameStartTime = null;

  // LocalStorageから初期データを読み込む
  onMount(() => {
    const savedPower = localStorage.getItem('powerPoints');
    if (savedPower) {
      powerPoints = parseInt(savedPower);
    }
  });

  // ジムを開始
  function startGym() {
    isGymActive = true;
    gymStartTime = new Date();
  }

  // ジムを終了
  function endGym() {
    if (!isGymActive) return;
    
    const endTime = new Date();
    const minutes = Math.floor((endTime - gymStartTime) / (1000 * 60));
    powerPoints += minutes;
    
    localStorage.setItem('powerPoints', powerPoints.toString());
    isGymActive = false;
    gymStartTime = null;
  }

  // ゲームを開始
  function startGame() {
    if (powerPoints > 0) {
      isGameActive = true;
      gameStartTime = new Date();
    }
  }

  // ゲームを終了
  function endGame() {
    if (!isGameActive) return;
    
    const endTime = new Date();
    const minutes = Math.floor((endTime - gameStartTime) / (1000 * 60));
    powerPoints = Math.max(0, powerPoints - minutes);
    
    localStorage.setItem('powerPoints', powerPoints.toString());
    isGameActive = false;
    gameStartTime = null;
  }
</script>

<main class="container">
  <h1>Power To Game 💪🎮</h1>

  <div class="power-gauge">
    <div class="gauge-label">Power Points: {powerPoints}分</div>
    <div class="gauge-bar">
      <div class="gauge-fill" style="width: {Math.min(powerPoints, 100)}%"></div>
    </div>
  </div>

  <div class="button-container">
    <div class="gym-controls">
      {#if !isGymActive}
        <button 
          on:click={startGym}
          class="start-btn"
        >
          ジムを開始 💪
        </button>
      {:else}
        <button 
          on:click={endGym}
          class="end-btn"
        >
          ジムを終了
        </button>
      {/if}
    </div>

    <div class="game-controls">
      {#if !isGameActive}
        <button 
          on:click={startGame}
          class="start-btn"
          disabled={powerPoints <= 0}
        >
          ゲームセンターを開始 🎮
        </button>
      {:else}
        <button 
          on:click={endGame}
          class="end-btn"
        >
          ゲームセンターを終了
        </button>
      {/if}
    </div>
  </div>

  {#if isGymActive}
    <div class="status active">
      ジム運動中... 💪
    </div>
  {/if}

  {#if isGameActive}
    <div class="status active">
      ゲームプレイ中... 🎮
    </div>
  {/if}
</main>

<style>
  .container {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
  }

  .power-gauge {
    margin: 2rem 0;
  }

  .gauge-label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .gauge-bar {
    width: 100%;
    height: 20px;
    background: #333;
    border-radius: 10px;
    overflow: hidden;
  }

  .gauge-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    transition: width 0.3s ease;
  }

  .button-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 2rem 0;
  }

  button {
    width: 100%;
    padding: 1rem;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;
  }

  button:active {
    transform: scale(0.98);
  }

  .start-btn {
    background: #4CAF50;
    color: white;
  }

  .end-btn {
    background: #f44336;
    color: white;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  .status {
    text-align: center;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.1);
  }

  .active {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
</style>