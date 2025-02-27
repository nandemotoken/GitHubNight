"use strict";
// クラス定義
class SleepApp {
    constructor() {
        this.currentSound = null;
        this.timerValue = 0;
        this.timerInterval = null;
        this.remainingTime = 0;
        // 音声ファイルの初期化
        this.sounds = new Map();
        this.initSounds();
        // DOM要素の取得
        this.volumeControl = document.getElementById("volume");
        this.timerDisplay = document.getElementById("timer-remaining");
        // イベントリスナーの設定
        this.setupEventListeners();
    }
    initSounds() {
        const soundTypes = ["rain", "waves", "forest", "whitenoise"];
        soundTypes.forEach((type) => {
            const audio = new Audio();
            // 音声ファイルのパスを設定
            audio.src = `sounds/${type}.mp3`;
            audio.loop = true;
            this.sounds.set(type, {
                element: audio,
                isPlaying: false,
            });
        });
    }
    setupEventListeners() {
        // 音声ボタンのイベントリスナー
        const soundButtons = document.querySelectorAll(".sound-btn");
        soundButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const target = e.currentTarget;
                const soundType = target.getAttribute("data-sound");
                this.toggleSound(soundType);
            });
        });
        // タイマーボタンのイベントリスナー
        const timerButtons = document.querySelectorAll(".timer-btn");
        timerButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const target = e.currentTarget;
                const time = parseInt(target.getAttribute("data-time") || "0");
                this.setTimer(time);
                // アクティブクラスの切り替え
                timerButtons.forEach((btn) => btn.classList.remove("active"));
                target.classList.add("active");
            });
        });
        // 音量調整のイベントリスナー
        this.volumeControl.addEventListener("input", () => {
            this.updateVolume();
        });
    }
    toggleSound(type) {
        var _a;
        // 現在再生中の音があれば停止
        if (this.currentSound && this.currentSound !== type) {
            const current = this.sounds.get(this.currentSound);
            if (current) {
                current.element.pause();
                current.isPlaying = false;
            }
            // アクティブクラスを削除
            (_a = document
                .querySelector(`.sound-btn[data-sound="${this.currentSound}"]`)) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
            // 背景色をリセット
            document.body.className = "";
        }
        const sound = this.sounds.get(type);
        if (!sound)
            return;
        const button = document.querySelector(`.sound-btn[data-sound="${type}"]`);
        if (this.currentSound === type && sound.isPlaying) {
            // 同じ音が再生中なら停止
            sound.element.pause();
            sound.isPlaying = false;
            this.currentSound = null;
            button === null || button === void 0 ? void 0 : button.classList.remove("active");
            document.body.className = "";
            // タイマーも停止
            this.clearTimer();
        }
        else {
            // 新しい音を再生
            sound.element.volume = parseInt(this.volumeControl.value) / 100;
            sound.element.play();
            sound.isPlaying = true;
            this.currentSound = type;
            button === null || button === void 0 ? void 0 : button.classList.add("active");
            // 背景色を変更
            document.body.className = `${type}-bg`;
        }
    }
    setTimer(minutes) {
        // 既存のタイマーをクリア
        this.clearTimer();
        if (minutes === 0) {
            // 無制限モード
            this.timerDisplay.textContent = "∞";
            return;
        }
        // タイマーを設定
        this.remainingTime = minutes * 60;
        this.updateTimerDisplay();
        this.timerInterval = window.setInterval(() => {
            this.remainingTime--;
            this.updateTimerDisplay();
            if (this.remainingTime <= 0) {
                this.stopAllSounds();
                this.clearTimer();
            }
        }, 1000);
    }
    updateTimerDisplay() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        this.timerDisplay.textContent = `${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    clearTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.timerDisplay.textContent = "00:00";
    }
    updateVolume() {
        const volume = parseInt(this.volumeControl.value) / 100;
        // 現在再生中の音があれば音量を更新
        if (this.currentSound) {
            const sound = this.sounds.get(this.currentSound);
            if (sound) {
                sound.element.volume = volume;
            }
        }
    }
    stopAllSounds() {
        this.sounds.forEach((sound) => {
            sound.element.pause();
            sound.isPlaying = false;
        });
        // アクティブクラスを削除
        document.querySelectorAll(".sound-btn").forEach((btn) => {
            btn.classList.remove("active");
        });
        this.currentSound = null;
        document.body.className = "";
    }
}
// アプリの初期化
document.addEventListener("DOMContentLoaded", () => {
    const app = new SleepApp();
});
//# sourceMappingURL=app.js.map