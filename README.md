# QZSS Viewer (Michibiki Real-time Tracker)

日本の準天頂衛星システム「みちびき（QZSS: Quasi-Zenith Satellite System）」の現在の位置・高度・速度を、Webブラウザ上の地図にリアルタイムで可視化する簡易的なアプリケーションです。

---

## 機能・特徴

*   **リアルタイムトラッキング**: みちびき各号機（1R号機, 2号機, 3号機, 4号機, 6号機）の現在位置を地図上にプロットし、1秒ごとにアニメーション更新します。
*   **軌跡表示**: 過去18時間分の衛星の軌跡を地図上にプロットし、みちびきの軌道を視覚化できます。
*   **詳細データの表示**: パネル上で各衛星の現在の「高度 (Altitude)」と「速度 (Velocity)」をリアルタイムで確認できます。
*   **オフライン/API障害フォールバック**: CelesTrak APIへのアクセスが遮断されたり、サーバーダウンした場合でも、内部に組み込まれたデータに自動で補完してくれます。

---

## 主要技術

*   **フロントエンド言語**
    *   HTML5
    *   CSS3
    *   TypeScript
*   **ビルドツール**
    *   Vite (Vanilla-TS テンプレート)
*   **地図ライブラリ**
    *   Leaflet.js
*   **軌道計算ライブラリ**
    *   satellite.js (SGP4/SDP4 軌道伝搬)
*   **利用データ / API**
    *   [CelesTrak](https://celestrak.org/) (TLEデータ取得元)
    *   [OpenStreetMap](https://www.openstreetmap.org/) (マップタイル取得元)

---

# QZSS Viewer (Michibiki Real-time Tracker)

It is a simple application that visualises the current position(Latitude,Longitude), altitude, and speed of Michibiki, the Japan's Quasi-Zenith Satellite System (QZSS) in real time on a map online web browser.

---

## Specifications and Features

* **Real-time tracking**: The current position of each Michibiki satellite (# 1R, # 2, # 3, # 4 and # 6) is plotted on a map with animation updated every second.
* **Orbit display**: Plot the satellite's orbit for the past 18 hours on a map to visualise the Michibiki orbit.
* **Detailed data display**: Check the current "Altitude" and "Speed" of each satellite in real time on the panel.
* **Offline/API failure fallback**: Even if access to the CelesTrak API is interrupted or the server goes down, the data will automatically be filled in using the built-in data.

---

## Technical specifications

* **Front-end Language**
　* HTML5
　* CSS3
　* TypeScript
* **Build Tools**
　* Vite (Vanilla-TS Templates)
* **Map Libraries**
　* Leaflet.js
* **Trajectory Calculation Library**
　* satellite.js (SGP4/SDP4 orbital Propagation)
* **Usage Data / API**
　* [CelesTrak](https://celestrak.org/) (TLE Data Source　API)
　* [OpenStreetMap](https://www.openstreetmap.org/) (Map Tile Source)
  
---
