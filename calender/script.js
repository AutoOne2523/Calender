document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            // สามารถใส่กิจกรรมเริ่มต้นได้ที่นี่
        ]
    });
    calendar.render();

    document.getElementById('addEventForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var title = document.getElementById('eventTitle').value;
        var date = document.getElementById('eventDate').value;

        if (title && date) {
            calendar.addEvent({
                title: title,
                start: date
            });
            // ส่งข้อมูลกิจกรรมไปยังเซิร์ฟเวอร์เพื่อบันทึก
            fetch('https://your-server.com/api/add-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: title, date: date })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Event added:', data);
            })
            .catch(error => console.error('Error adding event:', error));
        }
    });
});
