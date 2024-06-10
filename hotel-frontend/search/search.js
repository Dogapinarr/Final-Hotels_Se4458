document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const location = document.getElementById('location').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const people = document.getElementById('people').value;

    fetch(`/search-hotels?location=${location}&startDate=${startDate}&endDate=${endDate}&people=${people}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';
            data.forEach(hotel => {
                const hotelDiv = document.createElement('div');
                hotelDiv.innerHTML = `
                    <h2>${hotel.name}</h2>
                    <p>Fiyat: ${hotel.price} TL</p>
                    <p>Yer: ${hotel.location}</p>
                    <p>Oda Tipi: ${hotel.roomType}</p>
                    <button onclick="bookHotel(${hotel.id})">Rezervasyon Yap</button>
                `;
                resultsDiv.appendChild(hotelDiv);
            });
        })
        .catch(error => console.error('Error:', error));
});

function bookHotel(hotelId) {
    const userId = 1; // Giriş yapmış kullanıcının ID'si
    fetch('/book-hotel', {
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
