document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.l-header');
  const menuButton = document.querySelector('.l-header__menu-button');
  const navLinks = document.querySelectorAll('.l-header__nav-list-text a');

  if (!header || !menuButton) return;

  // メニューボタン押下：is-active をトグル
  menuButton.addEventListener('click', () => {
    header.classList.toggle('is-active');
  });

  // ナビリンク押下：is-active を削除
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('is-active');
    });
  });
});




document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.l-slider-container', {
    // スライドの幅をCSS（@include width-vw）に依存させる
    slidesPerView: 'auto',
    
    // ページネーションの設定
    pagination: {
      el: '.l-slider__pagenation',
      clickable: true, // クリックでスライド移動可能にする
    },
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // 複数の行があるため、すべて取得してループで初期化します
  const partnerSliders = document.querySelectorAll('.l-partners-slider__row');

  partnerSliders.forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: 'auto', // CSSで指定した幅（width-vw）を維持する
      loop: true,            // 無限ループさせる
      allowTouchMove: false, // タッチによるスワイプ操作を無効化する
      
      // 流れるスピード（ミリ秒）。
      // 1枚のスライドが流れる速度です。数値が大きいほど「ゆっくり」になります。
      speed: 6000,           
      
      autoplay: {
        delay: 0, // 0にすることで、停止することなく流れ続けます
        disableOnInteraction: false,
      },
    });
  });
});