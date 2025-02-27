// パーティクル設定
document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#64ffda",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#64ffda",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
});

// スクロールアニメーション
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const cards = document.querySelectorAll(".card");
  const advantageItems = document.querySelectorAll(".advantage-item");
  const paperItems = document.querySelectorAll(".paper-item");

  // 初期状態で非表示
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
  });

  timelineItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
  });

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
  });

  advantageItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
  });

  paperItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";
  });

  // スクロール時のアニメーション
  function checkScroll() {
    const triggerBottom = window.innerHeight * 0.8;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
        section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      }
    });

    timelineItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < triggerBottom) {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
          item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }, index * 200);
      }
    });

    cards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerBottom) {
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
          card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }, index * 200);
      }
    });

    advantageItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < triggerBottom) {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
          item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }, index * 200);
      }
    });

    paperItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < triggerBottom) {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
          item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }, index * 200);
      }
    });
  }

  // 初期表示時にもチェック
  checkScroll();

  // スクロール時にチェック
  window.addEventListener("scroll", checkScroll);
});

// ニューラルネットワークの視覚化（ヘッダー背景用）
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");

  // ランダムな線を描画
  function createNeuralNetworkBackground() {
    const canvas = document.createElement("canvas");
    canvas.classList.add("neural-network-bg");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.opacity = "0.2";
    canvas.style.zIndex = "0";

    header.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;

    const nodes = [];
    const nodeCount = 30;
    const connectionDistance = 150;

    // ノードの作成
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ノードの描画と移動
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // ノードの移動
        node.x += node.vx;
        node.y += node.vy;

        // 画面外に出たら反対側から再登場
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        // ノードの描画
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#64ffda";
        ctx.fill();

        // 接続線の描画
        for (let j = i + 1; j < nodes.length; j++) {
          const otherNode = nodes[j];
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `rgba(100, 255, 218, ${
              1 - distance / connectionDistance
            })`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    // リサイズ時にキャンバスサイズを調整
    window.addEventListener("resize", function () {
      canvas.width = header.offsetWidth;
      canvas.height = header.offsetHeight;
    });
  }

  createNeuralNetworkBackground();
});

// カードのホバーエフェクト強化
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });
});

// スクロールトップボタン
document.addEventListener("DOMContentLoaded", function () {
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.classList.add("scroll-top-btn");
  scrollTopBtn.style.position = "fixed";
  scrollTopBtn.style.bottom = "20px";
  scrollTopBtn.style.right = "20px";
  scrollTopBtn.style.width = "50px";
  scrollTopBtn.style.height = "50px";
  scrollTopBtn.style.borderRadius = "50%";
  scrollTopBtn.style.backgroundColor = "var(--accent-color)";
  scrollTopBtn.style.color = "var(--primary-color)";
  scrollTopBtn.style.border = "none";
  scrollTopBtn.style.fontSize = "1.2rem";
  scrollTopBtn.style.cursor = "pointer";
  scrollTopBtn.style.display = "none";
  scrollTopBtn.style.zIndex = "100";
  scrollTopBtn.style.boxShadow = "0 0 10px var(--glow-color)";

  document.body.appendChild(scrollTopBtn);

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.display = "block";
      scrollTopBtn.style.opacity = "1";
    } else {
      scrollTopBtn.style.opacity = "0";
      setTimeout(() => {
        if (window.pageYOffset <= 300) {
          scrollTopBtn.style.display = "none";
        }
      }, 300);
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
