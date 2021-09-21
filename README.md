![Current Version](https://img.shields.io/badge/MogiCasher[HTML_Edition]-0.5-blue)

# 模擬部のレジ[HTML版]
アプデするたびにいちいちexe化しないと配れないのが面倒くさいというわけで、HTMLに移植してみる。  
使い方をちゃんと読んでから使おう  
[プレビュー公開中](https://mogi-htmledition.vercel.app)

![overall](https://user-images.githubusercontent.com/88261399/133916404-a8fff502-a9b2-40f0-bd32-566421788403.png)

# 使い方
## 始める前に
⚠️このソフトはオフラインソフトです。HTMLで作成したのでWebページで公開しているだけで、実際に使うときはオフラインです。
### 動作環境
<p>いわゆる「パソコン」で実行できます。<strong>ブラウザ上で実行されるので、特殊なソフトはいりません。</strong><br>
  スマホでの実行はできません。(※<a href="https://mogi-htmledition.vercel.app">プレビューページ</a>はWebサイトなのでスマホでも見られますが、機能に制限があります)</p>
<p>また、画面のレイアウトは<strong>FullHD(1920x1080)モニター全画面</strong>か<strong>左右分割画面</strong>を想定しています。<br>これより小さいと表示が汚くなります。</p>

### DL/インストール
<p>GitHubページの右上の方にある<strong>Codeボタン</strong>からZIPをDLした後、解凍してください。<br>
  <strong>インストール作業はありません。</strong>そのまま使えます。</p>

![github](https://user-images.githubusercontent.com/88261399/133916135-8f7c7d60-1d65-47d3-b957-1196603235a9.png)

### 実行&終了
<p>解凍したフォルダ(Mogi_Casher-HTML-master)の中にある<strong>index.html</strong>をダブルクリックしてください。<br>
ブラウザが開いてソフトが使えるようになります。</p>
<p>ブラウザの×ボタンでいつでも終了できます。</p>

![files](https://user-images.githubusercontent.com/88261399/133995324-5b308d8d-ae7d-48e6-96e3-9d33bdb7a48c.png)

### CSV
<p>このソフトをレジ(?)として使うためには、決まった型のCSVファイルが必要です。</p>

| TAG | CODE | PRICE | UNITS |
| --- | --- | --- | --- |
| #1 | 01234567 | 100 | 0 |
| ... | ... | ... | ... |

`TAG`列...商品の名前  
`CODE`列...バーコード  
`PRICE`列...値段  
`UNITS`列...個数

SpreadsheetやExcelで上のような表を作ってからCSVで保存するのが手っ取り早いね。

CSVファイルはこんな感じ。
```
#-- example.csv --

TAG,CODE,PRICE,UNITS
#1,01234567,100,0
```
なお、読み込んだCSVから自動で画面の表を作るようにしているので、**何行(つまり何品目)でもOKです。**

## 実際に使ってみる

# 諸連絡(プログラマー向け)
## ファイル構成
以下のファイル構成で動いています。
```
dir
  - images
    - htmlのアイコン
    
  - paper-kit-2
    - デザインテンプレート
   
  - database.js     #配列データを処理する関数だけをまとめたファイル
  - index.css       #要素の書式を指定するファイル
  - index.html      #ソフト本体
  - main.js         #ごちゃごちゃ関数が書いてあるファイル
  - vercel.json     #プレビューサイトの設定(動作には関係ない)
```

## デザインテンプレート
デザインのテンプレートには`Paper Kit 2`を使いました。  
[Visit Paper Kit 2 Demo Site](https://demos.creative-tim.com/paper-kit-2/)

![paperkit](https://user-images.githubusercontent.com/88261399/133916425-6a5de5dd-302c-4ccb-934a-227ffcb8312c.png)

## Python版※放棄中
9月頭まで作ってたソフト。中途半端なところで終わってます  
[Visit Mogi_Casher](https://github.com/DarthRommy/Mogi_Casher)

![casher_python](https://user-images.githubusercontent.com/88261399/133916512-8828953a-bc06-4886-a9f9-64eeee050127.png)
