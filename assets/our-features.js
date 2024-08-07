document.addEventListener("DOMContentLoaded", function() {
    // Tìm tất cả các nút có lớp .logButton
    const buttons = document.querySelectorAll('.logButton');

    buttons.forEach((button, index) => {
        // Kiểm tra xem sự kiện click đã được thêm chưa
        if (!button.dataset.eventAdded) {
            // Thêm sự kiện click cho mỗi nút
            button.addEventListener('click', function() {
                const componentId = this.getAttribute('data-component-id');
                console.log(`Button in component ${componentId} clicked`);
            });

            // Đánh dấu sự kiện đã được thêm
            button.dataset.eventAdded = 'true';
        }
    });
});