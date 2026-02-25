document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".l-header");
  const menuButton = document.querySelector(".l-header__menu-button");
  const navLinks = document.querySelectorAll(".l-header__nav-list-text a");

  if (!header || !menuButton) return;

  // メニューボタン押下：is-active をトグル
  menuButton.addEventListener("click", () => {
    header.classList.toggle("is-active");
  });

  // ナビリンク押下：is-active を削除
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("is-active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".l-slider-container", {
    // スライドの幅をCSS（@include width-vw）に依存させる
    slidesPerView: "auto",

    // ページネーションの設定
    pagination: {
      el: ".l-slider__pagenation",
      clickable: true, // クリックでスライド移動可能にする
    },
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // 複数の行があるため、すべて取得してループで初期化します
  const partnerSliders = document.querySelectorAll(".l-partners-slider__row");

  partnerSliders.forEach((slider) => {
    new Swiper(slider, {
      slidesPerView: "auto", // CSSで指定した幅（width-vw）を維持する
      loop: true, // 無限ループさせる
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



document.addEventListener("DOMContentLoaded", function () {
  // ▼▼ ここから前回の「同意チェックボックス」のコード ▼▼
  const agreementCheckbox = document.getElementById("js-agreement");
  const submitButton = document.getElementById("js-submit");

  if (agreementCheckbox && submitButton) {
    submitButton.disabled = !agreementCheckbox.checked;
    agreementCheckbox.addEventListener("change", function () {
      submitButton.disabled = !this.checked;
    });
  }
  // ▲▲ ここまで ▲▲

  // ▼▼ ここから「未入力エラー表示」と「非同期の送信処理」のコード ▼▼
  const form = document.getElementById("js-form");
  const successMessage = document.getElementById("js-success-message"); // 追加：完了メッセージの枠を取得

  if (form) {
    // 必須属性(required)がついている入力欄をすべて取得
    const requiredInputs = form.querySelectorAll("[required]");

    form.addEventListener("submit", function (e) {
      let isValid = true;

      // 1. まず過去のエラー表示をすべてリセットする
      const existingErrors = form.querySelectorAll(".c-error-msg");
      existingErrors.forEach((error) => error.remove());
      requiredInputs.forEach((input) => input.classList.remove("is-error"));

      // 2. 各必須項目をチェックする
      requiredInputs.forEach((input) => {
        // 空欄の場合（空白スペースのみも空欄とみなす）
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("is-error"); // 枠線を赤くするクラスを追加

          // エラーメッセージ（赤文字）を作成
          const errorMsg = document.createElement("span");
          errorMsg.classList.add("c-error-msg");
          errorMsg.textContent = "必須項目です。入力をお願いします。";

          // 入力欄の親要素（.td）の最後にエラーメッセージを追加
          const parentTd = input.closest(".td");
          // 姓・名など横並びの要素でエラー文が2つ重ならないようにする制御
          if (!parentTd.querySelector(".c-error-msg")) {
            parentTd.appendChild(errorMsg);
          }
        }
      });

      // 3. エラー判定と送信処理
      if (!isValid) {
        // 【エラーがある場合】送信をキャンセルし、最初のエラー箇所へスクロール
        e.preventDefault();

        const firstErrorInput = document.querySelector(".is-error");
        if (firstErrorInput) {
          firstErrorInput.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      } else {
        // ▼▼▼ 追加：【エラーがない場合】裏側で送信して完了画面を出す処理 ▼▼▼
        e.preventDefault(); // 通常の画面遷移（画面のチラつき）をストップ

        // ボタンを「送信中...」に変更し、連打（二重送信）を防ぐ
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = "送信中...";
        submitButton.disabled = true;

        // フォームの入力データを取得
        const formData = new FormData(form);

        // confirm.php へデータを非同期で送る
        fetch(form.action, { // form.action は "confirm.php" を指します
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              // 送信成功：フォームを隠して、完了メッセージを表示する
              form.style.display = "none";
              if (successMessage) {
                successMessage.style.display = "block";
                // 完了メッセージの位置へスクロールさせる
                successMessage.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            } else {
              throw new Error("Network response was not ok.");
            }
          })
          .catch((error) => {
            // 送信失敗（ネットワークエラー等）時の処理
            alert("通信エラーが発生しました。時間をおいて再度お試しください。");
            // ボタンを元の状態に戻す
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
          });
        // ▲▲▲ 追加処理 ここまで ▲▲▲
      }
    });

    // 4. （おまけ）ユーザーが入力し直したら、その場でエラー表示を消す
    requiredInputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value.trim()) {
          this.classList.remove("is-error");

          const parentTd = this.closest(".td");
          // 同じ親要素内の必須項目がすべて入力されたかチェック（姓・名の対策）
          const siblingInputs = parentTd.querySelectorAll("[required]");
          let allFilled = true;
          siblingInputs.forEach((sib) => {
            if (!sib.value.trim()) allFilled = false;
          });

          if (allFilled) {
            const errorMsg = parentTd.querySelector(".c-error-msg");
            if (errorMsg) errorMsg.remove();
          }
        }
      });
    });
  }
});