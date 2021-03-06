


/* initial portfolio overview initialization */
/* script that registers click on slider button */
$(document).ready(function(){

    $(".btn-slide").click(function(){
        $(".main_bot").slideToggle("slow");
        $(this).toggleClass("active");
    });

});


/* JQUERY script to handle the slider */
(function( $ ) {
    // constants
    var SHOW_CLASS = 'show',
    HIDE_CLASS = 'hide',
    ACTIVE_CLASS = 'active';

$( '.tabs' ).on( 'click', 'li a', function(e){
    e.preventDefault();
    var $tab = $( this ),
    href = $tab.attr( 'href' );

$( '.active' ).removeClass( ACTIVE_CLASS );
$tab.addClass( ACTIVE_CLASS );

$( '.show' )
    .removeClass( SHOW_CLASS )
    .addClass( HIDE_CLASS )
    .hide();

$(href)
    .removeClass( HIDE_CLASS )
    .addClass( SHOW_CLASS )
    .hide()
    .fadeIn( 550 );
});
})( jQuery );


/* Global varibales for paginating the stock list,
 */
iterator = 0;
arr = [];


/* clears the slider */
function clearSlider() {
    for ( var k = 1; k < 11; ++k ) {
        document.getElementById("pos_ticker_" + k).innerHTML = "";
        document.getElementById("pos_typeOf_" + k).innerHTML = "";
        document.getElementById("pos_qty_" + k).innerHTML = "";
        document.getElementById("pos_price_" + k).innerHTML = "";
        document.getElementById("pos_dateOf_" + k).innerHTML = "";
        document.getElementById("pos_open_" + k).innerHTML = "";
        document.getElementById("pos_currentPrice_" + k).innerHTML = "";
    }
}

/* this is what implements the pagination */
function updateSlider() {
    clearSlider();
    var temp = iterator + 10;
    if (arr.length < temp) {
        temp = arr.length;
    }
    var k, l;
    for ( k = iterator; k < temp; ++k ) {
        l = k + 1 - iterator;
        document.getElementById("pos_ticker_" + l).innerHTML = arr[k].ticker;
        document.getElementById("pos_typeOf_" + l).innerHTML = arr[k].typeOf;
        document.getElementById("pos_qty_" + l).innerHTML = arr[k].qty;
        document.getElementById("pos_price_" + l).innerHTML =
            "$ " + Number(arr[k].price).toFixed(2);
        document.getElementById("pos_dateOf_" + l).innerHTML = arr[k].dateOf;
        document.getElementById("pos_open_" + l).innerHTML =  
            "$ " + Number(arr[k].open).toFixed(2);
        document.getElementById("pos_currentPrice_" + l).innerHTML =
            "$ " + Number(arr[k].currentPrice).toFixed(2);
        priceColors(arr[k].open, arr[k].price, "pos_open_" + l);
        priceColors(arr[k].currentPrice, arr[k].open, "pos_currentPrice_" + l);
    }
    iterator = k;
    updatePrev();
    updateNext();
}

/* this is what implements the pagination */
function prevSlider() {
    clearSlider();
    var temp1 = iterator % 10;
    if (temp1 == 0)
        temp1 = 10
    var temp = iterator - temp1;
    var k, l;
    for ( k = temp - 10; k < temp; ++k ) {
        l = k + 1 - (temp - 10);
        document.getElementById("pos_ticker_" + l).innerHTML = arr[k].ticker;
        document.getElementById("pos_typeOf_" + l).innerHTML = arr[k].typeOf;
        document.getElementById("pos_qty_" + l).innerHTML = arr[k].qty;
        document.getElementById("pos_price_" + l).innerHTML =
            "$ " + Number(arr[k].price).toFixed(2);
        document.getElementById("pos_dateOf_" + l).innerHTML = arr[k].dateOf;
        document.getElementById("pos_open_" + l).innerHTML = 
            "$ " + Number(arr[k].open).toFixed(2);
        document.getElementById("pos_currentPrice_" + l).innerHTML =
            "$ " + Number(arr[k].currentPrice).toFixed(2);
        priceColors(arr[k].open, arr[k].price, "pos_open_" + l);
        priceColors(arr[k].currentPrice, arr[k].open, "pos_currentPrice_" + l);
    }
    iterator = k;
    updatePrev();
    updateNext();
}

function updatePrev() {
    if ( iterator > 10 ) {
        document.getElementById("slider_prev_span").innerHTML =
            '<button class="purchase_stock2" id="slider_prev" style="padding-right:40px">Load Prev 10</button>';
        $("#slider_prev").show();
    }
    else {
        $("#slider_prev").hide();
    }
}

function updateNext() {
    if ( iterator < arr.length) {
        var j = arr.length - iterator;
        if ( j > 10 ) {
            j = 10;
        }
        document.getElementById("slider_button_span").innerHTML =
            '<button class="purchase_stock2" id="slider_button" style="padding-right:40px">Load Next '
            + j + '</button>';
        $("#slider_button").show();
    }
    else {
        $("#slider_button").hide();
    }
}

$( "#slider_prev_span" )
    .button()
    .click(function() {
        clearSlider();
        prevSlider();
    });

$( "#slider_button_span" )
    .button()
    .click(function() {
        clearSlider();
        updateSlider();
    });



/* function that updates the query box */
function updateQuery(data) {

    document.getElementById("stock_1").innerHTML = data.stock.company;
    document.getElementById("stock_2").innerHTML =
        "$ " + Number(data.stock.price).toFixed(2);
    document.getElementById("stock_3").innerHTML = data.stock.volume;
    document.getElementById("stock_4").innerHTML =
        Number(data.stock.pe).toFixed(2);
    document.getElementById("stock_5").innerHTML =
        "$ " + Number(data.stock.eps).toFixed(2);
    document.getElementById("stock_6").innerHTML =
        "$ " + Number(data.stock.week52High).toFixed(2);
    document.getElementById("stock_7").innerHTML =
        "$ " + Number(data.stock.week52Low).toFixed(2);
    document.getElementById("stock_8").innerHTML =
        "$ " + Number(data.stock.dayLow).toFixed(2);
    document.getElementById("stock_9").innerHTML =
        "$ " + Number(data.stock.dayHigh).toFixed(2);
    document.getElementById("stock_10").innerHTML =
        "$ " + Number(data.stock.moving50DayAvg).toFixed(2);
    document.getElementById("stock_11").innerHTML = data.stock.marketCap;
    document.getElementById("stock_12").innerHTML =
        "$ " + Number(data.stock.open).toFixed(2);
        
        
    priceColors(data.stock.price, data.stock.open, "stock_2");

}

function priceColors(price, open, element) {

    if (price < open) {
    
      document.getElementById(element).className = "red";
    
    } else if (price > open) {
    
      document.getElementById(element).className = "green";
      
    } else {
    
      document.getElementById(element).className = "black";
      
    }

}

$('.tb11_go').click(function(e) {
    var idToGet = document.getElementById('query_input').value;
    myJsRoutes.controllers.Query.getQuery(idToGet).ajax({
        success : function(data) {
            requestOK = true;
            updateQuery(data);
            updateChart(idToGet);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            var err = JSON.parse( jqXHR.responseText );
            alert(err.message);
        }
    });
});

/* Functions necessary in order to use the enter button */
$("#query_input").focus(function() {
    $(this).data("hasfocus", true);
});

$("#query_input").blur(function() {
    $(this).data("hasfocus", false);
});

$(document.body).keyup(function(e) {
    if ((e.which == 13 || e.keystroke == 13) && $("#query_input").data("hasfocus")) {
        var idToGet = document.getElementById('query_input').value;
        myJsRoutes.controllers.Query.getQuery(idToGet).ajax({
            success : function(data) {
                requestOK = true;
                updateQuery(data);
                updateChart(idToGet);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var err = JSON.parse( jqXHR.responseText );
                alert(err.message);
            }
        });
    }
});

/* used for uppercasing the first letter  */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$(function() {
    $( document ).tooltip( {
        position: {
            my: "center bottom-10",
        at: "center top",
        using: function( position, feedback ) {
            $( this ).css( position );
            $( "<div>" )
        .addClass( feedback.vertical )
        .addClass( feedback.horizontal )
        .appendTo( this );
        }
        }
    }
    );
});


