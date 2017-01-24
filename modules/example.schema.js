var blogSchema = new Schema({
	title: {tpye: String, required: true},
	author: {type: String, default: "John Doe"},
	month: {type: String, enum:
		[
		  "januari","februari","mars"
		]
	},
	body: String,
	comments: [{
		body: {
			type:String,
			default: "Brilliant article!"
		},
		date: Date
	}],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
		votes: Number,
		favs:  Number
	}
});
