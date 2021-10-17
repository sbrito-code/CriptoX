/************************************************************************/
/*                              Variables                               */
/************************************************************************/
let dolarBlue = 0;
let valueMoney = true;
let varToggleColor = true;
let btnPeso = $(".btnPeso");
let btnDolar = $(".btnDolar");

/************************************************************************/
/*                              Function                                */
/************************************************************************/
// Función media
function media(dataInput)
{
    var average = ((dataInput.high_24h + dataInput.low_24h)/2).toFixed(2)
    return average;
}

// Obtención de datos de API REST
function getDataCrypto()
{
    var pow;
    var typeMoney;

    if (valueMoney == true){
        pow = 1;
        typeMoney = "u$s";
    }
    else{
        pow = dolarBlue;
        typeMoney = "$";
    }

    const URLGET = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    $.get(URLGET, function (respuesta, estado) {
        if (estado === "success"){
            let datoGlobal = respuesta;
            const app = $("#app");
            let acumulador = `<table class="table">
                                <thead>
                                    <tr class="tableResult">
                                        <th scope="col" class="titleTable">#</th>
                                        <th scope="col" class="titleTable">Símbolo</th>
                                        <th scope="col" class="titleTable">Criptomoneda</th>
                                        <th scope="col" class="titleTable">Precio actual</th>
                                        <th scope="col" class="titleTable">Precio más alto</th>
                                        <th scope="col" class="titleTable">Precio más bajo</th>
                                        <th scope="col" class="titleTable">Promedio</th>
                                    </tr>
                                </thead>
                            <tbody>`;
            for (let i = 0 ; i < 10 ; i++) {
                acumulador +=`
                    <tr class="tableResult">
                        <th scope="row" class="titleTable">${datoGlobal[i].market_cap_rank}</th>
                        <th> <img src="${datoGlobal[i].image}" width="25" height="25" alt="Crypto_${i}"></th>
                        <td class="titleTable">${datoGlobal[i].name}</td>
                        <td class="titleTable">${typeMoney} ${(parseFloat(datoGlobal[i].current_price) * parseFloat(pow)).toFixed(2)}</td>
                        <td class="titleTable">${typeMoney} ${(parseFloat(datoGlobal[i].high_24h) * parseFloat(pow)).toFixed(2)}</td>
                        <td class="titleTable">${typeMoney} ${(parseFloat(datoGlobal[i].low_24h) * parseFloat(pow)).toFixed(2)}</td>
                        <td class="titleTable">${typeMoney} ${(parseFloat(media(datoGlobal[i])) * parseFloat(pow)).toFixed(2)}</td>
                    </tr>`;
            }
            acumulador +=`</tbody></table>`;
            app.html(acumulador);
        }
    });
}

// Obtención del valor del dolar blue
function getU$sValue()
{
    const URLGET = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
    $.get(URLGET, function (respuesta, estado) {
        if (estado === "success"){
            let datoGlobal = respuesta;
            dolarBlue = datoGlobal[1].casa.venta;
        }
    });

    return dolarBlue;
}

// Toggleo de color
function toggleColor(){    
    $(".textBox").fadeOut(500).fadeIn(2500);
}

/************************************************************************/
/*                                Main                                  */
/************************************************************************/
// Función
getDataCrypto();
window.setInterval(getDataCrypto,1000);
getU$sValue();
window.setInterval(getU$sValue,1000);
window.setInterval(toggleColor,3000);

// candlestickStream.start();

btnPeso.click(()=>{valueMoney=false;getDataCrypto()});
btnDolar.click(()=>{valueMoney=true;getDataCrypto()});