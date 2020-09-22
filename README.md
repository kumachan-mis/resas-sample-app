# resas-sample-app

[RESAS API](https://opendata.resas-portal.go.jp/) を用いたサンプルアプリ

## Run

1. プロジェクトルートに以下の内容を含む `.env` ファイルを配置する  
   XXXXXXXXXX は各自の API キーに置き換える

```
RESAS_API_KEY = XXXXXXXXXX
```

2. 以下のコマンドを実行する

```
yarn start
```

## Test

1. プロジェクトルートに以下の内容を含む `.env` ファイルを配置する  
   XXXXXXXXXX は各自の API キーに置き換える

```
RESAS_API_KEY = XXXXXXXXXX
```

2. 以下のコマンドを実行する

```
yarn test
```

## Features

1. チェックマークを入れた県の 5 年毎の人口の変遷を折れ線グラフで比較可能
2. チェックマークを入れすぎた時に「全てのチェックを外す」ボタンを押すとリセット可能
