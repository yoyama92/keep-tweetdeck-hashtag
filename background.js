(async function () {
  "use strict";

  /**
   * ツイートの末尾にハッシュタグを追加する。
   * @param {*} tweetTextArea ツイート入力欄
   * @param {*} hashtags 追加するハッシュタグのリスト
   * @returns 
   */
  function appendHashtag(tweetTextArea, hashtags) {

    // ハッシュタグが設定されていないときは何もしない。
    if (hashtags.length == 0) {
      return;
    }
    const hashtag = ' #' + hashtags.join(' #');
    if (tweetTextArea !== null) {
      tweetTextArea.value += ` ${hashtag}`;

      // 先頭にカーソルを移動して選択状態にする。
      tweetTextArea.selectionStart = 0;
      tweetTextArea.selectionEnd = 0;
      tweetTextArea.focus();
      tweetTextArea.dispatchEvent(new Event('change'));
    }
  }

  /**
   * ハッシュタグ入力欄を追加する。
   * @param {*} tweetTextArea ツイート入力欄
   * @returns ハッシュタグ入力欄
   */
  function appendHashtagArea(tweetTextArea) {
    const hashtagArea = document.createElement('input')
    hashtagArea.style.color = "black";

    const button = document.createElement('button');
    button.innerText = '反映';
    button.addEventListener("click", function () {

      const hashtags = hashtagArea.value.split(',');
      appendHashtag(tweetTextArea, hashtags)
    });

    const parent = tweetTextArea.parentElement;
    parent.parentElement.insertBefore(button, parent.nextSibling)
    parent.parentElement.insertBefore(hashtagArea, button);

    return hashtagArea
  }

  /**
   * ツイート入力欄のノードを取得する。
   * @returns ツイート入力欄
   */
  function getTweetTextArea() {
    const tweetTextArea = document.querySelector('textarea.js-compose-text.compose-text');
    return tweetTextArea;
  }

  /**
   * 実行する
   * @returns 
   */
  function run() {
    const tweetTextArea = getTweetTextArea();
    if (tweetTextArea == null) {
      setTimeout(run, 1000);
      return;
    }

    const hashtagArea = appendHashtagArea(tweetTextArea)
    const tweetTextAreaObserver = new MutationObserver(function () {
      if (tweetTextArea.disabled) {
        return;
      }

      const hashtags = hashtagArea.value.split(',');
      appendHashtag(tweetTextArea, hashtags)
    });

    tweetTextAreaObserver.observe(tweetTextArea, {
      "attributes": true,
      "attributeFilter": ["disabled"]
    });

    const check = document.querySelector("footer > label > input")
    if (check !== null && !check.checked) {
      check.click();
    }
  }

  run();
})();