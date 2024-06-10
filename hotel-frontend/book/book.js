document.addEventListener('DOMContentLoaded', function () {
    const hotelId = new URLSearchParams(window.location.search).get('hotelId');
    fetch(`/hotel-details?hotelId=${hotelId}`)
        .then(response => response.json())
        .then(data => {
            const hotelDetailsDiv = document.getElementById('hotelDetails');
            hotelDetailsDiv.innerHTML = `
                <h2>${data.name}</h2>
                <p>Fiyat: ${data.price} TL</p>
                <p>Yer: ${data.location}</p>
                <p>Oda Tipi: ${data.roomType}</p>
            `;
            document.getElementById('bookButton').onclick = function () {
                bookHotel(hotelId);
            };
        })
        .catch(error => console.error('Error:', error));
});

function bookHotel(hotelId) {
    const userId = 1; // Giriş yapmış kullanıcının ID'si

    fetch('/book-room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ hotelId, userId })
    })
    .then(response => response.json())
    .then(data => {
        alert('Rezervasyon tamamlandı!');
    })
    .catch(error => console.error('Error:', error));
}
