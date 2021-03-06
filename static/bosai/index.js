let map;
let mymap;
let mainMarker;
let infoWindow = [];
let marker = [];
let mkdata = [];
let mkdatacnt = 0;
let currentlat;
let currentlng;
const KyotoCityOffice = { lat: 35.011582, lng: 135.767914 };

function initMap() {
  let map = drawMap(KyotoCityOffice['lat'], KyotoCityOffice['lng']);
}

function drawMap(lat, lng) {
  let latlng = new google.maps.LatLng(lat, lng);
  let map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
    center: latlng, // 地図の中心を指定
    zoom: 15 // 地図のズームを指定
  });
  return map;
}

function getMyPlace() {
  var output = document.getElementById("result");
  if (!navigator.geolocation) {//Geolocation apiがサポートされていない場合
    output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
    return;
  }
  function success(position) {
    currentlat = position.coords.latitude;//緯度
    currentlng = position.coords.longitude;//経度
    currentlat = 35.03244752;
    currentlng = 135.7701241;
    mymap = drawMap(currentlat, currentlng);
    makeMaker(currentlat, currentlng);
    makeTable();
  };
  function error() {
    output.innerHTML = "座標位置を取得できません";
  };
  navigator.geolocation.getCurrentPosition(success, error);//成功と失敗を判断
}

function aaa(arg) {
  var output = document.getElementById("ent");
  // output.innerHTML = '<p>aaa</p><p>' + arg +'</p>';
  output.innerHTML = 'aaa()<br>' + arg + '<br>' +
    'currentlat:' + currentlat + '<br>' +
    'currentlng:' + currentlng + '<br>';
  // output.innerHTML = '<p>aaa ' + latitude + '° <br>経度 ' + longitude + '°</p>';
}

function bbb(shelters){
  console.log(shelters.length);

  // for (const shelter of shelters) {
    // console.log(shelter);
  // }

}

function addposition(lat, lng, name) {
  mkdata[mkdatacnt] = { lat: lat, lng: lng, name: name };
  mkdatacnt++;
}

function showposition() {
  var output = document.getElementById("addposition");
  output.innerHTML = '----showposition()----<br>';
  for (let i = 0; i < mkdatacnt; i++) {
    output.innerHTML +=
      // 'cnt:' + i + '<br>';
      ' cnt:' + i +
      ' lat:' + mkdata[i]['lat'] +
      ' lng:' + mkdata[i]['lng'] +
      ' name:' + mkdata[i]['name'] + '<br>';
  }
}

function setDistance() {
  for (let i = 0; i < mkdatacnt; i++) {





    output.innerHTML +=
      // 'cnt:' + i + '<br>';
      ' cnt:' + i +
      ' lat:' + mkdata[i]['lat'] +
      ' lng:' + mkdata[i]['lng'] +
      ' name:' + mkdata[i]['name'] + '<br>';
  }
}

function makeMaker(latitude, longitude) {
  let mymarker = [];
  let centerlatlng = new google.maps.LatLng(latitude, longitude);

  // マーカーの新規出力
  var mk1 = new google.maps.Marker({
    map: mymap,
    position: new google.maps.LatLng(latitude, longitude),
    // animation: google.maps.Animation.DROP,
    icon: {
      fillColor: "blue",                //塗り潰し色
      fillOpacity: 0.5,                    //塗り潰し透過率
      path: google.maps.SymbolPath.CIRCLE, //円を指定
      scale: 18,                           //円のサイズ
      strokeColor: "white",              //枠の色
      strokeWeight: 1.0                    //枠の透過率
    },
    label: {
      text: '●',                       //ラベル文字
      color: '#FFFFFF',                    //文字の色
      fontSize: '14px'                     //文字のサイズ
    }
  });

  // マーカー毎の処理
  for (let i = 0; i < mkdatacnt; i++) {
    // markerLatLng = new google.maps.LatLng({ lat: mkdata[i]['lat'], lng: mkdata[i]['lng'] }); // 緯度経度のデータ作成
    let latlng = new google.maps.LatLng({ lat: mkdata[i]['lat'], lng: mkdata[i]['lng'] });
    let text = mkdata[i]['name'];
    mymarker[i] = new google.maps.Marker({ // マーカーの追加
      position: latlng, // マーカーを立てる位置を指定
      map: mymap, // マーカーを立てる地図を指定
      // animation: google.maps.Animation.DROP,
      // icon : "{% static 'bosai/images/shelter.png' %}",
      icon: {
        fillColor: "red",                //塗り潰し色
        fillOpacity: 0.5,                    //塗り潰し透過率
        path: google.maps.SymbolPath.CIRCLE, //円を指定
        scale: 16,                           //円のサイズ
        strokeColor: "white",              //枠の色
        strokeWeight: 1.0,                   //枠の透過率
      },
      label: {
        text: text,                       //ラベル文字
        color: 'black',                    //文字の色
        fontSize: '14px',                     //文字のサイズ
        fontWeight: 'bold',        //フォントの太さ 
      }
    });

    // var marker = new MarkerWithLabel({
    //   position: latlng,
    //   map: mymap,
    //   labelContent: mkdata[i]['name'],                   //ラベル文字
    //   labelAnchor: new google.maps.Point(38, 0),   //ラベル文字の基点
    //   labelClass: 'labels',                        //CSSのクラス名
    //   labelStyle: {opacity: 0.8}                   //スタイル定義
    // });

    // Locations of landmarks
    const currentLocation = { lat: currentlat, lng: currentlng };
    const frick = { lat: mkdata[i]['lat'], lng: mkdata[i]['lng'] };
    // The markers for The Dakota and The Frick Collection
    // var mk1 = new google.maps.Marker({ position: currentLocation, map: mymap });
    var mk2 = mymarker[i];
    // Calculate and display the distance between markers
    var distance = haversine_distance(mk1, mk2);
    mkdata[i]['distance'] = orgRound(distance, 100);
    document.getElementById('result').innerHTML
      = "Distance between markers: " + distance.toFixed(2) + " km.";
    // Draw a line showing the straight distance between the markers
    // var line = 
    // new google.maps.Polyline({path: [dakota, frick], map: mymap});

    infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
      content: '<div class="map">' + mkdata[i]['name'] + '<br>' + mkdata[i]['distance'] + 'km</div>' // 吹き出しに表示する内容
    });

    mymarker[i].addListener('click', function () { // マーカーをクリックしたとき
      infoWindow[i].open(mymap, mymarker[i]); // 吹き出しの表示
    });
    // mkdata[i].addListener('click', function () { // マーカーをクリックしたとき
    //   infoWindow[i].open(mymap, mkdata[i]); // 吹き出しの表示
    // });
  }

  // age, idの順にソート（昇順）
  mkdata.sort((a, b) => {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  });

}




/**
 * 任意の桁で四捨五入する関数
 * @param {number} value 四捨五入する数値
 * @param {number} base どの桁で四捨五入するか（10→10の位、0.1→小数第１位）
 * @return {number} 四捨五入した値
 */
function orgRound(value, base) {
  return Math.round(value * base) / base;
}



function haversine_distance(mk1, mk2) {
  var R = 6371.0710; // Radius of the Earth in miles
  var rlat1 = mk1.position.lat() * (Math.PI / 180);
  // Convert degrees to radians
  var rlat2 = mk2.position.lat() * (Math.PI / 180);
  // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.position.lng() - mk1.position.lng())
    * (Math.PI / 180); // Radian difference (longitudes)

  var d = 2 * R
    * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2)
      + Math.cos(rlat1) * Math.cos(rlat2)
      * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  return d;
}

function makeTable() {
  // table要素を生成
  const parent = document.getElementById("maintable");
  // parent.removeChild(table);


  var table = document.createElement('table');
  table.className = "table table-hover" ;
  var tbody = document.createElement('tbody');


  var tr = document.createElement('tr');
  var th1 = document.createElement('th');
  th1.className = "col-md-3" ;
  th1.textContent = '施設名';
  tr.appendChild(th1);
  var th2 = document.createElement('th');
  th2.colSpan = "2" ;
  th2.textContent = '施設情報';
  tr.appendChild(th2);
  table.appendChild(tr);


  // <!-- shelter.name<br> -->
  // <tr><td rowspan="4" class="col-md-3" ><h5>{{ shelter.name }}</h5></td></tr>
  // <tr><td>収容人数：{{ shelter.capacity }}</td></tr>



  // tr部分のループ
  for (var i = 0; i < 10; i++) {
    var tr = document.createElement('tr');
    // th・td部分のループ
        // td要素を生成
        var td = document.createElement('td');
        td.rowSpan = "4";
        td.className = "col-md-3"
        tr.appendChild(td);
        var h5 = document.createElement('h5');
        h5.innerHTML = mkdata[i]['name'];
        td.appendChild(h5);
        tr.appendChild(td);
    tbody.appendChild(tr);

    tr = document.createElement('tr');
      // th・td部分のループ
        // td要素を生成
        td = document.createElement('td');
          td.innerHTML = "収容人数：" + mkdata[i]['capacity'] ;
        tr.appendChild(td);
        tbody.appendChild(tr);

  // <tr><td>所在地：{{ shelter.address }}<br>
  //         電話番号：{{ shelter.tel }}<br>
  //         lat：{{ shelter.hokui }}<br>
  //         lng：{{ shelter.tokei }}<br></td></tr>
  // <tr><td><a href="{{ shelter.url }}">設カルテ</a></td></tr>

    tr = document.createElement('tr');
      // th・td部分のループ
        // td要素を生成
        td = document.createElement('td');
        td.innerHTML = "所在地：" + mkdata[i]['address'] + '<br>';
        td.innerHTML += "電話番号：" + mkdata[i]['tel'] + '<br>';
        td.innerHTML += "lat：" + mkdata[i]['lat'] + '<br>';
        td.innerHTML += "lng：" + mkdata[i]['lng'] ;
        tr.appendChild(td);
        tbody.appendChild(tr);

    tr = document.createElement('tr');
      // th・td部分のループ
        // td要素を生成
        td = document.createElement('td');
        td.innerHTML = "施設カルテ" ;
        tr.appendChild(td);
        tbody.appendChild(tr);


  }
  // 生成したtable要素を追加する
  table.appendChild(tbody)
  parent.appendChild(table);

}




