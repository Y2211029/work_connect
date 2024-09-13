export function Card() {

    // カード情報を格納
    let elements = [];

    // カードの初期値
    let elementInit = {
        id: undefined,
        color: undefined,
        selfHeight: 0,
        y: 0
    };

    // 列数
    let row = 3;

    // 挿入先コンテナ
    const cardsContainer = document.getElementById('card-container');

    // 追加ボタン
    const cardsAddBtn = document.getElementById('card-add');

    //カード高さの最大値と最小値
    const heightMax = 400;
    const heightMin = 100;

    // 色のパターンとカード間の隙間（px）
    const colors = ['red', 'yellow', 'green', 'orange', 'blue', 'purple'];
    const cardGap = 10;

    // 追加ボタンにイベントリスナーを付与
    cardsAddBtn.addEventListener('click', () => {
        return onClickAdd();
    })

    // イベントリスナーの内容
    let onClickAdd = () => {
        let card = createCard();
        insertCard(card.dom);
        scanAdd(card.id);
    }

    // カードのDOMを新規作成
    let createCard = () => {
        let info = { ...elementInit };

        // カードの要素をdivで作成
        let contain = document.createElement("DIV");
        contain.setAttribute('class', 'c-card-container');

        // IDをランダムに作成、記録
        let idname = Math.random().toString(32).substring(2);
        contain.setAttribute('id', idname);
        info.id = idname;

        // カードに表示される画像（一色塗り潰し）を設定、記録
        // colorsの値と画像名が同じ。
        let card = document.createElement("IMG");
        let color = colors[Math.floor(Math.random() * colors.length)];
        info.color = color;

        // IMG要素にカラーの画像とクラス名を付与
        card.setAttribute('src', './' + color + '.png');
        card.setAttribute('class', 'c-card-img');

        // カードに対して不明な高さを与える
        info.selfHeight = Math.floor(Math.random() * (heightMax + 1 - heightMin)) + heightMin;

        // カードDIVにIMGを追加
        contain.appendChild(card);

        // elementsに記録。DOMとIDを返す
        elements.push(info);
        return { dom: contain, id: idname };
    }

    // カードコンテナーにカードを追加する
    let insertCard = (cardDom) => {
        cardsContainer.appendChild(cardDom);
    }

    // これが大切
    // IDで紐づいたDOMに対して高さと位置を決定させる。
    let scanAdd = (id) => {
        // elementsから対象カードのIDの番号、情報を取得
        let index = elements.findIndex(ele => { return ele.id === id });
        let ele = elements[index]

        // DOMを取得
        let dom = document.getElementById(ele.id);

        // index、つまりカードが何晩目かと列数でx,yの位置を決定する。
        let height = ele.selfHeight
        ele.y = (index < row) ? height : elements[index - row].y + height;
        let x = (index % (row) * 100) + '%';
        let y = (index < row) ? 0 : elements[index - row].y;

        // 位置をずらすスタイルを適用
        dom.setAttribute('style', `height:${height}px; transform:translate(${x},${y}px);`)

        // アニメーション用のスタイルを追加
        setTimeout(() => {
            dom.classList.add('u-animate')
        }, 500);
    }
}

