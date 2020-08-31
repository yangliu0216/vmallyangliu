var { src , dest , series , parallel , watch} = require('gulp');
var clean = require('gulp-clean');
var fileInclude = require('gulp-file-include');
var webserver = require('gulp-webserver');


function cleanTask(){   //清除dist这个文件夹
    return src('./dist',{allowEmpty: true})   //允许要删除的文件可以不存在
            .pipe( clean() );
}
//代码片段
function fileIncludeTask(){
    return src('./src/view/*.html')
    .pipe( fileInclude({
        prefix : '@',
        basepath : './src/view/templates'
    }))
    .pipe(dest('./dist/view'))
}
//服务器
function webserverTask(){
    return src('./dist')
            .pipe( webserver({
                host : 'localhost',
                port : 4000,
                open : './view/index.html',
                livereload : true   
            }));
}

function watchTask(){
    //监听文件变化
    watch('./src/view/**' , fileIncludeTask)
}

module.exports = {
    // 开发环境下的命令
    dev : series(cleanTask , fileIncludeTask , parallel(webserverTask , watchTask) ) ,
    // 生产环境下的命令
    build : series(cleanTask)
};


