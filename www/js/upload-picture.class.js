class UploadPicture {

	constructor() {
		let input = $('#upload-file');
		let btnFile = $('.btn-file');

		// Check compatibility
		if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
			console.log('The File APIs are not fully supported in this browser.');
			btnFile.remove();
			return;
		}

		// Set up file reader
		let fr = new FileReader();
		fr.onload = sendToServer;

		// click events
		btnFile.on('click', () => { input.click(); });
		input.on('change', loadSelectedFile);
		input = input[0];

		function loadSelectedFile() {
			fr.readAsDataURL(input.files[0]);
			btnFile.text('Loading...');
		}

		function sendToServer() {
			let fileExtension = $(input).val();
			fileExtension = fileExtension.substr(fileExtension.lastIndexOf('.'));

			$.ajax({
				url: '/upload-file',
				type: "POST",
				dataType: "json",
				processData: false,
				headers: {"Content-Type": "application/json"},
				data: JSON.stringify({
					imgData: fr.result,
					imgExtension: fileExtension
				}),
				success: onFileUploaded,
				error: function(error) {
					console.log(error.responseJSON)
				}
			});
		}

		function onFileUploaded(filename, err) {
			if (err == "success") {
				user.picture = filename;
				$('.profile-picture').attr('src', fr.result);
				$('input[name="picture"]').val(filename);
				btnFile.text('Upload image');

				window[user.role].update(user._id, { picture: filename });
			}
		}
	}
}
