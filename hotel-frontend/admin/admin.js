document.getElementById('adminForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        roomType: document.getElementById('roomType').value,
        roomCount: document.getElementById('roomCount').value,
        availability: document.querySelector('input[name="availability"]:checked').value
    };

    const token = localStorage.getItem('token');

    fetch('http://localhost:3005/admin/add-room', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Room info updated!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
