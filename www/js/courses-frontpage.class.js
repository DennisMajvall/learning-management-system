class CoursesOnFrontpage {

	constructor() {
		// When we have login working we won't have to 'find' Students (or Teachers)
		// and instead just populate the courses of the one logged in.

		let courseHashMap = {};
		let that = this;

		populateCourses(user.courses);

		function populateCourses(courses) {
			let coursesIds = courses.map( course => '"' + course + '"' );
			let queryString = 'find/{ _id: { $in: [' + coursesIds + '] } }';

			Course.find(queryString, createTemplate);
		}

		function createTemplate(courses, err) {
			// Make an array mapping the _id as an index for each course.
			that.courseHashMap = {};
			courses.forEach((course) => {
				that.courseHashMap[course._id] = course;
			});

			$('.front-course-container').template('front-course', { courses: courses });

			document.getElementById('upload-file').onchange = function() {
				handleFileSelect();
			};
		}


		$('.front-course-container').on('click', '.show-course', function() {
			e.preventDefault();
			let id = $(this).data('id');
			let course = that.courseHashMap[id];

			$('.student-announcement-container').empty();
			$('.teacher-messages-container').empty();
			$(".sidebar-slide").removeClass("visible");
			$('.front-course-container').empty().template('course-page', {
				course: course,
				role: user.role.toLowerCase()
			});
		});
	}
}

var fr = new FileReader();

function handleFileSelect() {
	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
	  alert('The File APIs are not fully supported in this browser.');
	  return;
	}

	input = $("#upload-file")[0];

	if (!input.files) {
	  alert("This browser doesn't seem to support the `files` property of file inputs.");
	}
	else if (!input.files[0]) {
	  alert("Please select a file before clicking 'Load'");
	}
	else {
	  file = input.files[0];
	  fr.onload = receivedText;
	  //fr.readAsText(file);
	  fr.readAsDataURL(file);
	}
}


function receivedText() {
	input = $("#upload-file")[0];
	var filename = input.value.substr(input.value.lastIndexOf('\\') + 1);

	$.ajax({
		url: '/upload-file',
		type: "POST",
		dataType: "json",
		// don't process the request body
		processData: false,
		// and tell Node that it is raw json
		headers: {"Content-Type": "application/json"},
		// the request body
		data: JSON.stringify({
			imgData: fr.result
		}),
		// callback functions
		success: (result, err) => {
			console.log(result, err)
			if (err == "success") {
				Student.update(user._id, { picture: result }, () => {
					location.reload();
				});
			}
		},
		error: function(error){
			console.log(error.responseJSON)
		}
	});

}

