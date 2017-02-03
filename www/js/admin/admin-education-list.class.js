class AdminEducationList {
	constructor() {
		var itemsDisplayed = [];
        let itemHashMap = {};

        Education.find('', function(data, err) {
            itemsDisplayed = data.slice(0, Math.min(20, data.length));

            $('body div.page-content').html('').template('admin-education-list', { educations: itemsDisplayed });

            // Make an array mapping the _id as an index for each item.
            itemsDisplayed.forEach(function(item, index) {
                itemHashMap[item._id] = item;
            });
        });

        $('body').on('click', 'a.education-info', function() {
            let item = itemHashMap[$(this).attr('education-id')];
            new AdminEducationEditPage(item);
        });
	}
}
