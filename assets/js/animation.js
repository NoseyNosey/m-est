// DOMの読み込みが完了してから実行
document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".fade");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      // 画面内に入っていないときは何もしない
      if (!entry.isIntersecting) return;

      // 画面に入ったらクラスを付与
      entry.target.classList.add("is-show");

      // 一度表示したら監視を解除（1回きりのアニメーションの場合）
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.2 // 20%見えたら発火
  });

  // 各要素を監視対象に登録
  targets.forEach((el) => observer.observe(el));
});