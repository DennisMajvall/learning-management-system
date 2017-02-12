'use strict';

var once = true;
var paths =  {
	watchDirs: [
		'./less/**/*.less'
	],
	lessInput: [
		'./less/all.less'
	],
	cssOutput: './www/css'
}

// gulp tasks for LESS compilation
module.exports = class LessWatch {
	constructor() {
		once && this.setup();
		once = false;
	}

	setup() {
		this.gulp = require('gulp');
		this.gulpless = require('gulp-less');
		this.gulpcleancss = require('gulp-clean-css');

		this.tasks();
		this.gulp.start('less-watch');
	}

	tasks() {
		this.gulp.task('less', [], () => {

		try {
			return this.gulp
				.src(paths.lessInput)
				.pipe(this.gulpless().on('error', this.catchError))
				.pipe(this.gulpless())
				.pipe(this.gulpcleancss())
				.pipe(this.gulp.dest(paths.cssOutput));
			} catch(e) {
				console.log("LESS compilation err\n\n", e.stack); return null;
			}
		});

		this.gulp.task('less-watch', ['less'], () => {
			this.gulp
				.watch(paths.watchDirs, ['less'])
				.on('change', this.reportChange);
		});
	}

	 catchError(err){
		var gutil = require("gulp-util");
		//gutil.log(gutil.colors.red("ERROR", 'less'), err); // Full Error
		gutil.log(gutil.colors.red("ERROR", "less"), gutil.colors.cyan(err.message));
		this.emit("end", new gutil.PluginError('less', err, { showStack: false }));
	 }

	reportChange() {
		console.log("LESS files changed, new CSS generated...");
	}
};
