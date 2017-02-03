class AdminTeacherList {
	constructor() {
		var itemsDisplayed = [];
        let itemHashMap = {};

        Teacher.find('', function(data, err) {
            itemsDisplayed = data.slice(0, Math.min(20, data.length));

            $('body div.page-content').html('').template('admin-teacher-list', { teachers: itemsDisplayed });

            // Make an array mapping the _id as an index for each item.
            itemsDisplayed.forEach(function(item, index) {
                itemHashMap[item._id] = item;
            });
        });

        $('body').on('click', 'a.teacher-info', function() {
            let item = itemHashMap[$(this).attr('teacher-id')];
            new AdminTeacherEditPage(item);
        });
	}
}
