![Current Version](https://img.shields.io/badge/MogiCasher[HTML_Edition]-0.5-blue)

# 模擬部のレジ[HTML版]
アプデするたびにいちいちexe化しないと配れないのが面倒くさいというわけで、HTMLに移植してみる。  
使い方をちゃんと読んでから使おう  
[プレビュー公開中](https://mogi-htmledition.vercel.app)

![overall](https://user-images.githubusercontent.com/88261399/133916404-a8fff502-a9b2-40f0-bd32-566421788403.png)

# 使い方
## 始める前に
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

## 2022年の担当者へ
### My Skill Sucks
おそらく来年のソフト担当者は俺みたいにちょっとプログラミングで遊んでみてますどころやない優秀なガチ勢やと思う。そんな君にはぜひ模擬部の売り上げ管理システムを構築してほしいのだ。

なんでお前が作ってないねんって？  
というのも、そもそも俺がプログラミング初心者だからだ。どう初心者かって？引き受けた時の俺のプログラミングスキルは
```
def aaaa(a):
  for x in a:
    print (x)
  
print (aaaa([0,1,2,3,4]))
```
というレベルだったのだ。にもかかわらずなぜ快諾したのか。それは大きな謎である

初めてチケットの注文にGoogle Formを使うことになってのごたごたもあるけど、もちろんFormのシステムを知らない俺はまず集計がどうSpreadsheetに反映されるかをググり、さらには関数で整理するためにSpreadsheetの使い方までググるレベルだった。そういうわけで、見に来た人が何が書かれているかぱっと見で理解できない難解なシートが出来てしまった。

![sheet](https://user-images.githubusercontent.com/88261399/134006128-af522285-8fa8-403b-82d0-d0be3769bd82.png)
![nohara](https://user-images.githubusercontent.com/88261399/134006375-f93d709f-5ab0-45e4-8d72-89abb88f8afc.jpg)

こんなものを引き継ぐことはできないので、Formのシステムは組みなおしてください。

### To Be Honest???
前置きが長くなりすぎて本題みたいになってしまったので一旦切りましょう。  
#### ぶっちゃけ2022年からはWebアプリ化しちゃったらいいと思う。
なんならFormじゃなくて自前の集計ページを作ってもいいかもしれない。(セキュリティーの部分は学校と相談)  
もしかしたらやっぱり模擬村はWi-Fiが使えなくて、当日使うのはただのhtmlソフトかもしれない。  
でも、各ソフトから出力したデータを後で取り込んでデータベースに組み込むことはできる。

#### デジタルで作られているものはデジタルのままで引継ぎされるべき。
僕は2020年からの引継ぎに失敗した人なので、2022年への引継ぎがめんどくさくてGitHubにソースコードをまるっと上げてしまった。こうすれば引継ぎなんかしなくても2021年のシステムのだいたいが分かっちゃうからね。  
ついでにそのままVercelにつなげてプレビューサイト作ってみたり。  
果たして作ったPythonファイルの中身を印刷して渡すことにどれだけの意味があるのでしょうか？
