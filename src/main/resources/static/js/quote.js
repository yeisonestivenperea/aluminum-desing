const regex = /^[1-9]\d*(\.\d+)?$/;

var productName = document.getElementById('product-name');
var heightContent = document.getElementById('height-price');
var widthContent = document.getElementById('width-price');
var sidesContent = document.getElementById('sides');
var totalContent = document.getElementById('total');

function quote() {
    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;

    if (width == '' || height == '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Los campos no pueden estar vacíos!"
        });
    } else if (!regex.test(width) || !regex.test(height)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Formato inválido! El primer dígito debe ser mayor a cero."
        });
    } else {
        // Restablecer el contenido antes de agregar las nuevas dimensiones
        selectElement = document.getElementById('products').value;
        productName.innerText = 'Dimensiones del producto: ' + selectElement + ' ' + width + 'X' + height;

        var product = {
            productName: selectElement,
            width: width,
            height: height
        };

        $.ajax({
            type: "POST",
            url: "/aluminum-design/calculate_price",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(product),
            success: function (response) {
                console.log(response);
                //{totalHighPrice: 80000, totalWidthPrice: 26000, totalSidePrice: 60000, total: 166000}
                widthContent.innerHTML = 'Ancho: ' + '<strong>$</strong>' + response.totalWidthPrice;
                heightContent.innerHTML = 'Alto: ' + '<strong>$</strong>' + response.totalHighPrice;
                sidesContent.innerHTML = 'Laterales: ' + '<strong>$</strong>' + response.totalSidePrice;
                totalContent.innerHTML = 'Total: ' + '<strong>$</strong>' + response.total;
            },
            error: function (error) {
                console.error(error);
            }
        });
    }
}

function quoteProduct() {
    var selectElement = document.getElementById('products').value;
    productName.innerText = 'Dimensiones del producto: ' + selectElement;
}
