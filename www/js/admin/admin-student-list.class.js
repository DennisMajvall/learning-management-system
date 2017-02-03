class AdminStudentList {
	constructor() {
		var itemsDisplayed = [];
        let itemHashMap = {};

        Student.find('', function(data, err) {
            itemsDisplayed = data.slice(0, Math.min(20, data.length));

            $('body div.page-content').html('').template('admin-student-list', { students: itemsDisplayed });

            // Make an array mapping the _id as an index for each item.
            itemsDisplayed.forEach(function(item, index) {
                itemHashMap[item._id] = item;
            });
        });

        $('body').on('click', 'a.student-info', function() {
            let item = itemHashMap[$(this).attr('student-id')];
            new AdminStudentEditPage(item);
        });
	}
}
