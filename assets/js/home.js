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
