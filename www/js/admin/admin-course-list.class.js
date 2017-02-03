class AdminCourseList {
	constructor() {
		var itemsDisplayed = [];
        let itemHashMap = {};

        Course.find('', function(data, err) {
            itemsDisplayed = data.slice(0, Math.min(20, data.length));

            $('body div.page-content').html('').template('admin-course-list', { courses: itemsDisplayed });

            // Make an array mapping the _id as an index for each item.
            itemsDisplayed.forEach(function(item, index) {
                itemHashMap[item._id] = item;
            });
        });

        $('body').on('click', 'a.course-info', function() {
            let item = itemHashMap[$(this).attr('course-id')];
            new AdminCourseEditPage(item);
        });
	}
}

