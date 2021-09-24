![Current Version](https://img.shields.io/badge/MogiCasher[HTML_Edition]-v0.5-blue)
![Code](https://img.shields.io/badge/Format-HTML5+JavaScript-red)
![Type](https://img.shields.io/badge/Type-Offline-orange)
![Statement](https://img.shields.io/badge/State-In_Developing-purple)

# 模擬部のレジ[HTML版]
アプデするたびにいちいちexe化しないと配れないのが面倒くさいというわけで、HTMLに移植してみる。  
使い方をちゃんと読んでから使おう  
[プレビュー公開中](https://mogi-htmledition.vercel.app)

![overall](https://user-images.githubusercontent.com/88261399/134675462-4e1ea36d-9690-4482-b086-9e08cd5f7eef.png)

# 使い方
## 始める前に
### 注意事項
- サイトで公開してますがオフラインソフトです
- (オフラインだけど)個人情報とか下ネタとかは入力しちゃだめよ？
- 模擬店とチケット売り場の両方をこれで賄います
### 動作環境
PC(Window/Mac含む)で実行できます。**ただのhtmlなので特殊なソフトはいりません。**

スマホでは機能的に実行できません。

### DL/インストール
このGitHubページの右上の方にある"Code"ボタンから"Download ZIP"してそのまま解凍してね。

![github](https://user-images.githubusercontent.com/88261399/133916135-8f7c7d60-1d65-47d3-b957-1196603235a9.png)

### 起動&終了
解凍したフォルダ(Mogi_Casher-HTML-master)の中にある<strong>index.html</strong>を実行してね。

![files](https://user-images.githubusercontent.com/88261399/133995324-5b308d8d-ae7d-48e6-96e3-9d33bdb7a48c.png)

### CSV
このソフトをレジ(?)として使うためには、決まった型のCSVファイルが必要です。

| TAG | CODE | PRICE | UNITS |
| --- | --- | --- | --- |
| #1 | 01234567 | 100 | 0 |
| #2 | 98765432 | 200 | 0 |
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
#2,98765432,200,0
...
```
- 何行(つまり何品目)でもOKです。
- タグは好きなように名前を付けてください。
- バーコードの規格はなんでもOKです。
## とりせつ
### 画面の説明
各機能の使い方は次の[実際に使ってみる](README.md#実際に使ってみる)で説明するで
#### メインエリア
![main](https://user-images.githubusercontent.com/88261399/134675599-f8adc3af-1a7c-4c18-a993-159a492f3f2b.png)

バーコードの入力を受け付ける場所。下にあるのは売上総額。模擬店の場合は売り上げというか売上換算っていうのが正しいのかな? 
#### I/Oエリア
![csvIO](https://user-images.githubusercontent.com/88261399/134676164-5e987443-10f1-4271-be2d-1abda95e9c68.png)

CSVを読み込み/CSVで書き出しをするボタン。
#### グラフエリア
![table](https://user-images.githubusercontent.com/88261399/134676943-c9531b59-2c7a-43ef-b837-fbc1fa51a042.png)

読み込んだCSVが自動で表形式で表示される場所。読み込んだバーコードに合わせて勝手に表が更新されんで
#### メニューエリア
![nav](https://user-images.githubusercontent.com/88261399/134677259-11444647-9350-4752-80b7-3ba90ef92653.png)

メニューというほどでもないけど、サブ機能が置いてある。左から順に、
1. 時計(遊び心です)
2. 発団名表示
3. 発団名の設定ボタンとリセットボタンのプルダウン
4. このGitHubへのリンク
5. [使ったテンプレートのデモサイト](README.md#デザインテンプレート)
### 実際に使ってみる
#### 1.CSV読み込み
起動したらまずはCSVを読み込むところから。

https://user-images.githubusercontent.com/88261399/134682290-9588b240-8e3e-4997-a377-bdbed303b206.mp4

1. "LOAD CSV"ボタンを押すとファイルドロップ画面が出てきます。
2. 使うCSVファイルをドラッグ&ドロップします。一応確認のためにプレビューが表示されます。
3. 最後に"SUBMIT CSV"をクリックすると、データベースに登録されます。右側の表も更新されるで

- CSV以外のファイルはブロックされます
- 指定の型じゃないCSVもブロックされます
#### 2.発団名の設定
書き出したCSVデータを判別するために発団名の登録を推奨。
※ファイル名が全部同じやとややこしいやん？

https://user-images.githubusercontent.com/88261399/134682772-1aa4ee52-9db6-4d9c-8deb-d68f65294fd0.mp4

1. "SETTINGS"の"STORE NAME"をクリック
2. 発団名を打ち込む
3. "SUBMIT"する
4. メニューエリアの表示が変更される(だけ)
#### バーコード読み取り
バーコードリーダーはやってることはキーボードと同じなので手打ちでやってます

https://user-images.githubusercontent.com/88261399/134684502-2451961a-b474-45d5-bb4b-c2ffd559369d.mp4

読み取ると売上と表が更新されます。  
ちなみに存在しないコードを打ったり空打ちしたりすると怒られます。

https://user-images.githubusercontent.com/88261399/134684350-cfa3c4ef-a0b8-4cd3-a88a-add0346716d0.mp4

※:warning:入力欄で棒がチカチカしてるか確認してね。してなかったら入力欄をクリックしてあげてね
#### データ保存
[CSV](README.md#CSV)と同じ形式でデータをCSV保存します。保存したデータは次回起動時に[CSV読み込み](README.md#CSV読み込み)で再利用できます。失くさないようにしよう。

https://user-images.githubusercontent.com/88261399/134685649-a1736cb3-e09f-44a8-ab25-b3fbbee71e84.mp4

#### リセット
需要は一切ないと思うけど、使ってる途中で何もかもリセットしたくなった時に押すボタン。

https://user-images.githubusercontent.com/88261399/134686732-46be02c6-c7af-4d4f-adc5-1796f7d6d98f.mp4

御覧の通り、データベースがリセットされて起動したときの何もない状態になります。
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
