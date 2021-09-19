let mymap;
let mkdata = [];

function initMap() {
  let output = document.getElementById("result");
  if (!navigator.geolocation) {//Geolocation apiがサポートされていない場合
    return;
  }
  function success(position) {
    let currentlat = position.coords.latitude;//緯度
    let currentlng = position.coords.longitude;//経度
    currentlat = 35.03244752;
    currentlng = 135.7701241;
    let curlatlng = new google.maps.LatLng(currentlat, currentlng)
    mymap = drawMap(curlatlng);
    distancesort(curlatlng);
    makeMaker(curlatlng, false);
    makeTable();
  };
  function error() {
  };
  navigator.geolocation.getCurrentPosition(success, error);//成功と失敗を判断
}

function initDetailMap() {
  let output = document.getElementById("result");
  if (!navigator.geolocation) {//Geolocation apiがサポートされていない場合
    return;
  }
  function success(position) {
    let currentlat = position.coords.latitude;//緯度
    let currentlng = position.coords.longitude;//経度
    currentlat = 35.03244752;
    currentlng = 135.7701241;
    let curlatlng = new google.maps.LatLng(currentlat, currentlng)
    mymap = drawMap(curlatlng);
    distancesort(curlatlng);
    makeMaker(curlatlng, true);
    makeTable();
  };
  function error() {
  };
  navigator.geolocation.getCurrentPosition(success, error);//成功と失敗を判断
}

function drawMap(latlng) {
  let map = new google.maps.Map(document.getElementById('map'), { // #sampleに地図を埋め込む
    center: latlng, // 地図の中心を指定
    zoom: 15 // 地図のズームを指定
  });
  return map;
}

function setdata(_mkdata){
  mkdata = _mkdata;
}

function distancesort(curlatlng) {
  // マーカーの新規出力
  let mk1 = new google.maps.Marker({
    position: curlatlng,
  });
  // マーカー毎の処理
  for (let i = 0; i < mkdata.length; i++) {
    let latlng = new google.maps.LatLng( mkdata[i]['lat'], mkdata[i]['lng'] );
    let distance;
    let mk2 = new google.maps.Marker({ // マーカーの追加
      position: latlng, // マーカーを立てる位置を指定
    });
    // let array = aaaa(curlatlng,latlng);
    distance = haversine_distance(mk1, mk2);
    mkdata[i]['distance'] = orgRound(distance, 100);
  }
  // age, idの順にソート（昇順）
  mkdata.sort((a, b) => {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  });
}

function makeMaker(centerlatlng, route) {
  // マーカーの新規出力
  let mk1 = new google.maps.Marker({
    map: mymap,
    position: centerlatlng,
    animation: google.maps.Animation.DROP,
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
      fontSize: '20px'                     //文字のサイズ
    }
  });

  // マーカー毎の処理
  for (let i = 0; i < Math.min(mkdata.length,20); i++) {
    // markerLatLng = new google.maps.LatLng({ lat: mkdata[i]['lat'], lng: mkdata[i]['lng'] }); // 緯度経度のデータ作成
    let infoWindow = [];
    let latlng = new google.maps.LatLng( mkdata[i]['lat'], mkdata[i]['lng'] );
    let distance;

    let mk2 = new google.maps.Marker({ // マーカーの追加
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
        text: mkdata[i]['name'],                       //ラベル文字
        color: 'black',                    //文字の色
        fontSize: '14px',                     //文字のサイズ
        fontWeight: 'bold',        //フォントの太さ 
      }
    });

    // infobox 用の div エレメントを生成
    var infoboxContent = document.createElement('div');
    // infobox に表示するHTML
    infoboxContent.innerHTML = 
        '<div class="infobox">' +
          '<div class="inner">' +
            '<div class="header"><h6><a href="'+ mkdata[i]['durl'] +'">' + mkdata[i]['name'] + '</a></h6></div>' +
            '<div class="container"><strong>' + mkdata[i]['distance'] + ' km</strong></div>' +
            '<div class="container">' + mkdata[i]['address'] + '<br/>' + mkdata[i]['tel'] + '</div>' +
          '</div>' + 
        '</div>';
    infoWindow[i] = new google.maps.InfoWindow({ // 吹き出しの追加
      content: infoboxContent, // 吹き出しに表示する内容
      disableAutoPan: false,
    });

    mk2.addListener('click', function () { // マーカーをクリックしたとき
      infoWindow[i].open(mymap, mk2); // 吹き出しの表示
    });
  }

  if(route){
    let orglatlng = centerlatlng;
    let dstlatlng = new google.maps.LatLng(mkdata[0]['lat'], mkdata[0]['lng']);
    GetRoute(orglatlng,dstlatlng,route);
  }
}

function makeTable() {
  //表示中のテーブル初期化
  let element = document.querySelector("table"); 
  if (element != null){
    element.remove();
  }
  // table要素を生成
  const parent = document.getElementById("maintable");
 
  let table = document.createElement('table');
  table.className = "table table-hover" ;
 
  // thead部
  let thead = document.createElement('thead');
  thead.className = "thead-light";

  let tr = document.createElement('tr');
  let th1 = document.createElement('th');
  // th1.className = "col-md-3" ;
  th1.textContent = '施設名';
  tr.appendChild(th1);
  let th2 = document.createElement('th');
  // th2.colSpan = "1" ;
  th2.textContent = '直線距離';
  tr.appendChild(th2);
  let th3 = document.createElement('th');
  // th2.colSpan = "1" ;
  th3.textContent = '施設情報';
  tr.appendChild(th3);
  // thead.appendChild(tr);

  let th4 = document.createElement('th');
  // th2.colSpan = "1" ;
  th4.textContent = '備考';
  tr.appendChild(th4);
  thead.appendChild(tr);

  // tbody部
  let tbody = document.createElement('tbody');
  for (var i = 0; i < Math.min(10, mkdata.length); i++) {
    let tr = document.createElement('tr');
    // th・td部分のループ
        // td要素を生成
        let td = document.createElement('td');
        // td.rowSpan = "4";
        // td.className = "col-md-3"
        tr.appendChild(td);
        let h5 = document.createElement('h5');
        let anchor = document.createElement("a");
        anchor.href = mkdata[i]['durl'];
        anchor.innerHTML = mkdata[i]['name'] ;
        h5.appendChild(anchor);
        td.appendChild(h5);
        tr.appendChild(td);

        td = document.createElement('td');
        td.innerHTML = mkdata[i]['distance'] + "km";
        tr.appendChild(td);

        // th・td部分のループ
        // td要素を生成
        td = document.createElement('td');
        td.innerHTML = "収容人数：" + mkdata[i]['capacity'] + '<br>';
        td.innerHTML += "所在地：" + mkdata[i]['address'] + '<br>';
        td.innerHTML += "電話番号：" + mkdata[i]['tel'] + '<br>';

        anchor = document.createElement("a");
        anchor.href = mkdata[i]['karteurl'];
        anchor.innerHTML += "施設カルテ" ;
        td.appendChild(anchor);
        tr.appendChild(td);

        // 備考
        td = document.createElement('td');
        td.innerHTML = "****備考****";
        tr.appendChild(td);

        tbody.appendChild(tr);
  }
  // 生成したtable要素を追加する
  table.appendChild(thead)
  table.appendChild(tbody)
  parent.appendChild(table);
}

function GetRoute(orglatlng,dstlatlng) {
	var directionsService = new google.maps.DirectionsService();
	var directionsRenderer = new google.maps.DirectionsRenderer();

	var request = {
		origin: orglatlng, //スタート地点
		destination: dstlatlng, //ゴール地点
		travelMode: google.maps.DirectionsTravelMode.WALKING, //移動手段
	};

	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsRenderer.setOptions({
        suppressMarkers: true, //マーカーが非表示
        suppressPolylines: false, //ルート線が表示
        suppressInfoWindows: false, //マーカーをクリックしても吹き出しが表示
        draggable: false, //ルート線をドラッグすることができない。ルートを変更することができない。
        preserveViewport: false //ズーム率を変更してルート全体を表示しない
      });
      // ルートの所要時間・距離
      let route = result.routes[0].legs[0]; 
      let time = route.duration.text;  
      let dist = route.distance.text; 
      route.start_address = '出発地点：'; 
      route.end_address = '目的地点：' + '出発地点からの距離：' + dist + '出発地点からの所要時間：'+ time;

      let output = document.getElementById("result");
      output.innerHTML = '<h5>現在地から' + mkdata[0]['name'] + 'までの距離：' + dist + ' 所要時間：徒歩 ' + time + '</h5>';
      

      // ルート検索の結果を地図上に描画
			directionsRenderer.setDirections(result);
			directionsRenderer.setMap(mymap);
		}
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
  let R = 6371.0710; // Radius of the Earth in miles
  let rlat1 = mk1.position.lat() * (Math.PI / 180);
  // Convert degrees to radians
  let rlat2 = mk2.position.lat() * (Math.PI / 180);
  // Convert degrees to radians
  let difflat = rlat2 - rlat1; // Radian difference (latitudes)
  let difflon = (mk2.position.lng() - mk1.position.lng())
    * (Math.PI / 180); // Radian difference (longitudes)

  let d = 2 * R
    * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2)
      + Math.cos(rlat1) * Math.cos(rlat2)
      * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  return d;
}
