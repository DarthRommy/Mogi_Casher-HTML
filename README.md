![Current Version](https://img.shields.io/badge/MogiCasher[HTML_Edition]-v0.5-blue)
![Code](https://img.shields.io/badge/Format-HTML5+JavaScript-red)
![Type](https://img.shields.io/badge/Type-Online/Offline-orange)
![Statement](https://img.shields.io/badge/State-In_Developing-purple)

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

| カラム名 | なにこれ？ |
| :--- | --- |
| `TAG` | 商品の名前 |
| `CODE` | バーコード |
| `PRICE` | 値段 |
| `UNITS` | 個数 |

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

## 2022年の担当者へ
**なんかもう、集計から全部含めてWebアプリ化しちゃえば？**
### Vercel最強
![vercel](https://user-images.githubusercontent.com/88261399/134183733-d14542bd-4b06-41ee-abc2-fcdaaf1dc5e9.png)

この欄を読んでいる人ならまあ多分当然のごとく知ってると思うけど、この世には[Vercel](https://vercel.com)という素晴らしいWebサイト提供サービス(表現の仕方が分からん)が存在する。今年はWebアプリ化はしていないからプレビューページに使うレベルに留まってるけどね。

Vercelの強みは、GitHubのレポジトリの中身をそのままWebサイトにできるところだ。GitHubはソフトウェアの共同開発ツール。つまり、
### GitHubにコードを上げてVercelでWebアプリを作れば、模擬部全体で現状を共有しながら開発できる！！！
しかも更新は速攻Vercelが反映してくれるから、
1. 現状を確認・共有する
2. Issueで欲しい機能や使いにくい部分を報告する
3. 開発担当者はそれを受けて速攻で対応できる！

というサイクルができるわけ。しかも一番重要な2はプログラミングのスキルが一切なくてもできる。  
そういうことが出来たら結構楽しいんじゃないかなあ…と思う。  
ソースコードを公開してセキュリティーが心配なら、そこはPrivateにして模擬部のアカウント作って制限掛けるみたいなことをすればいいし。

**まあ模擬村がボトルネックだからあんまり意味ないかもしんないけどね**

もっと大事なところを忘れてた。
### 引継ぎが圧倒的に楽になる
Webアプリ化しようがしまいが、GitHubにコードとシステム解説を上げておけばわざわざこっちから資料を印刷して渡さなくても

**次の年の担当者が見に来て「ああなるほどね」とか言って色々決められる。**  

> というのも、僕自身が去年からの引継ぎをしていない。結果的にはGoogle Formの導入で大幅にシステムが変わったから影響はほぼなかった。

これから先のシステムはソフトウェアだろうから、ソースコードが分からん=去年何やってたか分からん状態になる。毎年毎年全然違うシステムを一から作るのはさすがにだるいやろ！

手動なら「こうやってました」って口で言えばいいけどね。

というわけで、**大したシステムでもないけどGitHubに公開することにした。**

### つまり？
**GitHubを使え。そして模擬部みんなでシステムを作れ。**  

お前がやっとけって話になるけど、やってみて欲しいことがある。  
***注文システムをFormじゃなくて自前で用意する***

![haa](https://user-images.githubusercontent.com/88261399/134191339-3ea5c578-c50e-4212-a464-e2b8fbc17d56.jpg)

もし全部まるっとWebアプリ化できるなら、Googleで連携を承認しないと中身をゲットできないSpreadsheetはむしろ足かせになると思う。  
なら最初からシステムに注文集計を突っ込んでそれをもとにしたデータベースで売り上げとチケット使用状況を管理しちゃえ。

願わくはこのソフトをそのまま流用してくれたらなあ…グラサン以外のアイコンが新しいブランチを切る瞬間を楽しみにしています。
