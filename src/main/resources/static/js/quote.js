const regex = /^[1-9]\d*(\.\d+)?$/;

var productName = document.getElementById('product-name');
var heightContent = document.getElementById('height-price');
var widthContent = document.getElementById('width-price');
var sidesContent = document.getElementById('sides');
var totalContent = document.getElementById('total');
var btnSendQuote = document.getElementById('btn-quote');
var selectElement = document.getElementById('products').value;
function quote() {
    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;
    selectElement = document.getElementById('products').value;

    if (width == '' || height == '' || selectElement == 1) {
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
            url: "/aluminum-design/calculate-price",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify(product),
            success: function (response) {
                widthContent.innerHTML = 'Ancho: ' + '<strong>$</strong>' + response.totalWidthPrice;
                heightContent.innerHTML = 'Alto: ' + '<strong>$</strong>' + response.totalHighPrice;
                sidesContent.innerHTML = 'Laterales: ' + '<strong>$</strong>' + response.totalSidePrice;
                totalContent.innerHTML = 'Total: ' + '<strong>$</strong>' + response.total;
                btnSendQuote.removeAttribute('hidden');
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "¡Ocurrió un error procesando la solicitud!"
                });
            }
        });
    }
}

function quoteProduct() {
    var selectElement = document.getElementById('products').value;
    productName.innerText = 'Dimensiones del producto: ' + selectElement;
}

function sendQuote() {

// Extract numbers for each string
    var numberWidth = extractNumbers(widthContent.innerHTML);
    var numberHeight = extractNumbers(heightContent.innerHTML);
    var numberSides = extractNumbers(sidesContent.innerHTML);
    var numberTotal = extractNumbers(totalContent.innerHTML);
    var width = document.getElementById('width').value;
    var height = document.getElementById('height').value;
    selectElement = document.getElementById('products').value;

    if (numberWidth != null && numberHeight != null && numberSides != null && numberTotal != null) {

        dataSend = {'productName': selectElement, 'heightPrice': numberHeight, 'widthPrice': numberWidth, 'sidePrice': numberSides, 'width': width, 'height': height, 'total': numberTotal};


        Swal.fire({
            title: "¿Deseas enviar tú cotización?",
            showDenyButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                $.ajax({
                    type: "POST",
                    url: "/aluminum-design/save-quote",
                    contentType: "application/json;charset=utf-8",
                    data: JSON.stringify(dataSend),
                    success: function (response) {
                        if (response.split(',')[0] === 'ok') {
                            Swal.fire("Registro almacenado con éxito!\n\ El ID de tú cotización es: " + response.split(',')[1], "", "success");
                            widthContent.innerHTML = '';
                            heightContent.innerHTML = '';
                            sidesContent.innerHTML = '';
                            totalContent.innerHTML = '';
                            width = document.getElementById('width');
                            width.value = '';
                            height = document.getElementById('height');
                            height.value = '';
                            productName.innerText = '';

                        } else if (response === 'error') {
                            Swal.fire("Ocurrió un error", "", "warning");
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "¡Ocurrió un error procesando la solicitud!"
                        });
                    }
                });

            } else if (result.isDenied) {
                Swal.fire("No se envió la cotización ", "", "info");
            }
        });

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡Ocurrió un error!"
        });
    }
}

function extractNumbers(str) {
    var numbers = str.match(/\d+/);
    return numbers ? numbers[0] : null;
}